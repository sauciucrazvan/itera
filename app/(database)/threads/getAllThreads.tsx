import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/(database)/firebase";

import { Thread } from "@/app/thread/(components)/types/Topics";

export async function getAllThreads(getHidden: boolean) {
  const querySnapshot = await getDocs(collection(db, "threads"));

  const issuesData: Thread[] = querySnapshot.docs
    .map((doc) => {
      const issueData = doc.data();
      return { id: doc.id, ...issueData } as Thread;
    })
    .filter((issue) => getHidden || !issue.properties?.hidden);

  return issuesData;
}
