import IssueRow from "./IssueRow";
import Loading from "../../Loading";
import Error from "../../Error";
import { useEffect, useState, useMemo } from "react";
import { severityRank } from "@/app/(types)/Severities";
import { statusRank } from "@/app/(types)/Statuses";
import { getThreads, IssueThread } from "@/app/(database)/getThreads";

export default function IssuesBody() {
  const ITEMS_PER_PAGE = 10;

  const [data, setData] = useState<IssueThread[]>([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(false),
    [page, setPage] = useState(1);

  const displayData = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [data, page]);

  function handleNavigation(increment: boolean) {
    setPage((prevPage) => Math.max(increment ? prevPage + 1 : prevPage - 1, 1));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const issuesData: IssueThread[] = await getThreads();
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
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;

  if (data.length === 0) {
    return (
      <div className="text-sm py-4 px-2">No entries found in the database.</div>
    );
  }

  return (
    <>
      <section>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Title</th>
                <th>Severity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((issue: IssueThread) => (
                <IssueRow key={issue.id} issue={issue} />
              ))}
            </tbody>
          </table>
        </div>
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
      </section>
    </>
  );
}
