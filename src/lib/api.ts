import sql from "@/lib/sql";
import type { Filter, RecruitOverview } from "./types";

export async function fetchFilter(): Promise<Filter[]> {
	try {
		const data = await sql<Filter[]>`SELECT id, name, category FROM filters`;
		return data;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch filter data.");
	}
}

export async function fetchRecruitmentOverview(): Promise<RecruitOverview[]> {
	try {
		const data = await sql<
			RecruitOverview[]
		>`SELECT id, title, subsidaries, occupations, place FROM recruitments`;
		return data;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch filter data.");
	}
}
