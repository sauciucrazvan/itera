import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/(database)/firebase";

import { Thread } from "@/app/thread/(components)/types/Topics";
import { Category } from "@/app/thread/(components)/types/Categories";

export async function getThreads(category: Category, getHidden: boolean) {
  const querySnapshot = await getDocs(collection(db, "threads"));

  const issuesData: Thread[] = querySnapshot.docs
    .map((doc) => {
      const issueData = doc.data();
      return { id: doc.id, ...issueData } as Thread;
    })
    .filter(
      (issue) =>
        (getHidden || !issue.properties?.hidden) && issue.category === category
    );

  return issuesData;
}
