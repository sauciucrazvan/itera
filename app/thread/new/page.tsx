"use client";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Category,
  categoryTypes,
  isCategory,
} from "../(components)/types/Categories";
import {
  isSeverity,
  Severity,
  severityTypes,
} from "@/app/thread/(components)/types/Severities";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/(database)/firebase";
import { insertThread } from "@/app/(database)/threads/addThread";

import { Select } from "../(components)/Select";
import Gateway from "@/app/(components)/helpers/Gateway";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [category, setCategory] = useState<Category>("Issues");
  const [severity, setSeverity] = useState<Severity>("minor");

  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  const validateThread = () => {
    if (title.trim() === "" || description.trim() === "")
      return "Please fill in the boxes!";

    if (title.length > 128) return "Limit the title to 128 characters.";

    if (description.length > 4096)
      return "Limit the description to 4096 characters.";

    if (!isSeverity(severity) || !isCategory(category))
      return "An error occurred!";

    return null;
  };

  const resetForms = () => {
    setTitle("");
    setDescription("");
    setSeverity("minor");
    setCategory("Issues");
  };

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
    },
    []
  );

  const handleMediaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMedia(e.target.value);
    },
    []
  );

  const addThread = async () => {
    if (isSubmitting || loading) return;

    setIsSubmitting(true);

    const validationError = validateThread();
    if (validationError) {
      toast.error(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      await insertThread(title, description, category, media, severity, user!);

      toast.success("Thread created successfully!");
      resetForms();
    } catch (error) {
      console.error(error);
      toast.error("An error occured. Please try again!");
    } finally {
      setIsSubmitting(false);
      router.push("/");
    }
  };

  const categoryOptions = useMemo(
    () =>
      Object.entries(categoryTypes).map(([key, value]) => ({
        key,
        value,
      })),
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
                    onChange={handleTitleChange}
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
                    onChange={handleDescriptionChange}
                  />
                </div>
              </section>

              <div className="divider md:divider-horizontal m-0" />

              <section className="md:w-[25vw] flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Select
                    label="Category"
                    icon={FaGripHorizontal}
                    options={categoryOptions}
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                  />

                  {["Issues", "Feature Request"].includes(category) && (
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
                        onChange={handleMediaChange}
                      />
                    </>
                  )}

                  {category === "Issues" && (
                    <Select
                      label="Severity"
                      icon={FaExclamationTriangle}
                      options={severityOptions}
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value as Severity)}
                    />
                  )}
                </div>

                <div className="divider m-0" />

                <button
                  className="btn btn-success btn-xs"
                  onClick={addThread}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create new thread"}
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
