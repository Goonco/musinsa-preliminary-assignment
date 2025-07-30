"use client";

import { Button } from "@headlessui/react";
import { LucideArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
	const router = useRouter();

	return (
		<Button
			onClick={() => router.back()}
			className="my-6 block hover:bg-gray-100 p-4 w-fit rounded-md cursor-pointer"
		>
			<LucideArrowLeft />
		</Button>
	);
}
