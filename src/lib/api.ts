import sql from "@/lib/sql";
import type {
	Filter,
	RecruitmentOverview,
	RecruitmentOverviewAdmin,
} from "./types";

export async function fetchFilter(): Promise<Filter[]> {
	try {
		const data = await sql<Filter[]>`SELECT id, name, category FROM filters`;
		return data;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch filter data.");
	}
}

export async function fetchAllRecruitmentOverviews(): Promise<
	RecruitmentOverview[]
> {
	try {
		const data = await sql<
			RecruitmentOverview[]
		>`SELECT id, deadline, title, subsidaries, occupations, place FROM recruitments`;
		return data;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch recruitment overviews.");
	}
}

export async function fetchAllRecruitmentOverviewsAdmin(): Promise<
	RecruitmentOverviewAdmin[]
> {
	try {
		const data = await sql<RecruitmentOverviewAdmin[]>`
        SELECT
            r.id,
            r.deadline,
            r.title,
            r.subsidaries,
            r.occupations,
            r.place,
            COUNT(af.id) AS application_count
        FROM
            recruitments AS r
        LEFT JOIN
            application_forms AS af ON r.id = af.recruitment_id
        GROUP BY
            r.id
		ORDER BY
			r.id DESC;
      `;
		return data;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch recruitment overviews.");
	}
}

export async function fetchRecruitmentTitleById(
	id: number,
): Promise<string | null> {
	try {
		const data = await sql<{ title: string }[]>`
          SELECT title 
          FROM recruitments 
          WHERE id = ${id}
        `;

		return data.length > 0 ? data[0].title : null;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch recruitment title.");
	}
}
