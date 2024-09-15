/*
    Gateway is a component that checks if the user is logged in and returns the page,
    otherwise it will redirect to the login page.

    - RS
*/

"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { toast } from "sonner";

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
  if (!user) return null;
  return <>{user && children}</>;
}
