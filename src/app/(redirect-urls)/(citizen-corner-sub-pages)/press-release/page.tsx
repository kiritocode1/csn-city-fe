"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { getPressReleaseData, formatDate, getMarathiText, PressReleaseData } from "@/lib/api-services";
import { useEffect, useState } from "react";
import { Loader2, Newspaper, Calendar } from "lucide-react";

export default function PressReleasePage() {
	const { language } = useLanguage();
	const [pressReleases, setPressReleases] = useState<PressReleaseData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPressReleases = async () => {
			try {
				setLoading(true);
				const data = await getPressReleaseData();
				setPressReleases(data);
			} catch (err) {
				setError("Failed to load press releases");
				console.error("Error fetching press releases:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchPressReleases();
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
					<h1 className="text-3xl font-bold mb-4">{language === "mr" ? "प्रेस प्रकाशन" : "Press Release"}</h1>
					<p className="text-muted-foreground text-lg">{language === "mr" ? "विभागाच्या अधिकृत घोषण्या आणि बातम्या" : "Official announcements and news from the department"}</p>
				</div>

				{error ? (
					<Card className="max-w-4xl mx-auto">
						<CardContent className="pt-6">
							<div className="text-center text-red-500">
								<p>{error}</p>
							</div>
						</CardContent>
					</Card>
				) : pressReleases.length === 0 ? (
					<Card className="max-w-4xl mx-auto">
						<CardContent className="pt-6">
							<div className="text-center text-muted-foreground">
								<Newspaper className="h-12 w-12 mx-auto mb-4 opacity-50" />
								<p>{language === "mr" ? "कोणतेही प्रेस प्रकाशन उपलब्ध नाहीत" : "No press releases available"}</p>
							</div>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-6">
						{pressReleases.map((release) => (
							<Card
								key={release._id}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<CardTitle className="text-xl mb-2">{getMarathiText(release.title, release.title_in_marathi)}</CardTitle>
											<div className="flex items-center gap-4 text-sm text-muted-foreground">
												<div className="flex items-center gap-1">
													<Calendar className="h-4 w-4" />
													{formatDate(release.date)}
												</div>
											</div>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">{getMarathiText(release.content, release.content_in_marathi)}</p>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
