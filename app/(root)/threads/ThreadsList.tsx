"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";

import { Thread } from "@/app/thread/(components)/types/Topics";
import { severityRank } from "@/app/thread/(components)/types/Severities";
import { Status, statusRank } from "@/app/thread/(components)/types/Statuses";
import { getThreads } from "@/app/(database)/threads/getThreads";

import Error from "@/app/(components)/helpers/Error";
import Badge from "@/app/(root)/threads/subcomponents/Badge";

import { FaGripHorizontal, FaHeading, FaTags, FaUser } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/(database)/firebase";
import { Category } from "@/app/thread/(components)/types/Categories";
import { DocumentData } from "firebase/firestore";
import { getAccount } from "@/app/(database)/accounts/getAccount";
import { toast } from "sonner";

interface ThreadsListProps {
  category: Category | null;
  status: Status | null;
}
export default function ThreadsList({ category, status }: ThreadsListProps) {
  const ITEMS_PER_PAGE = 10;

  const [data, setData] = useState<Thread[]>([]),
    [account, setAccount] = useState<DocumentData | undefined>(undefined),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(false),
    [page, setPage] = useState(1),
    [user, userLoading] = useAuthState(auth);

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
    const getAccountData = async () => {
      try {
        const acc = await getAccount(user!);
        setAccount(acc);
      } catch (error) {
        console.log(error);
        toast.error("An error occured!");
      }
    };

    if (user != null) getAccountData();
  }, [user]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const issuesData: Thread[] = await getThreads(
          category === null ? undefined : category,
          status === null ? undefined : status,
          account && account.admin
        );
        issuesData.sort((a, b) => {
          if (statusRank[a.status] !== statusRank[b.status])
            return statusRank[a.status] - statusRank[b.status];

          if (a.properties?.severity && b.properties?.severity)
            return (
              severityRank[a.properties.severity ?? "minor"] -
              severityRank[b.properties.severity ?? "minor"]
            );

          return 0;
        });

        setData(issuesData);
        setPage(1);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user, category, status]);

  if (loading || userLoading)
    return (
      <div className="w-full bg-base-200 px-4 py-2 rounded-md">
        <div className="skeleton w-full h-64" />
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
      <section>
        <div className="overflow-x-auto">
          {data.length === 0 ? (
            <div className="text-sm py-2 px-4">
              No entries found in the database that match the input criteria.
            </div>
          ) : (
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
                  {category === null && (
                    <th>
                      <p className="inline-flex items-center gap-1">
                        <FaGripHorizontal /> Category
                      </p>
                    </th>
                  )}
                  <th>
                    <p className="inline-flex items-center gap-1">
                      <FaTags /> Tags
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((issue: Thread) => (
                  <IssueRow
                    key={issue.id}
                    issue={issue}
                    showCategories={category === null}
                  />
                ))}
              </tbody>
            </table>
          )}
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
      <div className="text-xs p-2">
        Displaying {startIndex + 1} - {displayedCount} out of {data.length}{" "}
        total topics. Showing {ITEMS_PER_PAGE} items per page.
      </div>
    </>
  );
}

function IssueRow({
  issue,
  showCategories,
}: {
  issue: Thread;
  showCategories: boolean;
}) {
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
      {showCategories && (
        <td>
          <div className="badge badge-neutral bg-neutral/20 text-base-content rounded-md flex flex-row gap-1 items-center text-nowrap">
            <FaGripHorizontal /> {issue.category}
          </div>
        </td>
      )}
      <td>
        <div className="flex flex-row items-center gap-1">
          {issue.properties.hidden && (
            <div className="badge badge-error bg-error/20 text-error rounded-md">
              hidden
            </div>
          )}
          {issue.properties?.severity && issue.category === "Issues" && (
            <Badge type={"severity"} level={issue.properties.severity} />
          )}
          <Badge type={"status"} level={issue.status} />
        </div>
      </td>
    </tr>
  );
}
