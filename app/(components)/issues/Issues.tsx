"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";

import { Thread } from "@/app/(types)/Topics";
import { severityRank } from "@/app/(types)/Severities";
import { statusRank } from "@/app/(types)/Statuses";
import { getThreads } from "@/app/(database)/getThreads";

import Error from "../Error";

import Badge from "./subcomponents/Badge";

import { FaHeading, FaPlus, FaTags, FaUser } from "react-icons/fa";
import IssuesSkeleton from "./subcomponents/Skeleton";

export default function Issues() {
  const ITEMS_PER_PAGE = 10;

  const [data, setData] = useState<Thread[]>([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(false),
    [page, setPage] = useState(1);

  const displayData = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [data, page]);

  const handleNavigation = useCallback(
    (increment: boolean) => {
      setPage((prevPage) => {
        const newPage = increment ? prevPage + 1 : prevPage - 1;
        return Math.max(
          1,
          Math.min(newPage, Math.ceil(data.length / ITEMS_PER_PAGE))
        );
      });
    },
    [data]
  );

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const issuesData: Thread[] = await getThreads();
        issuesData.sort((a, b) => {
          if (statusRank[a.status] !== statusRank[b.status]) {
            return statusRank[a.status] - statusRank[b.status];
          }
          return severityRank[a.severity] - severityRank[b.severity];
        });

        setData(issuesData);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="w-full bg-base-200 px-4 py-2 rounded-md">
        <IssuesSkeleton />
      </div>
    );
  if (error)
    return (
      <div className="w-full bg-base-200 px-4 py-2 rounded-md">
        <Error />
      </div>
    );

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const displayedCount = Math.min(data.length, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <section className="w-full bg-base-200 px-4 py-2 rounded-md">
        <div className="flex flex-row justify-between items-center gap-2 pb-2">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
            <div className="text-md text-black dark:text-white font-semibold tracking-wider">
              THREADS
            </div>
            <div className="text-xs">
              Displaying {startIndex + 1} - {displayedCount} out of{" "}
              {data.length} total topics. Showing {ITEMS_PER_PAGE} items per
              page.
            </div>
          </div>

          <Link
            className="btn btn-sm btn-primary rounded-md text-content-base"
            href="/thread/new"
          >
            <FaPlus /> Create a new thread
          </Link>
        </div>
        <section>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <p className="inline-flex items-center gap-1">
                      <FaHeading /> Title
                    </p>
                  </th>
                  <th>
                    <p className="inline-flex items-center gap-1">
                      <FaUser /> Author
                    </p>
                  </th>
                  <th>
                    <p className="inline-flex items-center gap-1">
                      <FaTags /> Tags
                    </p>
                  </th>
                </tr>
              </thead>
              {data.length === 0 ? (
                <div className="text-sm py-2 px-4">
                  No entries found in the database.
                </div>
              ) : (
                <tbody>
                  {displayData.map((issue: Thread) => (
                    <IssueRow key={issue.id} issue={issue} />
                  ))}
                </tbody>
              )}
            </table>
          </div>
          {data.length > ITEMS_PER_PAGE && (
            <div className="join flex flex-row justify-center items-center pt-2">
              <button
                className="join-item btn btn-sm btn-square btn-neutral"
                onClick={() => handleNavigation(false)}
                disabled={page === 1}
              >
                «
              </button>
              <button className="join-item btn btn-sm btn-square btn-neutral">
                {page}
              </button>
              <button
                className="join-item btn btn-sm btn-square btn-neutral"
                onClick={() => handleNavigation(true)}
                disabled={page * ITEMS_PER_PAGE >= data.length}
              >
                »
              </button>
            </div>
          )}
        </section>
        <div className="divider m-0" />
      </section>
    </>
  );
}

function IssueRow({ issue }: { issue: Thread }) {
  return (
    <tr>
      <td>
        <Link
          href={"/thread/" + issue.id}
          className="hover:text-base-content/80 text-ellipsis overflow-hidden max-w-xs"
        >
          {issue.title.length > 48
            ? `${issue.title.substring(0, 48)}...`
            : issue.title}
        </Link>
      </td>
      <td>
        <div>@{issue.author.name}</div>
      </td>
      <td>
        <div className="flex flex-row items-center gap-1">
          <Badge type={"severity"} level={issue.severity} />
          <Badge type={"status"} level={issue.status} />
        </div>
      </td>
    </tr>
  );
}
