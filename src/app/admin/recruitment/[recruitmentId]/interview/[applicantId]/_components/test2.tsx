"use client";

import { endOfWeek, format, startOfWeek } from "date-fns";
import { useEffect, useState } from "react";
import { type UnavailableTime, WeekTimePicker } from "./week-time-picker";

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

export function Test2() {
	const [unavailableTimes, setUnavailableTimes] = useState<UnavailableTime[]>(
		[],
	);
	const [isLoading, setIsLoading] = useState(true);

	const targetDate = new Date("2025-06-23");
	const weekStart = startOfWeek(targetDate, { weekStartsOn: 0 });
	const weekEnd = endOfWeek(targetDate, { weekStartsOn: 0 });

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
					console.log(data);
					console.log(transformEventsToUnavailableTimes(data));
					setUnavailableTimes(transformEventsToUnavailableTimes(data));
				} else {
					console.error("Failed to fetch events");
				}
			} catch (error) {
				console.error("An error occurred:", error);
			} finally {
				setIsLoading(false); // 로딩 종료
			}
		};

		fetchEvents();
	}, []);

	if (isLoading) {
		return <div>캘린더 일정을 불러오는 중입니다...</div>;
	}

	return <WeekTimePicker unavailableTimes={unavailableTimes} />;
}
