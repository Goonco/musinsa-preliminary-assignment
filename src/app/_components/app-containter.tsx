import type { ReactNode } from "react";

export function AppContainer({ children }: { children: ReactNode }) {
	return (
		<div className="bg-amber-200 md:bg-white max-w-[960px] mx-auto">
			{children}
		</div>
	);
}
