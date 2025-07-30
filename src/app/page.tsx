"use client";

import { Button } from "@headlessui/react";
import {
	LucideBook,
	LucideBriefcase,
	LucideContact,
	LucideRotateCw,
	LucideShapes,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState<boolean>(false);

	const handleSeedDatabase = async () => {
		setIsLoading(true);

		try {
			const response = await fetch("/api/seed?reset=true");
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "알 수 없는 오류가 발생했습니다.");
			}

			setSuccess(true);
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="w-dvw h-dvh flex items-center justify-center bg-[#F3F4F6]">
			<div className="max-w-80 shadow-lg bg-white rounded-lg py-8 px-10">
				<div className="text-center space-y-4">
					<LucideContact className="inline-block size-10" />
					<div className="space-y-1">
						<p className="text-lg font-bold">
							무신사 Frontend Engineer Assistant
						</p>
						<p className="text-[13px] font-light text-gray-500">
							채용 시스템 사전 과제
						</p>
						<p className="text-sm font-medium">송경호</p>
					</div>
				</div>
				<div className="mt-8 flex flex-col gap-2">
					<p className="text-xs text-gray-500 text-center mb-1">
						시작 전, Notion의 사용가이드를 확인해주세요.
					</p>

					<a
						className="py-2 w-full flex flex-row text-xs items-center justify-center gap-1.5 bg-[#3B82F6] shadow-sm font-semibold text-white rounded cursor-pointer hover:opacity-50 disabled:bg-gray-400 disabled:cursor-default"
						href="https://dawn-croissant-1ab.notion.site/musinsa-preliminary-assignment-23bcac7e27ef801da841ea99f1ca52c6"
						target="_blank"
						rel="noreferrer"
					>
						<LucideBook className="size-4" />
						Notion 보러가기
					</a>

					<Button
						onClick={() => {
							if (window.confirm("모든 데이터를 초기화합니다."))
								handleSeedDatabase();
						}}
						disabled={isLoading || success}
						className="py-2 w-full flex flex-row text-xs items-center justify-center gap-1.5 shadow-sm  bg-red-600 font-semibold text-white rounded cursor-pointer hover:opacity-50 disabled:bg-gray-400 disabled:cursor-default"
					>
						<LucideRotateCw className="size-4" />
						{isLoading
							? "DB 초기화 중"
							: success
								? "초기화 성공"
								: "DB 초기화 및 시딩"}
					</Button>
					<Link
						href="/client"
						className="shadow-sm py-2 w-full flex flex-row text-xs items-center justify-center gap-1.5 bg-gray-300 font-semibold rounded cursor-pointer hover:opacity-50 disabled:bg-gray-400 disabled:cursor-default"
					>
						<LucideBriefcase className="size-4" />
						오픈된 포지션 보러가기
					</Link>
					<Link
						href="/admin"
						className="shadow-sm py-2 w-full flex flex-row text-xs items-center justify-center gap-1.5 bg-gray-300 font-semibold rounded cursor-pointer hover:opacity-50 disabled:bg-gray-400 disabled:cursor-default"
					>
						<LucideShapes className="size-4" />
						대시보드 보러가기
					</Link>
					<p>슬랙 초대코드.</p>
				</div>
			</div>
		</div>
	);
}
