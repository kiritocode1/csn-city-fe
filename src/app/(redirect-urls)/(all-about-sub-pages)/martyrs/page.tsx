"use client";

import React, { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";

interface Martyr {
	_id: string;
	sr_no: number;
	name: string;
	name_in_marathi: string;
	groupId: {
		group_name: string;
		group_name_in_marathi: string;
	};
	area: string;
	area_in_marathi: string;
	incident: string;
	incident_in_marathi: string;
	post: string;
	post_in_marathi: string;
	birth_date: string;
	joining_date: string;
	martyrs_date: string;
	birth_place: string;
	birth_place_in_marathi: string;
	father_name: string;
	father_name_in_marathi: string;
	photo: string;
	details: string;
	details_in_marathi: string;
}

const MartyrsPage = () => {
	const [martyrs, setMartyrs] = useState<Martyr[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchMartyrs = async () => {
			try {
				setLoading(true);
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-martyrs`);

				if (!response.ok) {
					throw new Error("Failed to fetch martyrs data");
				}

				const data = await response.json();
				setMartyrs(data.Data || []);
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred");
			} finally {
				setLoading(false);
			}
		};

		fetchMartyrs();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Oval
					height={80}
					width={80}
					color="#4f46e5"
					wrapperStyle={{}}
					wrapperClass=""
					visible={true}
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
					<h1 className="text-4xl font-bold text-gray-900 mb-4">Police Martyrs</h1>
					<p className="text-xl text-gray-600">Honoring the brave officers who made the ultimate sacrifice</p>
				</div>

				{martyrs.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-gray-500 text-lg">No martyrs data available</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{martyrs.map((martyr) => (
							<div
								key={martyr._id}
								className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
							>
								{martyr.photo && (
									<div className="h-64 overflow-hidden">
										<img
											src={martyr.photo}
											alt={martyr.name}
											className="w-full h-full object-cover"
										/>
									</div>
								)}

								<div className="p-6">
									<div className="mb-4">
										<h3 className="text-xl font-bold text-gray-900 mb-2">{martyr.name}</h3>
										{martyr.name_in_marathi && <p className="text-gray-600 text-sm">{martyr.name_in_marathi}</p>}
									</div>

									<div className="space-y-2 text-sm">
										{martyr.post && (
											<p className="text-gray-600">
												<span className="font-semibold">Post:</span> {martyr.post}
											</p>
										)}

										{martyr.area && (
											<p className="text-gray-600">
												<span className="font-semibold">Area:</span> {martyr.area}
											</p>
										)}

										{martyr.incident && (
											<p className="text-gray-600">
												<span className="font-semibold">Incident:</span> {martyr.incident}
											</p>
										)}

										{martyr.martyrs_date && (
											<p className="text-gray-600">
												<span className="font-semibold">Date of Martyrdom:</span> {martyr.martyrs_date}
											</p>
										)}

										{martyr.father_name && (
											<p className="text-gray-600">
												<span className="font-semibold">Father:</span> {martyr.father_name}
											</p>
										)}
									</div>

									{martyr.details && (
										<div className="mt-4 pt-4 border-t border-gray-200">
											<p className="text-gray-700 text-sm leading-relaxed">{martyr.details}</p>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default MartyrsPage;
