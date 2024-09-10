"use client";
import Link from "next/link";

import toast from "react-hot-toast";

import { useState } from "react";
import { isSeverity, Severity, severityTypes } from "@/app/(types)/Severities";
import { insertThread } from "@/app/(database)/addThread";
import { useRouter } from "next/navigation";

export default function NewIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity>("minor");

  const addThread = async () => {
    if (title.trim() === "" || description.trim() === "") {
      toast.error("Please fill in the boxes!");
      return;
    }

    if (!isSeverity(severity)) {
      toast.error("Invalid severity selected!");
      return;
    }

    try {
      await insertThread(title, description, severity);

      toast.success("Thread created successfully!");

      setTitle("");
      setDescription("");
      setSeverity("minor");
    } catch (error) {
      console.error(error);
      toast.error("An error occured. Please try again!");
    }
  };

  return (
    <>
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
          <section className="pt-2 flex flex-col lg:flex-row lg:items-center gap-1">
            <div>
              <h1>Add a title</h1>
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered w-full max-w-xs"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <h1>Severity</h1>

              <select
                className="select select-bordered w-full max-w-xs"
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
          </section>
          <section className="py-2 flex flex-col">
            <h1>Add a description</h1>
            <small className="pb-2">
              Please be as descriptive as possible.
              <br />
              Upload images to trusted websites (such as{" "}
              <Link href="https://imgur.com">imgur.com</Link>)
            </small>
            <textarea
              className="
            textarea
            textarea-bordered
            textarea-md
            w-screen
            max-w-md"
              placeholder="Describe your issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </section>
          <button className="btn btn-success btn-xs" onClick={addThread}>
            Submit new issue
          </button>
        </section>
      </section>
    </>
  );
}
