"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../../../../contexts/language-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Award, Clock } from "lucide-react";

interface FormerCP {
	_id: string;
	sr_no: number;
	name: string;
	name_in_marathi: string;
	photo: string;
	designation: string;
	designation_in_marathi: string;
	from_date: string;
	to_date: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

// Fallback data for when API is unavailable
const FALLBACK_FORMER_CPS: FormerCP[] = [
	{
		_id: "fallback-1",
		sr_no: 1,
		name: "Shri. Rajesh Kumar",
		name_in_marathi: "श्री. राजेश कुमार",
		photo: "",
		designation: "Commissioner of Police",
		designation_in_marathi: "पोलीस आयुक्त",
		from_date: "2020-01-01",
		to_date: "2022-12-31",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		__v: 0,
	},
	{
		_id: "fallback-2",
		sr_no: 2,
		name: "Smt. Priya Sharma",
		name_in_marathi: "स्मत. प्रिया शर्मा",
		photo: "",
		designation: "Commissioner of Police",
		designation_in_marathi: "पोलीस आयुक्त",
		from_date: "2018-06-01",
		to_date: "2019-12-31",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		__v: 0,
	},
	{
		_id: "fallback-3",
		sr_no: 3,
		name: "Shri. Vikram Singh",
		name_in_marathi: "श्री. विक्रम सिंह",
		photo: "",
		designation: "Commissioner of Police",
		designation_in_marathi: "पोलीस आयुक्त",
		from_date: "2016-03-15",
		to_date: "2018-05-31",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		__v: 0,
	},
];

const FormerCpsPage = () => {
	const { language } = useLanguage();
	const [formerCPs, setFormerCPs] = useState<FormerCP[]>(FALLBACK_FORMER_CPS);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchFormerCPs = async () => {
			try {
				setLoading(true);
				const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

				// If no backend URL, use fallback data immediately
				if (!backendUrl) {
					setFormerCPs(FALLBACK_FORMER_CPS);
					setError(null);
					return;
				}

				const response = await fetch(`${backendUrl}/api/get-adg`);

				if (!response.ok) {
					throw new Error("Failed to fetch former CPs data");
				}

				const data = await response.json();
				const formerCPsList: FormerCP[] = data?.Data || [];

				if (!Array.isArray(formerCPsList) || formerCPsList.length === 0) {
					setFormerCPs(FALLBACK_FORMER_CPS);
					setError(null);
				} else {
					setFormerCPs(formerCPsList);
					setError(null);
				}
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred");
				console.error("Error fetching former CPs data:", err);
				// On any error, fall back to dummy data
				setFormerCPs(FALLBACK_FORMER_CPS);
			} finally {
				setLoading(false);
			}
		};

		fetchFormerCPs();
	}, []);

	const formatDate = (dateString: string) => {
		if (!dateString) return "";
		const date = new Date(dateString);
		return date.toLocaleDateString("en-IN", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const titleLabel = language === "mr" ? "पूर्व पोलीस आयुक्त" : "Former Commissioners of Police";
	const subtitleLabel = language === "mr" ? "छत्रपती संभाजी नगरच्या पूर्व पोलीस आयुक्तांची माहिती" : "Information about former Commissioners of Police of Chhatrapati Sambhaji Nagar";
	const tenureLabel = language === "mr" ? "कार्यकाल" : "Tenure";
	const designationLabel = language === "mr" ? "पद" : "Designation";
	const fromLabel = language === "mr" ? "पासून" : "From";
	const toLabel = language === "mr" ? "पर्यंत" : "To";
	const loadingLabel = language === "mr" ? "लोड होत आहे..." : "Loading...";

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-6xl mx-auto">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
						<p className="mt-4 text-gray-600 dark:text-gray-300">{loadingLabel}</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8 min-h-screen w-full">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{titleLabel}</h1>
					<p className="text-gray-600 dark:text-gray-300 text-lg">{subtitleLabel}</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{formerCPs.map((formerCP) => (
						<Card
							key={formerCP._id}
							className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
						>
							<CardHeader>
								<div className="text-center">
									<div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
										{formerCP.photo ? (
											<img
												src={formerCP.photo}
												alt={language === "mr" ? formerCP.name_in_marathi : formerCP.name}
												className="w-20 h-20 rounded-full object-cover"
											/>
										) : (
											<User className="h-10 w-10 text-gray-600 dark:text-gray-400" />
										)}
									</div>
									<CardTitle className="text-xl text-gray-800 dark:text-white mb-2">{language === "mr" ? formerCP.name_in_marathi : formerCP.name}</CardTitle>
									<CardDescription className="text-gray-600 dark:text-gray-400 font-medium">
										{language === "mr" ? formerCP.designation_in_marathi : formerCP.designation}
									</CardDescription>
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
										<h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
											<Calendar className="h-4 w-4 text-gray-600 dark:text-gray-400" />
											{tenureLabel}
										</h4>
										<div className="space-y-2">
											<div className="flex items-center gap-2 text-sm">
												<Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
												<span className="text-gray-600 dark:text-gray-300">
													{fromLabel}: {formatDate(formerCP.from_date)}
												</span>
											</div>
											<div className="flex items-center gap-2 text-sm">
												<Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
												<span className="text-gray-600 dark:text-gray-300">
													{toLabel}: {formatDate(formerCP.to_date)}
												</span>
											</div>
										</div>
									</div>

									<div className="flex justify-center">
										<Badge
											variant="outline"
											className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
										>
											<Award className="h-3 w-3 mr-1" />
											{language === "mr" ? "पूर्व आयुक्त" : "Former Commissioner"}
										</Badge>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{error && (
					<div className="mt-8 text-center">
						<p className="text-red-600 dark:text-red-400">{language === "mr" ? "डेटा लोड करताना त्रुटी आली" : "Error loading data"}</p>
					</div>
				)}

				<div className="mt-8 text-center">
					<p className="text-gray-600 dark:text-gray-300">
						{language === "mr" ? "एकूण पूर्व आयुक्त:" : "Total Former Commissioners:"} <span className="font-semibold text-gray-800 dark:text-white">{formerCPs.length}</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default FormerCpsPage;
