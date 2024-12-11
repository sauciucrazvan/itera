"use client";

import moment from "moment";
import { toast } from "sonner";
import { auth } from "@/app/(database)/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { arrayRemove, arrayUnion, DocumentData } from "firebase/firestore";
import { FaClock, FaTrash } from "react-icons/fa";

import { updateThread } from "@/app/(database)/threads/updateThread";
import { getAccount } from "@/app/(database)/accounts/getAccount";

export default function Comments({
  threadID,
  thread,
}: {
  threadID: string;
  thread: DocumentData;
}) {
  const [reply, setReply] = useState<string>(""),
    [account, setAccount] = useState<DocumentData | undefined>(undefined),
    [isSubmitting, setIsSubmitting] = useState(false),
    [user, loading] = useAuthState(auth);

  const router = useRouter();

  useEffect(() => {
    const getAccountData = async () => {
      try {
        const acc = await getAccount(user!);
        setAccount(acc);
      } catch (error) {
        console.log(error);
        toast.error("An error occured!");
      }
    };

    if (user != null) getAccountData();
  }, [user, account]);

  const replyToTopic = async () => {
    if (!user) return toast.error("You need to be logged in!");
    if (thread.status !== "open" && thread.status !== "reviewing")
      return toast.error("You can't reply to a closed topic!");

    const suspended = account!.suspended ?? false;
    if (suspended)
      return toast.error(
        "You're permanentely suspended from posting for breaking the TOS."
      );

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
        name: account!.name ?? "Unknown",
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
    if (!user || (account && !account!.admin))
      return toast.error("You're not an administrator!");

    try {
      setIsSubmitting(true);
      await updateThread(threadID, { status: newStatus });

      const newComment = {
        author: {
          id: user.uid,
          name: account!.name ?? "Unknown",
          email: user.email,
        },
        text:
          "marked this topic as " +
          newStatus +
          " on " +
          moment(new Date()).format("MMM DD[,] YYYY [at] hh:mmA") +
          ".",
        special: true,
        date: new Date().toLocaleString(),
      };

      try {
        await updateThread(threadID, {
          comments: arrayUnion(newComment),
        });
      } catch (error) {
        console.log(error);
        toast.error("An error occured while posting reply!");
      }

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
    if (account && !account.admin)
      return toast.error("You're not an administrator!");

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
                  <div className="flex flex-row gap-1">
                    {comment.special ? (
                      <div className="text-sm flex gap-1">
                        <strong>@{comment.author.name}</strong>
                        <div>{comment.text}</div>
                      </div>
                    ) : (
                      <strong>@{comment.author.name}</strong>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 flex flex-row items-center gap-1">
                    {!comment.special && (
                      <>
                        <FaClock /> {comment.date}
                      </>
                    )}
                    {account && account!.admin && (
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
                {!comment.special && <div>{comment.text}</div>}
              </div>
              {index + 1 < thread.comments.length &&
                !(comment.special && thread.comments[index + 1]?.special) && (
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
            {account && account!.admin && (
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
