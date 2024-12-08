import {
  Severity,
  severityBadges,
} from "@/app/thread/(components)/types/Severities";
import { Status, statusBadges } from "@/app/thread/(components)/types/Statuses";
import { Manrope, Rubik } from "next/font/google";

interface BadgeProps {
  type: string;
  level: Status | Severity;
}

const manrope = Manrope({
  subsets: ["latin"],
});

export default function Badge({ type, level }: BadgeProps) {
  switch (type) {
    case "severity":
      return (
        <div
          className={
            "badge text-white rounded-md font-bold p-2 " +
            manrope.className +
            " " +
            severityBadges[level as Severity]
          }
        >
          {level.toLocaleLowerCase()}
        </div>
      );
    case "status":
      return (
        <div
          className={
            "badge rounded-md p-2 " +
            manrope.className +
            " " +
            statusBadges[level as Status]
          }
        >
          {level.toLocaleLowerCase()}
        </div>
      );
  }
}
