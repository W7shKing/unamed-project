const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY || '';

export async function getUnsplashPhotoForPlace(query: string): Promise<string | undefined> {
	if (!UNSPLASH_KEY) return undefined;
	const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + ' Dubai')}&per_page=1&orientation=landscape&client_id=${UNSPLASH_KEY}`;
	const res = await fetch(url);
	if (!res.ok) return undefined;
	const data = await res.json();
	return data?.results?.[0]?.urls?.small;
}
