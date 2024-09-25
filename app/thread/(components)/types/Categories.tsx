export const categoryTypes = ["Issues", "Feature Request", "Feedback"] as const;

export type Category = (typeof categoryTypes)[number];

export const isCategory = (value: any): value is Category => {
  return categoryTypes.includes(value);
};