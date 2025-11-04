const AI_BASE_URL = process.env.AI_BASE_URL || 'http://localhost:8000';

type RecommendInput = { userId: string; history?: Array<{ placeId: string; ts: number }> };

type RecommendResult = { placeId: string; title: string; score: number }[];

export async function recommendPlaces(input: RecommendInput): Promise<RecommendResult> {
	const res = await fetch(`${AI_BASE_URL}/recommend`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(input)
	});
	if (!res.ok) throw new Error(`AI recommend error: ${res.status}`);
	return res.json();
}
