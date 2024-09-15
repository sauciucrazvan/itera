"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { isSeverity, Severity, severityTypes } from "@/app/(types)/Severities";
import { insertThread } from "@/app/(database)/addThread";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";

import Gateway from "@/app/(components)/Gateway";
import Loading from "@/app/(components)/Loading";

import {
  FaExclamationTriangle,
  FaHeading,
  FaImages,
  FaInfoCircle,
  FaQuoteRight,
} from "react-icons/fa";
import { toast } from "sonner";

export default function NewIssue() {
  const [title, setTitle] = useState("");
  const [media, setMedia] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity>("minor");
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

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
      await insertThread(title, description, media, severity, user);

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
          <section className="artboard bg-base-200 rounded-md">
            <h1 className="font-bold text-lg bg-base-300 px-4 py-2 rounded-t-md">
              Create a thread
            </h1>
            <div className="flex flex-col md:flex-row md:items-start gap-2 px-4 py-2">
              <section className="md:flex-1">
                <div>
                  <h1 className="text-md flex flex-row items-center gap-1 pb-2">
                    <FaHeading /> Short description of the issue...
                  </h1>
                  <input
                    type="text"
                    placeholder="Title"
                    className="input input-bordered w-full max-w-full "
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <h1 className="text-md flex flex-row items-center gap-1 pt-4 pb-2">
                  <FaQuoteRight /> Add a description
                </h1>
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
              <div className="divider md:divider-horizontal m-0" />
              <section className="md:w-[25vw] flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <h1 className="text-md flex flex-row items-center gap-1">
                    <FaImages /> Media (images, videos)
                  </h1>
                  <small>
                    Please use a trustworthy website to upload media such as{" "}
                    <Link href="https://imgur.com">imgur.com</Link>. (optional)
                  </small>
                  <textarea
                    className="
                textarea
                textarea-bordered
                textarea-md
                h-[10vh]"
                    placeholder="Links"
                    value={media}
                    onChange={(e) => setMedia(e.target.value)}
                  />
                  <h1 className="text-md flex flex-row items-center gap-1 pt-2">
                    <FaExclamationTriangle /> Severity
                  </h1>
                  <select
                    className="select select-bordered w-full"
                    onChange={(event) =>
                      setSeverity(event.target.value as Severity)
                    }
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
                <div className="divider m-0" />
                <button className="btn btn-success btn-xs" onClick={addThread}>
                  Submit new issue
                </button>
                <div className="text-xs flex flex-row items-center gap-2">
                  <FaInfoCircle size="24" /> Remember that you'll get
                  permanently suspended if you post forbidden content or use
                  profanity.
                </div>
              </section>
            </div>
          </section>
        </section>
      </Gateway>
    </>
  );
}
