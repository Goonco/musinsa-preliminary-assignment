import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div>
			<div>sidebar</div>
			<div>{children}</div>
		</div>
	);
}
