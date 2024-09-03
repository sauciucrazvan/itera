import Link from "next/link";
import StatusBadge from "./StatusBadge";

const issues = [
  { id: 9, title: "user account deleted for no reason", status: "open" },
  { id: 8, title: "Placeholder data on the dashboard page", status: "open" },
  { id: 7, title: "header buttons no workie", status: "open" },
  { id: 3, title: "New issue button does nothing", status: "open" },
  { id: 5, title: "Responsiveness bug", status: "reviewing" },
  { id: 2, title: "Padding issue", status: "reviewing" },
  { id: 6, title: "Broken UI component", status: "closed" },
  { id: 4, title: "Wrong redirect", status: "closed" },
  { id: 1, title: "Data not available", status: "closed" },
];

export default function Issues() {
  return (
    <>
      <div className="flex flex-row justify-between items-center gap-2">
        <h1>Issues</h1>

        <button className="btn btn-primary text-white">New Issue</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <th>{issue.id}</th>
                <td>{issue.title}</td>
                <td>
                  <StatusBadge type={issue.status} />
                </td>
                <td>
                  <Link href={"/issue/" + issue.id}>View</Link>
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
