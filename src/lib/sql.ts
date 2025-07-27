import postgres from "postgres";

// biome-ignore lint: env var assertion
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });
export default sql;
