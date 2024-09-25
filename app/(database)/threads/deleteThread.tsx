import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/app/(database)/firebase";

export async function deleteThread(thread: string) {
  return await deleteDoc(doc(db, "threads", thread));
}
