"use client";
import { useParams } from "next/navigation";

export default function ViewIssue() {
  const { id } = useParams();

  return (
    <>
      <div>Viewing issue #{id}</div>
    </>
  );
}
