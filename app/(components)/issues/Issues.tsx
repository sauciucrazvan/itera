"use client";

import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import Badge from "./subcomponents/Badge";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useEffect, useState } from "react";

// const issues = [
//   {
//     id: 9,
//     title: "user account deleted for no reason",
//     status: "open",
//     severity: "critical",
//   },
//   {
//     id: 8,
//     title: "Placeholder data on the dashboard page",
//     status: "open",
//     severity: "minor",
//   },
//   {
//     id: 7,
//     title: "header buttons no workie",
//     status: "open",
//     severity: "medium",
//   },
//   {
//     id: 3,
//     title: "New issue button does nothing",
//     status: "open",
//     severity: "major",
//   },
//   {
//     id: 5,
//     title: "Responsiveness bug",
//     status: "reviewing",
//     severity: "minor",
//   },
//   { id: 2, title: "Padding issue", status: "reviewing", severity: "minor" },
//   { id: 6, title: "Broken UI component", status: "closed", severity: "major" },
//   { id: 4, title: "Wrong redirect", status: "closed", severity: "medium" },
//   {
//     id: 1,
//     title: "Data not available",
//     status: "closed",
//     severity: "critical",
//   },
// ];

interface IssueThread {
  id: number;
  title: string;
  status: string;
  severity: string;
}

export default function Issues(props: any) {
  const [data, setData] = useState<IssueThread[]>([]);
  const [loading, setLoading] = useState(true);

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
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading issues...</p>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <p>No issues found</p>;
  }

  return (
    <>
      <section className="artboard bg-base-200 px-4 py-2 rounded-md">
        <div className="flex flex-row justify-between items-center gap-2 ">
          <h1>Issues</h1>

          <Link
            className="btn btn-sm btn-outline text-content-base"
            href="/thread/new"
          >
            <FaPlus /> Create an issue thread
          </Link>
        </div>
        <div className="divider m-0" />
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
