"use client";
import { auth } from "@/app/firebase";
import { configuration } from "../../configuration";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

import { useAuthState } from "react-firebase-hooks/auth";

import ThemeSelector from "./ThemeSelector";
import { MdArrowDropDown } from "react-icons/md";
import { FaBars } from "react-icons/fa";

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
        <div className="navbar-end  hidden md:flex pr-4 gap-4">
          {loading ? (
            <div className="loading loading-spinner loading-sm" />
          ) : (
            <>
              {!user ? (
                <Link className="btn btn-ghost btn-sm" href="/login">
                  Login
                </Link>
              ) : (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost rounded-btn bg-base-100"
                  >
                    @{user.email?.split("@")[0]} <MdArrowDropDown size="24" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content bg-base-300 rounded-box z-[1] mt-4 px-4 py-2  shadow"
                  >
                    <li>
                      {" "}
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => logout()}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
              <ThemeSelector />
            </>
          )}
        </div>
        <div className="navbar-end flex md:hidden pr-4">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost rounded-btn"
            >
              <FaBars size="24" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-300 rounded-box z-[1] mt-4 px-4 py-2  shadow"
            >
              {user ? (
                <>
                  <li className="font-bold p-4">
                    @{user!.email?.split("@")[0]}
                  </li>
                  <li>
                    {" "}
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => logout()}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <Link className="btn btn-ghost btn-sm" href="/login">
                  Login
                </Link>
              )}
            </ul>
          </div>
          <ThemeSelector />
        </div>
      </div>
    </>
  );
}
