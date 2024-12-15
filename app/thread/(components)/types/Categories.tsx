export const categoryTypes = ["All", "Issues", "Feature Request"] as const;

export type Category = (typeof categoryTypes)[number];

export const isCategory = (value: any): value is Category => {
  return categoryTypes.includes(value);
};
