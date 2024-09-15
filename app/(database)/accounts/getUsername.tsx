import { User } from "firebase/auth";

export function getUsername(user: User) {
  return user.email?.split("@")[0]; //Temporary
}
