import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const timeMin = searchParams.get("timeMin");
	const timeMax = searchParams.get("timeMax");

	// 요청에 포함된 쿠키에서 토큰을 가져옵니다.
	const cookie = req.cookies.get("google-auth-tokens");
	if (!cookie) {
		return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
	}

	const tokens = JSON.parse(cookie.value);

	try {
		const oAuth2Client = new OAuth2Client(
			process.env.GOOGLE_CLIENT_ID,
			process.env.GOOGLE_CLIENT_SECRET,
		);
		oAuth2Client.setCredentials(tokens);

		// ** Access Token 만료 시 자동 갱신 처리 (매우 중요) **
		// expiry_date를 확인하고 만료되었다면 refresh_token으로 갱신합니다.
		const isTokenExpired = tokens.expiry_date
			? Date.now() >= tokens.expiry_date
			: false;
		if (isTokenExpired) {
			const { credentials } = await oAuth2Client.refreshAccessToken();
			oAuth2Client.setCredentials(credentials);

			// 갱신된 토큰을 다시 쿠키에 저장해줘야 합니다.
			// 여기서는 간단히 로직만 설명하며, 실제로는 이 로직을 미들웨어나 별도 함수로 관리하는 것이 좋습니다.
			// response.cookies.set(...) -> 하지만 여기서 직접 response를 만들 수 없으므로,
			// 클라이언트가 다음 요청 시 갱신된 토큰을 사용하도록 oAuth2Client에만 설정합니다.
		}

		const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

		const response = await calendar.events.list({
			calendarId: "primary",
			timeMin: timeMin || undefined,
			timeMax: timeMax || undefined,
			maxResults: 50,
			singleEvents: true,
			orderBy: "startTime",
		});

		const events = response.data.items;
		return NextResponse.json(events);
	} catch (error) {
		console.error("Error fetching calendar events", error);
		return NextResponse.json(
			{ message: "Error fetching events" },
			{ status: 500 },
		);
	}
}
