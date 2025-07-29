"use client";

import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";
import type { UnavailableTime } from "@/lib/types";
import { weekEndDate, weekStartDate } from "@/lib/utils";
import { Sidebar, WeekTimePicker } from "./index";

type GoogleEvent = {
	summary: string;
	start: { dateTime: string; date?: null };
	end: { dateTime: string; date?: null };
};

const transformEventsToUnavailableTimes = (
	events: GoogleEvent[],
): UnavailableTime[] => {
	const blockedSlots: UnavailableTime[] = [];

	for (const event of events) {
		// 하루 종일 일정은 특정 시간 슬롯을 막지 않으므로 건너뜁니다.
		if (event.start.date) {
			continue;
		}

		const startDate = new Date(event.start.dateTime);
		const endDate = new Date(event.end.dateTime);

		// 이벤트 시작 시간부터 끝 시간까지 1시간 단위로 순회하며
		// 이벤트가 차지하는 모든 시간 슬롯을 blockedSlots 배열에 추가합니다.
		let currentHour = new Date(startDate);
		while (currentHour < endDate) {
			blockedSlots.push({
				date: format(currentHour, "yyyy-MM-dd"),
				hour: currentHour.getHours(),
			});
			// 다음 시간으로 이동
			currentHour.setHours(currentHour.getHours() + 1);
		}
	}

	// 중복된 슬롯을 제거 (예: 2개의 이벤트가 같은 시간 슬롯에 있을 경우)
	const uniqueSlots = Array.from(
		new Set(blockedSlots.map((slot) => JSON.stringify(slot))),
	).map((str) => JSON.parse(str));

	return uniqueSlots;
};

export function Pannel({
	recruitmentId,
	applicationId,
}: {
	recruitmentId: string;
	applicationId: string;
}) {
	const [isLoading, setIsLoading] = useState<boolean>();
	const [baseDate, setBaseDate] = useState<Date>(new Date());
	const [unavailableTimes, setUnavailableTimes] = useState<UnavailableTime[]>(
		[],
	);
	const weekStart = weekStartDate(baseDate);
	const weekEnd = weekEndDate(baseDate);

	function nextWeek() {
		setBaseDate(addDays(baseDate, 7));
	}

	function prevWeek() {
		setBaseDate(addDays(baseDate, -7));
	}

	useEffect(() => {
		const fetchEvents = async () => {
			setIsLoading(true); // 로딩 시작
			try {
				const params = new URLSearchParams({
					timeMin: weekStart.toISOString(),
					timeMax: weekEnd.toISOString(),
				});
				const res = await fetch(`/api/calendar-events?${params}`);

				if (res.status === 401) {
					console.log("로그인이 필요합니다.");
					setUnavailableTimes([]);
					return;
				}

				if (res.ok) {
					const data = await res.json();
					setUnavailableTimes(transformEventsToUnavailableTimes(data));
				} else {
					console.error("Failed to fetch events");
				}
			} catch (error) {
				console.error("An error occurred:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchEvents();
	}, [baseDate]);

	return (
		<>
			<Sidebar
				start_date={weekStart}
				end_date={weekEnd}
				nextWeek={nextWeek}
				prevWeek={prevWeek}
				unavailable_times={unavailableTimes}
				recruitment_id={recruitmentId}
				application_id={applicationId}
			/>
			<div className="flex-1 flex flex-col min-h-0">
				<GoolgeLoginButton />
				{isLoading ? (
					<div>캘린더 일정을 불러오는 중입니다...</div>
				) : (
					<WeekTimePicker
						weekStart={weekStart}
						unavailableTimes={unavailableTimes}
					/>
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
