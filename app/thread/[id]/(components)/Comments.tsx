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
            <div className="pb-2">
              <div key={index} className="bg-base-300 p-2 rounded-md">
                <div className="flex flex-row items-center gap-1 justify-between">
                  <strong>@{comment.author.name}</strong>
                  <div className="text-xs text-gray-500 flex flex-row items-center gap-1">
                    <FaClock /> {comment.date}
                  </div>
                </div>
                <div>{comment.text}</div>
              </div>
            </div>
          ))}
        <div className="pt-4 flex flex-col items-start justify-start gap-2">
          <textarea
            className="
                textarea
                textarea-bordered
                textarea-md
                w-full
                h-[10vh]"
            placeholder="Reply to this topic..."
            onChange={(e) => setReply(e.target.value)}
            value={reply}
            disabled={!user}
          />
          <button
            className="btn btn-outline btn-sm"
            disabled={isSubmitting || !user}
            onClick={replyToTopic}
          >
            {isSubmitting ? "Posting..." : "Post your reply"}
          </button>
        </div>
      </section>
    </section>
  );
}
