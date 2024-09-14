"use client";
import Link from "next/link";

import toast from "react-hot-toast";

import { useState } from "react";
import { isSeverity, Severity, severityTypes } from "@/app/(types)/Severities";
import { insertThread } from "@/app/(database)/addThread";
import { useRouter } from "next/navigation";
import Gateway from "@/app/(components)/Gateway";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import Loading from "@/app/(components)/Loading";
import { FaInfoCircle } from "react-icons/fa";

export default function NewIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity>("minor");
  const router = useRouter();

  const [user, loading] = useAuthState(auth);

  const addThread = async () => {
    if (title.trim() === "" || description.trim() === "") {
      toast.error("Please fill in the boxes!");
      return;
    }

    if (!isSeverity(severity)) {
      toast.error("Invalid severity selected!");
      return;
    }

    if (loading) return <Loading />;

    try {
      await insertThread(title, description, severity, user);

      toast.success("Thread created successfully!");

      setTitle("");
      setDescription("");
      setSeverity("minor");
    } catch (error) {
      console.error(error);
      toast.error("An error occured. Please try again!");
    } finally {
      router.push("/");
    }
  };

  return (
    <>
      <Gateway>
        <section className="py-2 px-4">
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/">Issues</Link>
              </li>
              <li>New Thread</li>
            </ul>
          </div>
          <section className="artboard bg-base-200 px-4 py-2 rounded-md">
            <h1 className="font-bold text-lg">Create a thread</h1>
            <div className="divider m-0" />
            <div className="flex flex-row items-start gap-2">
              <section className="flex-1">
                <div>
                  <h1 className="text-lg">Add a title</h1>
                  <input
                    type="text"
                    placeholder="Title"
                    className="input input-bordered w-full max-w-full "
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <h1 className="text-lg pt-4">Add a description</h1>
                <div className="rounded-md flex flex-col items-start">
                  <textarea
                    className="
                textarea
                textarea-bordered
                textarea-md
                w-full
                h-[40vh]"
                    placeholder="Add your description here..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </section>
              <div className="divider divider-horizontal m-0" />
              <section className="w-[25vw] flex flex-col gap-2">
                <div>
                  <h1 className="text-lg">Severity</h1>

                  <select
                    className="select select-bordered w-full max-w-lg"
                    onChange={(event) =>
                      setSeverity(event.target.value as Severity)
                    }
                    value={severity}
                  >
                    {Object.entries(severityTypes).map(([key, value]) => (
                      <option key={key} value={key} className={value}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="divider m-0" />
                <button className="btn btn-success btn-xs" onClick={addThread}>
                  Submit new issue
                </button>
                <div className="text-xs flex flex-row items-center gap-2">
                  <FaInfoCircle size="24" /> Remember that you'll get permanently suspended if you post forbidden content or use profanity.
                </div>
              </section>
            </div>
          </section>
        </section>
      </Gateway>
    </>
  );
}
