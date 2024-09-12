"use client";

import { auth } from "@/app/firebase";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaAt } from "react-icons/fa6";

export default function Profile() {
  const [user] = useAuthState(auth);

  return (
    <>
      {user && (
        <section className="flex flex-row justify-center items-center gap-0.5">
          <div>@{user.email?.split("@")[0]}</div>
        </section>
      )}
    </>
  );
}
