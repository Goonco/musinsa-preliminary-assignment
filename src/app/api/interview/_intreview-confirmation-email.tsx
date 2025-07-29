export default function IntervewConfirmationEmail({
	name,
	interviewTitle,
	url,
}: {
	name: string;
	interviewTitle: string;
	url: string;
}) {
	return (
		<div>
			<p>{`안녕하세요 ${name} 님, 무신사 채용팀입니다.`}</p>
			<p>{`지원하신 ${interviewTitle}의 면접 일정을 위한 메일입니다.`}</p>
			<p>
				<a href={url}>여기</a>를 눌러 면접일정을 선택해주세요. 감사합니다.
			</p>
		</div>
	);
}
