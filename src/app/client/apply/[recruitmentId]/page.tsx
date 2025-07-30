import { fetchRecruitmentTitleById } from "@/lib/api";
import { ApplyForm, BackButton } from "./_components";

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
		<div className="px-base-x-padding max-w-[720px] mx-auto">
			<div className="mb-20">
				<BackButton />

				<div className="space-y-3">
					<p className="text-4xl font-medium">지원서 작성하기</p>
					<p className="font-bold text-gray-500 ">{recruitmentTitle}</p>
				</div>
			</div>

			<ApplyForm recruitmentId={recruitmentId} />
		</div>
	);
}
