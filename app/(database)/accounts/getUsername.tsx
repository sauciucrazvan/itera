import { User } from "firebase/auth";
import { getAccount } from "./getAccount";

export function getUsername(user: User) {
  try {
    //const account = await getAccount(user!);
    //return account!.name;
  } catch (error) {}
  return user.email;
}
