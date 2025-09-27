"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { getGoodWorkData, formatDate, getMarathiText, GoodWorkData } from "@/lib/api-services";
import { Award, Download, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function GoodWorkPage() {
	const { language } = useLanguage();
	const [goodWorkData, setGoodWorkData] = useState<GoodWorkData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchGoodWorkData = async () => {
			try {
				setLoading(true);
				const data = await getGoodWorkData();
				setGoodWorkData(data);
			} catch (err) {
				setError("Failed to load good work data");
				console.error("Error fetching good work data:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchGoodWorkData();
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
				<div className="mb-8">
					<h1 className="text-3xl font-bold mb-4">{language === "mr" ? "उत्कृष्ट कामगिरी" : "Good Work"}</h1>
					<p className="text-muted-foreground text-lg">{language === "mr" ? "पोलिस विभागाचे चांगले काम आणि उपलब्धी." : "Police department good work and achievements."}</p>
				</div>

				{error && (
					<Card className="mb-6 border-red-200 bg-red-50">
						<CardContent className="pt-6">
							<p className="text-red-600">{error}</p>
						</CardContent>
					</Card>
				)}

				{goodWorkData.length === 0 && !loading ? (
					<Card>
						<CardContent className="pt-6 text-center">
							<Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
							<p className="text-muted-foreground">{language === "mr" ? "कोणतेही चांगले काम उपलब्ध नाही." : "No good work available at the moment."}</p>
						</CardContent>
					</Card>
				) : (
					<div className="space-y-4">
						{goodWorkData.map((item) => (
							<Card
								key={item._id}
								className="hover:shadow-md transition-shadow"
							>
								<CardHeader>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<CardTitle className="text-lg mb-2">{getMarathiText(item.title, item.title_in_marathi)}</CardTitle>
											<div className="flex items-center gap-4 text-sm text-muted-foreground">
												<div className="flex items-center gap-1">
													<Calendar className="h-4 w-4" />
													{formatDate(item.date)}
												</div>
											</div>
										</div>
										{item.pdflink && (
											<Button
												asChild
												variant="outline"
												size="sm"
												className="ml-4"
											>
												<a
													href={item.pdflink}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center gap-2"
												>
													<Download className="h-4 w-4" />
													{language === "mr" ? "डाउनलोड" : "Download"}
												</a>
											</Button>
										)}
									</div>
								</CardHeader>
							</Card>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
