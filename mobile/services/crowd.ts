export function getCrowdLevel({ hour, category }: { hour: number; category: string }): 'low' | 'moderate' | 'busy' {
	const evening = hour >= 18 && hour <= 23;
	const lunch = hour >= 12 && hour <= 14;
	if (evening) return 'busy';
	if (lunch && /restaurant|cafe|food/.test(category)) return 'moderate';
	return 'low';
}
