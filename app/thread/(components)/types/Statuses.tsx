export const statusTypes = [
  "open",
  "reviewing",
  "closed",
  "duplicate",
] as const;

export type Status = (typeof statusTypes)[number];

// Used to sort by status
export const statusRank: { [key in Status]: number } = {} as {
  [key in Status]: number;
};

statusTypes.forEach((status, index) => {
  statusRank[status] = index + 1;
});

// Status types and their badge classes
export const statusBadges: { [key in Status]: string } = {
  open: "text-success",
  closed: "text-error",
  duplicate: "text-warning",
  reviewing: "text-info",
};
