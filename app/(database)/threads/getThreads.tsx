import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/(database)/firebase";

import { Thread } from "@/app/thread/(components)/types/Topics";
import { Category } from "@/app/thread/(components)/types/Categories";

export async function getThreads(
  category?: Category,
  getHidden: boolean = false
) {
  const querySnapshot = await getDocs(collection(db, "threads"));

  const issuesData: Thread[] = querySnapshot.docs
    .map((doc) => {
      const issueData = doc.data();
      return { id: doc.id, ...issueData } as Thread;
    })
    .filter((issue) => {
      const isVisible = getHidden || !issue.properties?.hidden;
      const filterByCategory = category ? issue.category === category : true;

      return isVisible && filterByCategory;
    });

  return issuesData;
}
