"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { getPublicServiceRightsData, getMarathiText, PublicServiceRightsData } from "@/lib/api-services";
import { useEffect, useState } from "react";
import { Loader2, Scale, CheckCircle } from "lucide-react";

export default function PublicServiceRightsPage() {
	const { language } = useLanguage();
	const [rights, setRights] = useState<PublicServiceRightsData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchRights = async () => {
			try {
				setLoading(true);
				const data = await getPublicServiceRightsData();
				setRights(data);
			} catch (err) {
				setError("Failed to load public service rights");
				console.error("Error fetching public service rights:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchRights();
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
					<h1 className="text-3xl font-bold mb-4">{language === "mr" ? "लोकसेवा हक्क" : "Public Service Rights"}</h1>
					<p className="text-muted-foreground text-lg">{language === "mr" ? "नागरिकांचे सेवा हक्क आणि प्रक्रियेची माहिती" : "Information on citizens' service rights and processes"}</p>
				</div>

				{error ? (
					<Card className="max-w-4xl mx-auto">
						<CardContent className="pt-6">
							<div className="text-center text-red-500">
								<p>{error}</p>
							</div>
						</CardContent>
					</Card>
				) : rights.length === 0 ? (
					<Card className="max-w-4xl mx-auto">
						<CardContent className="pt-6">
							<div className="text-center text-muted-foreground">
								<Scale className="h-12 w-12 mx-auto mb-4 opacity-50" />
								<p>{language === "mr" ? "कोणतेही सेवा हक्क उपलब्ध नाहीत" : "No service rights available"}</p>
							</div>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-6">
						{rights.map((right) => (
							<Card
								key={right._id}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<div className="flex items-start gap-4">
										<div className="flex-shrink-0">
											<Scale className="h-8 w-8 text-blue-600" />
										</div>
										<div className="flex-1">
											<CardTitle className="text-xl mb-2">{getMarathiText(right.title, right.title_in_marathi)}</CardTitle>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<p className="text-muted-foreground leading-relaxed">{getMarathiText(right.description, right.description_in_marathi)}</p>
										{right.rights && right.rights.length > 0 && (
											<div className="mt-4">
												<h4 className="font-semibold mb-3">{language === "mr" ? "हक्क" : "Rights"}:</h4>
												<ul className="space-y-2">
													{right.rights.map((rightItem, index) => (
														<li
															key={index}
															className="flex items-start gap-2"
														>
															<CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
															<span className="text-sm">{getMarathiText(rightItem, right.rights_in_marathi?.[index])}</span>
														</li>
													))}
												</ul>
											</div>
										)}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
