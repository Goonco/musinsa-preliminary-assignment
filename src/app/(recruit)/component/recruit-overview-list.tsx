"use client";

import { useSearchParams } from "next/navigation";
import { CATEGORY, type Category } from "../page";
import { categoryEngName } from "./category-list";

type Recruit_Overview = { title: string } & { [K in Category]: string };
const RECRUIT_OVERVEIWS: Recruit_Overview[] = [
	{
		title: "[무신사] 웹 프론트엔드 개발자 (Frontend Engineer)",
		구분: "무신사",
		직군: "Frontend Engineer",
		근무지: "무신사 성수 (E2)",
	},
	{
		title: "[29CM] 서비스 백엔드 개발자 (Backend Engineer)",
		구분: "29CM",
		직군: "Backend Engineer",
		근무지: "무신사 성수 (E2)",
	},
	{
		title: "[무신사 스탠다드] 프로덕트 디자이너",
		구분: "무신사 스탠다드",
		직군: "Product Designer",
		근무지: "무신사",
	},
	{
		title: "[무신사] 검색 서비스 백엔드 개발자",
		구분: "무신사",
		직군: "Backend Engineer",
		근무지: "무신사",
	},
	{
		title: "[29CM] 앱 프론트엔드 개발자 (Frontend Engineer)",
		구분: "29CM",
		직군: "Frontend Engineer",
		근무지: "무신사 성수 (E2)",
	},
	{
		title: "[무신사] UX/UI 프로덕트 디자이너",
		구분: "무신사",
		직군: "Product Designer",
		근무지: "무신사 성수 (E2)",
	},
	{
		title: "[무신사 스탠다드] 백엔드 엔지니어",
		구분: "무신사 스탠다드",
		직군: "Backend Engineer",
		근무지: "무신사",
	},
];

export function RecruitOverviewList() {
	const searchParams = useSearchParams();

	function checkOverview(overview: Recruit_Overview) {
		return CATEGORY.every((category) => {
			const items = searchParams.getAll(categoryEngName[category]);

			if (items.length === 0) return true;
			return items.some((item) => overview[category] === item);
		});
	}

	const filteredOverviewList = RECRUIT_OVERVEIWS.filter((overview) =>
		checkOverview(overview),
	);

	return (
		<div className="space-y-4">
			{filteredOverviewList.map((overview) => (
				<div key={overview.title}>
					<p>{overview.title}</p>
					<p>{`${overview.구분} | ${overview.근무지} | ${overview.직군}`}</p>
				</div>
			))}
		</div>
	);
}
