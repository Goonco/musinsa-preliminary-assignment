"use client";

import { useQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { useState } from "react";
import { fetchCalendarEvents } from "@/lib/query";
import type { UnavailableTime } from "@/lib/types";
import {
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

	function nextWeek() {
		setBaseDate(addDays(baseDate, 7));
	}

	function prevWeek() {
		setBaseDate(addDays(baseDate, -7));
	}

	const { data, isLoading, isError } = useQuery<
		GoogleEvent[],
		Error,
		UnavailableTime[]
	>({
		queryKey: ["calendarEvents", baseDate.toISOString()],
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
			<div className="flex-1 flex flex-col min-h-0">
				{isError && <GoolgeLoginButton />}
				{isLoading && <div>캘린더 일정을 불러오는 중입니다...</div>}
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
			className="p-2 bg-blue-500 text-white rounded"
		>
			구글 캘린더 연동하기
		</button>
	);
}
