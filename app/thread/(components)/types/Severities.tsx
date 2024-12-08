export const severityTypes = ["critical", "major", "medium", "minor"] as const;

export type Severity = (typeof severityTypes)[number];

// Used to sort by severity
export const severityRank: { [key in Severity]: number } = {} as {
  [key in Severity]: number;
};

severityTypes.forEach((status, index) => {
  severityRank[status] = index + 1;
});

// Severities types and their badge classes
export const severityBadges: { [key in Severity]: string } = {
  minor: "bg-success",
  medium: "bg-info",
  major: "bg-warning",
  critical: "bg-error",
};

export const isSeverity = (value: any): value is Severity => {
  return severityTypes.includes(value);
};
