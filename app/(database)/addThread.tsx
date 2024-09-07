import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { Severity } from "../(types)/Severities";

export async function insertThread(
  title: string,
  description: string,
  severity: Severity
) {
  await addDoc(collection(db, "threads"), {
    title: title,
    description: description,
    severity: severity,
    status: "open",
    creationDate: new Date().toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }),
  });
}
