"use client";

import { Checkbox, Field, Label } from "@headlessui/react";
import { useState } from "react";
import { useFilterParams } from "@/hooks";
import {
	CATEGORY,
	type Category,
	type Filter,
	type FilterKey,
} from "@/lib/types";

export const FilterSidebar = ({ filters }: { filters: Filter[] }) => {
	const { clearFilter } = useFilterParams();

	function filterFilters(category: Category) {
		return filters.filter((filter) => filter.category === category);
	}

	return (
		<div>
			{CATEGORY.map((category) => (
				<FiltersPerCategory
					key={category}
					category={category}
					filters={filterFilters(category)}
				/>
			))}
			<button onClick={clearFilter} type="button">
				필터 초기화
			</button>
		</div>
	);
};

export const categoryEngName: Record<Category, FilterKey> = {
	구분: "subsidaries",
	근무지: "place",
	직군: "occupations",
};

function FiltersPerCategory({
	category,
	filters,
}: {
	category: Category;
	filters: Filter[];
}) {
	const [display, setDisplay] = useState<boolean>(false);
	const { addFilter, removeFilter, hasFilter } = useFilterParams();

	const handleCheckClick = (val: string, isClicked: boolean) => {
		isClicked
			? removeFilter(categoryEngName[category], val)
			: addFilter(categoryEngName[category], val);
	};

	return (
		<div>
			<p className="text-lg">{category}</p>
			<button type="button" onClick={() => setDisplay((prev) => !prev)}>
				on/off
			</button>
			{display &&
				filters.map((item) => {
					const isClicked = hasFilter(categoryEngName[category], item.name);
					return (
						<div key={item.id}>
							<Field className="flex flex-row text-sm">
								<Checkbox
									checked={isClicked}
									onChange={() => handleCheckClick(item.name, isClicked)}
									className="group block size-4 rounded border bg-white data-checked:bg-blue-500"
								/>

								<Label>
									{item.name}
									{item.id}
								</Label>
							</Field>
						</div>
					);
				})}
		</div>
	);
}
