export const CATEGORY = ["구분", "직군", "근무지"] as const;
export type Category = (typeof CATEGORY)[number];

export type Filter = {
	id: number;
	name: string;
	category: Category;
};

export type FilterKey = "subsidaries" | "place" | "occupations" | "query";

// export const : Record<Category, FilterKey> = {
// 	구분: "subsidaries",
// 	근무지: "place",
// 	직군: "occupations",
// };
