import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/(database)/firebase";

import { Thread } from "@/app/thread/(components)/types/Topics";
import { Category } from "@/app/thread/(components)/types/Categories";
import { Status } from "@/app/thread/(components)/types/Statuses";

export async function getThreads(
  category?: Category,
  status?: Status,
  getHidden: boolean = false
) {
  const querySnapshot = await getDocs(collection(db, "threads"));

  const issuesData: Thread[] = querySnapshot.docs
    .map((doc) => {
      const issueData = doc.data();
      return { id: doc.id, ...issueData } as Thread;
    })
    .filter((issue) => {
      const isVisible = getHidden || !issue.properties?.hidden,
        filterBuff =
          (category ? issue.category === category : true) && // Category filter
          (status ? issue.status === status : true); // Status filter

      return isVisible && filterBuff;
    });

  return issuesData;
}
