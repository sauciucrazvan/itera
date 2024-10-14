"use client";
import { isAdmin } from "@/app/(database)/accounts/isAdmin";
import { auth } from "@/app/(database)/firebase";
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

  if (loading)
    return (
      <>
        <FaUser /> {name}
      </>
    );

  return (
    <div className="flex flex-row items-center justify-start gap-2">
      <FaUser /> {name}
      {isAdmin(user!) && (
        <>
          <div className="dropdown dropdown-right">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-xs rounded-btn"
            >
              <MdArrowDropDown size="24" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-300 rounded-box z-[1] mt-4 px-4 py-2 shadow"
            >
              <div className="flex flex-row gap-1 justify-start items-center">
                <FaEnvelope className="text-red-500" /> {email ?? "Invalid"}
              </div>
              <div className="flex flex-row gap-1 justify-start items-center">
                <FaIdBadge className="text-red-500" /> {uid ?? "Invalid"}
              </div>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
