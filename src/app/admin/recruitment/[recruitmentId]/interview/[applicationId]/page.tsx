import { LucideCalendar } from "lucide-react";
import { Pannel } from "./_components";

export default async function Page({
	params,
}: {
	params: Promise<{ recruitmentId: string; applicationId: string }>;
}) {
	const { recruitmentId, applicationId } = await params;
	return (
		<div className="flex flex-col size-full">
			<div className="flex flex-row gap-2 items-center px-base-x-padding py-2 border-b border-b-gray-100">
				<LucideCalendar className="size-5" />
				<p className="text-lg tracking-widest font-bold">
					<span className="text-blue-500">이지은</span> 님의 면접 생성
				</p>
			</div>

			<div className="px-base-x-padding flex flex-row flex-1 min-h-0">
				<Pannel recruitmentId={recruitmentId} applicationId={applicationId} />
			</div>
		</div>
	);
}
