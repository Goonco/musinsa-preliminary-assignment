"use client";

import { Input } from "@headlessui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { CategoryList, RecruitOverviewList } from "./component";

export const CATEGORY = ["구분", "직군", "근무지"] as const;
export type Category = (typeof CATEGORY)[number];

export default function Page() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	function clearParams() {
		router.push(pathname);
	}

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set("query", term);
		} else {
			params.delete("query");
		}
		router.replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
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
					<button onClick={clearParams} type="button">
						필터 초기화
					</button>
				</div>
				<div className="bg-red-50 flex-1">
					<Input
						className="outline w-full"
						onChange={(e) => handleSearch(e.target.value)}
					/>
					<RecruitOverviewList />
				</div>
			</div>
		</div>
	);
}
