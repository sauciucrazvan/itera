"use client";
import Loading from "../../Loading";
import Error from "../../Error";
import { useEffect, useState, useMemo, useCallback } from "react";
import { severityRank } from "@/app/(types)/Severities";
import { statusRank } from "@/app/(types)/Statuses";
import { getThreads } from "@/app/(database)/getThreads";
import { Thread } from "@/app/(types)/Topics";
import Badge from "./Badge";
import Link from "next/link";

export default function IssuesBody() {
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

  if (loading) return <Loading />;
  if (error) return <Error />;

  if (data.length === 0) {
    return (
      <div className="text-sm py-4 px-2">No entries found in the database.</div>
    );
  }

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const displayedCount = Math.min(data.length, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <section>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((issue: Thread) => (
                <IssueRow key={issue.id} issue={issue} />
              ))}
            </tbody>
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
      <div className="text-xs pt-4">
        Displaying {startIndex + 1} - {displayedCount} out of {data.length}{" "}
        total topics. Showing {ITEMS_PER_PAGE} items per page.
      </div>
      <div className="divider m-0" />
    </>
  );
}

function IssueRow({ issue }: { issue: Thread }) {
  return (
    <tr>
      <td>
        <Link
          href={"/thread/" + issue.id}
          className="hover:text-base-content/80"
        >
          {issue.title}
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
