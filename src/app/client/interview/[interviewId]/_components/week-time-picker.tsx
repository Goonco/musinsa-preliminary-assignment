"use client";

import clsx from "clsx";
import {
	addDays,
	addHours,
	eachHourOfInterval,
	format,
	getDay,
	isWithinInterval,
	parseISO,
	setHours,
} from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";
import type { Interview } from "@/lib/types";
import { cn } from "@/lib/utils";
import { InterviewConfirmButtion } from "./interview-confim-button";

const dimmedStyle =
	"bg-[repeating-linear-gradient(-45deg,transparent,transparent_4px,rgba(0,0,0,0.02)_4px,rgba(0,0,0,0.02)_8px)] cursor-default";
const dimmedStyle2 = "bg-blue-200 cursor-default";
const isWeekend = (date: Date) => getDay(date) === 0 || getDay(date) === 6;
const dimmedStyle3 = "bg-green-50";
const dimmedStyle4 = "bg-green-300";

export function WeekTimePicker({
	interview,
	interviewId,
}: {
	interview: Interview;
	interviewId: string;
}) {
	const { start_date, duration, unavailable_times, selected_time } = interview;
	const [hoveredSlot, setHoveredSlot] = useState<Date | null>(null);
	const [clickedSlot, setclickedSlot] = useState<Date | null>(null);
	const weekDays = Array.from({ length: 7 }, (_, i) => addDays(start_date, i));
	const timeSlots = getTimeSlot(new Date());

	function getTimeSlot(date: Date) {
		return eachHourOfInterval({
			start: setHours(date, 9),
			end: setHours(date, 21),
		});
	}

	const isHoverSelected = (date: Date): boolean => {
		if (!hoveredSlot) return false;
		const endDate = addHours(hoveredSlot, duration - 1);
		return isWithinInterval(date, {
			start: hoveredSlot,
			end: endDate,
		});
	};

	const isClickSelected = (date: Date): boolean => {
		let slot: Date;

		if (selected_time?.date) {
			const parsedDate = parseISO(selected_time.date);
			slot = setHours(parsedDate, selected_time.hour);
		} else if (clickedSlot) {
			slot = clickedSlot;
		} else return false;

		const endDate = addHours(slot, duration - 1);
		return isWithinInterval(date, {
			start: slot,
			end: endDate,
		});
	};

	const isSlotUnavailable = (date: Date) => {
		if (unavailable_times.length === 0) return false;

		const formattedDay = format(date, "yyyy-MM-dd");
		const currentHour = date.getHours();
		return unavailable_times.some(
			(item) => item.date === formattedDay && item.hour === currentHour,
		);
	};

	const isHoveredRangeValid = (): boolean => {
		if (!hoveredSlot) return true;

		const lastSlotInHoveredRange = addHours(hoveredSlot, duration - 1);
		if (lastSlotInHoveredRange.getHours() > 21) {
			return false;
		}

		const hoveredSlots = Array.from({ length: duration }, (_, i) =>
			addHours(hoveredSlot, i),
		);

		const isAnySlotInvalid = hoveredSlots.some(
			(slot) => isWeekend(slot) || isSlotUnavailable(slot),
		);
		return !isAnySlotInvalid;
	};

	return (
		<div className="flex flex-row gap-2 items-end">
			<div className="flex-1 h-[700px] overflow-scroll">
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
											const isSlotCurrentlyUnavailable =
												isWeekend(slot) || isSlotUnavailable(slot);

											const isCurrentlyHovered = isHoverSelected(slot);

											const isHoverRangeValid = isHoveredRangeValid();

											return (
												<button
													type="button"
													onClick={() => {
														if (isHoverRangeValid) {
															setclickedSlot(hoveredSlot);
														}
													}}
													onMouseOver={() => {
														setHoveredSlot(slot);
													}}
													key={index}
													className={cn(
														"w-full block h-16 border-b cursor-pointer border-gray-200 relative",

														isSlotCurrentlyUnavailable && dimmedStyle,

														isCurrentlyHovered && {
															"bg-red-200 bg-opacity-70": !isHoverRangeValid,
															"bg-green-50": isHoverRangeValid,
														},
														isClickSelected(slot) && dimmedStyle4,
													)}
													disabled={isSlotCurrentlyUnavailable}
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
			<InterviewConfirmButtion
				interviewId={interviewId}
				clickedSlot={clickedSlot}
				confirmed={selected_time}
			/>
		</div>
	);
}
