import { LucideBell, LucideCircleUser } from "lucide-react";
import type { ReactNode } from "react";
import { Sidebar } from "./_components";

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-row w-dvw h-dvh">
			<Sidebar />
			<div className="flex-1 flex flex-col">
				<div className="py-4 px-base-x-padding flex flex-row justify-end items-center gap-2">
					<LucideBell className="size-5" />
					<LucideCircleUser className="size-z" />
				</div>

				<div className="flex-1">{children}</div>
			</div>
		</div>
	);
}
