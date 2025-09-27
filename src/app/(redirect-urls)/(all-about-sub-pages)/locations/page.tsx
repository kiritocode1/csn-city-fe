"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { Phone } from "lucide-react";
import { useTheme } from "next-themes";
const LocationsPage = () => {
	const { language } = useLanguage();
	// CSN center
	const lat = 19.8758;
	const lng = 75.3393;
	const delta = 0.06; // zoom window
	const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
	const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
	const darkmapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}&dark=1`;
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => setMounted(true), []);
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">{language === "mr" ? "कार्यक्षेत्र नकाशा" : "Jurisdiction Map"}</h1>
				</div>

				<Card className="mb-8 overflow-hidden">
					<CardContent>
						<div className="w-full h-[70vh] rounded-md overflow-hidden border">
							{mounted ? (
								<iframe
									key={`${resolvedTheme}-${mapSrc}`}
									src={resolvedTheme === "dark" ? darkmapSrc : mapSrc}
									width="100%"
									height="100%"
									style={{ border: 0 }}
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									title="CSN Map"
								></iframe>
							) : (
								<div className="w-full h-full bg-muted" />
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default LocationsPage;
