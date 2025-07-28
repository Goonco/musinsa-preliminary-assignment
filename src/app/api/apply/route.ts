import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import sql from "@/lib/sql";

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const recruitmentId = formData.get("recruitmentId") as string;
		const inflowPath = formData.get("inflowPath") as string;
		const resume = formData.get("resume") as File;

		console.log(name, email, recruitmentId, inflowPath, resume);

		const blob = await put(resume.name, resume, {
			access: "public",
		});

		await sql`
        INSERT INTO application_forms (recruitment_id, name, email, resume, inflow_path)
        VALUES (${recruitmentId}, ${name}, ${email}, ${blob.url}, ${inflowPath});
        `;

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("지원서 제출 처리 중 오류 발생:", error);
		return NextResponse.json(
			{ error: "서버 내부 오류가 발생했습니다." },
			{ status: 500 },
		);
	}
}
