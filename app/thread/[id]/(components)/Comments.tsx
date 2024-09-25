"use client";

import { useState } from "react";
import { arrayUnion, DocumentData } from "firebase/firestore";
import { FaClock } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/(database)/firebase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getUsername } from "@/app/(database)/accounts/getUsername";
import { updateThread } from "@/app/(database)/threads/updateThread";
import { isAdmin } from "@/app/(database)/accounts/isAdmin";

export default function Comments({
  threadID,
  thread,
}: {
  threadID: string;
  thread: DocumentData;
}) {
  const [reply, setReply] = useState<string>(""),
    [isSubmitting, setIsSubmitting] = useState(false),
    [user, loading] = useAuthState(auth);

  const router = useRouter();

  const replyToTopic = async () => {
    if (!user) return toast.error("You need to be logged in!");
    if (thread.status !== "open" && thread.status !== "reviewing")
      return toast.error("You can't reply to a closed topic!");

    setIsSubmitting(true);

    if (reply.length < 3 || reply.length > 2048) {
      setIsSubmitting(false);
      return toast.error(
        "Replies must have at least 3 characters and at maximum 2048."
      );
    }

    const newComment = {
      author: {
        id: user.uid,
        name: getUsername(user),
      },
      text: reply,
      date: new Date().toLocaleString(),
    };

    try {
      await updateThread(threadID, {
        comments: arrayUnion(newComment),
      });
      toast.success("Reply posted!");
    } catch (error) {
      console.log(error);
      toast.error("An error occured!");
    } finally {
      setReply("");
      setIsSubmitting(false);
      router.refresh();
    }
  };

  const closeTopic = async () => {
    if (!isAdmin(user!)) return toast.error("You're not an administrator!");

    try {
      await updateThread(threadID, { status: "closed" });
      toast.success("Topic closed!");
    } catch (error) {
      console.log(error);
      toast.error("An error occured!");
    } finally {
      setReply("");
      setIsSubmitting(false);
      router.refresh();
    }
  };

  const markTopicDuplicate = async () => {
    if (!isAdmin(user!)) return toast.error("You're not an administrator!");

    try {
      await updateThread(threadID, { status: "duplicate" });
      toast.success("Topic closed as duplicate!");
    } catch (error) {
      console.log(error);
      toast.error("An error occured!");
    } finally {
      setReply("");
      setIsSubmitting(false);
      router.refresh();
    }
  };

  const postAndClose = async () => {
    if (!isAdmin(user!)) return toast.error("You're not an administrator!");
    try {
      await replyToTopic();
      await closeTopic();
    } catch (error) {
      console.log(error);
      toast.error("An error occured!");
    } finally {
      setReply("");
      setIsSubmitting(false);
      router.refresh();
    }
  };

  if (loading) return <div className="skeleton w-full h-[75vh]" />;

  return (
    <section className="artboard bg-base-200 rounded-md">
      <h1 className="font-bold text-lg bg-base-300 px-4 py-2 rounded-t-md">
        Comments
      </h1>
      <section className="px-4 py-2">
        {thread.comments &&
          thread.comments.length > 0 &&
          thread.comments.map((comment: any, index: any) => (
            <>
              <div key={index} className="p-2">
                <div className="flex flex-row items-center gap-1 justify-between">
                  <strong>@{comment.author.name}</strong>
                  <div className="text-xs text-gray-500 flex flex-row items-center gap-1">
                    <FaClock /> {comment.date}
                  </div>
                </div>
                <div>{comment.text}</div>
              </div>
              {index + 1 < thread.comments.length && (
                <div className="divider m-0" />
              )}
            </>
          ))}
        <div className="pt-4 flex flex-col items-start justify-start gap-2">
          <textarea
            className="
                textarea
                textarea-bordered
                textarea-md
                w-full
                h-[10vh]
                max-h-[25vh]"
            placeholder="Reply to this topic..."
            onChange={(e) => setReply(e.target.value)}
            value={reply}
            disabled={
              !user ||
              (thread.status !== "open" && thread.status !== "reviewing")
            }
          />
          <div className="flex flex-row flex-wrap items-start gap-1">
            <button
              className="btn btn-outline btn-sm"
              disabled={
                isSubmitting ||
                !user ||
                (thread.status !== "open" && thread.status !== "reviewing")
              }
              onClick={replyToTopic}
            >
              {isSubmitting ? "Posting..." : "Post your reply"}
            </button>
            {isAdmin(user!) && (
              <>
                <button
                  className="btn btn-error btn-outline btn-sm"
                  disabled={
                    isSubmitting ||
                    !user ||
                    (thread.status !== "open" && thread.status !== "reviewing")
                  }
                  onClick={postAndClose}
                >
                  {isSubmitting ? "Posting..." : "Post & close"}
                </button>
                <button
                  className="btn btn-error btn-outline btn-sm"
                  disabled={
                    !(
                      thread.status !== "closed" &&
                      thread.status !== "duplicate"
                    )
                  }
                  onClick={closeTopic}
                >
                  Close topic
                </button>
                <button
                  className="btn btn-warning btn-outline btn-sm"
                  disabled={
                    !(
                      thread.status !== "closed" &&
                      thread.status !== "duplicate"
                    )
                  }
                  onClick={markTopicDuplicate}
                >
                  Mark as duplicate
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </section>
  );
}
