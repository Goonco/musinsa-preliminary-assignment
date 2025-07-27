import type { ReactNode } from "react";

export function AppContainer({ children }: { children: ReactNode }) {
	return <div className="max-w-[960px] mx-auto">{children}</div>;
}
