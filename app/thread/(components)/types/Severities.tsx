export const severityTypes = ["critical", "major", "medium", "minor"] as const;

export type Severity = (typeof severityTypes)[number];

// Used to sort by severity
export const severityRank: { [key in Severity]: number } = {
  critical: 1,
  major: 2,
  medium: 3,
  minor: 4,
};

// Severities types and their badge classes
export const severityBadges: { [key in Severity]: string } = {
  minor: "text-success",
  medium: "text-info",
  major: "text-warning",
  critical: "text-error",
};

export const isSeverity = (value: any): value is Severity => {
  return severityTypes.includes(value);
};
