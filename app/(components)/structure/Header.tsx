"use client";
import { auth } from "@/app/firebase";
import { configuration } from "../../configuration";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

import { useAuthState } from "react-firebase-hooks/auth";

import Profile from "../dashboard/Profile";
import ThemeSelector from "./ThemeSelector";

export default function Header() {
  const [user, loading] = useAuthState(auth);

  const logout = () => {
    auth.signOut();
    toast.success("Succesfully logged out!");
  };

  return (
    <>
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <Link
            href="/"
            className="flex-0 btn btn-ghost gap-1 px-2 md:gap-2 font-bold shadow-none"
          >
            <Image
              src="/favicon.svg"
              width={24}
              height={24}
              alt={configuration.name}
            />{" "}
            {configuration.name}
          </Link>
        </div>
        <div className="navbar-end flex pr-4 gap-4">
          {!user ? (
            <Link className="btn btn-ghost btn-sm" href="/login">
              Login
            </Link>
          ) : (
            <button className="btn btn-ghost btn-sm" onClick={() => logout()}>
              Logout
            </button>
          )}
          <ThemeSelector />
        </div>
      </div>
    </>
  );
}
