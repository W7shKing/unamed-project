import React from 'react';
import Layout from '../components/Layout';

export default function Home() {
	return (
		<Layout>
			<div className="grid place-items-center h-[70vh]">
				<div className="text-center space-y-4">
					<h2 className="text-3xl font-semibold">Jadwalni Business Dashboard</h2>
					<p className="opacity-80">Manage promotions, view analytics, and see trending places.</p>
					<a href="/dashboard" className="inline-flex items-center px-4 py-2 rounded-md bg-white text-black font-semibold hover:opacity-90">Open Dashboard</a>
				</div>
			</div>
		</Layout>
	);
}
