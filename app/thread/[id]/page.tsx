import Link from "next/link";
import { notFound } from "next/navigation";

import Badge from "@/app/(root)/threads/subcomponents/Badge";
import AdminPanel from "@/app/thread/(components)/Panel";
import Comments from "./(components)/Comments";

import { getThread } from "@/app/(database)/threads/getThread";

import {
  FaCalendar,
  FaGripHorizontal,
  FaImage,
  FaQuoteRight,
} from "react-icons/fa";
import UserInfo from "./(components)/UserInfo";

export default async function ViewIssue({
  params: { id },
}: {
  params: { id: string };
}) {
  const threadData = await getThread(id);
  if (threadData == null) return notFound();

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
        <div className="flex flex-col lg:flex-row lg:items-start gap-2">
          <div className="flex flex-col gap-2">
            <section className="artboard bg-base-200 rounded-md lg:w-[60vw] lg:max-w-xl">
              <h1 className="font-bold text-lg bg-base-300 rounded-t-md px-4 py-2 text-ellipsis overflow-hidden">
                {threadData.title}
              </h1>
              <section className="flex flex-col gap-1 px-4 py-2">
                <p className="flex flex-row items-center gap-2">
                  <FaCalendar /> {threadData.creationDate}
                </p>

                <div className="flex flex-row items-center gap-2">
                  <UserInfo
                    name={threadData.author.name}
                    uid={threadData.author.id}
                    email={threadData.author.email}
                  />
                </div>

                <div className="flex flex-row gap-1 items-center py-2">
                  {threadData.properties?.severity &&
                    threadData.category === "Issues" && (
                      <Badge
                        type={"severity"}
                        level={threadData.properties.severity}
                      />
                    )}
                  <Badge type={"status"} level={threadData.status} />
                  <div className="badge badge-neutral bg-neutral/20 text-base-content rounded-md flex flex-row gap-1 items-center text-nowrap">
                    <FaGripHorizontal /> {threadData.category}
                  </div>
                </div>

                {threadData.properties?.hidden && (
                  <div className="badge badge-error bg-error/20 text-error">
                    This topic has been hidden by an administrator.
                  </div>
                )}
              </section>
              <div className="divider m-0" />
              {threadData.category === "Feedback" &&
                threadData.properties?.rating && (
                  <section className="px-4 py-2">
                    <div className="rating rating-md">
                      {Array.from({ length: 5 }, (_, index) => (
                        <input
                          key={index}
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                          value={index + 1}
                          checked={threadData.properties.rating === index + 1}
                          disabled
                        />
                      ))}
                    </div>
                  </section>
                )}
              <section className="px-4 py-2">
                <div className="flex flex-row items-center gap-1 font-bold">
                  <FaQuoteRight /> Details
                </div>
                <div className="bg-base-300 px-2 py-1 rounded-md text-ellipsis overflow-hidden">
                  {threadData.description}
                </div>
              </section>
              {threadData.attachments && (
                <section className="px-4 py-2">
                  <div className="flex flex-row items-center gap-1 font-bold">
                    <FaImage /> Attachments
                  </div>
                  <div className="bg-base-300 px-2 py-1 rounded-md">
                    {threadData.attachments}
                  </div>
                </section>
              )}
            </section>

            <section className="artboard bg-base-200 rounded-md">
              <AdminPanel id={id} data={threadData} />
            </section>
          </div>

          <Comments threadID={id} thread={threadData} />
        </div>
      </section>
    </>
  );
}
