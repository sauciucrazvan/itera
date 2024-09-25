/*
    Gateway is a component that checks if the user is logged in and returns the page,
    otherwise it will redirect to the login page.

    - RS
*/

"use client";
import { auth } from "@/app/(database)/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Loading from "../helpers/Loading";

interface GatewayProps {
  children: ReactNode;
}

export default function Gateway({ children }: GatewayProps) {
  const [mounted, setMounted] = useState(false);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && mounted && !user) {
      toast.error("You need to be logged in!");
      router.push("/login");
    }
  }, [loading, mounted, user]);

  if (loading || !mounted) return <Loading />;
  if (!user)
    return (
      <section className="p-4">
        <div className="alert alert-error">You need to be logged in!</div>
      </section>
    );
  return <>{user && children}</>;
}
