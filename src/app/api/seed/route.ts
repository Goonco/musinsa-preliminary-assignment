import { type NextRequest, NextResponse } from "next/server";
import { filters, recruitments } from "@/lib/placehodler-datas";
import sql from "@/lib/sql";

async function seedFilters(forceReset: boolean) {
	if (forceReset) {
		await sql`DROP TABLE IF EXISTS filters CASCADE;`;
	}

	await sql`
    CREATE TABLE IF NOT EXISTS filters (
      id SERIAL PRIMARY KEY,
      category VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL
    );
  	`;

	if (forceReset) {
		const insertedFilters = await Promise.all(
			filters.map(async (filter) => {
				return sql`
	        INSERT INTO filters (category, name)
	        VALUES (${filter.category}, ${filter.name})
	      `;
			}),
		);

		return insertedFilters;
	}
}

async function seedRecruitments(forceReset: boolean) {
	if (forceReset) {
		await sql`DROP TABLE IF EXISTS recruitments CASCADE;`;
	}

	await sql`
	CREATE TABLE IF NOT EXISTS recruitments (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
	  subsidaries VARCHAR(255) NOT NULL,
	  occupations VARCHAR(255) NOT NULL,
	  place VARCHAR(255) NOT NULL,
	  deadline VARCHAR(255) NOT NULL
    );
	`;

	if (forceReset) {
		const insertedRecruitments = await Promise.all(
			recruitments.map(async (recruitment) => {
				return sql`
	        INSERT INTO recruitments (title, subsidaries, occupations, place, deadline)
	        VALUES (${recruitment.title}, ${recruitment.subsidaries}, ${recruitment.occupations}, ${recruitment.place}, ${recruitment.deadline})
	      `;
			}),
		);

		return insertedRecruitments;
	}
}

async function seedApplicationForm(forceReset: boolean) {
	if (forceReset) {
		await sql`DROP TABLE IF EXISTS application_forms CASCADE;`;
	}

	await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
	await sql`
	CREATE TABLE IF NOT EXISTS application_forms (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      recruitment_id INTEGER NOT NULL,
	  name VARCHAR(255) NOT NULL,
	  email VARCHAR(255) NOT NULL,
	  resume VARCHAR(2048) NOT NULL,
	  inflow_path VARCHAR(255),
      FOREIGN KEY (recruitment_id) REFERENCES recruitments(id)
    );
	`;
}

async function seedInterviews(forceReset: boolean) {
	if (forceReset) {
		await sql`DROP TABLE IF EXISTS interviews CASCADE;`;
	}

	await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
	await sql`
    CREATE TABLE IF NOT EXISTS interviews (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      duration INTEGER NOT NULL,
      unavailable_times JSONB NOT NULL,
      selected_time JSONB,
      recruitment_id INTEGER NOT NULL,
      application_id UUID NOT NULL,
      FOREIGN KEY (recruitment_id) REFERENCES recruitments(id),
      FOREIGN KEY (application_id) REFERENCES application_forms(id)
    );
	`;
}

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const shouldReset = searchParams.get("reset") === "true";

		await sql.begin(async (sql) => {
			await seedFilters(shouldReset);
			await seedRecruitments(shouldReset);
			await seedApplicationForm(shouldReset);
			await seedInterviews(shouldReset);
		});

		return NextResponse.json({
			message: `Database seeded successfully ${shouldReset ? "with reset" : "with no reset"}`,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: (error as Error).message },
			{ status: 500 },
		);
	}
}
