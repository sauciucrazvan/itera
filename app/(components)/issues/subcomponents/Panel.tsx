"use client";

import { updateThread } from "@/app/(database)/updateThread";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Severity, severityTypes } from "@/app/(types)/Severities";

interface IssuePanelProps {
  threadID: string;
  threadData: any;
}

export default function IssuePanel({ threadID, threadData }: IssuePanelProps) {
  const [user, loading] = useAuthState(auth);
  const [mounted, setMounted] = useState(false);
  const [severity, setSeverity] = useState<Severity>("minor");

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  });

  useEffect(() => {
    if (threadData?.severity) {
      setSeverity(threadData.severity);
    }
  }, [threadData]);

  const changeSeverity = async (newSeverity: Severity) => {
    try {
      await updateThread(threadID, { severity: newSeverity });
      toast.success("Severity updated successfully!");
      setSeverity(newSeverity);
      router.refresh();
    } catch (error) {
      console.error("Error while updating severity:", error);
      toast.error("Error while updating severity!");
    }
  };

  if (loading || !mounted) return null;

  const handleVisibility = async () => {
    try {
      await updateThread(threadID, { hidden: !threadData.hidden });
      toast.success("Topic visiblity modified!");
      router.refresh();
    } catch (error) {
      console.error("Error while deleting the topic: ", error);
      toast.error("Error while deleting the topic!");
    }
  };

  return (
    <>
      {threadData.author.id === user?.uid && (
        <div className="flex flex-row gap-1 items-center py-2">
          {
            <button
              className={
                "btn " + (threadData.hidden ? "btn-success" : "btn-error")
              }
              onClick={handleVisibility}
            >
              {threadData.hidden ? "Make visible" : "Hide topic"}
            </button>
          }
          <select
            className="select select-bordered w-fit"
            onChange={(event) => changeSeverity(event.target.value as Severity)}
            value={severity}
          >
            <option value="none" disabled>
              Pick the severity of the issue
            </option>
            {Object.entries(severityTypes).map(([key, value]) => (
              <option key={key} value={key} className={value}>
                {key}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}
