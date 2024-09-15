import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function deleteThread(thread: string) {
  return await deleteDoc(doc(db, "threads", thread));
}
