"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { getTenderData, formatDate, getMarathiText, TenderData } from "@/lib/api-services";
import { useEffect, useState } from "react";
import { Loader2, FileText, Calendar, Download, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TendersPage() {
	const { language } = useLanguage();
	const [tenders, setTenders] = useState<TenderData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTenders = async () => {
			try {
				setLoading(true);
				const data = await getTenderData();
				setTenders(data);
			} catch (err) {
				setError("Failed to load tenders");
				console.error("Error fetching tenders:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchTenders();
	}, []);

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case "active":
				return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
			case "closed":
				return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
			case "upcoming":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
		}
	};

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
					<h1 className="text-3xl font-bold mb-4">{language === "mr" ? "निविदा" : "Tenders"}</h1>
					<p className="text-muted-foreground text-lg">{language === "mr" ? "प्रचलित निविदा आणि निविदा प्रक्रियेची माहिती" : "Active tenders and tender process information"}</p>
				</div>

				{error ? (
					<Card className="max-w-4xl mx-auto">
						<CardContent className="pt-6">
							<div className="text-center text-red-500">
								<p>{error}</p>
							</div>
						</CardContent>
					</Card>
				) : tenders.length === 0 ? (
					<Card className="max-w-4xl mx-auto">
						<CardContent className="pt-6">
							<div className="text-center text-muted-foreground">
								<FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
								<p>{language === "mr" ? "कोणतेही निविदा उपलब्ध नाहीत" : "No tenders available"}</p>
							</div>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-6">
						{tenders.map((tender) => (
							<Card
								key={tender._id}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<CardTitle className="text-xl mb-2">{getMarathiText(tender.title, tender.title_in_marathi)}</CardTitle>
											<div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
												<div className="flex items-center gap-1">
													<Calendar className="h-4 w-4" />
													{language === "mr" ? "उघडण्याची तारीख" : "Opening Date"}: {formatDate(tender.openingDate)}
												</div>
												<div className="flex items-center gap-1">
													<Clock className="h-4 w-4" />
													{language === "mr" ? "बंद होण्याची तारीख" : "Closing Date"}: {formatDate(tender.closingDate)}
												</div>
											</div>
											<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(tender.status)}`}>{tender.status}</span>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed mb-4">{getMarathiText(tender.description, tender.description_in_marathi)}</p>
									{tender.documentLink && (
										<Button
											variant="outline"
											size="sm"
										>
											<Download className="h-4 w-4 mr-2" />
											{language === "mr" ? "दस्तऐवज डाउनलोड करा" : "Download Document"}
										</Button>
									)}
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
