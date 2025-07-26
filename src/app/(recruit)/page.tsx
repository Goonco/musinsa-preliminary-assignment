import { fetchFilter, fetchRecruitmentOverview } from "@/lib/api";
import { FilterSidebar, RecruitOverviewList } from "./_components";

export default async function Page() {
	const filters = await fetchFilter();
	const recruitmentOverviews = await fetchRecruitmentOverview();

	return (
		<div className="text-2xl">
			<div>
				<h1>TEAM MUSINSA</h1>
				<h2>Careers</h2>
			</div>
			<div className="flex flex-row w-full border">
				<FilterSidebar filters={filters} />
				<div className="bg-red-50 flex-1">
					<RecruitOverviewList recruitmentOverviews={recruitmentOverviews} />
				</div>
			</div>
		</div>
	);
}
