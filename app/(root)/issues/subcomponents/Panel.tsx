"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/app/(database)/firebase";
import { toast } from "sonner";

import { FaTags } from "react-icons/fa";

import {
  Severity,
  severityBadges,
  severityTypes,
} from "@/app/thread/(components)/types/Severities";
import {
  Status,
  statusBadges,
  statusTypes,
} from "@/app/thread/(components)/types/Statuses";

import { isAdmin } from "@/app/(database)/accounts/isAdmin";
import { deleteThread } from "@/app/(database)/threads/deleteThread";
import { updateThread } from "@/app/(database)/threads/updateThread";

interface ThreadPanelProps {
  id: string;
  data: any;
}

export default function ThreadPanel({ id, data }: ThreadPanelProps) {
  const [mounted, setMounted] = useState(false);

  const [user, loading] = useAuthState(auth);
  const [severity, setSeverity] = useState<Severity>(data?.severity || "minor");
  const [status, setStatus] = useState<Status>(data?.status || "open");

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  });

  useEffect(() => {
    if (data) {
      setSeverity(data.severity);
      setStatus(data.status);
    }
  }, [data]);

  const handleUpdate = async (
    field: "severity" | "status" | "hidden",
    value: any
  ) => {
    try {
      await updateThread(id, { [field]: value });

      switch (field) {
        case "status":
          setStatus(value);
          break;
        case "severity":
          setSeverity(value);
          break;
      }
    } catch (error) {
      toast.error("Error while updating property '" + field + "'!");
      console.log(error);
    } finally {
      toast.success("Property '" + field + "' updated successfully!");
      router.refresh();
    }
  };

  const handleDeletion = async () => {
    try {
      await deleteThread(id);
    } catch (error) {
      toast.error("Error while deleting thread!");
      console.log(error);
    } finally {
      toast.success("Topic deleted succesfully.");
      router.push("/");
    }
  };

  if (loading || !mounted) return null;

  return (
    isAdmin(user!) && (
      <section>
        <h1 className="font-bold text-lg bg-base-300 rounded-t-md px-4 py-2">
          Administrator Panel
        </h1>
        <section className="flex flex-col gap-1 px-4 py-2">
          <div className="flex flex-row flex-wrap gap-1 items-center py-2">
            <div className="flex flex-col items-start justify-start gap-1 px-2">
              <div className="flex flex-row items-center gap-1">
                <FaTags /> Actions
              </div>
              <div className="flex flex-row items-start gap-1 flex-wrap">
                <button
                  className={`btn ${data.hidden ? "btn-success" : "btn-error"}`}
                  onClick={() => handleUpdate("hidden", !data.hidden)}
                >
                  {data.hidden ? "Make visible" : "Hide topic"}
                </button>
                <button
                  className={`btn btn-error`}
                  onClick={() => toast.error("Unimplemented.")}
                >
                  Suspend author
                </button>
                <button className={`btn btn-error`} onClick={handleDeletion}>
                  Delete topic
                </button>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-1 p-2">
              <div className="flex flex-row items-center gap-1">
                <FaTags /> Tags
              </div>
              <div className="flex flex-row items-start gap-1">
                <select
                  className="select select-bordered w-fit"
                  onChange={(e) =>
                    handleUpdate("severity", e.target.value as Severity)
                  }
                  value={severity}
                >
                  {Object.entries(severityBadges).map(([key, value]) => (
                    <option key={key} value={key} className={value}>
                      {key}
                    </option>
                  ))}
                </select>
                <select
                  className="select select-bordered w-fit"
                  onChange={(e) =>
                    handleUpdate("status", e.target.value as Status)
                  }
                  value={status}
                >
                  {Object.entries(statusBadges).map(([key, value]) => (
                    <option key={key} value={key} className={value}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>
      </section>
    )
  );
}
