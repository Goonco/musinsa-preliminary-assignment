import { LucideArrowLeft } from "lucide-react";
import { fetchRecruitmentTitleById } from "@/lib/api";
import { ApplyForm } from "./_components";

export default async function Page({
	params,
}: {
	params: Promise<{ recruitmentId: string }>;
}) {
	const { recruitmentId } = await params;
	const recruitmentTitle = await fetchRecruitmentTitleById(
		parseInt(recruitmentId, 10),
	);

	if (!recruitmentTitle) return <div>존재하지 않는 모집 공고입니다.</div>;
	return (
		<div className="px-base-x-padding">
			<div className="py-8 space-y-8">
				<div className="px-4">
					<LucideArrowLeft />
				</div>
				<div className="space-y-3">
					<p className="text-4xl font-medium">지원서 작성하기</p>
					<p className="font-bold text-gray-600 ">{recruitmentTitle}</p>
				</div>
			</div>

			<ApplyForm recruitmentId={recruitmentId} />
		</div>
	);
}
