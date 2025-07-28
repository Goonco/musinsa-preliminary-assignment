import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

import { isBefore, parse, startOfToday } from "date-fns";

export function isClosed(dateStrig: string) {
	const today = startOfToday();
	const targetDate = parse(dateStrig, "yyyy-MM-dd", new Date());
	return isBefore(targetDate, today);
}
