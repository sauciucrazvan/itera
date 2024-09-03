import Link from "next/link";
import StatusBadge from "./StatusBadge";

const issues = [
  { id: 3, title: "New issue button does nothing", status: "open" },
  { id: 2, title: "Padding issue", status: "reviewing" },
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
