import { Input } from "@headlessui/react";
import { LucideAlarmClock, LucideGrip } from "lucide-react";
import Link from "next/link";
import { fetchAllRecruitmentOverviewsAdmin } from "@/lib/api";
import { RecruitmentStatus } from "./_components";

export default async function Page() {
	const recruitmentOverviews = await fetchAllRecruitmentOverviewsAdmin();
	console.log(recruitmentOverviews);

	return (
		<div>
			<div className="flex flex-row gap-2 items-center px-base-x-padding py-2 border-b border-b-gray-100">
				<LucideGrip className="size-5" />
				<p className="text-lg tracking-widest font-bold">공고</p>
			</div>

			<div className="px-base-x-padding">
				<div className=" w-full py-4">
					<Input
						placeholder="공고 검색"
						className="border border-gray-100 w-[300px]"
					/>
				</div>

				<div className="grid gap-3 grid-cols-3 overflow-hidden">
					{recruitmentOverviews.map((overview) => (
						<Link
							href={`admin/recruitment/${overview.id}`}
							key={overview.id}
							className="border border-gray-100 rounded-md"
						>
							<div className="p-3 space-y-2">
								<RecruitmentStatus deadline={overview.deadline} />

								<p className="font-semibold truncate">{overview.title}</p>
								<div>
									<p className="text-xs bg-amber-100 rounded-md w-fit px-2 py-0.5">
										Musinsa
									</p>
								</div>
								<div className="flex flex-row justify-end items-center text-gray-600 gap-2">
									<LucideAlarmClock className="size-3" />
									<p className="text-xs font-medium">{overview.deadline}</p>
								</div>
							</div>

							<div className="bg-gray-50 border-gray-100 border-t py-1.5 px-2.5 flex flex-row gap-2">
								<div className="flex flex-row items-center gap-1">
									<p className="text-xs">전체</p>
									<p className="text-sm font-semibold">
										{overview.application_count}
									</p>
								</div>
								<div className="flex flex-row items-center gap-1">
									<p className="text-xs">평가대상</p>
									<p className="text-sm font-semibold">
										{overview.application_count}
									</p>
								</div>
								<div className="flex flex-row items-center gap-1">
									<p className="text-xs">불합격</p>
									<p className="text-sm font-semibold">0</p>
								</div>
								<div className="flex flex-row items-center gap-1">
									<p className="text-xs">합격</p>
									<p className="text-sm font-semibold">0</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
