// Statuses types
export type Status = "open" | "reviewing" | "closed" | "duplicate";

// Used for sorting by status
export const statusRank: { [key in Status]: number } = {
  open: 1,
  reviewing: 2,
  closed: 3,
  duplicate: 4,
};

// Statuses types and their badge classes
export const statusTypes: { [key: string]: string } = {
  open: "text-success",
  closed: "text-error",
  duplicate: "text-warning",
  reviewing: "text-info",
};
