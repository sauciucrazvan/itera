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
  open: "text-success",
  closed: "text-error",
  reviewing: "text-secondary",
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
              {issues.map((issue) => (
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
                    <div
                      className={
                        "badge badge-outline bg-base-300 rounded-md " +
                        severityTypes[issue.severity]
                      }
                    >
                      {issue.severity}
                    </div>
                  </td>
                  <td>
                    <div
                      className={
                        "badge bg-base-300 rounded-md border-base-100 border-2 " +
                        badgeTypes[issue.status]
                      }
                    >
                      {issue.status}
                    </div>
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
