import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Severity } from "../(types)/Severities";
import { useAuthState } from "react-firebase-hooks/auth";

export async function insertThread(
  title: string,
  description: string,
  severity: Severity,
  user: any
) {
  //const [user] = useAuthState(auth);

  await addDoc(collection(db, "threads"), {
    title: title,
    description: description,
    severity: severity,
    status: "open",
    author: { id: user?.uid, name: user?.email.split("@")[0] },
    creationDate: new Date().toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }),
  });
}
