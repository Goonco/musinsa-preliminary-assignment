import { LucideUser } from "lucide-react";
import { fetchApplicantsByRecruitmentId } from "@/lib/api";
import { Kanban } from "./_components";

export default async function Page({
	params,
}: {
	params: Promise<{ recruitmentId: string }>;
}) {
	const { recruitmentId } = await params;
	const applicantOverviews = await fetchApplicantsByRecruitmentId(
		parseInt(recruitmentId, 10),
	);

	return (
		<div className="h-full flex flex-col ">
			<div className="flex flex-row gap-2 items-center px-base-x-padding py-2 border-b border-b-gray-100">
				<LucideUser className="size-5" />
				<p className="text-lg tracking-widest font-bold">지원자</p>
			</div>

			<div className="flex-1 p-base-x-padding">
				{/* <Input placeholder="이름, 이메일로 검색" /> */}
				<Kanban
					recruitmentId={recruitmentId}
					applicantOverviews={applicantOverviews}
				/>
			</div>
		</div>
	);
}
