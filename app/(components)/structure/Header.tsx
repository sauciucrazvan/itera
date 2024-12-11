"use client";
import { auth } from "@/app/(database)/firebase";

import Link from "next/link";
import Image from "next/image";

import { useAuthState } from "react-firebase-hooks/auth";

import ThemeSelector from "./ThemeSelector";
import { MdArrowDropDown } from "react-icons/md";
import { FaBars, FaWrench } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaShield } from "react-icons/fa6";
import { getAccount } from "@/app/(database)/accounts/getAccount";
import { DocumentData } from "firebase/firestore";

const configuration = require("../../configuration");

export default function Header() {
  const [user, loading] = useAuthState(auth),
    [account, setAccount] = useState<DocumentData | undefined>(undefined),
    [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const getAccountData = async () => {
      try {
        const acc = await getAccount(user!);
        setAccount(acc);
      } catch (error) {
        console.log(error);
        toast.error("An error occured!");
      }
    };

    if (user != null) getAccountData();
  }, [user, account]);

  if (!mounted)
    return (
      <>
        <div className="navbar bg-base-200 justify-end pr-6">
          <div className="loading loading-spinner loading-sm" />
        </div>
      </>
    );

  const logout = () => {
    auth.signOut();
    toast.success("Succesfully logged out!");
  };

  return (
    <>
      <div className="navbar bg-base-200">
        <div className="navbar-start gap-2">
          <Link
            href="/"
            className="flex-0 btn btn-ghost gap-1 px-2 md:gap-2 font-bold shadow-none"
          >
            <Image
              src="/favicon.svg"
              width={24}
              height={24}
              alt={configuration.name}
              className="text-primary"
            />{" "}
            {configuration.name}
          </Link>
          {!configuration.production && (
            <div className="badge bg-primary/30 rounded-md text-primary font-semibold gap-2">
              <FaWrench /> TESTING
            </div>
          )}
          {account && account.admin && (
            <Link
              href="/admin"
              className="badge bg-error/30 rounded-md text-error font-semibold gap-2"
            >
              <FaShield /> ADMIN
            </Link>
          )}
        </div>
        <div className="navbar-end hidden md:flex pr-4 gap-4">
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
                    className="btn btn-ghost btn-sm rounded-btn bg-base-100"
                  >
                    {account &&
                      (account.name == "" ? (
                        <div className="loading loading-spinner loading-sm" />
                      ) : (
                        "@" + account.name
                      ))}
                    <MdArrowDropDown size="24" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content bg-base-300 rounded-box z-[1] mt-4 px-4 py-2 shadow"
                  >
                    <li>
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
                  <li className="font-bold py-4">
                    {account &&
                      (account.name == "" ? (
                        <div className="loading loading-spinner loading-sm" />
                      ) : (
                        "@" + account.name
                      ))}
                  </li>
                  <li>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => logout()}
                    >
                      Log out
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
