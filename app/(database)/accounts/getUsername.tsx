import { User } from "firebase/auth";
import { getAccount } from "./getAccount";

export async function getUsername(user: User) {
  try {
    const account = await getAccount(user!);
    return account!.name;
  } catch (error) {
    console.log(error);
    return user.email;
  }
}
