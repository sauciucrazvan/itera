import Link from "next/link";
import StatusBadge from "./StatusBadge";
import { FaPlus } from "react-icons/fa6";

const issues = [
  {
    id: 9,
    title: "user account deleted for no reason",
    status: "open",
    severity: "critical",
  },
  {
    id: 8,
    title: "Placeholder data on the dashboard page",
    status: "open",
    severity: "minor",
  },
  {
    id: 7,
    title: "header buttons no workie",
    status: "open",
    severity: "medium",
  },
  {
    id: 3,
    title: "New issue button does nothing",
    status: "open",
    severity: "major",
  },
  {
    id: 5,
    title: "Responsiveness bug",
    status: "reviewing",
    severity: "minor",
  },
  { id: 2, title: "Padding issue", status: "reviewing", severity: "minor" },
  { id: 6, title: "Broken UI component", status: "closed", severity: "major" },
  { id: 4, title: "Wrong redirect", status: "closed", severity: "medium" },
  {
    id: 1,
    title: "Data not available",
    status: "closed",
    severity: "critical",
  },
];

const badgeTypes: { [key: string]: string } = {
  open: "badge-success",
  closed: "badge-error",
  reviewing: "badge-secondary",
};

const severityTypes: { [key: string]: string } = {
  minor: "text-success",
  medium: "text-secondary",
  major: "text-warning",
  critical: "text-error",
};

export default function Issues() {
  return (
    <>
      <div className="flex flex-row justify-between items-center gap-2">
        <h1>Issues</h1>

        <Link
          className="btn btn-sm btn-outline text-content-base"
          href="/thread/new"
        >
          <FaPlus /> Create an issue thread
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="hidden lg:block">ID</th>
              <th>Title</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <th className="hidden lg:block">{issue.id}</th>
                <td>{issue.title}</td>
                <td>
                  <div
                    className={
                      "badge badge-ghost " + severityTypes[issue.severity]
                    }
                  >
                    {issue.severity}
                  </div>
                </td>
                <td>
                  <div className={"badge " + badgeTypes[issue.status]}>
                    {issue.status}
                  </div>
                </td>
                <td>
                  <Link href={"/thread/" + issue.id}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="join flex flex-row justify-center items-center">
          <button className="join-item btn">«</button>
          <button className="join-item btn">#1</button>
          <button className="join-item btn">»</button>
        </div>
      </div>
    </>
  );
}
