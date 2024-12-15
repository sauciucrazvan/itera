"use client";
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
    domLoaded && (
      <div className="flex flex-row items-center justify-start gap-2">
        <FaUser /> @{name}
      </div>
    )
  );
}
