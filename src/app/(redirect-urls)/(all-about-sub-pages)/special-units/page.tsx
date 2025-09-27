"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../../../../contexts/language-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Phone, MapPin } from "lucide-react";

interface SpecialUnit {
	_id: string;
	name: string;
	name_in_marathi?: string;
	address?: string;
	photo?: string;
	contact?: string;
	description?: string;
	description_in_marathi?: string;
}

// Fallback data for when API is unavailable
const FALLBACK_UNITS: SpecialUnit[] = [
	{
		_id: "su-1",
		name: "Crime Branch",
		name_in_marathi: "गुन्हे शाखा",
		address: "CP Office, Mill Corner, Chh. Sambhajinagar",
		contact: "0240-2326515",
		description: "Specialized crime investigation and detection",
		description_in_marathi: "विशेष गुन्हा तपासणी आणि शोध",
	},
	{
		_id: "su-2",
		name: "Control Room",
		name_in_marathi: "नियंत्रण कक्ष",
		address: "CP Office, Mill Corner, Chh. Sambhajinagar",
		contact: "100",
		description: "24/7 emergency response and monitoring",
		description_in_marathi: "24/7 आपत्कालीन प्रतिसाद आणि निरीक्षण",
	},
	{
		_id: "su-3",
		name: "Cyber Cell",
		name_in_marathi: "सायबर सेल",
		address: "CP Office, Mill Corner, Chh. Sambhajinagar",
		contact: "0240-2326516",
		description: "Cyber crime investigation and digital forensics",
		description_in_marathi: "सायबर गुन्हा तपासणी आणि डिजिटल फॉरेन्सिक्स",
	},
	{
		_id: "su-4",
		name: "Women Cell",
		name_in_marathi: "महिला सुरक्षा कक्ष",
		address: "CP Office, Mill Corner, Chh. Sambhajinagar",
		contact: "0240-2326517",
		description: "Women safety and gender-based crime prevention",
		description_in_marathi: "महिला सुरक्षा आणि लिंग-आधारित गुन्हा प्रतिबंध",
	},
	{
		_id: "su-5",
		name: "Economic Offence Wing",
		name_in_marathi: "आर्थिक गुन्हे शाखा",
		address: "CP Office, Mill Corner, Chh. Sambhajinagar",
		contact: "0240-2326518",
		description: "Financial crimes and fraud investigation",
		description_in_marathi: "आर्थिक गुन्हे आणि फसवणूक तपासणी",
	},
	{
		_id: "su-6",
		name: "Quick Response Team",
		name_in_marathi: "क्विक रेस्पॉन्स टीम",
		address: "CP Office, Mill Corner, Chh. Sambhajinagar",
		contact: "0240-2326519",
		description: "Rapid response to emergency situations",
		description_in_marathi: "आपत्कालीन परिस्थितींना त्वरित प्रतिसाद",
	},
	{
		_id: "su-7",
		name: "City Traffic Branch",
		name_in_marathi: "शहर वाहतूक शाखा",
		address: "Jalna Road, Mondha Naka, Chh. Sambhajinagar",
		contact: "0240-2326520",
		description: "Traffic management and road safety enforcement",
		description_in_marathi: "वाहतूक व्यवस्थापन आणि रस्ता सुरक्षा अंमलबजावणी",
	},
	{
		_id: "su-8",
		name: "BDDS",
		name_in_marathi: "बीडीडीएस",
		address: "CP Office, Mill Corner, Chh. Sambhajinagar",
		contact: "0240-2326521",
		description: "Bomb Detection and Disposal Squad",
		description_in_marathi: "बॉम्ब शोध आणि निराकरण टीम",
	},
];

const SpecialUnitsPage = () => {
	const { language } = useLanguage();
	const [units, setUnits] = useState<SpecialUnit[]>(FALLBACK_UNITS);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUnits = async () => {
			try {
				setLoading(true);
				const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

				// If no backend URL, use fallback data immediately
				if (!backendUrl) {
					setUnits(FALLBACK_UNITS);
					setError(null);
					return;
				}

				const response = await fetch(`${backendUrl}/api/get-units`);

				if (!response.ok) {
					throw new Error("Failed to fetch special units data");
				}

				const data = await response.json();
				const unitsList: SpecialUnit[] = data?.units || [];

				if (!Array.isArray(unitsList) || unitsList.length === 0) {
					setUnits(FALLBACK_UNITS);
					setError(null);
				} else {
					setUnits(unitsList);
					setError(null);
				}
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred");
				console.error("Error fetching special units data:", err);
				// On any error, fall back to dummy data
				setUnits(FALLBACK_UNITS);
			} finally {
				setLoading(false);
			}
		};

		fetchUnits();
	}, []);

	const titleLabel = language === "mr" ? "विशेष पथके" : "Special Units";
	const subtitleLabel = language === "mr" ? "छत्रपती संभाजी नगरच्या विशेष पथकांची माहिती" : "Information about Special Units of Chhatrapati Sambhaji Nagar Police";
	const contactLabel = language === "mr" ? "संपर्क" : "Contact";
	const addressLabel = language === "mr" ? "पत्ता" : "Address";
	const descriptionLabel = language === "mr" ? "वर्णन" : "Description";
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
					{units.map((unit) => {
						const displayName = language === "mr" ? unit.name_in_marathi || unit.name : unit.name;
						const displayDescription = language === "mr" ? unit.description_in_marathi || unit.description : unit.description;
						const initials = displayName
							.split(" ")
							.map((n) => n[0])
							.join("");

						return (
							<Card
								key={unit._id}
								className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
							>
								<CardHeader>
									<div className="text-center">
										<div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
											<span className="text-gray-600 dark:text-gray-400 font-semibold text-lg">{initials}</span>
										</div>
										<CardTitle className="text-xl text-gray-800 dark:text-white mb-2">{displayName}</CardTitle>
										{displayDescription && <CardDescription className="text-gray-600 dark:text-gray-300">{displayDescription}</CardDescription>}
									</div>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										{unit.address && (
											<div className="flex items-start gap-2">
												<MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
												<div>
													<p className="text-sm font-medium text-gray-700 dark:text-gray-300">{addressLabel}</p>
													<p className="text-sm text-gray-600 dark:text-gray-400">{unit.address}</p>
												</div>
											</div>
										)}
										{unit.contact && (
											<div className="flex items-center gap-2">
												<Phone className="h-4 w-4 text-gray-500" />
												<div>
													<p className="text-sm font-medium text-gray-700 dark:text-gray-300">{contactLabel}</p>
													<a
														href={`tel:${unit.contact}`}
														className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
													>
														{unit.contact}
													</a>
												</div>
											</div>
										)}
									</div>

									<div className="mt-4 flex justify-center">
										<Badge
											variant="outline"
											className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
										>
											<Shield className="h-3 w-3 mr-1" />
											{language === "mr" ? "विशेष पथक" : "Special Unit"}
										</Badge>
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>

				{error && (
					<div className="mt-8 text-center">
						<p className="text-red-600 dark:text-red-400">{language === "mr" ? "डेटा लोड करताना त्रुटी आली" : "Error loading data"}</p>
					</div>
				)}

				<div className="mt-8 text-center">
					<p className="text-gray-600 dark:text-gray-300">
						{language === "mr" ? "एकूण विशेष पथके:" : "Total Special Units:"} <span className="font-semibold text-gray-800 dark:text-white">{units.length}</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SpecialUnitsPage;
