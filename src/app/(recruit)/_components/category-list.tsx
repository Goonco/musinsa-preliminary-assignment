"use client";

import { Checkbox, Field, Label } from "@headlessui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import type { Category } from "@/utils/types";

type data = {
	category: Category;
	item: string;
};
const DATAS: data[] = [
	{
		category: "구분",
		item: "무신사",
	},
	{
		category: "구분",
		item: "29CM",
	},
	{
		category: "구분",
		item: "무신사 스탠다드",
	},
	{
		category: "직군",
		item: "Backend Engineer",
	},
	{
		category: "직군",
		item: "Frontend Engineer",
	},
	{
		category: "직군",
		item: "Product Designer",
	},
	{
		category: "근무지",
		item: "무신사",
	},
	{
		category: "근무지",
		item: "무신사 성수 (E2)",
	},
];

export const categoryEngName: Record<Category, string> = {
	구분: "subsidaries",
	근무지: "place",
	직군: "occupations",
};

export function CategoryList({ category }: { category: Category }) {
	const [display, setDisplay] = useState<boolean>(false);

	const items = DATAS.filter((data) => data.category === category);

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createQueryString = (name: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.append(name, value);

		return params.toString();
	};

	const removeQueryString = (name: string, value: string) => {
		const newParams = new URLSearchParams();
		for (const [k, v] of searchParams.entries()) {
			if (!(k === name && v === value)) {
				newParams.append(k, v);
			}
		}

		return newParams.toString();
	};

	const handleCheckClick = (val: string, isClicked: boolean) => {
		if (!isClicked) {
			router.push(
				`${pathname}?${createQueryString(categoryEngName[category], val)}`,
			);
		} else {
			router.push(
				`${pathname}?${removeQueryString(categoryEngName[category], val)}`,
			);
		}
	};

	return (
		<Suspense>
			<div>
				<p className="text-lg">{category}</p>
				<button type="button" onClick={() => setDisplay((prev) => !prev)}>
					on/off
				</button>
				{display &&
					items.map((item) => {
						const isClicked = searchParams
							.getAll(categoryEngName[category])
							.includes(item.item);

						return (
							<div key={item.item}>
								<Field className="flex flex-row text-sm">
									<Checkbox
										checked={isClicked}
										onChange={() => handleCheckClick(item.item, isClicked)}
										className="group block size-4 rounded border bg-white data-checked:bg-blue-500"
									/>

									<Label>{item.item}</Label>
								</Field>
							</div>
						);
					})}
			</div>
		</Suspense>
	);
}
