"use client";
import { FaGoogle } from "react-icons/fa6";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../(database)/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import Loading from "../(components)/helpers/Loading";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { configuration } from "../configuration";
import { toast } from "sonner";
import { getUsername } from "../(database)/accounts/getUsername";
import { getAccount } from "../(database)/accounts/getAccount";

export default function Login() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return null;
  }

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider),
        account = await getAccount(result.user);

      if (account != null) {
        router.push("/");
        toast.success("Welcome, @" + (await getUsername(result.user)) + "!");
      } else {
        router.push("/login/choose_name");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured during login.");
    }
  };

  return (
    <>
      <section className="py-2 px-4">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Login</li>
          </ul>
        </div>
        <section className="flex flex-row justify-center items-center p-4">
          <div className="artboard bg-base-200 w-fit p-8 rounded-lg flex flex-col justify-center items-center gap-1">
            <div className="text-base font-bold">Login into your account</div>
            <p className="text-sm">
              Please use one of the providers below to log in.
            </p>
            <div className="w-[20vw]">
              <div className="divider" />
            </div>
            <button className="btn btn-outline" onClick={signIn}>
              <FaGoogle /> Login with Google
            </button>
            <div className="w-[20vw]">
              <div className="divider" />
            </div>
            <p className="text-xs w-[50vw] text-center">
              {configuration.name} does not collect your data. We only use these
              platforms for authentication.
            </p>
          </div>
        </section>
      </section>
    </>
  );
}
