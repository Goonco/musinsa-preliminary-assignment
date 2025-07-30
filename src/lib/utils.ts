import { type ClassValue, clsx } from "clsx";
import {
	endOfWeek,
	format,
	isBefore,
	parse,
	startOfToday,
	startOfWeek,
} from "date-fns";
import { twMerge } from "tailwind-merge";
import type { UnavailableTime } from "./types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isClosed(dateStrig: string) {
	const today = startOfToday();
	const targetDate = parse(dateStrig, "yyyy-MM-dd", new Date());
	return isBefore(targetDate, today);
}

export function weekStartDate(date: Date) {
	return startOfWeek(date, { weekStartsOn: 0 });
}

export function weekEndDate(date: Date) {
	return endOfWeek(date, { weekStartsOn: 0 });
}

export function getTimeSlot(date: Date): UnavailableTime {
	return {
		date: format(date, "yyyy-MM-dd"),
		hour: date.getHours(),
	};
}

type GoogleEvent = {
	summary: string;
	start: { dateTime: string; date?: null };
	end: { dateTime: string; date?: null };
};

export const transformEventsToUnavailableTimes = (
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
