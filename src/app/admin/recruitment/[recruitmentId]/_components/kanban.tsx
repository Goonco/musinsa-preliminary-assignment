"use client";

import { LucideSmilePlus } from "lucide-react";
import {
	KanbanBoard,
	KanbanCard,
	KanbanCards,
	KanbanHeader,
	KanbanProvider,
} from "@/components/ui/shadcn-io/kanban";
import type { ApplicantOverview } from "@/lib/types";

function pushColumns(ao: ApplicantOverview[]) {
	return ao.map((o) => {
		return {
			...o,
			column: "1",
		};
	});
}

const columns = [
	{ id: "1", name: "접수", color: "#6B7280" },
	{ id: "2", name: "서류 평가", color: "#F59E0B" },
	{ id: "3", name: "면접", color: "#10B981" },
	{ id: "4", name: "평가 완료", color: "#ababab" },
];

type ColumnedOverview = ApplicantOverview & { column: string };

export function Kanban({
	applicantOverviews,
}: {
	applicantOverviews: ApplicantOverview[];
}) {
	const datas = pushColumns(applicantOverviews);
	return (
		<KanbanProvider columns={columns} data={datas}>
			{(column) => (
				<KanbanBoard id={column.id} key={column.id}>
					<KanbanHeader>
						<div className="flex flex-row items-center gap-1">
							<LucideSmilePlus className="size-4 text-gray-400" />
							<p>{column.name}</p>
						</div>
					</KanbanHeader>
					<KanbanCards id={column.id}>
						{(feature) => {
							const overview = feature as ColumnedOverview;
							return (
								<KanbanCard
									column={column.name}
									id={feature.id}
									key={feature.id}
									name={feature.name}
									className="bg-white rounded-md divide-y"
								>
									<div className="px-3 py-2">
										<p className="text-base font-bold">{overview.name}</p>
										<p className="text-sm">{overview.email}</p>
									</div>
									<p className="px-3 py-2">평가 중</p>
								</KanbanCard>
							);
						}}
					</KanbanCards>
				</KanbanBoard>
			)}
		</KanbanProvider>
	);
}
