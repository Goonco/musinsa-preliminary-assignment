import { LucideArrowLeft } from "lucide-react";
import { ApplyForm } from "./_components";

export default async function Page({
	params,
}: {
	params: Promise<{ recruitmentId: string }>;
}) {
	const { recruitmentId } = await params;

	return (
		<div className="px-base-x-padding">
			<LucideArrowLeft />
			<p className="text-4xl font-medium">지원서 작성하기</p>
			<p>{recruitmentId}</p>

			<ApplyForm recruitmentId={recruitmentId} />
		</div>
	);
}
