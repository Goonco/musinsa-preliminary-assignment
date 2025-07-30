"use client";

import { Button, Checkbox, Field, Label } from "@headlessui/react";
import { LucideChevronUp } from "lucide-react";
import { Suspense, useState } from "react";
import { useFilterParams } from "@/hooks";
import {
	CATEGORY,
	type Category,
	type Filter,
	type FilterKey,
} from "@/lib/types";
import { cn } from "@/lib/utils";

const categoryEngName: Record<Category, FilterKey> = {
	구분: "subsidaries",
	근무지: "place",
	직군: "occupations",
};

export const FilterSidebar = ({ filters }: { filters: Filter[] }) => {
	const { clearFilter } = useFilterParams();

	function filterFilters(category: Category) {
		return filters.filter((filter) => filter.category === category);
	}

	return (
		<Suspense>
			<div className="p-5 md:p-0 md:w-52">
				<div className="md:hidden mb-8 flex flex-row justify-between items-center">
					<p className="text-[22px] font-medium">필터</p>
					<Button
						onClick={clearFilter}
						className="block border-gray-300 border rounded-sm text-sm px-2 py-1 hover:bg-gray-100 cursor-pointer"
					>
						초기화
					</Button>
				</div>
				<div className="divide-y space-y-4">
					{CATEGORY.map((category) => (
						<FiltersPerCategory
							key={category}
							category={category}
							filters={filterFilters(category)}
						/>
					))}
				</div>
				<Button
					onClick={clearFilter}
					className="md:block hidden border-gray-300 border rounded-sm text-sm px-2 py-1 hover:bg-gray-100 cursor-pointer"
				>
					초기화
				</Button>
			</div>
		</Suspense>
	);
};

function FiltersPerCategory({
	category,
	filters,
}: {
	category: Category;
	filters: Filter[];
}) {
	const [display, setDisplay] = useState<boolean>(true);
	const { addFilter, removeFilter, hasFilter } = useFilterParams();

	const handleCheckClick = (val: string, isClicked: boolean) => {
		isClicked
			? removeFilter(categoryEngName[category], val)
			: addFilter(categoryEngName[category], val);
	};

	return (
		<Suspense>
			<div>
				<div className="flex flex-row justify-between items-center">
					<p className="text-[16px] font-medium">{category}</p>
					<Button onClick={() => setDisplay((prev) => !prev)}>
						<LucideChevronUp
							className={cn("size-5 transition", !display && "rotate-180")}
						/>
					</Button>
				</div>
				<div className="py-4 space-y-3">
					{display &&
						filters.map((item) => {
							const isClicked = hasFilter(categoryEngName[category], item.name);
							return (
								<div key={item.id}>
									<Field className="flex md:text-sm flex-row items-center gap-2">
										<Checkbox
											checked={isClicked}
											onChange={() => handleCheckClick(item.name, isClicked)}
											className="block size-4 rounded border bg-white data-checked:bg-black"
										/>

										<Label className="font-light">{item.name}</Label>
									</Field>
								</div>
							);
						})}
				</div>
			</div>
		</Suspense>
	);
}
