import Image from "next/image";
import Wallpaper from "@/../public/musinsa-wallpaper.webp";
import { fetchFilter, fetchRecruitmentOverview } from "@/lib/api";
import { RecruitOverviewList } from "./_components";

export default async function Page() {
	const filters = await fetchFilter();
	const recruitmentOverviews = await fetchRecruitmentOverview();

	return (
		<div className="text-2xl">
			<section className="px-base-x-padding">
				<div className="py-16 pl-4 font-black text-[2.5rem] ">
					<h1>TEAM MUSINSA</h1>
					<h2>Careers</h2>
				</div>
				<div className="overflow-hidden rounded-2xl">
					<Image src={Wallpaper} alt="musinsa wallpaper" />
				</div>
			</section>

			<div className="flex flex-col w-full">
				{/* <FilterSidebar filters={filters} /> */}
				<RecruitOverviewList recruitmentOverviews={recruitmentOverviews} />
			</div>
		</div>
	);
}
