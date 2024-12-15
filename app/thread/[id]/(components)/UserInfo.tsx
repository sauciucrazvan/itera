"use client";
import Profile from "@/app/(components)/Profile";
import { getAccount } from "@/app/(database)/accounts/getAccount";
import { auth } from "@/app/(database)/firebase";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaUser } from "react-icons/fa";
import { toast } from "sonner";

export default function UserInfo({
  name,
  uid,
  email,
}: {
  name: string;
  uid: string;
  email: string;
}) {
  const [user, loading] = useAuthState(auth),
    [account, setAccount] = useState<DocumentData | undefined>(undefined),
    [modal, showModal] = useState<boolean>(false),
    [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
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
        {account && account.admin && (
          <div>
            <button
              className="btn btn-success btn-xs"
              onClick={() => showModal(!modal)}
            >
              View Profile
            </button>
            <div
              className={"fixed flex items-center justify-center z-50 w-[50%] "}
            >
              {modal && <Profile />}
            </div>
          </div>
        )}
      </div>
    )
  );
}
