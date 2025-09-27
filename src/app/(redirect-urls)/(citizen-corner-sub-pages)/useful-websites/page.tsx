"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { getUsefulWebsiteData, getMarathiText, UsefulWebsiteData } from "@/lib/api-services";
import { useEffect, useState } from "react";
import { Loader2, ExternalLink, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UsefulWebsitesPage() {
	const { language } = useLanguage();
	const [websites, setWebsites] = useState<UsefulWebsiteData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchWebsites = async () => {
			try {
				setLoading(true);
				const data = await getUsefulWebsiteData();
				setWebsites(data);
			} catch (err) {
				setError("Failed to load useful websites");
				console.error("Error fetching useful websites:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchWebsites();
	}, []);

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-12">
				<div className="flex items-center justify-center">
					<Loader2 className="h-8 w-8 animate-spin" />
					<span className="ml-2">{language === "mr" ? "लोड होत आहे..." : "Loading..."}</span>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-12">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">{language === "mr" ? "उपयुक्त वेबसाइट्स" : "Useful Websites"}</h1>
					<p className="text-muted-foreground text-lg">{language === "mr" ? "सरकारी आणि अधिकृत वेबसाइट्सचे दुवे" : "Links to government and official websites"}</p>
				</div>

				{error ? (
					<Card className="max-w-4xl mx-auto">
						<CardContent className="pt-6">
							<div className="text-center text-red-500">
								<p>{error}</p>
							</div>
						</CardContent>
					</Card>
				) : websites.length === 0 ? (
					<Card className="max-w-4xl mx-auto">
						<CardContent className="pt-6">
							<div className="text-center text-muted-foreground">
								<Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
								<p>{language === "mr" ? "कोणतेही वेबसाइट्स उपलब्ध नाहीत" : "No websites available"}</p>
							</div>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{websites.map((website) => (
							<Card
								key={website._id}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<CardTitle className="text-lg flex items-center gap-2">
										<Globe className="h-5 w-5" />
										{getMarathiText(website.title, website.title_in_marathi)}
									</CardTitle>
									<div className="text-sm text-muted-foreground">
										<span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{website.category}</span>
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground text-sm mb-4 leading-relaxed">{getMarathiText(website.description, website.description_in_marathi)}</p>
									<Button
										variant="outline"
										size="sm"
										className="w-full"
										onClick={() => window.open(website.url, "_blank")}
									>
										<ExternalLink className="h-4 w-4 mr-2" />
										{language === "mr" ? "वेबसाइट उघडा" : "Visit Website"}
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
