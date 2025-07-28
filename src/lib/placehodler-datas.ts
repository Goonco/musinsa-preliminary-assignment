import type { Filter, RecruitmentOverview } from "./types";

type OmitId<T> = Omit<T, "id">;

export const filters: OmitId<Filter>[] = [
	{
		category: "구분",
		name: "무신사",
	},
	{
		category: "구분",
		name: "29CM",
	},
	{
		category: "구분",
		name: "무신사 스탠다드",
	},
	{
		category: "직군",
		name: "Backend Engineer",
	},
	{
		category: "직군",
		name: "Frontend Engineer",
	},
	{
		category: "직군",
		name: "Product Designer",
	},
	{
		category: "근무지",
		name: "무신사",
	},
	{
		category: "근무지",
		name: "무신사 성수 (E2)",
	},
];

export const recruitments: OmitId<RecruitmentOverview>[] = [
	{
		title: "[무신사] 웹 프론트엔드 개발자 (Frontend Engineer)",
		subsidaries: "무신사",
		occupations: "Frontend Engineer",
		place: "무신사 성수 (E2)",
		deadline: "2025-08-10",
	},
	{
		title: "[29CM] 서비스 백엔드 개발자 (Backend Engineer)",
		subsidaries: "29CM",
		occupations: "Backend Engineer",
		place: "무신사 성수 (E2)",
		deadline: "2025-08-10",
	},
	{
		title: "[무신사 스탠다드] 프로덕트 디자이너",
		subsidaries: "무신사 스탠다드",
		occupations: "Product Designer",
		place: "무신사",
		deadline: "2025-08-10",
	},
	{
		title: "[무신사] 검색 서비스 백엔드 개발자",
		subsidaries: "무신사",
		occupations: "Backend Engineer",
		place: "무신사",
		deadline: "2025-08-10",
	},
	{
		title: "[29CM] 앱 프론트엔드 개발자 (Frontend Engineer)",
		subsidaries: "29CM",
		occupations: "Frontend Engineer",
		place: "무신사 성수 (E2)",
		deadline: "2025-07-27",
	},
	{
		title: "[무신사] UX/UI 프로덕트 디자이너",
		subsidaries: "무신사",
		occupations: "Product Designer",
		place: "무신사 성수 (E2)",
		deadline: "2025-07-27",
	},
	{
		title: "[무신사 스탠다드] 백엔드 엔지니어",
		subsidaries: "무신사 스탠다드",
		occupations: "Backend Engineer",
		place: "무신사",
		deadline: "2025-07-27",
	},
];
