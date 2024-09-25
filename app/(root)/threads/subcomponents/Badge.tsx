import {
  Severity,
  severityBadges,
} from "@/app/thread/(components)/types/Severities";
import { Status, statusBadges } from "@/app/thread/(components)/types/Statuses";

interface BadgeProps {
  type: string;
  level: Status | Severity;
}

export default function Badge({ type, level }: BadgeProps) {
  switch (type) {
    case "severity":
      return (
        <div
          className={
            "badge badge-outline bg-base-300 rounded-md " +
            severityBadges[level as Severity]
          }
        >
          {level}
        </div>
      );
    case "status":
      return (
        <div
          className={
            "badge bg-base-300 rounded-md border-base-100 border-2 " +
            statusBadges[level as Status]
          }
        >
          {level}
        </div>
      );
  }
}
