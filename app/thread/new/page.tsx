"use client";
import Link from "next/link";

import toast from "react-hot-toast";

import { useState } from "react";
import { db } from "@/app/firebase";
import { addDoc, collection } from "firebase/firestore";
import { isSeverity, Severity, severityTypes } from "@/app/(types)/Severities";

export default function NewIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity>("minor");

  const addThread = async () => {
    if (title.trim() === "" || description.trim() === "") {
      toast.error("fill boxes");
      return;
    }

    if (!isSeverity(severity)) {
      toast.error("Invalid severity selected");
      return;
    }

    try {
      await addDoc(collection(db, "threads"), {
        title: title,
        description: description,
        severity: severity,
        status: "open",
      });
      toast.success("Issue added successfully! :D");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to add the new issue :(");
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
          <h1 className="font-bold text-lg">New issue</h1>
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
              >
                {Object.entries(severityTypes).map(([key, value]) => (
                  <option key={key} value={key} className={value}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
          </section>
          <section className="py-2">
            <h1>Add a description</h1>
            <textarea
              className="
            textarea
            textarea-bordered
            textarea-md
            w-full
            max-w-xs"
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
