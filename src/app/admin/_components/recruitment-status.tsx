import clsx from "clsx";
import { isClosed } from "@/lib/utils";

export function RecruitmentStatus({ deadline }: { deadline: string }) {
	const closeFlag = isClosed(deadline);

	return (
		<div className="flex flex-row gap-2 items-center">
			<span
				className={clsx(
					"size-2 block rounded-full",
					closeFlag ? "bg-red-600" : "bg-green-600",
				)}
			/>
			<p className="text-xs">{closeFlag ? "마감" : "진행중"}</p>
		</div>
	);
}
