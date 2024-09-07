// Severities types
export type Severity = "critical" | "major" | "medium" | "minor";

// Used for sorting by severities
export const severityRank: { [key in Severity]: number } = {
  critical: 1,
  major: 2,
  medium: 3,
  minor: 4,
};

// Severities types and their badges classes
export const severityTypes: { [key: string]: string } = {
  minor: "text-success",
  medium: "text-secondary",
  major: "text-warning",
  critical: "text-error",
};
