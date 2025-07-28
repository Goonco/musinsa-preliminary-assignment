import { AppContainer, Footer, Header } from "./_components";

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Header />
				<AppContainer>{children}</AppContainer>
				<Footer />
			</body>
		</html>
	);
}
