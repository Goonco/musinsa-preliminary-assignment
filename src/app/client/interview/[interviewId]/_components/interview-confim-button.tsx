"use client";

import { Button } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LucideLoaderCircle } from "lucide-react";
import { confirmInterview } from "@/lib/query";
import type { UnavailableTime } from "@/lib/types";
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
	const queryClient = useQueryClient();

	const { mutate, isPending, isSuccess } = useMutation({
		mutationFn: confirmInterview,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["interview", interviewId] });
		},
	});

	function handleConfirm() {
		if (!clickedSlot) {
			alert("먼저 면접 시간을 선택해주세요.");
			return;
		}

		mutate({
			interviewId,
			newSelectedTime: getTimeSlot(clickedSlot),
		});
	}

	const isConfirmed = !!confirmed?.date;
	const flag = isConfirmed || isSuccess;

	return (
		<Button
			onClick={handleConfirm}
			disabled={flag || !clickedSlot}
			className={cn(
				"block px-8 bg-black hover:opacity-70 text-white text-lg py-3 rounded-lg cursor-pointer",
				(flag || !clickedSlot) && "opacity-20 cursor-default hover:opacity-20",
			)}
		>
			{flag ? (
				"확정된 면접"
			) : isPending ? (
				<LucideLoaderCircle className="size-4 animate-spin" />
			) : (
				<p className="text-sm">면접 확정하기</p>
			)}
		</Button>
	);
}
