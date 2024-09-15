import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

export async function updateThread(thread: string, values: {}) {
  if (!thread || !values) {
    throw new Error("Thread ID is undefined or invalid");
  }

  const threadRef = doc(db, "threads", thread);
  return await updateDoc(threadRef, values);
}
