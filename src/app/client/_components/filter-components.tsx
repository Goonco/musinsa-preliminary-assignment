"use client";

import { Input } from "@headlessui/react";
import { Suspense } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useFilterParams } from "@/hooks";
import type { Filter } from "@/lib/types";
import { FilterSidebar } from "./filter-sidebar";

export function FilterComponents({ filters }: { filters: Filter[] }) {
	const { setFilter, getFilter } = useFilterParams();

	const handleSearch = useDebouncedCallback((term: string) => {
		setFilter("title", term);
	}, 300);

	return (
		<Suspense>
			<div className="px-base-x-padding md:px-0 flex gap-2">
				<Input
					placeholder="검색"
					autoComplete="off"
					className="flex-1 border border-gray-300 data-focus:outline-2 data-focus:outline-gray-500 hover:border-gray-500 rounded-sm py-3 pl-4 font-light text-base placeholder:text-gray-300 md:py-2"
					onChange={(e) => handleSearch(e.target.value)}
					defaultValue={getFilter("title")}
				/>

				<Sheet>
					<SheetTrigger className="md:hidden block border-gray-300 border rounded-sm text-sm font-semibold px-4 hover:bg-gray-100 cursor-pointer">
						필터
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle />
							<SheetDescription />
						</SheetHeader>
						<FilterSidebar filters={filters} />
					</SheetContent>
				</Sheet>
			</div>
		</Suspense>
	);
}
