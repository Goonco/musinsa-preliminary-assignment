import Image from "next/image";
import Wallpaper from "@/../public/musinsa-wallpaper.webp";
import { fetchAllRecruitmentOverviews, fetchFilter } from "@/lib/api";
import { FilterSidebar, RecruitOverviewList } from "./_components";

export default async function Page() {
	const filters = await fetchFilter();
	const recruitmentOverviews = await fetchAllRecruitmentOverviews();

	return (
		<div className="text-2xl">
			<section className="px-base-x-padding">
				<div className="py-16 pl-4 font-semibold text-4xl">
					<h1>TEAM MUSINSA</h1>
					<h2>Careers</h2>
				</div>
				<div className="overflow-hidden rounded-2xl">
					<Image src={Wallpaper} alt="musinsa wallpaper" />
				</div>
			</section>

			<div className="flex flex-col w-full">
				<FilterSidebar filters={filters} />
				<RecruitOverviewList recruitmentOverviews={recruitmentOverviews} />
			</div>
		</div>
	);
}
