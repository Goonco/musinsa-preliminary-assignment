"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useFilterParams } from "@/hooks";
import {
	FILTER_KEY,
	type FilterKey,
	type RecruitmentOverview,
} from "@/lib/types";
import { isClosed } from "@/lib/utils";

export function RecruitOverviewList({
	recruitmentOverviews,
}: {
	recruitmentOverviews: RecruitmentOverview[];
}) {
	const { checkFilter } = useFilterParams();

	const filteredOverviewList = recruitmentOverviews.filter((overview) =>
		FILTER_KEY.every((fk: FilterKey) => {
			return checkFilter(fk, overview[fk]);
		}),
	);

	return (
		<Suspense>
			<div className="">
				{filteredOverviewList.length !== 0 ? (
					filteredOverviewList.map((overview) => (
						<div
							className="relative space-y-2 py-8 px-base-x-padding border-b border-gray-200"
							key={overview.id}
						>
							<div className="text-[22px] font-bold">
								{isClosed(overview.deadline) ? (
									<div>
										{overview.title}
										<span className="absolute inset-0 text-base bg-gray-100 opacity-70 flex justify-end items-end p-4">
											마감
										</span>
									</div>
								) : (
									<Link
										href={`/client/apply/${overview.id}`}
										className="hover:text-gray-400"
									>
										<span className="absolute inset-0 cursor-pointer " />
										{overview.title}
									</Link>
								)}
							</div>
							<p className="text-sm opacity-60">{`${overview.subsidaries} | ${overview.place} | ${overview.occupations}`}</p>
						</div>
					))
				) : (
					<p className="size-full py-40 flex justify-center items-center">
						<p className="text-base font-light text-gray-300">
							일치하는 결과가 없습니다.
						</p>
					</p>
				)}
			</div>
		</Suspense>
	);
}
