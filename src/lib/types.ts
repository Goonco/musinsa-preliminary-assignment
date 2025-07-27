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

export const INFLOW_PATH = ["무신사 채용팀", "지인 추천", "링크드인"] as const;
export type InflowPath = (typeof INFLOW_PATH)[number];
