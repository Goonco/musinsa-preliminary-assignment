// import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
import { fetchFilter } from "@/lib/api";
import { CATEGORY } from "@/lib/types";
import { CategoryList, RecruitOverviewList } from "./_components";

export default async function Page() {
	const filter = await fetchFilter();
	console.log("###", filter);
	// const router = useRouter();
	// const pathname = usePathname();

	// function clearParams() {
	// 	router.push(pathname);
	// }

	return (
		<Suspense>
			<div className="text-2xl">
				<div>
					<h1>TEAM MUSINSA</h1>
					<h2>Careers</h2>
				</div>
				<div className="flex flex-row w-full border">
					<div>
						{CATEGORY.map((category) => (
							<CategoryList key={category} category={category} />
						))}
						{/* <button onClick={clearParams} type="button">
							필터 초기화
						</button> */}
					</div>
					<div className="bg-red-50 flex-1">
						<RecruitOverviewList />
					</div>
				</div>
			</div>
		</Suspense>
	);
}
