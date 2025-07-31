"use client";

import { Button, Input } from "@headlessui/react";
import {
	LucideAlertCircle,
	LucideAsterisk,
	LucideLoaderCircle,
	LucideUpload,
} from "lucide-react";
import { type InputHTMLAttributes, useState } from "react";
import {
	type FieldErrors,
	type SubmitHandler,
	type UseFormRegister,
	useForm,
} from "react-hook-form";
import { INFLOW_PATH, type InflowPath } from "@/lib/types";
import { cn } from "@/lib/utils";

type Inputs = {
	name: string;
	email: string;
	resume: FileList;
	inflowPath: InflowPath | null;
};

const ERROR_MSG: Record<keyof Inputs, string> = {
	name: "이름을 알맞게 입력해 주세요.",
	email: "이메일을 알맞게 입력해 주세요.",
	resume: "이력서 파일을 알맞게 삽입해 주세요.",
	inflowPath: "유입 경로를 알맞게 선택해 주세요.",
};

export function ApplyForm({ recruitmentId }: { recruitmentId: string }) {
	const [isLoading, setLoading] = useState<boolean>(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<Inputs>({
		defaultValues: {
			name: "",
			email: "",
			inflowPath: null,
		},
	});

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("email", data.email);
		if (data.inflowPath) {
			formData.append("inflowPath", data.inflowPath);
		}
		formData.append("recruitmentId", recruitmentId);

		formData.append("resume", data.resume[0]);

		try {
			setLoading(true);
			await fetch("/api/apply", {
				method: "POST",
				body: formData,
			});
			alert("제출이 완료되었습니다.");
		} catch (error) {
			console.log(error);
			alert("알 수 없는 이유로 실패하였습니다.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-20 mb-20">
			<div>
				<FormHeading heading="기본 정보" required />

				<div className="space-y-4">
					<CustomInput
						errors={errors}
						formName="name"
						register={register}
						placeholder="이름"
					/>

					<CustomInput
						errors={errors}
						formName="email"
						register={register}
						placeholder="이메일"
					/>
				</div>
			</div>

			<div>
				<FormHeading heading="이력서" required />
				<CustomInput
					errors={errors}
					formName="resume"
					register={register}
					type="file"
				/>
			</div>

			<div>
				<FormHeading heading="공고를 처음 접한 경로" />
				<div className="flex flex-col gap-2">
					{INFLOW_PATH.map((inflowPath) => (
						<label
							key={inflowPath}
							className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-50"
						>
							<input
								type="radio"
								value={inflowPath}
								{...register("inflowPath")}
							/>
							<span>{inflowPath}</span>
						</label>
					))}
				</div>
			</div>

			<Button
				disabled={isLoading}
				className="w-full bg-black hover:opacity-70 flex justify-center items-center text-white text-lg py-3 rounded-lg cursor-pointer"
				type="submit"
			>
				{isLoading ? (
					<LucideLoaderCircle className="size-4 animate-spin" />
				) : (
					"제출하기"
				)}
			</Button>
		</form>
	);
}

type CustomInputProps = {
	errors: FieldErrors<Inputs>;
	formName: keyof Inputs;
	register: UseFormRegister<Inputs>;
} & InputHTMLAttributes<HTMLInputElement>;

function CustomInput({
	errors,
	formName,
	register,
	...rest
}: CustomInputProps) {
	const { ref, onChange, ...restOfRegister } = register(formName, {
		required: true,
	});

	const [fileName, setFileName] = useState("");
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e);
		e.target.files?.[0] ? setFileName(e.target.files[0].name) : setFileName("");
	};

	return (
		<div className="space-y-2">
			{formName === "resume" ? (
				<div className="w-full space-y-2">
					<p className="flex flex-row items-center text-sm gap-1 text-gray-500">
						<LucideAsterisk className="size-3" />
						PDF 형식으로 제출해주세요.
					</p>
					<label
						htmlFor={formName}
						className={cn(
							"w-full flex flex-row gap-2 items-center px-4 py-3 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300",
							errors[formName] && "bg-red-50 text-red-600",
						)}
					>
						{fileName ? (
							<span>선택된 파일: {fileName}</span>
						) : (
							<>
								<LucideUpload className="size-4" /> 파일 선택
							</>
						)}
					</label>

					<input
						id={formName}
						type="file"
						className="hidden"
						{...restOfRegister}
						ref={ref}
						onChange={handleFileChange}
					/>
				</div>
			) : (
				<Input
					{...register(
						formName,
						formName === "email"
							? { required: true, pattern: /^\S+@\S+$/i }
							: { required: true },
					)}
					{...rest}
					autoComplete="off"
					className={cn(
						"w-full border-b border-gray-200 py-3 font-normal px-2 data-focus:outline-none",
						errors[formName] && "bg-red-50 border-red-600 text-red-600",
					)}
				/>
			)}

			{errors[formName] && (
				<p className="flex flex-row items-center text-sm gap-1 text-red-500">
					<LucideAlertCircle className="size-3" />
					{ERROR_MSG[formName]}
				</p>
			)}
		</div>
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
