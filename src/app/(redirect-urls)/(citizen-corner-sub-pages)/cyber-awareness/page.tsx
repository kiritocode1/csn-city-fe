"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { getCyberAwarenessData, getMarathiText, CyberAwarenessData } from "@/lib/api-services";
import { useEffect, useState } from "react";
import { Loader2, Shield, AlertTriangle } from "lucide-react";

export default function CyberAwarenessPage() {
	const { language } = useLanguage();
	const [cyberAwareness, setCyberAwareness] = useState<CyberAwarenessData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCyberAwareness = async () => {
			try {
				setLoading(true);
				const data = await getCyberAwarenessData();
				setCyberAwareness(data);
			} catch (err) {
				setError("Failed to load cyber awareness content");
				console.error("Error fetching cyber awareness:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchCyberAwareness();
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
					<h1 className="text-3xl font-bold mb-4">{language === "mr" ? "सायबर जनजागृती" : "Cyber Awareness"}</h1>
					<p className="text-muted-foreground text-lg">{language === "mr" ? "सायबर सुरक्षिततेबद्दल माहिती आणि जनजागृती उपक्रम" : "Information and outreach initiatives for cyber safety"}</p>
				</div>

				{error ? (
					<Card className="max-w-4xl mx-auto">
						<CardContent className="pt-6">
							<div className="text-center text-red-500">
								<p>{error}</p>
							</div>
						</CardContent>
					</Card>
				) : cyberAwareness.length === 0 ? (
					<Card className="max-w-4xl mx-auto">
						<CardContent className="pt-6">
							<div className="text-center text-muted-foreground">
								<Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
								<p>{language === "mr" ? "कोणतीही सायबर जागरूकता सामग्री उपलब्ध नाही" : "No cyber awareness content available"}</p>
							</div>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-6">
						{cyberAwareness.map((item) => (
							<Card
								key={item._id}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<div className="flex items-start gap-4">
										<div className="flex-shrink-0">
											<Shield className="h-8 w-8 text-blue-600" />
										</div>
										<div className="flex-1">
											<CardTitle className="text-xl mb-2">{getMarathiText(item.title, item.title_in_marathi)}</CardTitle>
											<div className="text-sm text-muted-foreground">
												<span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{item.category}</span>
											</div>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<p className="text-muted-foreground leading-relaxed">{getMarathiText(item.content, item.content_in_marathi)}</p>
										{item.image && (
											<div className="mt-4">
												<img
													src={item.image}
													alt={getMarathiText(item.title, item.title_in_marathi)}
													className="w-full h-48 object-cover rounded-lg"
												/>
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
