"use client";
import { FaBarsStaggered, FaBug } from "react-icons/fa6";
import { configuration } from "../../configuration";
import ThemeSelector from "./ThemeSelector";
import Link from "next/link";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import Greeter from "../dashboard/Profile";
import Profile from "../dashboard/Profile";
import toast from "react-hot-toast";

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
          <div className="dropdown pr-2">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <FaBarsStaggered />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Profile />
              </li>
              <li>
                {user ? (
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                ) : (
                  <Link className="btn btn-sm btn-ghost" href="/login">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
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
        <div className="navbar-end flex pr-4 lg:hidden">
          <ThemeSelector />
        </div>
        <div className="navbar-end hidden lg:flex">
          {loading ? (
            <div className="px-4 py-2">
              <span className="loading loading-spinner loading-md gap-1" />
            </div>
          ) : (
            <ul className="menu menu-horizontal px-1 gap-1">
              <li>
                {user ? (
                  <details>
                    <summary>
                      <Profile />
                    </summary>
                    <ul className="bg-base-300">
                      <li>
                        <button onClick={() => logout()}>Logout</button>
                      </li>
                    </ul>
                  </details>
                ) : (
                  <Link href="/login">Login</Link>
                )}
              </li>
              <li>
                <ThemeSelector />
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
