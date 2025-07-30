import sql from "@/lib/sql";
import type {
	ApplicantOverview,
	Filter,
	Interview,
	RecruitmentOverview,
	RecruitmentOverviewAdmin,
} from "./types";

export async function fetchFilter(): Promise<Filter[]> {
	try {
		const data = await sql<Filter[]>`SELECT id, name, category FROM filters`;
		return data;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch filter data");
	}
}

export async function fetchAllRecruitmentOverviews(): Promise<
	RecruitmentOverview[]
> {
	try {
		return await sql<RecruitmentOverview[]>`
            SELECT id, deadline, title, subsidaries, occupations, place 
            FROM recruitments
            WHERE 
                deadline::DATE >= CURRENT_DATE - INTERVAL '1 month'
            ORDER BY deadline DESC
        `;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch recruitment overviews");
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
		throw new Error("Failed to fetch recruitment overviews");
	}
}

export async function fetchRecruitmentTitleById(
	id: number,
): Promise<string | null> {
	try {
		const data = await sql<{ title: string }[]>`
          SELECT title 
          FROM recruitments 
          WHERE id = ${id} AND deadline::DATE > NOW()
        `;

		return data.length > 0 ? data[0].title : null;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch recruitment title");
	}
}

export async function fetchApplicantsByRecruitmentId(
	id: number,
): Promise<ApplicantOverview[]> {
	try {
		const data = await sql<ApplicantOverview[]>`
          SELECT id, name, email
          FROM application_forms
          WHERE recruitment_id = ${id}
        `;

		return data;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch applicatns by recruitment id");
	}
}

export async function fetchInterviewById(
	id: string,
): Promise<Interview | null> {
	try {
		const data = await sql<Interview[]>`
          SELECT title, start_date, end_date, duration, unavailable_times, selected_time 
          FROM interviews
          WHERE id = ${id}
        `;

		if (data.length <= 0) return null;
		if (typeof data[0].unavailable_times === "string") {
			return {
				...data[0],
				unavailable_times: JSON.parse(data[0].unavailable_times),
			};
		}
		return data[0];
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch interview");
	}
}
