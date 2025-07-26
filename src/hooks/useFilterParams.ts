import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FilterKey } from "@/lib/types";

export const useFilterParams = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	function update(params: URLSearchParams) {
		router.push(`${pathname}?${params.toString()}`);
	}

	function clearFilter() {
		const params = new URLSearchParams();
		params.append("title", searchParams.get("title") ?? "");
		update(params);
	}

	function getFilter(key: FilterKey) {
		return searchParams.get(key)?.toString();
	}

	function addFilter(key: FilterKey, value: string) {
		const params = new URLSearchParams(searchParams);
		params.append(key, value);
		update(params);
	}

	function removeFilter(key: FilterKey, value: string) {
		const params = new URLSearchParams();
		for (const [k, v] of searchParams.entries())
			if (!(k === key && v === value)) params.append(k, v);
		update(params);
	}

	function setFilter(key: FilterKey, value: string) {
		const params = new URLSearchParams(searchParams);

		if (value) params.set(key, value);
		else params.delete(key);

		update(params);
	}

	function hasFilter(key: FilterKey, value: string) {
		return searchParams.getAll(key).includes(value);
	}

	function checkFilter(key: FilterKey, value: string) {
		if (searchParams.getAll(key).length === 0) return true;

		if (key === "title") return value.includes(searchParams.get(key) ?? "");
		else return hasFilter(key, value);
	}

	return {
		clearFilter,
		addFilter,
		getFilter,
		removeFilter,
		hasFilter,
		setFilter,
		checkFilter,
	};
};
