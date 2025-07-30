import { fetchInterviewById } from "@/lib/api";
import { WeekTimePicker } from "./_components/week-time-picker";

export default async function Page({
	params,
}: {
	params: Promise<{ interviewId: string }>;
}) {
	const { interviewId } = await params;
	const interview = await fetchInterviewById(interviewId);

	if (!interview) return <div>WOW</div>;
	return (
		<div className="p-4">
			<WeekTimePicker interview={interview} interviewId={interviewId} />
		</div>
	);
}
