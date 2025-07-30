"use client";

import { Input } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import {
	LucideAlertCircle,
	LucideChevronLeft,
	LucideChevronRight,
	LucideLoaderCircle,
} from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { createInterview } from "@/lib/query";
import type { UnavailableTime } from "@/lib/types";

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
	unavailable_times = [],
}: {
	start_date: Date;
	end_date: Date;
	nextWeek: () => void;
	prevWeek: () => void;

	recruitment_id: string;
	application_id: string;
	unavailable_times?: UnavailableTime[];
}) {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<Inputs>();

	const { mutate, isPending } = useMutation({
		mutationFn: createInterview,
	});

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const addedData = {
			...data,
			start_date: format(start_date, "yyyy-MM-dd"),
			end_date: format(start_date, "yyyy-MM-dd"),
			selected_time: null,
			recruitment_id,
			application_id,
			unavailable_times: unavailable_times,
		};

		mutate(addedData);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-4 gap-8">
			<div className="space-y-1">
				<p className="text-sm font-medium text-gray-500">면접 제목</p>
				<Input
					{...register("title", { required: true })}
					name="title"
					className="block w-[220px] border-gray-200 border rounded-sm"
				/>
				{errors.title && (
					<p className="flex flex-row items-center text-sm gap-1 text-red-500">
						<LucideAlertCircle className="size-3" />
						면접 제목을 입력해주세요.
					</p>
				)}
			</div>

			<div className="space-y-1">
				<p className="text-sm font-medium text-gray-500">면접 기간</p>
				<div className="mt-1 flex items-center justify-between">
					<button
						type="button"
						onClick={prevWeek}
						className="flex justify-center items-center rounded-sm border-gray-200 border hover:bg-gray-100"
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
						className="flex justify-center items-center rounded-sm border-gray-200 border hover:bg-gray-100"
					>
						<LucideChevronRight className="h-5 w-5" />
					</button>
				</div>
			</div>

			<div className="space-y-1">
				<p className="text-sm font-medium text-gray-500">면접 시간</p>
				<Input
					{...register("duration", { required: true })}
					type="number"
					className="block w-[220px] border-gray-200 border rounded-sm"
				/>
				{errors.duration && (
					<p className="flex flex-row items-center text-sm gap-1 text-red-500">
						<LucideAlertCircle className="size-3" />
						면접 시간을 입력해주세요.
					</p>
				)}
			</div>

			<button
				type="submit"
				disabled={isPending}
				className="bg-black text-sm rounded-sm py-1 text-white cursor-pointer hover:opacity-50 flex justify-center"
			>
				{isPending ? (
					<LucideLoaderCircle className="animate-spin" />
				) : (
					"면접 제안"
				)}
			</button>
		</form>
	);
}
