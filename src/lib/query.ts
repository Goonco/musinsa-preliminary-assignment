export const fetchCalendarEvents = async (timeMin: string, timeMax: string) => {
	const params = new URLSearchParams({ timeMin, timeMax });
	const res = await fetch(`/api/calendar-events?${params}`);

	if (!res.ok) {
		const errorBody = await res.json();
		throw new Error(
			errorBody.message || "캘린더 이벤트를 가져오는데 실패했습니다.",
		);
	}

	return res.json();
};
