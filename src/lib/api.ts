import { unstable_noStore } from "next/cache";
import postgres from "postgres";
import type { Filter } from "./types";

// biome-ignore lint: env var assertion
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchFilter(): Promise<Filter[]> {
	unstable_noStore();
	try {
		const data = await sql<Filter[]>`SELECT id, name, category FROM filters`;
		return data;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch filter data.");
	}
}
