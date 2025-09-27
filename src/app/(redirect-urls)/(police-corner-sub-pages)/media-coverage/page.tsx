"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { getMediaCoverageData, formatDate, getMarathiText, MediaCoverageData } from "@/lib/api-services";
import { Newspaper, ExternalLink, Calendar, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function MediaCoveragePage() {
	const { language } = useLanguage();
	const [mediaData, setMediaData] = useState<MediaCoverageData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchMediaData = async () => {
			try {
				setLoading(true);
				const data = await getMediaCoverageData();
				setMediaData(data);
			} catch (err) {
				setError("Failed to load media coverage");
				console.error("Error fetching media coverage:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchMediaData();
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
					<h1 className="text-3xl font-bold mb-4">{language === "mr" ? "वृत्तांकन" : "Media Coverage"}</h1>
					<p className="text-muted-foreground text-lg">{language === "mr" ? "पोलिस विभागाचे मीडिया कव्हरेज आणि बातम्या." : "Police department media coverage and news."}</p>
				</div>

				{error && (
					<Card className="mb-6 border-red-200 bg-red-50">
						<CardContent className="pt-6">
							<p className="text-red-600">{error}</p>
						</CardContent>
					</Card>
				)}

				{mediaData.length === 0 && !loading ? (
					<Card>
						<CardContent className="pt-6 text-center">
							<Newspaper className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
							<p className="text-muted-foreground">{language === "mr" ? "कोणतेही मीडिया कव्हरेज उपलब्ध नाही." : "No media coverage available at the moment."}</p>
						</CardContent>
					</Card>
				) : (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{mediaData.map((item) => (
							<Card
								key={item._id}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<CardTitle className="text-lg line-clamp-2">{getMarathiText(item.title, item.title_in_marathi)}</CardTitle>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<Calendar className="h-4 w-4" />
										{formatDate(item.createdAt)}
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground line-clamp-3 mb-4">{getMarathiText(item.description, item.description_in_marathi)}</p>
									{item.link && (
										<a
											href={item.link}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
										>
											<ExternalLink className="h-4 w-4" />
											{language === "mr" ? "वाचा" : "Read More"}
										</a>
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
