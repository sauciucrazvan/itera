import Link from "next/link";
import Badge from "./Badge";

import { Status } from "@/app/(types)/Statuses";
import { Severity } from "@/app/(types)/Severities";

interface IssueProps {
  issue: {
    id: string;
    title: string;
    severity: Severity;
    status: Status;
  };
}

export default function IssueRow({ issue }: IssueProps) {
  const { id, title, severity, status } = issue;

  return (
    <>
      <tr>
        <td>
          <Link href={"/thread/" + id} className="hover:text-base-content/80">
            {title}
          </Link>
        </td>
        <td>
          <Badge type={"severity"} level={severity} />
        </td>
        <td>
          <Badge type={"status"} level={status} />
        </td>
      </tr>
    </>
  );
}
