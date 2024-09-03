import StatusBadge from "./StatusBadge";

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
            <tr>
              <th>3</th>
              <td>Posting button doesn't work</td>
              <td>
                <StatusBadge type="open" />
              </td>
              <td>View</td>
            </tr>
            <tr>
              <th>2</th>
              <td>Padding issue</td>
              <td>
                <StatusBadge type="reviewing" />
              </td>
              <td>View</td>
            </tr>
            <tr>
              <th>1</th>
              <td>Data not available</td>
              <td>
                <StatusBadge type="closed" />
              </td>
              <td>View</td>
            </tr>
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
