export const CATEGORY = ["구분", "직군", "근무지"] as const;
export type Category = (typeof CATEGORY)[number];

export type Filter = {
	id: number;
	name: string;
	category: Category;
};

export const FILTER_KEY = [
	"subsidaries",
	"place",
	"occupations",
	"title",
] as const;
export type FilterKey = (typeof FILTER_KEY)[number];
export type RecruitOverview = { id: number } & {
	[K in FilterKey]: string;
};
