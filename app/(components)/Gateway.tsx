/*
    Gateway is a component that checks if the user is logged in and returns the page,
    otherwise it will redirect to the login page.

    - RS
*/

"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

interface GatewayProps {
  children: ReactNode;
}

export default function Gateway({ children }: GatewayProps) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    router.push("/login");
    return (
      <div className="p-4">
        <div className="alert alert-error">You need to be logged in!</div>
      </div>
    );
  }

  return <>{user && children}</>;
}
