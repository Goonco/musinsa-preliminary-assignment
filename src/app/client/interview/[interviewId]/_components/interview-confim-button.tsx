"use client";

import { Button } from "@headlessui/react";
import { useState } from "react";
import { UnavailableTime } from "@/lib/types";
import { cn, getTimeSlot } from "@/lib/utils";

export function InterviewConfirmButtion({
	interviewId,
	clickedSlot,
	confirmed,
}: {
	interviewId: string;
	clickedSlot: Date | null;
	confirmed: UnavailableTime | null;
}) {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function handleConfirmTime() {
		setIsLoading(true);
		try {
			const response = await fetch("/api/interview/confirm", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					interviewId,
					newSelectedTime: getTimeSlot(clickedSlot as Date),
				}),
			});

			const result = await response.json();
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Button
			onClick={handleConfirmTime}
			disabled={!!confirmed || !clickedSlot}
			className={cn(
				"block px-8 bg-black hover:opacity-70 text-white text-lg py-3 rounded-lg cursor-pointer",
				!clickedSlot && "opacity-20 cursor-default hover:opacity-20",
			)}
		>
			{confirmed ? "면접 확정" : isLoading ? "로딩중" : "면접 확정"}
		</Button>
	);
}
