"use client";

import clsx from "clsx";
import {
	addDays,
	addHours,
	eachHourOfInterval,
	format,
	getDay,
	isWithinInterval,
	setHours,
} from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";
import type { UnavailableTime } from "@/lib/types";
import { cn } from "@/lib/utils";

const dimmedStyle =
	"bg-[repeating-linear-gradient(-45deg,transparent,transparent_4px,rgba(0,0,0,0.02)_4px,rgba(0,0,0,0.02)_8px)] cursor-default";
const dimmedStyle2 = "bg-blue-200 cursor-default";
const isWeekend = (date: Date) => getDay(date) === 0 || getDay(date) === 6;
const dimmedStyle3 = "bg-green-50";
const dimmedStyle4 = "bg-green-300";

export function WeekTimePicker({
	weekStart,
	unavailableTimes = [],
	duration,
}: {
	weekStart: Date;
	unavailableTimes?: UnavailableTime[];
	duration: number;
}) {
	const [hoveredSlot, setHoveredSlot] = useState<Date | null>(null);
	const [clickedSlot, setclickedSlot] = useState<Date | null>(null);
	const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
	const timeSlots = getTimeSlot(new Date());

	function getTimeSlot(date: Date) {
		return eachHourOfInterval({
			start: setHours(date, 9),
			end: setHours(date, 21),
		});
	}

	const isHoverSelected = (date: Date): boolean => {
		if (!hoveredSlot) return false;
		const endDate = addHours(hoveredSlot, duration);
		return isWithinInterval(date, {
			start: hoveredSlot,
			end: endDate,
		});
	};

	const isClickSelected = (date: Date): boolean => {
		if (!clickedSlot) return false;
		const endDate = addHours(clickedSlot, duration);
		return isWithinInterval(date, {
			start: clickedSlot,
			end: endDate,
		});
	};

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
					{weekDays.map((day) => {
						const timeSlots = getTimeSlot(day);
						return (
							<div
								key={day.toString()}
								className="flex flex-col border-r border-gray-200"
							>
								<div className="relative">
									<div className={clsx("h-4 border-b", dimmedStyle)} />

									{timeSlots.map((slot, index) => {
										const isUnavailable = isSlotUnavailable(day, slot);
										return (
											<button
												type="button"
												onClick={() => {
													setclickedSlot(slot);
												}}
												onMouseOver={() => {
													setHoveredSlot(slot);
												}}
												onFocus={() => setHoveredSlot(slot)}
												onMouseOut={() => {
													setHoveredSlot(null);
												}}
												onBlur={() => {
													setHoveredSlot(null);
												}}
												key={index}
												className={cn(
													"w-full block h-16 border-b cursor-pointer border-gray-200 relative",
													isWeekend(day) && dimmedStyle,
													isUnavailable && dimmedStyle2,
													isHoverSelected(slot) && dimmedStyle3,
													isClickSelected(slot) && dimmedStyle4,
												)}
											/>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
