// Statuses types
export type Status = "open" | "reviewing" | "closed";

// Used for sorting by status
export const statusRank: { [key in Status]: number } = {
  open: 1,
  reviewing: 2,
  closed: 3,
};

// Statuses types and their badge classes
export const statusTypes: { [key: string]: string } = {
  open: "text-success",
  closed: "text-error",
  reviewing: "text-info",
};
