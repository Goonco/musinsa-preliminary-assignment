import { OAuth2Client } from "google-auth-library";
import { type NextRequest, NextResponse } from "next/server";

// GET 요청을 처리하는 비동기 함수
export async function GET(req: NextRequest) {
	// 1. 요청 URL에서 'code' 파라미터를 추출합니다. (예: ...?code=4/0AY...&scope=...)
	const url = new URL(req.url);
	const code = url.searchParams.get("code");

	// 2. 'code'가 없으면 에러 응답을 보냅니다.
	if (!code) {
		return NextResponse.json(
			{ error: "Authorization code not found" },
			{ status: 400 },
		);
	}

	try {
		// 3. OAuth2Client 인스턴스를 생성합니다.
		// 서버 환경이므로 process.env에서 바로 비밀 키를 읽을 수 있습니다.
		const oAuth2Client = new OAuth2Client(
			process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
			process.env.GOOGLE_CLIENT_SECRET,
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`, // 리디렉션 URI
		);

		// 4. 받아온 'code'를 이용해 구글 서버에 토큰을 요청합니다.
		// 이 함수가 서버-투-서버 통신을 통해 토큰을 받아옵니다.
		const { tokens } = await oAuth2Client.getToken(code);

		// 5. 인증 성공 후 사용자를 리디렉션시킬 응답 객체를 생성합니다.
		// 여기서는 홈페이지('/')로 보냅니다.
		const response = NextResponse.redirect(new URL("/", req.url));

		// 6. 받아온 토큰들을 안전한 httpOnly 쿠키에 저장합니다.
		// httpOnly: 브라우저의 자바스크립트에서 이 쿠키에 접근할 수 없게 하여 XSS 공격을 방지합니다.
		response.cookies.set({
			name: "google-auth-tokens", // 쿠키 이름
			value: JSON.stringify({
				// 토큰 객체를 문자열로 변환하여 저장
				access_token: tokens.access_token,
				refresh_token: tokens.refresh_token,
				expiry_date: tokens.expiry_date,
			}),
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // 프로덕션 환경에서는 HTTPS에서만 쿠키 전송
			path: "/", // 쿠키가 사용될 경로
			sameSite: "lax", // CSRF 공격을 일부 방지
		});

		// 7. 쿠키가 설정된 응답을 클라이언트에게 보냅니다.
		return response;
	} catch (error) {
		console.error("Error exchanging authorization code for tokens:", error);
		return NextResponse.json(
			{ error: "Authentication failed" },
			{ status: 500 },
		);
	}
}
