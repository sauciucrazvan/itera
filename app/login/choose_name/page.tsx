"use client";
import Gateway from "@/app/(components)/helpers/Gateway";
import Loading from "@/app/(components)/helpers/Loading";
import { checkUsername } from "@/app/(database)/accounts/checkUsername";
import { getAccount } from "@/app/(database)/accounts/getAccount";
import { insertAccount } from "@/app/(database)/accounts/insertAccount";
import { auth } from "@/app/(database)/firebase";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";

export default function ChooseUsername() {
  const [username, setUsername] = useState<string>(""),
    [loading, setLoading] = useState<boolean>(true),
    [processing, setProcessing] = useState<boolean>(false),
    [account, setAccount] = useState<DocumentData | undefined>(undefined),
    [user, userLoading] = useAuthState(auth),
    router = useRouter();

  const handleUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (processing) return;
      setUsername(e.target.value);
    },
    []
  );

  useEffect(() => {
    const getUserAccount = async () => {
      try {
        setLoading(true);
        if (!userLoading && user != null) setAccount(await getAccount(user!));
      } catch (error) {
        console.log(error);
        toast.error("An error occurred!");
        return;
      } finally {
        setLoading(false);
        if (account !== undefined) {
          router.push("/");
          toast.error("You've already chosen your username!");
        }
      }
    };

    getUserAccount();
  }, [userLoading, account]);

  const setupName = async () => {
    if (user == null) return toast.error("An error occured!");
    if (
      !username.match(
        RegExp("^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")
      )
    )
      return toast.error("The chosen username does not match the criteria.");

    setProcessing(true);

    if (username.length > 3 && username.length < 20) {
      try {
        const exists = await checkUsername(username);

        if (exists) {
          toast.error("Username taken!");
          setProcessing(false);

          return;
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred!");
        setProcessing(false);
        return;
      }
    }

    await insertAccount(user!, username);
    setProcessing(false);
    router.push("/");
    toast.success("Welcome, @" + username + "!");
  };

  if (userLoading || loading || account !== undefined) return <Loading />;

  return (
    <Gateway>
      <section className="py-2 px-4">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Login</li>
            <li>Choose a username</li>
          </ul>
        </div>
        <section className="flex flex-row justify-center items-center p-4">
          <div className="artboard bg-base-200 w-fit p-8 rounded-lg flex flex-col justify-center items-center gap-1">
            <h1>Let's get to setting up your username!</h1>
            <small className="text-wrap md:max-w-[25vw]">
              This is how other users will see you. The username you choose now
              will be permanent!
            </small>
            <section className="pt-4 flex flex-col gap-2">
              <input
                type="text"
                placeholder="Username"
                className="input input-md input-primary w-full max-w-full "
                value={username}
                onChange={handleUsernameChange}
              />
              <button
                className="btn btn-sm btn-primary"
                onClick={setupName}
                disabled={processing}
              >
                Change username
              </button>
            </section>
          </div>
        </section>
      </section>
    </Gateway>
  );
}
