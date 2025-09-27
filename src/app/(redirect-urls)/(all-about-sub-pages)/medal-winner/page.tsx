"use client";

import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

interface MedalWinner {
	_id: string;
	sr_no: number;
	name: string;
	name_in_marathi?: string;
	photo?: string;
	designation?: string;
	designation_in_marathi?: string;
	date?: string;
	medal_type?: string;
}

const MedalWinnerPage = () => {
	const [winners, setWinners] = useState<MedalWinner[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchWinners = async () => {
			try {
				setLoading(true);
				const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-medal-winner`);
				if (!res.ok) throw new Error("Failed to fetch medal winners");
				const data = await res.json();
				setWinners(data.Data || []);
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred");
			} finally {
				setLoading(false);
			}
		};
		fetchWinners();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Oval
					height={80}
					width={80}
					color="#4f46e5"
					visible
					ariaLabel="oval-loading"
					secondaryColor="#4f46e5"
					strokeWidth={2}
					strokeWidthSecondary={2}
				/>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
					<p className="text-gray-600">{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">Medal Winners</h1>
					<p className="text-xl text-gray-600">Recognizing exemplary service and bravery</p>
				</div>

				{winners.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-gray-500 text-lg">No medal winners available</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{winners.map((w) => (
							<div
								key={w._id}
								className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
							>
								{w.photo && (
									<div className="h-64 overflow-hidden">
										<img
											src={w.photo}
											alt={w.name}
											className="w-full h-full object-cover"
										/>
									</div>
								)}

								<div className="p-6">
									<div className="mb-4">
										<h3 className="text-xl font-bold text-gray-900 mb-2">{w.name}</h3>
										{w.name_in_marathi && <p className="text-gray-600 text-sm">{w.name_in_marathi}</p>}
									</div>

									<div className="space-y-2 text-sm">
										{w.designation && (
											<p className="text-gray-600">
												<span className="font-semibold">Designation:</span> {w.designation}
											</p>
										)}
										{w.medal_type && (
											<p className="text-gray-600">
												<span className="font-semibold">Medal:</span> {w.medal_type}
											</p>
										)}
										{w.date && (
											<p className="text-gray-600">
												<span className="font-semibold">Date:</span> {w.date}
											</p>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default MedalWinnerPage;
