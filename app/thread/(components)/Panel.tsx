"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/app/(database)/firebase";
import { toast } from "sonner";

import { FaTags } from "react-icons/fa";

import {
  Severity,
  severityTypes,
} from "@/app/thread/(components)/types/Severities";
import { Status, statusTypes } from "@/app/thread/(components)/types/Statuses";
import { Select } from "./Select";

import { deleteThread } from "@/app/(database)/threads/deleteThread";
import { updateThread } from "@/app/(database)/threads/updateThread";
import { Category, categoryTypes } from "./types/Categories";
import { FaFolderTree } from "react-icons/fa6";
import { DocumentData } from "firebase/firestore";
import { getAccount } from "@/app/(database)/accounts/getAccount";

interface AdminPanelProps {
  id: string;
  data: any;
}

export default function AdminPanel({ id, data }: AdminPanelProps) {
  const [mounted, setMounted] = useState(false),
    [user, loading] = useAuthState(auth),
    [account, setAccount] = useState<DocumentData | undefined>(undefined),
    [category, setCategory] = useState<Category>(data?.category || "Issues"),
    [severity, setSeverity] = useState<Severity>(data?.properties?.severity),
    [status, setStatus] = useState<Status>(data?.status || "open");

  const router = useRouter();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (data) {
      setCategory(data.category);
      setSeverity(data.properties?.severity);
      setStatus(data.status);
    }
  }, [data]);

  useEffect(() => {
    const getAccountData = async () => {
      try {
        const acc = await getAccount(user!);
        setAccount(acc);
      } catch (error) {
        console.log(error);
        toast.error("An error occured!");
      }
    };

    if (user != null) getAccountData();
  }, [user, account]);

  const handleUpdate = async (
    field: "category" | "severity" | "status" | "hidden",
    value: any
  ) => {
    try {
      if (account && !account.admin) return;

      const updates: Record<string, any> = {};

      switch (field) {
        case "category":
        case "status":
          updates[field] = value;
          break;
        case "severity":
        case "hidden":
          updates.properties = {
            ...data.properties,
            [field]: value,
          };
          break;
        default:
          return;
      }

      await updateThread(id, updates);

      if (field === "category") setCategory(value);
      else if (field === "status") setStatus(value);
      else if (field === "severity") setSeverity(value);

      toast.success(`Property \'${field}\' updated successfully!`);
      router.refresh();
    } catch (error) {
      toast.error(`Error while updating property \'${field}\'!`);
      console.error(error);
    }
  };

  const handleDeletion = async () => {
    if (account && !account.admin) return;

    if (
      confirm(
        "Are you sure you want to delete this thread?\nThis action is irreversible and not frequently used."
      )
    ) {
      try {
        await deleteThread(id);
      } catch (error) {
        toast.error("Error while deleting thread!");
        console.log(error);
      } finally {
        toast.success("Topic deleted succesfully.");
        router.push("/");
      }
    }
  };

  const categoryOptions = useMemo(
    () =>
      Object.entries(categoryTypes)
        .map(([key, value]) => ({
          key,
          value,
        }))
        .filter((categ) => {
          return categ.value !== "All";
        }),
    []
  );

  const severityOptions = useMemo(
    () =>
      Object.entries(severityTypes).map(([key, value]) => ({
        key,
        value,
      })),
    []
  );

  const statusOptions = useMemo(
    () =>
      Object.entries(statusTypes).map(([key, value]) => ({
        key,
        value,
      })),
    []
  );

  if (loading || !mounted) return;

  return (
    account &&
    account!.admin && (
      <section>
        <h1 className="font-bold text-lg bg-base-300 rounded-t-md px-4 py-2">
          Administrator Panel
        </h1>
        <section className="flex flex-col gap-1 px-4 py-2">
          <div className="flex flex-col items-start justify-start gap-2 px-2">
            <div>
              <div className="flex flex-row items-start gap-1 flex-wrap">
                <button
                  className={`btn btn-sm ${
                    data.properties?.hidden
                      ? "btn-success bg-success/20 text-success hover:text-white/80"
                      : "btn-error bg-error/20 text-error hover:text-white/80"
                  }`}
                  onClick={() =>
                    handleUpdate("hidden", !data.properties?.hidden)
                  }
                >
                  {data.properties?.hidden
                    ? "Make topic visible"
                    : "Hide topic"}
                </button>
                <button
                  className={`btn btn-sm btn-error bg-error/20 text-error hover:text-white/80`}
                  onClick={() => toast.error("Unimplemented.")}
                >
                  Suspend author
                </button>
                <button
                  className={`btn btn-sm btn-error bg-error/20 text-error hover:text-white/80`}
                  onClick={handleDeletion}
                >
                  Delete topic
                </button>
                <button
                  className={`btn btn-sm btn-success bg-success/20 text-success hover:text-white/80"
                      }`}
                  onClick={() => handleUpdate("status", "open")}
                  disabled={
                    data.status === "open" || data.status === "reviewing"
                  }
                >
                  Reopen topic
                </button>
              </div>
            </div>

            <div className="flex flex-row flex-wrap gap-2 md:gap-4">
              <div>
                <div className="flex flex-row items-center gap-1">
                  <FaTags /> Status & Tags
                </div>
                <div className="flex flex-row items-start gap-1">
                  <Select
                    label=""
                    options={statusOptions}
                    value={status}
                    onChange={(e) =>
                      handleUpdate("status", e.target.value as Status)
                    }
                  />

                  {data.category === "Issues" && (
                    <Select
                      label=""
                      options={severityOptions}
                      value={severity}
                      onChange={(e) =>
                        handleUpdate("severity", e.target.value as Severity)
                      }
                    />
                  )}
                </div>
              </div>

              <div>
                <div className="pb-2">
                  <Select
                    label="Move to..."
                    icon={FaFolderTree}
                    options={categoryOptions}
                    value={category}
                    onChange={(e) =>
                      handleUpdate("category", e.target.value as Category)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-1 px-2"></div>
        </section>
      </section>
    )
  );
}
