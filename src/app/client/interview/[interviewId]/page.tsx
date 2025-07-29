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
		<div>
			<WeekTimePicker
				weekStart={interview.start_date}
				unavailableTimes={interview.unavailable_times}
				duration={interview.duration}
			/>
		</div>
	);
}
