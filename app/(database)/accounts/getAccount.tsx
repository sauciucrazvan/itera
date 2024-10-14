import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function getAccount(user: User) {
  const account = (await getDoc(doc(db, "accounts", user.uid))).data();

  return account;
}
