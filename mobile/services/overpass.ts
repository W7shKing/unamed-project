export type OverpassNode = {
	id: number;
	lat: number;
	lon: number;
	tags?: Record<string, string>;
};

export async function fetchDubaiPOIs(filter: string): Promise<OverpassNode[]> {
	const overpassUrl = 'https://overpass-api.de/api/interpreter';
	const bboxDubai = '24.792,54.892,25.457,55.707';
	const query = `[
		out:json
	];
	node[${filter}](${bboxDubai});
	out center 100;`;

	const body = `data=${encodeURIComponent(query)}`;

	const res = await fetch(overpassUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body
	});
	if (!res.ok) throw new Error(`Overpass error: ${res.status}`);
	const data = await res.json();
	return (data.elements || []).filter((e: any) => e.type === 'node');
}
