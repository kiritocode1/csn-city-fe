"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { getCrimeReviewData, formatDate, getMarathiText, CircularData } from "@/lib/api-services";
import { FileText, Download, Calendar, Loader2, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function CrimeReviewPage() {
	const { language } = useLanguage();
	const [crimeReviewData, setCrimeReviewData] = useState<CircularData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCrimeReviewData = async () => {
			try {
				setLoading(true);
				const data = await getCrimeReviewData();
				setCrimeReviewData(data);
			} catch (err) {
				setError("Failed to load crime review data");
				console.error("Error fetching crime review data:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchCrimeReviewData();
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
					<h1 className="text-3xl font-bold mb-4">{language === "mr" ? "गुन्हे आढावा" : "Crime Review"}</h1>
					<p className="text-muted-foreground text-lg">{language === "mr" ? "गुन्ह्यांची समीक्षा, विश्लेषण आणि अहवाल." : "Crime review, analysis and reports."}</p>
				</div>

				{error && (
					<Card className="mb-6 border-red-200 bg-red-50">
						<CardContent className="pt-6">
							<p className="text-red-600">{error}</p>
						</CardContent>
					</Card>
				)}

				{crimeReviewData.length === 0 && !loading ? (
					<Card>
						<CardContent className="pt-6 text-center">
							<BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
							<p className="text-muted-foreground">{language === "mr" ? "कोणतेही गुन्हा समीक्षा उपलब्ध नाही." : "No crime review available at the moment."}</p>
						</CardContent>
					</Card>
				) : (
					<div className="space-y-4">
						{crimeReviewData.map((item) => (
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
