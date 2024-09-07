"use client";
import Link from "next/link";
import Badge from "./Badge";

import { db } from "@/app/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FaExclamationTriangle } from "react-icons/fa";

interface IssueThread {
  id: number;
  title: string;
  status: string;
  severity: string;
}

export default function IssuesBody() {
  const [data, setData] = useState<IssueThread[]>([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "threads"));
        const issuesData: IssueThread[] = [];
        querySnapshot.forEach((doc) => {
          const issueData = doc.data();
          issuesData.push({
            id: parseInt(doc.id, 10),
            title: issueData.title,
            status: issueData.status,
            severity: issueData.severity,
          });
        });
        setData(issuesData);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="flex flex-row justify-center items-center py-8">
        <span className="loading loading-dots loading-md" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col justify-center items-center gap-1 py-8 text-sm">
        <FaExclamationTriangle color="red" size="32" />
        An error occured. Please contact the system administrator.
      </section>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-sm py-4 px-2">No entries found in the database.</div>
    );
  }

  return (
    <>
      <section>
        <div className="overflow-x-auto">
          <table className="table table-zebra-zebra">
            <thead>
              <tr>
                <th className="hidden lg:block">ID</th>
                <th>Title</th>
                <th>Severity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((issue: IssueThread) => (
                <tr key={issue.id}>
                  <th className="hidden lg:block">{issue.id}</th>
                  <td>
                    {" "}
                    <Link
                      href={"/thread/" + issue.id}
                      className="hover:text-base-content/80"
                    >
                      {issue.title}
                    </Link>
                  </td>
                  <td>
                    <Badge type={"severity"} level={issue.severity} />
                  </td>
                  <td>
                    <Badge type={"status"} level={issue.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="join flex flex-row justify-center items-center pt-2">
          <button className="join-item btn btn-sm btn-square btn-secondary">
            «
          </button>
          <button className="join-item btn btn-sm btn-square btn-secondary">
            1
          </button>
          <button className="join-item btn btn-sm btn-square btn-secondary">
            »
          </button>
        </div>
      </section>
    </>
  );
}
