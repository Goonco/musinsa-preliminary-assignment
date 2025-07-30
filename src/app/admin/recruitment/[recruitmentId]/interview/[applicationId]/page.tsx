import { Pannel } from "./_components";

export default async function Page({
	params,
}: {
	params: Promise<{ recruitmentId: string; applicationId: string }>;
}) {
	const { recruitmentId, applicationId } = await params;
	return (
		<div className="flex flex-col size-full ">
			<div className="flex flex-row flex-1 min-h-0">
				<Pannel recruitmentId={recruitmentId} applicationId={applicationId} />
			</div>
		</div>
	);
}
