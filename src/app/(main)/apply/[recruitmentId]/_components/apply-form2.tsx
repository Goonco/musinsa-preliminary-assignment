// "use client";

// import { Input } from "@headlessui/react";
// import {
//   type FieldError,
//   type FieldValues,
//   type Path,
//   type SubmitHandler,
//   useForm,
//   type UseFormRegister,
// } from "react-hook-form";
// import { INFLOW_PATH, type InflowPath } from "@/lib/types";

// // --- Reusable Form Components ---

// function FormHeading({
//   heading,
//   required,
// }: {
//   heading: string;
//   required?: boolean;
// }) {
//   return (
//     <div className="flex flex-row items-center gap-2 pb-4">
//       <p className="text-xl font-medium">{heading}</p>
//       {required && (
//         <span className="text-sm text-red-600 font-extralight">필수</span>
//       )}
//     </div>
//   );
// }

// type FormFieldProps<T extends FieldValues> = {
//   name: Path<T>;
//   label: string;
//   type: string;
//   placeholder?: string;
//   register: UseFormRegister<T>;
//   error?: FieldError;
//   validation?: Parameters<UseFormRegister<T>>[1];
// };

// function FormField<T extends FieldValues>({
//   name,
//   label,
//   type,
//   placeholder,
//   register,
//   error,
//   validation,
// }: FormFieldProps<T>) {
//   return (
//     <div className="space-y-1">
//       <label htmlFor={name} className="sr-only">
//         {label}
//       </label>
//       <Input
//         id={name}
//         type={type}
//         placeholder={placeholder}
//         autoComplete="off"
//         {...register(name, validation)}
//         className="w-full border-b border-gray-200 py-3 font-normal px-2 data-focus:outline-black"
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
//     </div>
//   );
// }

// type SelectFieldProps<T extends FieldValues> = {
//   name: Path<T>;
//   register: UseFormRegister<T>;
//   error?: FieldError;
//   options: readonly string[];
//   validation?: Parameters<UseFormRegister<T>>[1];
// };

// function SelectField<T extends FieldValues>({
//   name,
//   register,
//   error,
//   options,
//   validation,
// }: SelectFieldProps<T>) {
//   return (
//     <div className="space-y-1">
//       <select
//         {...register(name, validation)}
//         className="w-full border-b border-gray-200 py-3 font-normal px-2 data-focus:outline-black"
//       >
//         {options.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//       {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
//     </div>
//   );
// }

// // --- Main ApplyForm Component ---

// type Inputs = {
//   name: string;
//   email: string;
//   resume: FileList;
//   inflowPath: InflowPath;
// };

// export function ApplyForm({ recruitmentId }: { recruitmentId: string }) {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm<Inputs>({
//     mode: "onBlur",
//   });

//   const onSubmit: SubmitHandler<Inputs> = async (data) => {
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("email", data.email);
//     formData.append("inflowPath", data.inflowPath);
//     formData.append("recruitmentId", recruitmentId);
//     formData.append("resume", data.resume[0]);

//     try {
//       const response = await fetch("/api/apply", {
//         method: "POST",
//         body: formData,
//       });
//       if (!response.ok) {
//         throw new Error("Failed to submit application");
//       }
//       // Handle successful submission (e.g., show a success message, redirect)
//       alert("지원이 완료되었습니다.");
//     } catch (error) {
//       console.error("Submission error:", error);
//       // Handle submission error (e.g., show an error message)
//       alert("지원 중 오류가 발생했습니다.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-16 mb-20">
//       <div>
//         <FormHeading heading="기본 정보" required />
//         <div className="space-y-4">
//           <FormField
//             label="이름"
//             name="name"
//             type="text"
//             placeholder="이름"
//             register={register}
//             error={errors.name}
//             validation={{ required: "이름을 입력해주세요." }}
//           />
//           <FormField
//             label="이메일"
//             name="email"
//             type="email"
//             placeholder="이메일"
//             register={register}
//             error={errors.email}
//             validation={{
//               required: "이메일을 입력해주세요.",
//               pattern: {
//                 value: /^\S+@\S+$/i,
//                 message: "이메일 형식이 올바르지 않습니다.",
//               },
//             }}
//           />
//         </div>
//       </div>

//       <div>
//         <FormHeading heading="이력서" required />
//         <FormField
//           label="이력서"
//           name="resume"
//           type="file"
//           register={register}
//           error={errors.resume}
//           validation={{ required: "이력서를 첨부해주세요." }}
//         />
//       </div>

//       <div>
//         <FormHeading heading="공고를 처음 접한 경로" required />
//         <SelectField
//           name="inflowPath"
//           register={register}
//           options={INFLOW_PATH}
//           error={errors.inflowPath}
//           validation={{ required: "유입 경로를 선택해주세요." }}
//         />
//       </div>

//       <button
//         className="block w-full bg-black text-white text-lg py-3 rounded-lg cursor-pointer disabled:opacity-50"
//         type="submit"
//         disabled={Object.keys(errors).length > 0}
//       >
//         제출하기
//       </button>
//     </form>
//   );
// }
