"use client";

import { useQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { LucideCalendar, LucideLoaderCircle } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { fetchCalendarEvents } from "@/lib/query";
import type { UnavailableTime } from "@/lib/types";
import {
	cn,
	type GoogleEvent,
	transformEventsToUnavailableTimes,
	weekEndDate,
	weekStartDate,
} from "@/lib/utils";
import { Sidebar, WeekTimePicker } from "./index";

export function Pannel({
	recruitmentId,
	applicationId,
}: {
	recruitmentId: string;
	applicationId: string;
}) {
	const [baseDate, setBaseDate] = useState<Date>(new Date());
	const weekStart = weekStartDate(baseDate);
	const weekEnd = weekEndDate(baseDate);

	console.log("weekStart", weekStart);
	console.log("weekEnd", weekEnd);

	const [debouncedBaseDate] = useDebounce(baseDate, 500);
	function nextWeek() {
		setBaseDate((current) => addDays(current, 7));
	}

	function prevWeek() {
		setBaseDate((current) => addDays(current, -7));
	}

	const { data, isLoading, isError } = useQuery<
		GoogleEvent[],
		Error,
		UnavailableTime[]
	>({
		queryKey: ["calendarEvents", debouncedBaseDate.toISOString()],
		queryFn: () =>
			fetchCalendarEvents(weekStart.toISOString(), weekEnd.toISOString()),
		select: (data) => transformEventsToUnavailableTimes(data),
	});

	return (
		<>
			<Sidebar
				start_date={weekStart}
				end_date={weekEnd}
				nextWeek={nextWeek}
				prevWeek={prevWeek}
				unavailable_times={data}
				recruitment_id={recruitmentId}
				application_id={applicationId}
			/>
			<div
				className={cn(
					"flex-1 bg-[#F3F4F6] pl-2 pr-8 justify-center items-center flex flex-col min-h-0",
					data && "bg-white",
				)}
			>
				{isError && <GoolgeLoginButton />}
				{isLoading && <LucideLoaderCircle className="animate-spin" />}
				{!isLoading && !isError && (
					<WeekTimePicker weekStart={weekStart} unavailableTimes={data} />
				)}
			</div>
		</>
	);
}

export function GoolgeLoginButton() {
	const handleLogin = () => {
		// biome-ignore lint: env var assertion
		const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
		// biome-ignore lint: env var assertion
		const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL!}/api/auth/google/callback`;

		const scope = [
			"https://www.googleapis.com/auth/userinfo.profile",
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/calendar.events.readonly",
		].join(" ");

		const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

		const params = {
			client_id: GOOGLE_CLIENT_ID,
			redirect_uri: REDIRECT_URI,
			response_type: "code",
			scope: scope,
			access_type: "offline",
			prompt: "consent",
		};

		const queryString = new URLSearchParams(params).toString();
		const authUrl = `${oauth2Endpoint}?${queryString}`;

		window.open(authUrl, "_blank");
	};

	return (
		<button
			type="button"
			onClick={handleLogin}
			className="px-3 py-2 flex items-center justify-center gap-1 text-sm bg-blue-500 text-white rounded"
		>
			<LucideCalendar className="size-4" />
			구글 캘린더 연동하기
		</button>
	);
}
