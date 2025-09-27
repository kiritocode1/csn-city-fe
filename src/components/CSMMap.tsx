"use client";

import { useLanguage } from "@/contexts/language-context";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, ExternalLink, Locate, Navigation, Phone, Search, Shield, Users, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

// Police stations data for Chhatrapati Sambhaji Nagar organized by zones
const policeStations = [
	// Zone 1
	{
		id: 1,
		name: "ACP City",
		nameMr: "एसीपी सिटी",
		address: "City Area, Chhatrapati Sambhaji Nagar",
		addressMr: "सिटी क्षेत्र, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.8762, lng: 75.3433 },
		phone: "0240-2470001",
		emergency: "100",
		email: "acp.city@mahapolice.gov.in",
		type: "ACP Office",
		zone: "Zone 1",
		workingHours: "24/7",
		officers: "15+",
		services: ["Administrative", "General", "Crime"],
	},
	{
		id: 2,
		name: "City Chowk Police Station",
		nameMr: "सिटी चौक पोलीस स्टेशन",
		address: "City Chowk, Chhatrapati Sambhaji Nagar",
		addressMr: "सिटी चौक, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.875, lng: 75.34 },
		phone: "0240-2470002",
		emergency: "100",
		email: "citychowk.ps@mahapolice.gov.in",
		type: "Police Station",
		zone: "Zone 1",
		workingHours: "24/7",
		officers: "20+",
		services: ["General", "Traffic", "Crime"],
	},
	{
		id: 3,
		name: "Kranti Chowk Police Station",
		nameMr: "क्रांती चौक पोलीस स्टेशन",
		address: "Kranti Chowk, Chhatrapati Sambhaji Nagar",
		addressMr: "क्रांती चौक, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.87, lng: 75.345 },
		phone: "0240-2470003",
		emergency: "100",
		email: "krantichowk.ps@mahapolice.gov.in",
		type: "Police Station",
		zone: "Zone 1",
		workingHours: "24/7",
		officers: "18+",
		services: ["General", "Traffic"],
	},
	{
		id: 4,
		name: "Begumpura Police Station",
		nameMr: "बेगमपुरा पोलीस स्टेशन",
		address: "Begumpura, Chhatrapati Sambhaji Nagar",
		addressMr: "बेगमपुरा, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.865, lng: 75.35 },
		phone: "0240-2470004",
		emergency: "100",
		email: "begumpura.ps@mahapolice.gov.in",
		type: "Police Station",
		zone: "Zone 1",
		workingHours: "24/7",
		officers: "16+",
		services: ["General", "Crime"],
	},
	{
		id: 5,
		name: "Vedantnagar Police Station",
		nameMr: "वेदांतनगर पोलीस स्टेशन",
		address: "Vedantnagar, Chhatrapati Sambhaji Nagar",
		addressMr: "वेदांतनगर, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.88, lng: 75.36 },
		phone: "0240-2470005",
		emergency: "100",
		email: "vedantnagar.ps@mahapolice.gov.in",
		type: "Police Station",
		zone: "Zone 1",
		workingHours: "24/7",
		officers: "14+",
		services: ["General", "Traffic"],
	},
	{
		id: 6,
		name: "ACP Chavani",
		nameMr: "एसीपी छावणी",
		address: "Chavani Area, Chhatrapati Sambhaji Nagar",
		addressMr: "छावणी क्षेत्र, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.89, lng: 75.37 },
		phone: "0240-2470006",
		emergency: "100",
		email: "acp.chavani@mahapolice.gov.in",
		type: "ACP Office",
		zone: "Zone 1",
		workingHours: "24/7",
		officers: "12+",
		services: ["Administrative", "General"],
	},
	{
		id: 7,
		name: "Chavani Police Station",
		nameMr: "छावणी पोलीस स्टेशन",
		address: "Chavani, Chhatrapati Sambhaji Nagar",
		addressMr: "छावणी, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.895, lng: 75.375 },
		phone: "0240-2470007",
		emergency: "100",
		email: "chavani.ps@mahapolice.gov.in",
		type: "Police Station",
		zone: "Zone 1",
		workingHours: "24/7",
		officers: "22+",
		services: ["General", "Crime", "Traffic"],
	},
	{
		id: 8,
		name: "Daulatabad Police Station",
		nameMr: "दौलताबाद पोलीस स्टेशन",
		address: "Daulatabad, Chhatrapati Sambhaji Nagar",
		addressMr: "दौलताबाद, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.94, lng: 75.24 },
		phone: "0240-2470008",
		emergency: "100",
		email: "daulatabad.ps@mahapolice.gov.in",
		type: "Police Station",
		zone: "Zone 1",
		workingHours: "24/7",
		officers: "25+",
		services: ["General", "Heritage Security", "Tourism"],
	},
	{
		id: 9,
		name: "Waluj Police Station",
		nameMr: "वालुज पोलीस स्टेशन",
		address: "Waluj, Chhatrapati Sambhaji Nagar",
		addressMr: "वालुज, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.85, lng: 75.2 },
		phone: "0240-2470009",
		emergency: "100",
		email: "waluj.ps@mahapolice.gov.in",
		type: "Police Station",
		zone: "Zone 1",
		workingHours: "24/7",
		officers: "20+",
		services: ["General", "Industrial Security"],
	},
	{
		id: 10,
		name: "MIDC Waluj Police Station",
		nameMr: "मिडक वालुज पोलीस स्टेशन",
		address: "MIDC Waluj, Chhatrapati Sambhaji Nagar",
		addressMr: "मिडक वालुज, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.84, lng: 75.19 },
		phone: "0240-2470010",
		emergency: "100",
		email: "midcwaluj.ps@mahapolice.gov.in",
		type: "Industrial",
		zone: "Zone 1",
		workingHours: "24/7",
		officers: "18+",
		services: ["Industrial Security", "Labor Disputes", "General"],
	},

	// Zone 2
	{
		id: 11,
		name: "ACP CIDCO",
		nameMr: "एसीपी सिडको",
		address: "CIDCO Area, Chhatrapati Sambhaji Nagar",
		addressMr: "सिडको क्षेत्र, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.9, lng: 75.32 },
		phone: "0240-2470011",
		emergency: "100",
		email: "acp.cidco@mahapolice.gov.in",
		type: "ACP Office",
		zone: "Zone 2",
		workingHours: "24/7",
		officers: "15+",
		services: ["Administrative", "General", "Urban Planning"],
	},
	{
		id: 12,
		name: "Jinsi Police Station",
		nameMr: "जिनसी पोलीस स्टेशन",
		address: "Jinsi, Chhatrapati Sambhaji Nagar",
		addressMr: "जिनसी, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.91, lng: 75.33 },
		phone: "0240-2470012",
		emergency: "100",
		email: "jinsi.ps@mahapolice.gov.in",
		type: "Police Station",
		zone: "Zone 2",
		workingHours: "24/7",
		officers: "16+",
		services: ["General", "Traffic"],
	},
	{
		id: 13,
		name: "Cidco Police Station",
		nameMr: "सिडको पोलीस स्टेशन",
		address: "CIDCO, Sector 7, Chhatrapati Sambhaji Nagar",
		addressMr: "सिडको, सेक्टर 7, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.92, lng: 75.34 },
		phone: "0240-2470013",
		emergency: "100",
		email: "cidco.ps@mahapolice.gov.in",
		type: "Police Station",
		zone: "Zone 2",
		workingHours: "24/7",
		officers: "25+",
		services: ["General", "Traffic", "Urban Security"],
	},
	{
		id: 14,
		name: "Mukundwadi Police Station",
		nameMr: "मुकुंदवाडी पोलीस स्टेशन",
		address: "Mukundwadi, Chhatrapati Sambhaji Nagar",
		addressMr: "मुकुंदवाडी, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.85, lng: 75.36 },
		phone: "0240-2470014",
		emergency: "100",
		email: "mukundwadi.ps@mahapolice.gov.in",
		type: "Police Station",
		zone: "Zone 2",
		workingHours: "24/7",
		officers: "20+",
		services: ["General", "Crime", "Traffic"],
	},
	{
		id: 15,
		name: "MIDC Cidco Police Station",
		nameMr: "मिडक सिडको पोलीस स्टेशन",
		address: "MIDC CIDCO, Chhatrapati Sambhaji Nagar",
		addressMr: "मिडक सिडको, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.93, lng: 75.35 },
		phone: "0240-2470015",
		emergency: "100",
		email: "midccidco.ps@mahapolice.gov.in",
		type: "Industrial",
		zone: "Zone 2",
		workingHours: "24/7",
		officers: "22+",
		services: ["Industrial Security", "General", "Labor Issues"],
	},
	{
		id: 16,
		name: "ACP Osmanpura",
		nameMr: "एसीपी उस्मानपुरा",
		address: "Osmanpura Area, Chhatrapati Sambhaji Nagar",
		addressMr: "उस्मानपुरा क्षेत्र, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.87, lng: 75.33 },
		phone: "0240-2470016",
		emergency: "100",
		email: "acp.osmanpura@mahapolice.gov.in",
		type: "ACP Office",
		zone: "Zone 2",
		workingHours: "24/7",
		officers: "14+",
		services: ["Administrative", "General"],
	},
	{
		id: 17,
		name: "Harsul Police Station",
		nameMr: "हरसुल पोलीस स्टेशन",
		address: "Harsul, Chhatrapati Sambhaji Nagar",
		addressMr: "हरसुल, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.86, lng: 75.32 },
		phone: "0240-2470017",
		emergency: "100",
		email: "harsul.ps@mahapolice.gov.in",
		type: "Police Station",
		zone: "Zone 2",
		workingHours: "24/7",
		officers: "18+",
		services: ["General", "Crime"],
	},
	{
		id: 18,
		name: "JawaharNagar Police Station",
		nameMr: "जवाहरनगर पोलीस स्टेशन",
		address: "JawaharNagar, Chhatrapati Sambhaji Nagar",
		addressMr: "जवाहरनगर, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.88, lng: 75.34 },
		phone: "0240-2470018",
		emergency: "100",
		email: "jawaharnagar.ps@mahapolice.gov.in",
		type: "Police Station",
		zone: "Zone 2",
		workingHours: "24/7",
		officers: "19+",
		services: ["General", "Traffic", "Crime"],
	},
	{
		id: 19,
		name: "Osmanpura Police Station",
		nameMr: "उस्मानपुरा पोलीस स्टेशन",
		address: "Osmanpura, Chhatrapati Sambhaji Nagar",
		addressMr: "उस्मानपुरा, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.875, lng: 75.335 },
		phone: "0240-2470019",
		emergency: "100",
		email: "osmanpura.ps@mahapolice.gov.in",
		type: "Police Station",
		zone: "Zone 2",
		workingHours: "24/7",
		officers: "21+",
		services: ["General", "Crime", "Traffic"],
	},
	{
		id: 20,
		name: "Satara Police Station",
		nameMr: "सातारा पोलीस स्टेशन",
		address: "Satara Area, Chhatrapati Sambhaji Nagar",
		addressMr: "सातारा क्षेत्र, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.87, lng: 75.33 },
		phone: "0240-2470020",
		emergency: "100",
		email: "satara.ps@mahapolice.gov.in",
		type: "Police Station",
		zone: "Zone 2",
		workingHours: "24/7",
		officers: "18+",
		services: ["General", "Traffic"],
	},
	{
		id: 21,
		name: "Pundliknagar Police Station",
		nameMr: "पुंडलिकनगर पोलीस स्टेशन",
		address: "Pundliknagar, Chhatrapati Sambhaji Nagar",
		addressMr: "पुंडलिकनगर, छत्रपती संभाजी नगर",
		coordinates: { lat: 19.89, lng: 75.36 },
		phone: "0240-2470021",
		emergency: "100",
		email: "pundliknagar.ps@mahapolice.gov.in",
		type: "Police Station",
		zone: "Zone 2",
		workingHours: "24/7",
		officers: "17+",
		services: ["General", "Crime"],
	},
];

export default function CSMMap() {
	const { resolvedTheme } = useTheme();
	const { t, language } = useLanguage();
	const [mounted, setMounted] = useState(false);
	const [selectedStation, setSelectedStation] = useState(policeStations[0]);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedZone, setSelectedZone] = useState<string>("All");
	const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
	const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const isDarkMode = mounted && resolvedTheme === "dark";

	// Get unique zones
	const zones = useMemo(() => {
		const uniqueZones = [...new Set(policeStations.map((station) => station.zone))];
		return ["All", ...uniqueZones];
	}, []);

	// Filter stations based on search query and zone
	const filteredStations = useMemo(() => {
		let filtered = policeStations;

		// Filter by zone
		if (selectedZone !== "All") {
			filtered = filtered.filter((station) => station.zone === selectedZone);
		}

		// Filter by search query
		if (searchQuery) {
			filtered = filtered.filter(
				(station) =>
					station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					station.nameMr.includes(searchQuery) ||
					station.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
					station.addressMr.includes(searchQuery),
			);
		}

		return filtered;
	}, [searchQuery, selectedZone]);

	// Calculate distance between two points
	const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
		const R = 6371; // Earth's radius in kilometers
		const dLat = ((lat2 - lat1) * Math.PI) / 180;
		const dLng = ((lng2 - lng1) * Math.PI) / 180;
		const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return R * c;
	};

	// Find closest station
	const findClosestStation = () => {
		if (!userLocation) {
			// Request user's location
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const location = {
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						};
						setUserLocation(location);

						let closest = policeStations[0];
						let minDistance = calculateDistance(location.lat, location.lng, closest.coordinates.lat, closest.coordinates.lng);

						policeStations.forEach((station) => {
							const distance = calculateDistance(location.lat, location.lng, station.coordinates.lat, station.coordinates.lng);
							if (distance < minDistance) {
								minDistance = distance;
								closest = station;
							}
						});

						setSelectedStation(closest);
					},
					(error) => {
						console.error("Error getting location:", error);
						alert("Unable to get your location. Please enable location services.");
					},
				);
			} else {
				alert("Geolocation is not supported by this browser.");
			}
		} else {
			// Already have location, find closest
			let closest = policeStations[0];
			let minDistance = calculateDistance(userLocation.lat, userLocation.lng, closest.coordinates.lat, closest.coordinates.lng);

			policeStations.forEach((station) => {
				const distance = calculateDistance(userLocation.lat, userLocation.lng, station.coordinates.lat, station.coordinates.lng);
				if (distance < minDistance) {
					minDistance = distance;
					closest = station;
				}
			});

			setSelectedStation(closest);
		}
	};

	// Generate map URL with multiple markers
	const generateMapUrl = () => {
		// Use the first filtered station as center, or selected station if no filters
		const centerStation = filteredStations.length > 0 ? filteredStations[0] : selectedStation;
		const centerLat = centerStation.coordinates.lat;
		const centerLng = centerStation.coordinates.lng;
		const bbox = `${centerLng - 0.05},${centerLat - 0.05},${centerLng + 0.05},${centerLat + 0.05}`;

		// Create markers for filtered stations only
		const markers = filteredStations.map((station) => `&marker=${station.coordinates.lat},${station.coordinates.lng}`).join("");

		return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik${markers}`;
	};

	// Open Google Maps for directions
	const openGoogleMaps = () => {
		const { lat, lng } = selectedStation.coordinates;
		const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
		window.open(url, "_blank");
	};

	if (!mounted) {
		return (
			<div className="w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
					<div className="text-lg text-gray-600 dark:text-gray-300">Loading Police Station Map...</div>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full h-[80vh]  bg-background p-2 sm:p-4">
			<div className="w-full h-full bg-card rounded-lg sm:rounded-xl shadow-lg flex flex-col overflow-hidden border border-border">
				{/* Header */}
				<div className="bg-card border-b border-border px-3 sm:px-5 py-2 sm:py-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 sm:gap-3">
							<div className="flex items-center gap-1 sm:gap-2">
								<div className="hidden sm:block">
									<h1 className="text-lg font-bold text-card-foreground">{language === "mr" ? "पोलीस स्टेशन्स मॅप" : "Police Stations Map"}</h1>
									<p className="text-xs text-muted-foreground">{language === "mr" ? "छत्रपती संभाजी नगर" : "Chhatrapati Sambhaji Nagar"}</p>
								</div>
								<div className="block sm:hidden">
									<h1 className="text-sm font-bold text-card-foreground">{language === "mr" ? "पोलीस मॅप" : "Police Map"}</h1>
								</div>
							</div>
						</div>

						<div className="flex items-center gap-1 sm:gap-2">
							{/* Mobile Menu Button */}
							<motion.button
								onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
								className="sm:hidden flex items-center gap-1 px-2 py-1 text-xs bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<Shield className="w-3 h-3" />
								<span className="font-medium">{language === "mr" ? "स्टेशन्स" : "Stations"}</span>
							</motion.button>

							{/* Desktop Search Input */}
							<div className="hidden sm:block relative">
								<Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
								<input
									type="text"
									placeholder={language === "mr" ? "पोलीस स्टेशन शोधा..." : "Search police stations..."}
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-64 pl-8 pr-3 py-2 text-sm border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
								/>
							</div>

							{/* Desktop Zone Filter */}
							<select
								value={selectedZone}
								onChange={(e) => setSelectedZone(e.target.value)}
								className="hidden sm:block py-2 px-2 text-sm border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
							>
								{zones.map((zone) => (
									<option
										key={zone}
										value={zone}
									>
										{zone === "All" ? (language === "mr" ? "सर्व झोन्स" : "All Zones") : zone}
									</option>
								))}
							</select>

							{/* Find Closest Button */}
							<motion.button
								onClick={findClosestStation}
								className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<Locate className="w-3 h-3 sm:w-4 sm:h-4" />
								<span className="font-medium hidden sm:inline">{language === "mr" ? "जवळचे" : "Closest"}</span>
							</motion.button>
						</div>
					</div>

					{/* Mobile Search and Filter */}
					<div className="sm:hidden mt-2 space-y-2">
						<div className="relative">
							<Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
							<input
								type="text"
								placeholder={language === "mr" ? "स्टेशन शोधा..." : "Search stations..."}
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-8 pr-3 py-2 text-sm border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
							/>
						</div>
						<select
							value={selectedZone}
							onChange={(e) => setSelectedZone(e.target.value)}
							className="w-full py-2 px-3 text-sm border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
						>
							{zones.map((zone) => (
								<option
									key={zone}
									value={zone}
								>
									{zone === "All" ? (language === "mr" ? "सर्व झोन्स" : "All Zones") : zone}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Main Content */}
				<div className="flex-1 flex overflow-hidden relative">
					{/* Map Area */}
					<div className="flex-1 relative">
						<div className="w-full h-full bg-muted">
							<div className={`w-full h-full ${isDarkMode ? "filter invert hue-rotate-180" : ""}`}>
								<iframe
									key={`${selectedStation.id}-${isDarkMode ? "dark" : "light"}`}
									src={generateMapUrl()}
									width="100%"
									height="100%"
									style={{ border: 0 }}
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									title="Interactive map of Chhatrapati Sambhaji Nagar Police Stations"
								></iframe>
							</div>
							{isDarkMode && <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>}
						</div>

						{/* Map Controls */}
						<div className="absolute top-2 sm:top-3 right-2 sm:right-3">
							<motion.button
								onClick={openGoogleMaps}
								className="flex items-center gap-1 px-2 py-1 text-xs bg-card rounded-lg shadow-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Navigation className="w-3 h-3 text-primary" />
								<span className="font-medium text-card-foreground hidden sm:inline">{language === "mr" ? "दिशा" : "Directions"}</span>
								<ExternalLink className="w-3 h-3 text-muted-foreground" />
							</motion.button>
						</div>

						{/* Mobile Station Info Overlay */}
						<div className="sm:hidden absolute bottom-2 left-2 right-2">
							<motion.div
								key={filteredStations.length > 0 ? filteredStations[0].id : "no-results"}
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 50 }}
								className="bg-card rounded-lg shadow-lg border border-border p-3"
							>
								{filteredStations.length > 0 ? (
									<>
										<div className="flex items-center justify-between mb-2">
											<div className="flex items-center gap-1">
												<h3 className="text-sm font-bold text-card-foreground">{language === "mr" ? filteredStations[0].nameMr : filteredStations[0].name}</h3>
												<span className="text-xs px-1 py-0.5 bg-secondary text-secondary-foreground rounded">{filteredStations[0].zone}</span>
											</div>
											<motion.button
												onClick={() => {
													setSelectedStation(filteredStations[0]);
													openGoogleMaps();
												}}
												className="flex items-center gap-1 px-2 py-1 text-xs bg-primary hover:bg-primary/90 text-primary-foreground rounded transition-colors"
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
											>
												<Navigation className="w-3 h-3" />
											</motion.button>
										</div>
										<p className="text-xs text-muted-foreground mb-2">{language === "mr" ? filteredStations[0].addressMr : filteredStations[0].address}</p>
										<div className="flex items-center gap-2 text-xs text-muted-foreground">
											<span>{filteredStations[0].phone}</span>
											<span>•</span>
											<span>{filteredStations[0].workingHours}</span>
										</div>
										{filteredStations.length > 1 && (
											<div className="mt-2 pt-2 border-t border-border">
												<p className="text-xs text-muted-foreground">
													{filteredStations.length - 1} {language === "mr" ? "अधिक स्टेशन्स" : "more stations"} -
													<button
														onClick={() => setIsMobileSidebarOpen(true)}
														className="text-primary hover:text-primary/80 ml-1"
													>
														{language === "mr" ? "सर्व पहा" : "View all"}
													</button>
												</p>
											</div>
										)}
									</>
								) : (
									<div className="text-center py-2">
										<p className="text-xs text-muted-foreground">{language === "mr" ? "कोणतेही स्टेशन्स सापडले नाहीत" : "No stations found"}</p>
									</div>
								)}
							</motion.div>
						</div>
					</div>

					{/* Desktop Sidebar */}
					<div className="hidden sm:block w-80 bg-card border-l border-border flex flex-col overflow-y-auto">
						{/* Sidebar Header */}
						<div className="p-4 border-b border-border">
							<h2 className="text-base font-semibold text-card-foreground mb-1">{language === "mr" ? "पोलीस स्टेशन्स" : "Police Stations"}</h2>
							<p className="text-xs text-muted-foreground">
								{filteredStations.length} {language === "mr" ? "स्टेशन्स उपलब्ध" : "stations available"}
							</p>
						</div>

						{/* Station List */}
						<div className="flex-1 overflow-y-auto p-4">
							<AnimatePresence>
								{filteredStations.length === 0 ? (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className="text-center py-8 text-muted-foreground"
									>
										<Shield className="w-8 h-8 mx-auto mb-2 opacity-50" />
										<p className="text-xs">{language === "mr" ? "कोणतेही स्टेशन्स सापडले नाहीत" : "No stations found"}</p>
									</motion.div>
								) : (
									<div className="space-y-2">
										{filteredStations.map((station) => (
											<motion.div
												key={station.id}
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -20 }}
												className={`p-3 rounded-lg border cursor-pointer transition-all ${
													selectedStation.id === station.id ? "border-primary bg-primary/10 shadow-sm" : "border-border hover:border-primary/50 hover:shadow-sm"
												}`}
												onClick={() => setSelectedStation(station)}
											>
												<div className="flex items-start gap-2">
													<div className="flex-shrink-0">
														<div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedStation.id === station.id ? "bg-primary" : "bg-muted"}`}>
															<Shield className={`w-4 h-4 ${selectedStation.id === station.id ? "text-primary-foreground" : "text-muted-foreground"}`} />
														</div>
													</div>
													<div className="flex-1 min-w-0">
														<div className="flex items-center justify-between mb-1">
															<h3 className="font-medium text-card-foreground text-xs">{language === "mr" ? station.nameMr : station.name}</h3>
															<span className="text-xs px-1 py-0.5 bg-secondary text-secondary-foreground rounded">{station.zone}</span>
														</div>
														<p className="text-xs text-muted-foreground mb-2 line-clamp-2">{language === "mr" ? station.addressMr : station.address}</p>
														<div className="flex items-center gap-1 mb-1">
															<span className="text-xs px-1 py-0.5 bg-muted text-muted-foreground rounded">{station.type}</span>
															<span className="text-xs text-muted-foreground">{station.phone}</span>
														</div>
														<div className="flex flex-wrap gap-1">
															{station.services.slice(0, 2).map((service, index) => (
																<span
																	key={index}
																	className="text-xs px-1 py-0.5 bg-accent text-accent-foreground rounded"
																>
																	{service}
																</span>
															))}
															{station.services.length > 2 && (
																<span className="text-xs px-1 py-0.5 bg-muted text-muted-foreground rounded">+{station.services.length - 2}</span>
															)}
														</div>
													</div>
												</div>
											</motion.div>
										))}
									</div>
								)}
							</AnimatePresence>
						</div>

						{/* Selected Station Details */}
						<div className="p-4 border-t border-border bg-muted/50">
							<div className="mb-3">
								<div className="flex items-center gap-1 mb-1">
									<h3 className="text-sm font-bold text-card-foreground">{language === "mr" ? selectedStation.nameMr : selectedStation.name}</h3>
									<span className="text-xs px-1 py-0.5 bg-secondary text-secondary-foreground rounded">{selectedStation.zone}</span>
								</div>
								<p className="text-xs text-muted-foreground mb-3">{language === "mr" ? selectedStation.addressMr : selectedStation.address}</p>
							</div>

							<div className="grid grid-cols-2 gap-2 mb-3">
								<div className="flex items-center gap-1">
									<Phone className="w-3 h-3 text-primary" />
									<div>
										<p className="text-xs font-medium text-card-foreground">{language === "mr" ? "फोन" : "Phone"}</p>
										<p className="text-xs text-muted-foreground">{selectedStation.phone}</p>
									</div>
								</div>
								<div className="flex items-center gap-1">
									<Clock className="w-3 h-3 text-primary" />
									<div>
										<p className="text-xs font-medium text-card-foreground">{language === "mr" ? "वेळ" : "Hours"}</p>
										<p className="text-xs text-muted-foreground">{selectedStation.workingHours}</p>
									</div>
								</div>
								<div className="flex items-center gap-1">
									<Users className="w-3 h-3 text-primary" />
									<div>
										<p className="text-xs font-medium text-card-foreground">{language === "mr" ? "अधिकारी" : "Officers"}</p>
										<p className="text-xs text-muted-foreground">{selectedStation.officers}</p>
									</div>
								</div>
								<div className="flex items-center gap-1">
									<Shield className="w-3 h-3 text-primary" />
									<div>
										<p className="text-xs font-medium text-card-foreground">{language === "mr" ? "प्रकार" : "Type"}</p>
										<p className="text-xs text-muted-foreground">{selectedStation.type}</p>
									</div>
								</div>
							</div>

							<div className="mb-3">
								<p className="text-xs font-medium text-card-foreground mb-1">{language === "mr" ? "सेवा" : "Services"}</p>
								<div className="flex flex-wrap gap-1">
									{selectedStation.services.map((service, index) => (
										<span
											key={index}
											className="text-xs px-1 py-0.5 bg-accent text-accent-foreground rounded"
										>
											{service}
										</span>
									))}
								</div>
							</div>

							<motion.button
								onClick={openGoogleMaps}
								className="w-full flex items-center justify-center gap-1 px-3 py-2 text-sm bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<Navigation className="w-4 h-4" />
								<span className="font-medium">{language === "mr" ? "Google Maps मध्ये दिशा" : "Get Directions"}</span>
								<ExternalLink className="w-3 h-3" />
							</motion.button>
						</div>
					</div>

					{/* Mobile Sidebar Overlay */}
					<AnimatePresence>
						{isMobileSidebarOpen && (
							<>
								{/* Backdrop */}
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="sm:hidden fixed inset-0 bg-black/50 z-40"
									onClick={() => setIsMobileSidebarOpen(false)}
								/>

								{/* Mobile Sidebar */}
								<motion.div
									initial={{ x: "100%" }}
									animate={{ x: 0 }}
									exit={{ x: "100%" }}
									className="sm:hidden fixed top-0 right-0 h-full w-80 bg-card border-l border-border z-50 flex flex-col"
								>
									{/* Mobile Sidebar Header */}
									<div className="p-4 border-b border-border">
										<div className="flex items-center justify-between mb-2">
											<h2 className="text-base font-semibold text-card-foreground">{language === "mr" ? "पोलीस स्टेशन्स" : "Police Stations"}</h2>
											<button
												onClick={() => setIsMobileSidebarOpen(false)}
												className="p-1 hover:bg-accent rounded"
											>
												<X className="w-4 h-4 text-muted-foreground" />
											</button>
										</div>
										<p className="text-xs text-muted-foreground">
											{filteredStations.length} {language === "mr" ? "स्टेशन्स उपलब्ध" : "stations available"}
										</p>
									</div>

									{/* Mobile Station List */}
									<div className="flex-1 overflow-y-auto p-4">
										<AnimatePresence>
											{filteredStations.length === 0 ? (
												<motion.div
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													className="text-center py-8 text-muted-foreground"
												>
													<Shield className="w-8 h-8 mx-auto mb-2 opacity-50" />
													<p className="text-xs">{language === "mr" ? "कोणतेही स्टेशन्स सापडले नाहीत" : "No stations found"}</p>
												</motion.div>
											) : (
												<div className="space-y-2">
													{filteredStations.map((station) => (
														<motion.div
															key={station.id}
															initial={{ opacity: 0, y: 20 }}
															animate={{ opacity: 1, y: 0 }}
															exit={{ opacity: 0, y: -20 }}
															className={`p-3 rounded-lg border cursor-pointer transition-all ${
																selectedStation.id === station.id ? "border-primary bg-primary/10 shadow-sm" : "border-border hover:border-primary/50 hover:shadow-sm"
															}`}
															onClick={() => {
																setSelectedStation(station);
																setIsMobileSidebarOpen(false);
															}}
														>
															<div className="flex items-start gap-2">
																<div className="flex-shrink-0">
																	<div
																		className={`w-8 h-8 rounded-lg flex items-center justify-center ${
																			selectedStation.id === station.id ? "bg-primary" : "bg-muted"
																		}`}
																	>
																		<Shield className={`w-4 h-4 ${selectedStation.id === station.id ? "text-primary-foreground" : "text-muted-foreground"}`} />
																	</div>
																</div>
																<div className="flex-1 min-w-0">
																	<div className="flex items-center justify-between mb-1">
																		<h3 className="font-medium text-card-foreground text-xs">{language === "mr" ? station.nameMr : station.name}</h3>
																		<span className="text-xs px-1 py-0.5 bg-secondary text-secondary-foreground rounded">{station.zone}</span>
																	</div>
																	<p className="text-xs text-muted-foreground mb-2 line-clamp-2">{language === "mr" ? station.addressMr : station.address}</p>
																	<div className="flex items-center gap-1 mb-1">
																		<span className="text-xs px-1 py-0.5 bg-muted text-muted-foreground rounded">{station.type}</span>
																		<span className="text-xs text-muted-foreground">{station.phone}</span>
																	</div>
																	<div className="flex flex-wrap gap-1">
																		{station.services.slice(0, 2).map((service, index) => (
																			<span
																				key={index}
																				className="text-xs px-1 py-0.5 bg-accent text-accent-foreground rounded"
																			>
																				{service}
																			</span>
																		))}
																		{station.services.length > 2 && (
																			<span className="text-xs px-1 py-0.5 bg-muted text-muted-foreground rounded">+{station.services.length - 2}</span>
																		)}
																	</div>
																</div>
															</div>
														</motion.div>
													))}
												</div>
											)}
										</AnimatePresence>
									</div>
								</motion.div>
							</>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
