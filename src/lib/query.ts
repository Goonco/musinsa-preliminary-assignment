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

export const createInterview = async (newInterview: unknown) => {
	const response = await fetch("/api/interview", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newInterview),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "면접 생성에 실패했습니다.");
	}

	return response.json();
};

export const confirmInterview = async (payload: unknown) => {
	const response = await fetch("/api/interview/confirm", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "면접 시간 확정에 실패했습니다.");
	}

	return response.json();
};
