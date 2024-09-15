import { User } from "firebase/auth";

export function isAdmin(user: User) {
  if (!user) return false;
  return user.uid === "vSHnwyoRtsZOGV6KtlAcJPzcIKB2";
}
