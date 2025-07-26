import type { Filter } from "./types";

export const filters: Omit<Filter, "id">[] = [
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
