"use client";

import { Input } from "@headlessui/react";
import { format } from "date-fns";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { Interview, UnavailableTime } from "@/lib/types";

type Inputs = {
	title: string;
	duration: number;
};

export function Sidebar({
	start_date,
	end_date,
	nextWeek,
	prevWeek,

	recruitment_id,
	application_id,
	unavailable_times,
}: {
	start_date: Date;
	end_date: Date;
	nextWeek: () => void;
	prevWeek: () => void;

	recruitment_id: string;
	application_id: string;
	unavailable_times: UnavailableTime[];
}) {
	const [loading, setLoading] = useState<boolean>(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setLoading(true);

		const addedData = {
			...data,
			start_date,
			end_date,
			selected_time: null,
			recruitment_id,
			application_id,
			unavailableTimes: unavailable_times,
		} as Interview;

		try {
			await fetch("/api/interview", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(addedData),
			});
		} catch (error) {
			console.error("Failed to submit interview:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
			{loading && <p className="text-4xl">로딩증</p>}
			<div>
				<p className="text-sm font-medium text-gray-700">면접 제목</p>
				<Input
					{...register("title", { required: true })}
					name="title"
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				/>
				{errors.title && <p>면접 제목을 입력해주세요.</p>}
			</div>

			<div>
				<p className="text-sm font-medium text-gray-700">면접 기간</p>
				<div className="mt-1 flex items-center justify-between">
					<button
						type="button"
						onClick={prevWeek}
						className="p-1 rounded-full hover:bg-gray-100"
					>
						<LucideChevronLeft className="h-5 w-5" />
					</button>
					<div className="text-center text-sm">
						<span>{format(start_date, "yyyy.MM.dd")}</span>
						<span className="mx-1">~</span>
						<span>{format(end_date, "yyyy.MM.dd")}</span>
					</div>
					<button
						type="button"
						onClick={nextWeek}
						className="p-1 rounded-full hover:bg-gray-100"
					>
						<LucideChevronRight className="h-5 w-5" />
					</button>
				</div>
			</div>

			<div>
				<p>면접 시간</p>
				<Input
					{...register("duration", { required: true })}
					type="number"
					className="border border-black"
				/>
			</div>

			<button type="submit" className="bg-black text-white block">
				제출하기
			</button>
		</form>
	);
}
