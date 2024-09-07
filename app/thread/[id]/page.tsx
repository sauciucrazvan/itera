import Link from "next/link";
import { db } from "@/app/firebase";
import { getDoc, doc } from "firebase/firestore";

export default async function ViewIssue({
  params: { id },
}: {
  params: { id: string };
}) {
  const threadDoc = await getDoc(doc(db, "threads", id));

  if (!threadDoc.exists()) {
    return { notFound: true };
  }

  const threadData = threadDoc.data();

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
            <h1 className="font-bold text-lg">Thread [ID: {id}]</h1>
            <div className="divider m-0" />
            <section className="pt-2">
              <h1>{threadData.title}</h1>
            </section>
            <section className="py-2">
              <h1>content</h1>
              <p>Author</p>
              <p>Creation Date</p>
            </section>
          </section>
          <section className="artboard bg-base-200 px-4 py-2 rounded-md">
            <h1 className="font-bold text-lg">Comments</h1>
            <div className="divider m-0" />
            <section className="pt-2">
              <h1>Comments Section</h1>
            </section>
          </section>
        </div>
      </section>
    </>
  );
}
