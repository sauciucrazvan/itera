export const statusTypes = [
  "reviewing",
  "open",
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
  open: "bg-success/40 text-success",
  closed: "bg-error/40 text-error",
  duplicate: "bg-warning/40 text-warning",
  reviewing: "bg-info/40 text-info",
};

export const isStatus = (value: any): value is Status => {
  return statusTypes.includes(value);
};
