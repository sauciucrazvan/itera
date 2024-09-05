"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ViewIssue() {
  const { id } = useParams();

  return (
    <>
      <section className="py-2 px-4">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">Issues</Link>
            </li>
            <li>Viewing Thread</li>
          </ul>
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <section className="artboard bg-base-200 px-4 py-2 rounded-md lg:w-[60vw]">
            <h1 className="font-bold text-lg">Thread #{id}</h1>
            <div className="divider m-0" />
            <section className="pt-2">
              <h1>Title</h1>
            </section>
            <section className="py-2">
              <h1>Content (Description, author and creation date)</h1>
            </section>
          </section>
          <section className="artboard bg-base-200 px-4 py-2 rounded-md">
            <h1 className="font-bold text-lg">Comments</h1>
            <div className="divider m-0" />
            <section className="pt-2">
              <h1>Title</h1>
            </section>
          </section>
        </div>
      </section>
    </>
  );
}
