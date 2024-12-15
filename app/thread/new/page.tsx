"use client";
import Link from "next/link";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  FaStar,
} from "react-icons/fa";

import { toast } from "sonner";
import Loading from "@/app/(components)/helpers/Loading";
import { getAccount } from "@/app/(database)/accounts/getAccount";

function NewIssue() {
  const [isSubmitting, setIsSubmitting] = useState(false),
    [title, setTitle] = useState(""),
    [description, setDescription] = useState(""),
    [media, setMedia] = useState(""),
    [category, setCategory] = useState<Category>("Issues"),
    [severity, setSeverity] = useState<Severity>("minor"),
    [user, loading] = useAuthState(auth),
    searchParams = useSearchParams();

  const router = useRouter();

  const categoryParameter = searchParams.get("category");

  const validateThread = () => {
    if (title.trim() === "" || description.trim() === "")
      return "Please fill in the title and description boxes!";

    if (title.length > 128) return "Limit the title to 128 characters.";
    if (description.length > 4096)
      return "Limit the description to 4096 characters.";

    if (!isSeverity(severity) || !isCategory(category) || category === "All")
      return "An error occurred!";

    return null;
  };

  useEffect(() => {
    if (
      categoryParameter &&
      isCategory(categoryParameter) &&
      categoryParameter !== "All"
    ) {
      setCategory(categoryParameter);
    }
  }, [categoryParameter]);

  const resetForms = () => {
    setTitle(""),
      setDescription(""),
      setSeverity("minor"),
      setCategory("Issues");
  };

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
    []
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setDescription(e.target.value),
    []
  );

  const handleMediaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setMedia(e.target.value),
    []
  );

  const addThread = async () => {
    if (isSubmitting || loading || !user) return;

    const suspended = (await getAccount(user!))!.suspended ?? false;
    if (suspended)
      return toast.error(
        "You're permanentely suspended from posting for breaking the TOS."
      );

    setIsSubmitting(true);

    const validationError = validateThread();
    if (validationError) {
      toast.error(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      const thread = await insertThread(
        title,
        description,
        category,
        media,
        user!,
        category === "Issues" ? severity : undefined
      );

      router.push("/thread/" + thread.id);
    } catch (error) {
      console.error(error);
      toast.error("An error occured. Please try again!");
    } finally {
      toast.success("Thread created successfully!");
      resetForms();
      setIsSubmitting(false);
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
                h-[40vh]
                max-h-[60vh]"
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
                        <Link href="https://imgur.com">imgur.com</Link>{" "}
                        <i>(optional)</i>
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
                  <FaInfoCircle size="24" /> Remember that you&apos;ll get
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

export default function NewIssueSuspense() {
  return (
    <Suspense fallback={<Loading />}>
      <NewIssue />
    </Suspense>
  );
}
