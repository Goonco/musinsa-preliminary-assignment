import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const timeMin = searchParams.get("timeMin");
	const timeMax = searchParams.get("timeMax");

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

		const isTokenExpired = tokens.expiry_date
			? Date.now() >= tokens.expiry_date
			: false;
		if (isTokenExpired) {
			const { credentials } = await oAuth2Client.refreshAccessToken();
			oAuth2Client.setCredentials(credentials);
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
