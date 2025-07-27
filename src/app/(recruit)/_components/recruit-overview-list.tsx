"use client";

import { Input } from "@headlessui/react";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import { useFilterParams } from "@/hooks";
import { FILTER_KEY, type FilterKey, type RecruitOverview } from "@/lib/types";

export function RecruitOverviewList({
	recruitmentOverviews,
}: {
	recruitmentOverviews: RecruitOverview[];
}) {
	const { setFilter, checkFilter, getFilter } = useFilterParams();

	const filteredOverviewList = recruitmentOverviews.filter((overview) =>
		FILTER_KEY.every((fk: FilterKey) => {
			return checkFilter(fk, overview[fk]);
		}),
	);

	const handleSearch = useDebouncedCallback((term: string) => {
		setFilter("title", term);
	}, 300);

	return (
		<>
			<div className="py-12 px-base-x-padding">
				<Input
					autoComplete="off"
					className="w-full border border-gray-300 data-focus:outline-2 data-focus:outline-gray-500 rounded-md py-3 pl-4 font-thin text-base"
					onChange={(e) => handleSearch(e.target.value)}
					defaultValue={getFilter("title")}
				/>
			</div>
			<div className="space-y-4">
				{filteredOverviewList.length !== 0 ? (
					filteredOverviewList.map((overview) => (
						<div
							className="relative space-y-2 py-8 px-base-x-padding border-b border-gray-200 cursor-pointer"
							key={overview.id}
						>
							<p className="text-2xl font-bold hover:text-gray-400">
								<Link href={`/apply/${overview.id}`}>
									<span className="absolute inset-0" />
									{overview.title}
								</Link>
							</p>
							<p className="text-sm text-gray-600">{`${overview.subsidaries} | ${overview.place} | ${overview.occupations}`}</p>
						</div>
					))
				) : (
					<p>일치하는 결과가 없습니다.</p>
				)}
			</div>
		</>
	);
}
