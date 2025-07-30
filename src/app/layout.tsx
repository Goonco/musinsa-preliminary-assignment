import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "./_query-provider";

const pretendard = localFont({
	src: "../../public/PretendardVariable.woff2",
	display: "swap",
	variable: "--font-pretendared",
});

export const metadata: Metadata = {
	title: "Musinsa Recruit",
	description: "powered by NextJS",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={pretendard.className}>
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	);
}
