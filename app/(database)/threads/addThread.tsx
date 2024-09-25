import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/(database)/firebase";
import { Severity } from "@/app/thread/(components)/types/Severities";
import { getUsername } from "../accounts/getUsername";
import { User } from "@firebase/auth";
import { Category } from "@/app/thread/(components)/types/Categories";

export async function insertThread(
  title: string,
  description: string,
  category: Category,
  attachments: string,
  severity: Severity,
  user: User
) {
  await addDoc(collection(db, "threads"), {
    title: title,
    description: description,
    attachments: attachments,
    category: category,
    severity: severity,
    status: "open",
    author: { id: user?.uid, name: getUsername(user) },
    creationDate: new Date().toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }),
  });
}
