import IssueRow from "./IssueRow";
import Loading from "../../Loading";
import Error from "../../Error";

import { db } from "@/app/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { Severity, severityRank } from "@/app/(types)/Severities";
import { Status, statusRank } from "@/app/(types)/Statuses";

interface IssueThread {
  id: string;
  title: string;
  status: Status;
  severity: Severity;
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
            id: doc.id,
            title: issueData.title,
            status: issueData.status,
            severity: issueData.severity,
          });
        });

        issuesData.sort((a, b) => {
          if (statusRank[a.status] !== statusRank[b.status]) {
            return statusRank[a.status] - statusRank[b.status];
          }

          return severityRank[a.severity] - severityRank[b.severity];
        });

        setData(issuesData);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;

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
                <th>Title</th>
                <th>Severity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((issue: IssueThread) => (
                <IssueRow key={issue.id} issue={issue} />
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
