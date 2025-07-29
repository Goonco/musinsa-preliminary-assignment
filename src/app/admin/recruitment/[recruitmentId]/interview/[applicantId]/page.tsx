import { LucideCalendar } from "lucide-react";
import { Sidebar, Test } from "./_components";
import { Test2 } from "./_components/test2";

export default async function Page({
	recruitmentId,
	applicantId,
}: {
	recruitmentId: string;
	applicantId: string;
}) {
	return (
		<div className="flex flex-col size-full">
			<div className="flex flex-row gap-2 items-center px-base-x-padding py-2 border-b border-b-gray-100">
				<LucideCalendar className="size-5" />
				<p className="text-lg tracking-widest font-bold">
					<span className="text-blue-500">이지은</span> 님의 면접 생성
				</p>
			</div>

			<div className="px-base-x-padding flex flex-row flex-1 min-h-0">
				<Sidebar />
				<div className="flex-1 flex flex-col min-h-0">
					<Test />
					<Test2 />
				</div>
			</div>
		</div>
	);
}
