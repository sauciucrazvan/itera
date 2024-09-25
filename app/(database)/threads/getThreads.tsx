import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/(database)/firebase";

import { Thread } from "@/app/thread/(components)/types/Topics";

export async function getThreads() {
  const querySnapshot = await getDocs(collection(db, "threads"));
  const issuesData: Thread[] = [];
  querySnapshot.forEach((doc) => {
    const issueData = doc.data();
    if (!issueData.hidden)
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
