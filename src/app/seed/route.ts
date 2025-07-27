import { filters, recruitments } from "@/lib/placehodler-datas";
import sql from "@/lib/sql";

async function seedFilters() {
	await sql`
    CREATE TABLE IF NOT EXISTS filters (
      id SERIAL PRIMARY KEY,
      category VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      UNIQUE (category, name)
    );
  	`;

	const insertedFilters = await Promise.all(
		filters.map(async (filter) => {
			return sql`
	        INSERT INTO filters (category, name)
	        VALUES (${filter.category}, ${filter.name})
	        ON CONFLICT (category, name) DO NOTHING;
	      `;
		}),
	);

	return insertedFilters;
}

async function seedRecruitments() {
	await sql`
	CREATE TABLE IF NOT EXISTS recruitments (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
	  subsidaries VARCHAR(255) NOT NULL,
	  occupations VARCHAR(255) NOT NULL,
	  place VARCHAR(255) NOT NULL,
      UNIQUE (title, subsidaries, occupations, place)
    );
	`;

	const insertedRecruitments = await Promise.all(
		recruitments.map(async (recruitment) => {
			return sql`
	        INSERT INTO recruitments (title, subsidaries, occupations, place)
	        VALUES (${recruitment.title}, ${recruitment.subsidaries}, ${recruitment.occupations}, ${recruitment.place})
	        ON CONFLICT (title, subsidaries, occupations, place) DO NOTHING;
	      `;
		}),
	);

	return insertedRecruitments;
}

async function seedApplicationForm() {
	await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
	await sql`
	CREATE TABLE IF NOT EXISTS application_forms (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      recruitment_id INTEGER NOT NULL,
	  name VARCHAR(255) NOT NULL,
	  email VARCHAR(255) NOT NULL,
	  resume VARCHAR(2048) NOT NULL,
	  inflow_path VARCHAR(255),
      UNIQUE (name, email),
      FOREIGN KEY (recruitment_id) REFERENCES recruitments(id)
    );
	`;
}

// async function seedUsers() {
// 	await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
// 	await sql`
//     CREATE TABLE IF NOT EXISTS users (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email TEXT NOT NULL UNIQUE,
//       password TEXT NOT NULL
//     );
//   `;

// 	const insertedUsers = await Promise.all(
// 		users.map(async (user) => {
// 			const hashedPassword = await bcrypt.hash(user.password, 10);
// 			return sql`
//         INSERT INTO users (id, name, email, password)
//         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//         ON CONFLICT (id) DO NOTHING;
//       `;
// 		}),
// 	);

// 	return insertedUsers;
// }

// async function seedInvoices() {
//   await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await sql`
//     CREATE TABLE IF NOT EXISTS invoices (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       customer_id UUID NOT NULL,
//       amount INT NOT NULL,
//       status VARCHAR(255) NOT NULL,
//       date DATE NOT NULL
//     );
//   `;

//   const insertedInvoices = await Promise.all(
//     invoices.map(
//       (invoice) => sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedInvoices;
// }

// async function seedCustomers() {
//   await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await sql`
//     CREATE TABLE IF NOT EXISTS customers (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL,
//       image_url VARCHAR(255) NOT NULL
//     );
//   `;

//   const insertedCustomers = await Promise.all(
//     customers.map(
//       (customer) => sql`
//         INSERT INTO customers (id, name, email, image_url)
//         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedCustomers;
// }

// async function seedRevenue() {
//   await sql`
//     CREATE TABLE IF NOT EXISTS revenue (
//       month VARCHAR(4) NOT NULL UNIQUE,
//       revenue INT NOT NULL
//     );
//   `;

//   const insertedRevenue = await Promise.all(
//     revenue.map(
//       (rev) => sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedRevenue;
// }

export async function GET() {
	let res: Response = Response.json({
		message: "Database seeded successfully",
	});
	try {
		const result = await sql.begin((sql) => [
			seedFilters(),
			seedRecruitments(),
			seedApplicationForm(),
		]);
	} catch (error) {
		res = Response.json({ error }, { status: 500 });
	} finally {
		await sql.end();
	}
	return res;
}
