import { Input } from "@headlessui/react";
import { LucideAlarmClock, LucideGrip } from "lucide-react";

export default function Page() {
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
					{[1, 2, 3, 4].map((i) => (
						<div key={i} className="border border-gray-100 rounded-md">
							<div className="p-3 space-y-2">
								<div className="flex flex-row gap-2 items-center">
									<span className="size-2 block rounded-full bg-green-600" />
									<p className="text-xs">진행중</p>
								</div>

								<p className="font-semibold">Front-end Developer</p>
								<div>
									<p className="text-xs bg-amber-100 rounded-md w-fit px-2 py-0.5">
										Musinsa
									</p>
								</div>
								<div className="flex flex-row items-center text-gray-600 gap-2">
									<LucideAlarmClock className="size-4" />
									<p className="text-sm font-medium">2023. 05. 12</p>
								</div>
							</div>
							<div className="bg-gray-50 border-gray-100 border-t py-1 px-2">
								<p className="text-xs">전체 5 | 평가 대상 5 불합격 0 합격 0</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
