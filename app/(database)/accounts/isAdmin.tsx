import { User } from "firebase/auth";
import { getAccount } from "./getAccount";

export async function isAdmin(user: User) {
  if (!user) return false;

  const account: any = await getAccount(user);
  console.log(account);
  return account.admin ?? false;
}
