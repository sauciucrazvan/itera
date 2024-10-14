"use client";

import { useEffect, useState } from "react";
import { arrayRemove, arrayUnion, DocumentData } from "firebase/firestore";
import { FaClock, FaTrash } from "react-icons/fa";
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
    [username, setUsername] = useState<string>(""),
    [isSubmitting, setIsSubmitting] = useState(false),
    [user, loading] = useAuthState(auth);

  const router = useRouter();

  useEffect(() => {
    const getName = async () => {
      try {
        const name = await getUsername(user!);
        setUsername(name);
      } catch (error) {
        console.log(error);
        toast.error("An error occured!");
      }
    };

    if (user != null) getName();
  }, [user]);

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
        name: username ?? "Unknown",
        email: user.email,
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

  const updateThreadStatus = async (newStatus: string) => {
    if (!user || !isAdmin(user))
      return toast.error("You're not an administrator!");

    try {
      setIsSubmitting(true);
      await updateThread(threadID, { status: newStatus });
      toast.success(
        `Topic ${newStatus === "closed" ? "closed" : `marked as ${newStatus}`}!`
      );
    } catch (error) {
      console.error(error);
      toast.error("An error occured!");
    } finally {
      setIsSubmitting(false);
      router.refresh();
    }
  };

  const postAndClose = async () => {
    await replyToTopic();
    await updateThreadStatus("closed");
  };

  const deleteComment = async (comment: any) => {
    if (!isAdmin(user!)) return toast.error("You're not an administrator!");

    try {
      setIsSubmitting(true);
      await updateThread(threadID, {
        comments: arrayRemove(comment),
      });
      toast.success("Comment deleted!");
    } catch (error) {
      console.error(error);
      toast.error("An error occured!");
    } finally {
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
            <div key={index}>
              <div className="p-2">
                <div className="flex flex-row items-center gap-1 justify-between">
                  <strong>@{comment.author.name}</strong>

                  <div className="text-xs text-gray-500 flex flex-row items-center gap-1">
                    <FaClock /> {comment.date}
                    {isAdmin(user!) && (
                      <button
                        className="btn btn-xs btn-outline btn-error"
                        onClick={() => deleteComment(comment)}
                        disabled={isSubmitting}
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </div>
                <div>{comment.text}</div>
              </div>
              {index + 1 < thread.comments.length && (
                <div className="divider m-0" />
              )}
            </div>
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
                  onClick={() => updateThreadStatus("closed")}
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
                  onClick={() => updateThreadStatus("duplicate")}
                >
                  Mark as duplicate
                </button>
                <button
                  className="btn btn-info btn-outline btn-sm"
                  disabled={thread.status !== "open"}
                  onClick={() => updateThreadStatus("reviewing")}
                >
                  Mark as under review
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </section>
  );
}
