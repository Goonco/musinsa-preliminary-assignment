import { isBefore, parse, startOfToday } from "date-fns";

export function isClosed(dateStrig: string) {
	const today = startOfToday();
	const targetDate = parse(dateStrig, "yyyy-MM-dd", new Date());
	return isBefore(targetDate, today);
}
