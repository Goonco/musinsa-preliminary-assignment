import postgres from "postgres";
import type { Filter } from "./types";

// biome-ignore lint: env var assertion
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchFilter() {
	try {
		const data = await sql<Filter[]>`SELECT * FROM filters`;
		return data;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch filter data.");
	}
}
