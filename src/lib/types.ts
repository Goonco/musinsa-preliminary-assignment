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
export type RecruitmentOverview = { id: number; deadline: string } & {
	[K in FilterKey]: string;
};
export type RecruitmentOverviewAdmin = {
	application_count: number;
} & RecruitmentOverview;

export const INFLOW_PATH = ["무신사 채용팀", "지인 추천", "링크드인"] as const;
export type InflowPath = (typeof INFLOW_PATH)[number];

export type ApplicantOverview = {
	id: string;
	name: string;
	email: string;
};
