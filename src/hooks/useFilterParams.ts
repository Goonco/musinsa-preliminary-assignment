import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FilterKey } from "@/lib/types";

export const useFilterParams = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	function update(queryString: string) {
		router.push(`${pathname}?${queryString}`);
	}

	function clearFilter() {
		router.push(pathname);
	}

	function addFilter(key: FilterKey, value: string) {
		const params = new URLSearchParams(searchParams);
		params.append(key, value);
		update(params.toString());
	}

	function removeFilter(key: FilterKey, value: string) {
		const params = new URLSearchParams();
		for (const [k, v] of searchParams.entries())
			if (!(k === key && v === value)) params.append(k, v);
		update(params.toString());
	}

	function hasFilter(key: FilterKey, value: string) {
		return searchParams.getAll(key).includes(value);
	}

	return { clearFilter, addFilter, removeFilter, hasFilter };
};
