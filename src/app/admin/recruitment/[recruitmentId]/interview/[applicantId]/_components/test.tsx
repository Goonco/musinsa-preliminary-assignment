"use client";

export function Test() {
	const handleLogin = () => {
		// biome-ignore lint: env var assertion
		const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
		// biome-ignore lint: env var assertion
		const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL!}/api/auth/google/callback`;

		const scope = [
			"https://www.googleapis.com/auth/userinfo.profile",
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/calendar.events.readonly",
		].join(" ");

		const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

		const params = {
			client_id: GOOGLE_CLIENT_ID,
			redirect_uri: REDIRECT_URI,
			response_type: "code",
			scope: scope,
			access_type: "offline",
			prompt: "consent",
		};

		const queryString = new URLSearchParams(params).toString();
		const authUrl = `${oauth2Endpoint}?${queryString}`;

		window.open(authUrl, "_blank");
	};

	return (
		<button
			type="button"
			onClick={handleLogin}
			className="p-2 bg-blue-500 text-white rounded"
		>
			구글 캘린더 연동하기
		</button>
	);
}
