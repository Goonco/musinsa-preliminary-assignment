// import type { InputProps } from "@headlessui/react";
// import type {
// 	FieldError,
// 	FieldValues,
// 	Path,
// 	UseFormRegister,
// } from "react-hook-form";

// type FormFieldProps<T extends FieldValues> = {
// 	name: Path<T>;
// 	label: string;
// 	type: string;
// 	placeholder?: string;
// 	register: UseFormRegister<T>;
// 	error?: FieldError;
// 	validation?: Parameters<UseFormRegister<T>>[1];
// };

// function FormField<T extends FieldValues>({
// 	name,
// 	label,
// 	type,
// 	placeholder,
// 	register,
// 	error,
// 	validation,
// }: FormFieldProps<T>) {
// 	return (
// 		<div className="space-y-1">
// 			<label htmlFor={name} className="sr-only">
// 				{label}
// 			</label>
// 			<Input
// 				id={name}
// 				type={type}
// 				placeholder={placeholder}
// 				autoComplete="off"
// 				{...register(name, validation)}
// 				className="w-full border-b border-gray-200 py-3 font-normal px-2 data-focus:outline-black"
// 			/>
// 			{error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
// 		</div>
// 	);
// }
