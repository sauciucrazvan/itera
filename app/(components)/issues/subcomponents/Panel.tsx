"use client";

import { updateThread } from "@/app/(database)/updateThread";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Severity, severityTypes } from "@/app/(types)/Severities";
import { Status, statusTypes } from "@/app/(types)/Statuses";
import { setServers } from "dns";
import { FaTags } from "react-icons/fa";
import { isAdmin } from "@/app/(database)/isAdmin";

interface IssuePanelProps {
  threadID: string;
  threadData: any;
}

export default function IssuePanel({ threadID, threadData }: IssuePanelProps) {
  const [mounted, setMounted] = useState(false);

  const [user, loading] = useAuthState(auth);
  const [severity, setSeverity] = useState<Severity>(
    threadData?.severity || "minor"
  );
  const [status, setStatus] = useState<Status>(threadData?.status || "open");

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  });

  useEffect(() => {
    if (threadData) {
      setSeverity(threadData.severity);
      setStatus(threadData.status);
    }
  }, [threadData]);

  const handleUpdate = async (
    field: "severity" | "status" | "hidden",
    value: any
  ) => {
    try {
      await updateThread(threadID, { [field]: value });

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

  if (loading || !mounted) return null;

  return (
    isAdmin(user!) && (
      <section>
        <h1 className="font-bold text-lg bg-base-300 rounded-t-md px-4 py-2">
          Administrator Panel
        </h1>
        <section className="flex flex-col gap-1 px-4 py-2">
          <div className="flex flex-row flex-wrap gap-1 items-center py-2">
            <div className="flex flex-col items-start justify-start gap-1 bg-base-300 rounded-md p-2">
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
                  {Object.entries(severityTypes).map(([key, value]) => (
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
                  {Object.entries(statusTypes).map(([key, value]) => (
                    <option key={key} value={key} className={value}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-1 bg-base-300 rounded-md p-2">
              <div className="flex flex-row items-center gap-1">
                <FaTags /> Actions
              </div>
              <div className="flex flex-row items-start gap-1 flex-wrap">
                <button
                  className={`btn ${
                    threadData.hidden ? "btn-success" : "btn-error"
                  }`}
                  onClick={() => handleUpdate("hidden", !threadData.hidden)}
                >
                  {threadData.hidden ? "Make visible" : "Hide topic"}
                </button>
                <button
                  className={`btn btn-error`}
                  onClick={() => toast.error("Unimplemented.")}
                >
                  Suspend author
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>
    )
  );
}
