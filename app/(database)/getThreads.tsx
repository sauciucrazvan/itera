import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Status } from "../(types)/Statuses";
import { Severity } from "../(types)/Severities";

export interface IssueThread {
  id: string;
  title: string;
  status: Status;
  severity: Severity;
}

export async function getThreads() {
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

  return issuesData;
}
