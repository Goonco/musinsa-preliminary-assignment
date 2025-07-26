"use client";

import { Input } from "@headlessui/react";
import { Suspense } from "react";
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
		<Suspense>
			<Input
				autoComplete="off"
				className="outline w-full"
				onChange={(e) => handleSearch(e.target.value)}
				defaultValue={getFilter("title")}
			/>
			<div className="space-y-4">
				{filteredOverviewList.length !== 0 ? (
					filteredOverviewList.map((overview) => (
						<div key={overview.title}>
							<p>{overview.title}</p>
							<p>{`${overview.subsidaries} | ${overview.place} | ${overview.occupations}`}</p>
						</div>
					))
				) : (
					<p>일치하는 결과가 없습니다.</p>
				)}
			</div>
		</Suspense>
	);
}
