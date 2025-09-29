"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, MapPin, Phone, Search, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../../../../contexts/language-context";

interface PoliceStation {
	station_name: string;
	station_name_in_marathi: string;
	address: string;
	address_in_marathi: string;
	contact_no: string;
	map_link: string;
	latitude: number;
	longitude: number;
	officer_name: string;
	officer_name_in_marathi: string;
}

// Fallback data for when API is unavailable
const FALLBACK_STATIONS = [
	{
		station_name: "City Police Station",
		station_name_in_marathi: "सिटी पोलीस स्टेशन",
		address: "Near Railway Station, Chhatrapati Sambhaji Nagar - 431001",
		address_in_marathi: "रेल्वे स्टेशनजवळ, छत्रपती संभाजी नगर - 431001",
		contact_no: "+91-240-247-2001",
		map_link: "",
		latitude: 19.8762,
		longitude: 75.3433,
		officer_name: "Inspector Rajesh Patil",
		officer_name_in_marathi: "इन्स्पेक्टर राजेश पाटील",
	},
	{
		station_name: "Cidco Police Station",
		station_name_in_marathi: "सिडको पोलीस स्टेशन",
		address: "Cidco N-6, Chhatrapati Sambhaji Nagar - 431003",
		address_in_marathi: "सिडको एन-6, छत्रपती संभाजी नगर - 431003",
		contact_no: "+91-240-247-2002",
		map_link: "",
		latitude: 19.8762,
		longitude: 75.3433,
		officer_name: "Inspector Sunita Deshmukh",
		officer_name_in_marathi: "इन्स्पेक्टर सुनीता देशमुख",
	},
	{
		station_name: "Jalna Road Police Station",
		station_name_in_marathi: "जालना रोड पोलीस स्टेशन",
		address: "Jalna Road, Chhatrapati Sambhaji Nagar - 431001",
		address_in_marathi: "जालना रोड, छत्रपती संभाजी नगर - 431001",
		contact_no: "+91-240-247-2003",
		map_link: "",
		latitude: 19.8762,
		longitude: 75.3433,
		officer_name: "Inspector Vikram Singh",
		officer_name_in_marathi: "इन्स्पेक्टर विक्रम सिंह",
	},
	{
		station_name: "Aurangpura Police Station",
		station_name_in_marathi: "औरंगपुरा पोलीस स्टेशन",
		address: "Aurangpura, Chhatrapati Sambhaji Nagar - 431001",
		address_in_marathi: "औरंगपुरा, छत्रपती संभाजी नगर - 431001",
		contact_no: "+91-240-247-2004",
		map_link: "",
		latitude: 19.8762,
		longitude: 75.3433,
		officer_name: "Inspector Meera Joshi",
		officer_name_in_marathi: "इन्स्पेक्टर मीरा जोशी",
	},
	{
		station_name: "Waluj Police Station",
		station_name_in_marathi: "वालुज पोलीस स्टेशन",
		address: "Waluj Industrial Area, Chhatrapati Sambhaji Nagar - 431136",
		address_in_marathi: "वालुज औद्योगिक क्षेत्र, छत्रपती संभाजी नगर - 431136",
		contact_no: "+91-240-247-2005",
		map_link: "",
		latitude: 19.8762,
		longitude: 75.3433,
		officer_name: "Inspector Ajay Kumar",
		officer_name_in_marathi: "इन्स्पेक्टर अजय कुमार",
	},
];

const StationsPage = () => {
	const { language } = useLanguage();
	const [stations, setStations] = useState<PoliceStation[]>(FALLBACK_STATIONS);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const fetchStations = async () => {
			try {
				setLoading(true);
				const backendUrl = "https://csn.dreamcaredevelopers.com";

				const response = await fetch(`${backendUrl}/api/get-stations`);

				if (!response.ok) {
					throw new Error("Failed to fetch police stations data");
				}

				const data = await response.json();

				// Transform API data to match expected format
				if (Array.isArray(data.stations)) {
					const transformedStations: PoliceStation[] = data.stations.map((station: any) => ({
						station_name: station.name,
						station_name_in_marathi: station.name_in_marathi,
						address: station.address || "Address not available",
						address_in_marathi: station.address_in_marathi || "पत्ता उपलब्ध नाही",
						contact_no: station.contact_no || "Contact not available",
						map_link: "",
						latitude: 19.8762, // Default coordinates
						longitude: 75.3433,
						officer_name: "Officer details not available",
						officer_name_in_marathi: "अधिकारी माहिती उपलब्ध नाही",
					}));

					if (transformedStations.length === 0) {
						setStations(FALLBACK_STATIONS);
						setError(null);
					} else {
						setStations(transformedStations);
						setError(null);
					}
				} else {
					setStations(FALLBACK_STATIONS);
					setError(null);
				}
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred");
				console.error("Error fetching police stations data:", err);
				// On any error, fall back to dummy data
				setStations(FALLBACK_STATIONS);
			} finally {
				setLoading(false);
			}
		};

		fetchStations();
	}, []);

	// Filter stations based on search term
	const filteredStations = stations.filter((station) => {
		const searchLower = searchTerm.toLowerCase();
		return (
			station.station_name.toLowerCase().includes(searchLower) ||
			station.station_name_in_marathi.includes(searchTerm) ||
			station.address.toLowerCase().includes(searchLower) ||
			station.address_in_marathi.includes(searchTerm) ||
			station.officer_name?.toLowerCase().includes(searchLower) ||
			station.officer_name_in_marathi?.includes(searchTerm)
		);
	});



	const titleLabel = language === "mr" ? "पोलीस स्टेशन" : "Police Stations";
	const subtitleLabel =
		language === "mr"
			? "छत्रपती संभाजी नगरमधील पोलीस स्टेशन शोधा आणि संपर्क माहिती, सेवा आणि दिशानिर्देश मिळवा"
			: "Find police stations in Chhatrapati Sambhaji Nagar and get contact information, services, and directions";
	const searchLabel = language === "mr" ? "स्टेशन शोधा" : "Search Stations";
	const searchPlaceholder = language === "mr" ? "स्टेशन नाव, पत्ता किंवा अधिकारी शोधा" : "Search by station name, address, or officer";
	const callLabel = language === "mr" ? "कॉल करा" : "Call";
	const directionsLabel = language === "mr" ? "दिशानिर्देश" : "Directions";
	const officerLabel = language === "mr" ? "अधिकारी" : "Officer";
	const emergencyLabel = language === "mr" ? "आपत्कालीन संपर्क" : "Emergency Contact";
	const emergencyText = language === "mr" ? "तातडीच्या पोलीस मदतीसाठी, आमच्या आपत्कालीन हेल्पलाइनवर कॉल करा" : "For immediate police assistance, call our emergency helpline";
	const emergencyButton = language === "mr" ? "आपत्कालीन कॉल - 112" : "Call Emergency - 112";

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-6xl mx-auto">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
						<p className="mt-4 text-gray-600 dark:text-gray-300">{language === "mr" ? "लोड होत आहे..." : "Loading..."}</p>
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
					<p className="text-muted-foreground text-lg dark:text-gray-300">{subtitleLabel}</p>
				</div>

				<Card className="mb-8 bg-white dark:bg-black border-gray-200 dark:border-gray-700">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2 text-gray-800 dark:text-white">
							<Search className="h-6 w-6" />
							{searchLabel}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-1 gap-4">
							<div>
								<Label
									htmlFor="search"
									className="text-gray-700 dark:text-gray-300"
								>
									Search
								</Label>
								<Input
									id="search"
									placeholder={searchPlaceholder}
									className="mt-1 bg-white dark:bg-black border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="space-y-6">
					{filteredStations.map((station, index) => (
						<Card
							key={index}
							className="hover:shadow-lg transition-shadow bg-white dark:bg-black border-gray-200 dark:border-gray-700"
						>
							<CardHeader>
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<CardTitle className="text-xl flex items-center gap-2 text-gray-800 dark:text-white">
											<MapPin className="h-5 w-5 text-primary" />
											{language === "mr" ? station.station_name_in_marathi : station.station_name}
										</CardTitle>
										<CardDescription className="text-base mt-2 text-gray-600 dark:text-gray-300">
											{language === "mr" ? station.address_in_marathi : station.address}
										</CardDescription>
									</div>
									<Badge
										variant="secondary"
										className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
									>
										24/7
									</Badge>
								</div>
							</CardHeader>
							<CardContent>
								<div className="grid md:grid-cols-2 gap-6">
									<div className="space-y-3">
										<div className="flex items-center gap-2">
											<Phone className="h-4 w-4 text-muted-foreground" />
											<a
												href={`tel:${station.contact_no}`}
												className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
											>
												{station.contact_no}
											</a>
										</div>
										<div className="flex items-center gap-2">
											<Clock className="h-4 w-4 text-muted-foreground" />
											<span className="text-gray-600 dark:text-gray-300">24/7</span>
										</div>
										{station.officer_name && (
											<div className="flex items-center gap-2">
												<Users className="h-4 w-4 text-muted-foreground" />
												<span className="text-gray-600 dark:text-gray-300">
													{officerLabel}: {language === "mr" ? station.officer_name_in_marathi : station.officer_name}
												</span>
											</div>
										)}
									</div>
									<div>
										<h4 className="font-semibold mb-2 text-gray-800 dark:text-white">{language === "mr" ? "सेवा" : "Services"}</h4>
										<div className="flex flex-wrap gap-2">
											{[
												language === "mr" ? "एफआयआर दाखल" : "FIR Filing",
												language === "mr" ? "सत्यापन" : "Verification",
												language === "mr" ? "सामान्य तक्रारी" : "General Complaints",
												language === "mr" ? "आपत्कालीन प्रतिसाद" : "Emergency Response",
											].map((service, serviceIndex) => (
												<Badge
													key={serviceIndex}
													variant="outline"
													className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
												>
													{service}
												</Badge>
											))}
										</div>
									</div>
								</div>
								<div className="mt-4 flex gap-2">
									<Button
										size="sm"
										className="bg-blue-600 hover:bg-blue-700 text-white"
									>
										<Phone className="h-4 w-4 mr-2" />
										{callLabel}
									</Button>
									{station.map_link && (
										<Button
											size="sm"
											variant="outline"
											className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
											onClick={() => window.open(station.map_link, "_blank")}
										>
											<MapPin className="h-4 w-4 mr-2" />
											{directionsLabel}
										</Button>
									)}
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<Card className="mt-8 bg-white dark:bg-black border-gray-200 dark:border-gray-700">
					<CardHeader>
						<CardTitle className="text-2xl text-center text-gray-800 dark:text-white">{emergencyLabel}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-center space-y-4">
							<p className="text-lg text-gray-600 dark:text-gray-300">{emergencyText}</p>
							<Button
								size="lg"
								className="bg-red-600 hover:bg-red-700 text-white"
							>
								<Phone className="h-4 w-4 mr-2" />
								{emergencyButton}
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default StationsPage;
