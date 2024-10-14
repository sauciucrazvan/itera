import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function insertAccount(user: User, name: string) {
  await setDoc(doc(db, "usernames", name), { ownedBy: user.uid });
  await setDoc(doc(db, "accounts", user.uid), { name });

  return;
}
