import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { IssueThread } from "../(types)/Topic";

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
      author: issueData.author,
    });
  });

  return issuesData;
}
