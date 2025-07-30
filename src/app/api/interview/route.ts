// app/api/interview/route.ts

import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import sql from "@/lib/sql";
import type { Interview } from "@/lib/types";
import IntervewConfirmationEmail from "./_intreview-confirmation-email";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const {
			title,
			start_date,
			end_date,
			duration,
			unavailable_times: unavailableTimes,
			recruitment_id,
			application_id,
			selected_time,
		} = body as Interview;

		const applicationResult = await sql`
		SELECT email, name 
		FROM application_forms 
		WHERE id = ${application_id}
		`;

		if (applicationResult.length === 0) {
			return NextResponse.json(
				{ error: "해당 지원서를 찾을 수 없습니다." },
				{ status: 404 },
			);
		}

		const { name: user_name, email: user_email } = applicationResult[0];

		const interviewResult = await sql`
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
                ${JSON.stringify(selected_time)}
            )
			RETURNING id
        `;

		await resend.emails.send({
			// biome-ignore lint: env var assertion
			from: process.env.NEXT_PUBLIC_RESEND_DOMAIN!,
			to: [user_email],
			subject: `[${title}] 인터뷰 일정이 확정되었습니다.`,
			react: IntervewConfirmationEmail({
				name: user_name,
				interviewTitle: title,
				url: `${process.env.NEXT_PUBLIC_BASE_URL}/client/interview/${interviewResult[0].id}`,
			}),
		});

		return NextResponse.json({ sucess: true });
	} catch (error) {
		console.error("지원서 제출 처리 중 오류 발생:", error);
		return NextResponse.json(
			{ error: "서버 내부 오류가 발생했습니다." },
			{ status: 500 },
		);
	}
}
