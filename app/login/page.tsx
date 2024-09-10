"use client";
import { FaGoogle } from "react-icons/fa6";
import Link from "next/link";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../(components)/Loading";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    router.push("/");
    return <Loading />;
  }

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
      toast.error("An error occured.");
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
        <section className="flex flex-col justify-center items-center gap-1">
          <div className="text-base font-bold">Login into your account</div>
          <div className="text-sm">Please use one of the providers below</div>
          <div className="w-[20vw]">
            <div className="divider" />
          </div>
          <button className="btn btn-outline" onClick={signIn}>
            <FaGoogle /> Login with Google
          </button>
        </section>
      </section>
    </>
  );
}
