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

export type GoogleEvent = {
	summary: string;
	start: { dateTime: string; date?: null };
	end: { dateTime: string; date?: null };
};

export const transformEventsToUnavailableTimes = (
	events: GoogleEvent[],
): UnavailableTime[] => {
	const blockedSlots: UnavailableTime[] = [];

	for (const event of events) {
		if (event.start.date) {
			continue;
		}

		const startDate = new Date(event.start.dateTime);
		const endDate = new Date(event.end.dateTime);

		let currentHour = new Date(startDate);
		while (currentHour < endDate) {
			blockedSlots.push({
				date: format(currentHour, "yyyy-MM-dd"),
				hour: currentHour.getHours(),
			});

			currentHour.setHours(currentHour.getHours() + 1);
		}
	}

	const uniqueSlots = Array.from(
		new Set(blockedSlots.map((slot) => JSON.stringify(slot))),
	).map((str) => JSON.parse(str));

	return uniqueSlots;
};
