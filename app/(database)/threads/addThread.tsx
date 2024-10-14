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
  user: User,
  severity?: Severity,
  rating?: number
) {
  const threadData: any = {
    title,
    description,
    attachments,
    category,
    status: "open",
    author: {
      id: user?.uid,
      name: await getUsername(user),
      email: user?.email,
    },
    creationDate: new Date().toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }),
    properties: {
      hidden: false,
      severity: severity ?? null,
      rating: rating ?? null,
    },
  };

  return await addDoc(collection(db, "threads"), threadData);
}
