// app/api/interview/route.ts

import { type NextRequest, NextResponse } from "next/server";
import sql from "@/lib/sql";
import type { Interview } from "@/lib/types";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const {
			title,
			start_date,
			end_date,
			duration,
			unavailableTimes,
			recruitment_id,
			application_id,
			selected_time,
		} = body as Interview;

		await sql`
            INSERT INTO interviews (
                title, 
                start_date, 
                end_date, 
                duration,
                unavailable_times,
                recruitment_id,
                application_id,
                selected_time
            ) VALUES (
                ${title},
                ${start_date},
                ${end_date},
                ${duration},
                ${JSON.stringify(unavailableTimes)},
                ${recruitment_id},
                ${application_id},
                ${selected_time}
            )
        `;

		return NextResponse.json({ sucess: true });
	} catch (error) {
		console.error("지원서 제출 처리 중 오류 발생:", error);
		return NextResponse.json(
			{ error: "서버 내부 오류가 발생했습니다." },
			{ status: 500 },
		);
	}
}
