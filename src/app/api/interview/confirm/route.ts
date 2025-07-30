import { NextResponse } from "next/server";
import sql from "@/lib/sql";

export async function POST(req: Request) {
	try {
		const { interviewId, newSelectedTime } = await req.json();

		if (!interviewId || !newSelectedTime) {
			return NextResponse.json(
				{ error: "인터뷰 ID와 선택된 시간이 필요합니다." },
				{ status: 400 },
			);
		}

		await sql`
		UPDATE interviews
		SET selected_time = ${newSelectedTime}
		WHERE id = ${interviewId}
		`;

		const response = await fetch(process.env.SLACK_WEBHOOK_URL!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				text: `면접이 확정되었습니다, ${process.env.NEXT_PUBLIC_BASE_URL}/admin/interview/${interviewId} 를 확인하세요.`,
			}),
		});

		if (!response.ok) {
			const errorText = await response.text();
			return NextResponse.json(
				{ error: `Slack API 오류: ${errorText}` },
				{ status: 500 },
			);
		}

		return NextResponse.json({ sucess: true });
	} catch (error) {
		console.error("인터뷰 시간 업데이트 오류:", error);
		return NextResponse.json(
			{ error: "서버 내부 오류가 발생했습니다." },
			{ status: 500 },
		);
	}
}
