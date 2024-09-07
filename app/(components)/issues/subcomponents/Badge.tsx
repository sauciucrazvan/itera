import { severityTypes } from "@/app/(types)/Severities";
import { statusTypes } from "@/app/(types)/Statuses";

interface BadgeProps {
  type: string;
  level: string;
}

export default function Badge({ type, level }: BadgeProps) {
  switch (type) {
    case "severity":
      return (
        <div
          className={
            "badge badge-outline bg-base-300 rounded-md " + severityTypes[level]
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
            statusTypes[level]
          }
        >
          {level}
        </div>
      );
  }
}
