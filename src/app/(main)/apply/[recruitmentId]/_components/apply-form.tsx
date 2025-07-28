"use client";

import { Input } from "@headlessui/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { INFLOW_PATH, type InflowPath } from "@/lib/types";

type Inputs = {
	name: string;
	email: string;
	resume: FileList;
	inflowPath: InflowPath;
};

export function ApplyForm({ recruitmentId }: { recruitmentId: string }) {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		console.log(data);
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("email", data.email);
		formData.append("inflowPath", data.inflowPath);
		formData.append("recruitmentId", recruitmentId);

		formData.append("resume", data.resume[0]);

		// try {
		// 	await fetch("/api/apply", {
		// 		method: "POST",
		// 		body: formData,
		// 	});
		// } catch (error) {
		// 	console.log(error);
		// } finally {
		// }
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-16 mb-20">
			<div>
				<FormHeading heading="기본 정보" required />

				<div className="space-y-2">
					<Input
						{...register("name", { required: true })}
						placeholder="이름"
						autoComplete="off"
						className="w-full border-b border-gray-200 py-3 font-normal px-2 data-focus:outline-black"
					/>
					{errors.name && <p>이름을 알맞게 입력해주세요.</p>}

					<Input
						{...register("email", { required: true, pattern: /^\S+@\S+$/i })}
						placeholder="이메일"
						autoComplete="off"
						className="w-full border-b border-gray-200 py-3 font-normal"
					/>
					{errors.email && <p>이메일을 알맞게 입력해주세요.</p>}
				</div>
			</div>

			<div>
				<FormHeading heading="이력서" required />
				<Input
					{...register("resume", { required: true })}
					type="file"
					className="w-full"
				/>
			</div>

			<div>
				<FormHeading heading="공고를 처음 접한 경로" required />
				<select {...register("inflowPath")}>
					{INFLOW_PATH.map((inflowPath) => (
						<option key={inflowPath} value={inflowPath}>
							{inflowPath}
						</option>
					))}
				</select>
			</div>

			<button
				className="block w-full bg-black text-white text-lg py-3 rounded-lg cursor-pointer"
				type="submit"
			>
				제출하기
			</button>
		</form>
	);
}

function FormHeading({
	heading,
	required,
}: {
	heading: string;
	required?: boolean;
}) {
	return (
		<div className="flex flex-row items-center gap-2 pb-4">
			<p className="text-xl font-medium">{heading}</p>
			{required && (
				<span className="text-sm text-red-600 font-extralight">필수</span>
			)}
		</div>
	);
}
