import { OAuth2Client } from "google-auth-library";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const url = new URL(req.url);
	const code = url.searchParams.get("code");

	if (!code) {
		return NextResponse.json(
			{ error: "Authorization code not found" },
			{ status: 400 },
		);
	}

	try {
		const oAuth2Client = new OAuth2Client(
			process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
			process.env.GOOGLE_CLIENT_SECRET,
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`,
		);

		const { tokens } = await oAuth2Client.getToken(code);

		const response = NextResponse.redirect(new URL("/", req.url));

		response.cookies.set({
			name: "google-auth-tokens",
			value: JSON.stringify({
				access_token: tokens.access_token,
				refresh_token: tokens.refresh_token,
				expiry_date: tokens.expiry_date,
			}),
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			path: "/",
			sameSite: "lax",
		});

		return response;
	} catch (error) {
		console.error("Error exchanging authorization code for tokens:", error);
		return NextResponse.json(
			{ error: "Authentication failed" },
			{ status: 500 },
		);
	}
}
