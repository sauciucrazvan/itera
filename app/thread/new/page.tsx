"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Category,
  categoryTypes,
  isCategory,
} from "../(components)/types/Categories";
import {
  isSeverity,
  Severity,
  severityBadges,
} from "@/app/thread/(components)/types/Severities";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/(database)/firebase";
import { insertThread } from "@/app/(database)/threads/addThread";

import Gateway from "@/app/(components)/helpers/Gateway";
import Loading from "@/app/(components)/helpers/Loading";

import {
  FaExclamationTriangle,
  FaGripHorizontal,
  FaHeading,
  FaImages,
  FaInfoCircle,
  FaQuoteRight,
} from "react-icons/fa";

import { toast } from "sonner";

export default function NewIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Issues");
  const [media, setMedia] = useState("");
  const [severity, setSeverity] = useState<Severity>("minor");
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  const validateThread = () => {
    if (title.trim() === "" || description.trim() === "") {
      return "Please fill in the boxes!";
    }

    if (title.length > 128) {
      return "Limit the title to 128 characters.";
    }

    if (description.length > 4096) {
      return "Limit the description to 4096 characters.";
    }

    if (!isSeverity(severity) || !isCategory(category)) {
      return "An error occurred!";
    }

    return null;
  };

  const addThread = async () => {
    const validationError = validateThread();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    if (loading) return <Loading />;

    try {
      await insertThread(title, description, category, media, severity, user!);

      toast.success("Thread created successfully!");

      setTitle("");
      setDescription("");
      setCategory("Issues");
      setSeverity("minor");
    } catch (error) {
      console.error(error);
      toast.error("An error occured. Please try again!");
    } finally {
      router.push("/");
    }
  };

  const categoryOptions = useMemo(
    () =>
      Object.entries(categoryTypes).map(([key, value]) => (
        <option key={key} value={value}>
          {value}
        </option>
      )),
    []
  );

  const severityOptions = useMemo(
    () =>
      Object.entries(severityBadges).map(([key, value]) => (
        <option key={key} value={key} className={value}>
          {key}
        </option>
      )),
    []
  );

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
                <Link href="/">Threads</Link>
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
                    <FaHeading /> Title
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
                  <h1 className="text-md flex flex-row items-center gap-1 pt-2">
                    <FaGripHorizontal /> Category
                  </h1>
                  <select
                    className="select select-bordered w-full"
                    onChange={(event) =>
                      setCategory(event.target.value as Category)
                    }
                    value={category}
                  >
                    <option value="none" disabled>
                      Pick the a category
                    </option>
                    {categoryOptions}
                  </select>

                  {(category === "Issues" ||
                    category === "Feature Request") && (
                    <>
                      <h1 className="text-md flex flex-row items-center gap-1 pt-2">
                        <FaImages /> Media (images, videos)
                      </h1>
                      <small>
                        Please use a trustworthy website to upload media such as{" "}
                        <Link href="https://imgur.com">imgur.com</Link>.
                        (optional)
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
                    </>
                  )}

                  {category === "Issues" && (
                    <>
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
                        {severityOptions}
                      </select>
                    </>
                  )}
                </div>
                <div className="divider m-0" />
                <button className="btn btn-success btn-xs" onClick={addThread}>
                  Create new thread
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
