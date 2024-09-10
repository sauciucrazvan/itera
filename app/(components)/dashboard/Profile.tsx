"use client";

import { auth } from "@/app/firebase";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Profile() {
  const [user] = useAuthState(auth);

  return (
    <>
      {user && (
        <section className="flex flex-row justify-center items-center gap-2">
          <div>
            <Image
              className="avatar rounded-full"
              src={user?.photoURL!}
              alt={user.displayName!}
              width={24}
              height={24}
            ></Image>
          </div>
          <div>{user.displayName}</div>
        </section>
      )}
    </>
  );
}
