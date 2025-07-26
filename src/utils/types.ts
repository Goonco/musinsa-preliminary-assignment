export const CATEGORY = ["구분", "직군", "근무지"] as const;
export type Category = (typeof CATEGORY)[number];
