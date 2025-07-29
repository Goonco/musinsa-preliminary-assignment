import { AppContainer, Footer, Header } from "./_components";

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			<AppContainer>{children}</AppContainer>
			<Footer />
		</>
	);
}
