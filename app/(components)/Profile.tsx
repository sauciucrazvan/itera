"use client";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaEnvelope, FaIdBadge, FaPaperclip } from "react-icons/fa";
import { auth } from "../(database)/firebase";
import { getAccount } from "../(database)/accounts/getAccount";
import { toast } from "sonner";

const configuration = require("../configuration");

export default function Profile() {
  const [user, loading] = useAuthState(auth),
    [account, setAccount] = useState<DocumentData | undefined>(undefined);

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

  return (
    !loading && (
      <>
        <div className="flex flex-col justify-start items-center w-[50%] bg-primary/20 rounded-md transition-all duration-300">
          <div className="h-[10px] w-[75%] bg-primary rounded-b-3xl"></div>
          <div className="flex flex-col pt-2 items-center gap-1">
            <div className="font-bold text-primary">@username</div>
            <div className="bg-base-content/20 p-2 rounded-md flex flex-row gap-1 items-center">
              <FaPaperclip /> Posts: 0
            </div>
            {account && account.admin && (
              <>
                <div className="bg-error/20 p-2 rounded-md flex flex-row gap-1 items-center">
                  <FaEnvelope /> Email: john@gmail.com
                </div>
                <div className="bg-error/20 p-2 rounded-md flex flex-row gap-1 items-center">
                  <FaIdBadge /> ID: KkMD9ndINafdi!$
                </div>
              </>
            )}
          </div>
          <div className="flex flex-row gap-1 justify-center items-center p-2">
            <Image
              src="/favicon.svg"
              width={32}
              height={32}
              alt={configuration.name}
            />
            <b className="text-primary">{configuration.name}</b>
          </div>
        </div>
      </>
    )
  );
}
