import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const API_BASE = process.env.NEXT_PUBLIC_AI_BASE_URL || 'http://localhost:8000';

type TrendingItem = { placeId: string; title: string; score: number };

export default function Dashboard() {
	const [items, setItems] = useState<TrendingItem[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const run = async () => {
			try {
				const res = await fetch(`${API_BASE}/trending`);
				if (!res.ok) throw new Error(`Failed to load trending: ${res.status}`);
				const data = await res.json();
				setItems(data);
			} catch (e: any) {
				setError(e?.message || 'Error loading');
			}
		};
		run();
	}, []);

	return (
		<Layout>
			<div className="flex items-baseline justify-between mb-6">
				<h2 className="text-2xl font-semibold">Trending</h2>
				<a className="text-sm opacity-80 hover:opacity-100" href="/">Back</a>
			</div>
			{error && <div className="text-red-400 mb-4">{error}</div>}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{items.map((item) => (
					<div key={item.placeId} className="rounded-xl border border-white/10 bg-white/5 p-4">
						<div className="flex items-center justify-between">
							<div>
								<div className="font-semibold">{item.title}</div>
								<div className="text-sm opacity-70">Score: {(item.score * 100).toFixed(0)}%</div>
							</div>
							<span className="text-xs px-2 py-1 rounded bg-emerald-400 text-black font-semibold">Hot</span>
						</div>
					</div>
				))}
			</div>
		</Layout>
	);
}
