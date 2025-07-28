import clsx from "clsx";
import {
	LucideCalendarCheck,
	LucideGrip,
	type LucideIcon,
	LucideUserRoundCog,
} from "lucide-react";

type NavItem = {
	text: string;
	icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
	{
		text: "공고",
		icon: LucideGrip,
	},
	{
		text: "면접",
		icon: LucideCalendarCheck,
	},
	{
		text: "지원자",
		icon: LucideUserRoundCog,
	},
];

export function Sidebar() {
	return (
		<div className="bg-[#FAFAFA] shadow-[-8px_0px_10px_-10px_rgba(0,0,0,0.1)_inset] min-w-60">
			<div className="border-b border-gray-200 ">
				<div className="p-3 flex flex-row items-center gap-2">
					<div className="size-10 flex justify-center items-center bg-white rounded-sm shadow-sm text-[8px]">
						MUSINSA
					</div>
					<p className="text-lg font-bold">무신사</p>
				</div>

				<nav className="py-3">
					{NAV_ITEMS.map((ni) => (
						<NavBlock key={ni.text} navItem={ni} />
					))}
				</nav>
			</div>
		</div>
	);
}

function NavBlock({ navItem }: { navItem: NavItem }) {
	const isSelected = navItem.text === "공고";

	return (
		<div
			className={clsx(
				" w-full gap-2 py-1.5 px-4 flex flex-row items-center text-gray-600",
				isSelected && "bg-[#EBEBEB]",
			)}
		>
			<navItem.icon className="size-3.5" />
			<p className={clsx("text-sm", isSelected && "font-bold")}>
				{navItem.text}
			</p>
		</div>
	);
}
