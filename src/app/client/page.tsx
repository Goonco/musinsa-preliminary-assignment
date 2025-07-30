import Image from "next/image";
import { Suspense } from "react";
import Wallpaper from "@/../public/musinsa-wallpaper.webp";
import { fetchAllRecruitmentOverviews, fetchFilter } from "@/lib/api";
import {
	FilterComponents,
	FilterSidebar,
	RecruitOverviewList,
} from "./_components";

export const dynamic = "force-dynamic";

export default async function Page() {
	const filters = await fetchFilter();
	const recruitmentOverviews = await fetchAllRecruitmentOverviews();

	return (
		<div className="text-2xl">
			<section className="px-base-x-padding md:px-10 mb-12">
				<div className="py-16 pl-4 font-semibold text-4xl md:text-5xl">
					<h1>TEAM MUSINSA</h1>
					<h2>Careers</h2>
				</div>
				<div className="overflow-hidden rounded-2xl">
					<Image src={Wallpaper} alt="musinsa wallpaper" />
				</div>
			</section>

			<div className="flex flex-col md:flex-row w-full md:px-10 md:gap-16">
				<div className="md:block hidden">
					<FilterSidebar filters={filters} />
				</div>
				<div className="md:flex-1">
					<Suspense fallback={<div>Loading...</div>}>
						<FilterComponents filters={filters} />
						<RecruitOverviewList recruitmentOverviews={recruitmentOverviews} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
