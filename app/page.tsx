import Dashboard from "@/app/(root)/Dashboard";
import { Suspense } from "react";
import Loading from "./(components)/helpers/Loading";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}
