export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<header className="md:px-8 w-full p-3 flex flex-row items-center border-b space-x-3 border-gray-300">
				<p className="text-[0.5rem]">MUSINSA</p>
				<p className="font-bold text-xl">무신사</p>
			</header>
			<div className="max-w-[960px] mx-auto">{children}</div>
			<footer className="w-full bg-gray-50 py-8 px-6 space-y-6">
				<p className="font-semibold">무신사</p>
				<p className="font-thin text-[#939393] text-sm">
					&copy; 2012.MUSINSA Inc.all rights reserved.
				</p>
				<p className="font-thin text-[#939393] text-sm">made by Goonco</p>
			</footer>
		</>
	);
}
