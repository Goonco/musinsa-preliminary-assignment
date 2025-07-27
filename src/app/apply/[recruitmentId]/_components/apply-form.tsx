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
		<form onSubmit={handleSubmit(onSubmit)}>
			<p>기본 정보 - 필수</p>
			<Input {...register("name", { required: true })} placeholder="이름" />
			{errors.name && <p>이름을 알맞게 입력해주세요.</p>}

			<Input
				{...register("email", { required: true, pattern: /^\S+@\S+$/i })}
				placeholder="이메일"
			/>
			{errors.email && <p>이메일을 알맞게 입력해주세요.</p>}

			<p>제출 서류</p>
			<Input {...register("resume", { required: true })} type="file" />

			<p>사전 질문</p>
			<select {...register("inflowPath")}>
				{INFLOW_PATH.map((inflowPath) => (
					<option key={inflowPath} value={inflowPath}>
						{inflowPath}
					</option>
				))}
			</select>

			<button className="block" type="submit">
				제출하기
			</button>
		</form>
	);
}
