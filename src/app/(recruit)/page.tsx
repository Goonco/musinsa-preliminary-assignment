"use client";

import { usePathname, useRouter } from "next/navigation";
import { CategoryList } from "./component/category-list";

const CATEGORY = ["구분", "직군", "근무지"] as const;
export type Category = (typeof CATEGORY)[number];

export default function Page() {
	const router = useRouter();
	const pathname = usePathname();

	function clearParams() {
		router.push(pathname);
	}

	return (
		<div className="text-2xl">
			<div>
				<h1>TEAM MUSINSA</h1>
				<h2>Careers</h2>
			</div>
			<div>
				{CATEGORY.map((category) => (
					<CategoryList key={category} category={category} />
				))}
				<button onClick={clearParams} type="button">
					필터 초기화
				</button>
			</div>
		</div>
	);
}
