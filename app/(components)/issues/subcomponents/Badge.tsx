interface BadgeProps {
  type: string;
  level: string;
}

const statusTypes: { [key: string]: string } = {
  open: "text-success",
  closed: "text-error",
  reviewing: "text-secondary",
};

const severityTypes: { [key: string]: string } = {
  minor: "text-success",
  medium: "text-secondary",
  major: "text-warning",
  critical: "text-error",
};

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
