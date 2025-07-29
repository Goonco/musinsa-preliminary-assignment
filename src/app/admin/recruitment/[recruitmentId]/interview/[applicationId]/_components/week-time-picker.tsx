"use client";

import clsx from "clsx";
import {
	addDays,
	eachHourOfInterval,
	format,
	getDay,
	setHours,
} from "date-fns";
import { ko } from "date-fns/locale";
import type { UnavailableTime } from "@/lib/types";

const dimmedStyle =
	"bg-[repeating-linear-gradient(-45deg,transparent,transparent_4px,rgba(0,0,0,0.02)_4px,rgba(0,0,0,0.02)_8px)]";
const dimmedStyle2 = "bg-blue-200 ";
const isWeekend = (date: Date) => getDay(date) === 0 || getDay(date) === 6;

export function WeekTimePicker({
	weekStart,
	unavailableTimes = [],
}: {
	weekStart: Date;
	unavailableTimes?: UnavailableTime[];
}) {
	const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

	const today = new Date("2025-06-23");
	const startTime = setHours(today, 9);
	const endTime = setHours(today, 21);
	const timeSlots = eachHourOfInterval({
		start: startTime,
		end: endTime,
	});

	const isSlotUnavailable = (day: Date, slot: Date) => {
		if (unavailableTimes.length === 0) return false;

		const formattedDay = format(day, "yyyy-MM-dd");
		const currentHour = slot.getHours();
		return unavailableTimes.some(
			(item) => item.date === formattedDay && item.hour === currentHour,
		);
	};

	return (
		<div className="w-full overflow-scroll">
			<div className="w-full flex">
				<div className="w-16"></div>
				{weekDays.map((weekDay, idx) => (
					<div className="flex-1 text-center" key={idx}>
						{format(weekDay, "d E", { locale: ko })}
					</div>
				))}
			</div>
			<div className="flex flex-row">
				<div className="w-16 text-xs text-gray-500">
					<div className="h-4"></div>
					{timeSlots.map((slot, index) => (
						<div key={index} className="h-16 flex justify-end pr-1">
							<p className="-mt-2">{format(slot, "a h시", { locale: ko })}</p>
						</div>
					))}
				</div>

				<div className="flex-1 grid grid-cols-7">
					{weekDays.map((day) => (
						<div
							key={day.toString()}
							className="flex flex-col border-r border-gray-200"
						>
							<div className="relative">
								<div className={clsx("h-4 border-b", dimmedStyle)} />

								{timeSlots.map((slot, index) => {
									const isUnavailable = isSlotUnavailable(day, slot);
									return (
										<div
											key={index}
											className={clsx(
												"h-16 border-b border-gray-200 relative",
												isWeekend(day) && dimmedStyle,
												isUnavailable && dimmedStyle2,
											)}
										/>
									);
								})}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
