import React, { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
	return (
		<div className="min-h-screen">
			<header className="sticky top-0 z-10 border-b border-white/10 bg-[#0B0F1A]/80 backdrop-blur">
				<div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
					<h1 className="text-lg font-semibold">Jadwalni Dashboard</h1>
					<nav className="text-sm space-x-6">
						<a className="opacity-80 hover:opacity-100" href="/">Home</a>
						<a className="opacity-80 hover:opacity-100" href="/dashboard">Dashboard</a>
					</nav>
				</div>
			</header>
			<main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
		</div>
	);
}
