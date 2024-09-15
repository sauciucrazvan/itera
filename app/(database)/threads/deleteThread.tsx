import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase";

export async function deleteThread(thread: string) {
  return await deleteDoc(doc(db, "threads", thread));
}
