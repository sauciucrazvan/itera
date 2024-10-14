import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function checkUsername(name: string) {
  const username = (await getDoc(doc(db, "usernames", name))).data();
  return username != null;
}
