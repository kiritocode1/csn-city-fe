"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { getWelfareData, formatDate, getMarathiText, WelfareData } from "@/lib/api-services";
import { Heart, Calendar, Image as ImageIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function WelfareInitiativesPage() {
	const { language } = useLanguage();
	const [welfareData, setWelfareData] = useState<WelfareData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchWelfareData = async () => {
			try {
				setLoading(true);
				const data = await getWelfareData();
				setWelfareData(data);
			} catch (err) {
				setError("Failed to load welfare initiatives");
				console.error("Error fetching welfare data:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchWelfareData();
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
					<h1 className="text-3xl font-bold mb-4">{language === "mr" ? "कल्याणकारी उपक्रम" : "Welfare Initiatives"}</h1>
					<p className="text-muted-foreground text-lg">
						{language === "mr" ? "पोलिस विभागाचे कल्याणकारी उपक्रम आणि समुदाय सेवा." : "Police department welfare initiatives and community services."}
					</p>
				</div>

				{error && (
					<Card className="mb-6 border-red-200 bg-red-50">
						<CardContent className="pt-6">
							<p className="text-red-600">{error}</p>
						</CardContent>
					</Card>
				)}

				{welfareData.length === 0 && !loading ? (
					<Card>
						<CardContent className="pt-6 text-center">
							<Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
							<p className="text-muted-foreground">{language === "mr" ? "कोणतेही कल्याणकारी उपक्रम उपलब्ध नाहीत." : "No welfare initiatives available at the moment."}</p>
						</CardContent>
					</Card>
				) : (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{welfareData.map((initiative) => (
							<Card
								key={initiative._id}
								className="hover:shadow-lg transition-shadow overflow-hidden"
							>
								{initiative.photo && (
									<div className="relative h-48 w-full">
										<Image
											src={initiative.photo}
											alt={getMarathiText(initiative.title, initiative.title_in_marathi)}
											fill
											className="object-cover"
										/>

										
									</div>
								)}
								<CardHeader>
									<CardTitle className="text-lg line-clamp-2">{getMarathiText(initiative.title, initiative.title_in_marathi)}</CardTitle>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<Calendar className="h-4 w-4" />
										{formatDate(initiative.date)}
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground line-clamp-3">{getMarathiText(initiative.about, initiative.about_in_marathi)}</p>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
