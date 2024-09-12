import Link from "next/link";
import Badge from "./Badge";

import { Thread } from "@/app/(types)/Topics";

export default function IssueRow({ issue }: { issue: Thread }) {
  return (
    <>
      <tr>
        <td>
          <Link
            href={"/thread/" + issue.id}
            className="hover:text-base-content/80"
          >
            {issue.title}
          </Link>
        </td>
        <td>
          <div>@{issue.author.name}</div>
        </td>
        <td>
          <Badge type={"severity"} level={issue.severity} />
        </td>
        <td>
          <Badge type={"status"} level={issue.status} />
        </td>
      </tr>
    </>
  );
}
