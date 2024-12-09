"use client";
import { isAdmin } from "@/app/(database)/accounts/isAdmin";
import { auth } from "@/app/(database)/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaEnvelope, FaIdBadge, FaUser } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";

export default function UserInfo({
  name,
  uid,
  email,
}: {
  name: string;
  uid: string;
  email: string;
}) {
  const [user, loading] = useAuthState(auth);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (loading)
    return (
      <>
        <FaUser /> @{name}
      </>
    );

  return (
    !loading &&
    domLoaded && ( // hydration issue
      <div className="flex flex-row items-center justify-start gap-2">
        <FaUser /> @{name}
        {isAdmin(user!) && (
          <div className="flex items-center">
            <div className="dropdown dropdown-right flex items-center">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-xs rounded-btn flex items-center justify-center"
                style={{ display: "flex", alignItems: "center" }}
              >
                <MdArrowDropDown size="20" />
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-300 rounded-box z-[1] mt-4 px-4 py-2 shadow"
              >
                <div className="text-primary font-bold">@{name}</div>
                <div className="flex flex-row gap-1 justify-start items-center">
                  <FaEnvelope className="text-primary" /> {email ?? "Invalid"}
                </div>
                <div className="flex flex-row gap-1 justify-start items-center">
                  <FaIdBadge className="text-primary" /> {uid ?? "Invalid"}
                </div>
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  );
}
