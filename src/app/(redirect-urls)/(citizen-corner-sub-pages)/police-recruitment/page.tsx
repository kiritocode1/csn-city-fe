"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { getPoliceRecruitmentData, getMarathiText, PoliceRecruitmentData } from "@/lib/api-services";
import { useEffect, useState } from "react";
import { Loader2, Users, Calendar, FileText, CheckCircle } from "lucide-react";

export default function PoliceRecruitmentPage() {
	const { language } = useLanguage();
	const [recruitments, setRecruitments] = useState<PoliceRecruitmentData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchRecruitments = async () => {
			try {
				setLoading(true);
				const data = await getPoliceRecruitmentData();
				setRecruitments(data);
			} catch (err) {
				setError("Failed to load police recruitment information");
				console.error("Error fetching police recruitment:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchRecruitments();
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
					<h1 className="text-3xl font-bold mb-4">{language === "mr" ? "पोलीस भरती" : "Police Recruitment"}</h1>
					<p className="text-muted-foreground text-lg">{language === "mr" ? "सध्याच्या भरतीसंबंधी माहिती आणि अर्ज प्रक्रिया" : "Current recruitment information and application process"}</p>
				</div>

				{error ? (
					<Card className="max-w-4xl mx-auto">
						<CardContent className="pt-6">
							<div className="text-center text-red-500">
								<p>{error}</p>
							</div>
						</CardContent>
					</Card>
				) : recruitments.length === 0 ? (
					<Card className="max-w-4xl mx-auto">
						<CardContent className="pt-6">
							<div className="text-center text-muted-foreground">
								<Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
								<p>{language === "mr" ? "सध्याच्या भरतीसंबंधी माहिती उपलब्ध नाही" : "No current recruitment information available"}</p>
							</div>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-6">
						{recruitments.map((recruitment) => (
							<Card
								key={recruitment._id}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<div className="flex items-start gap-4">
										<div className="flex-shrink-0">
											<Users className="h-8 w-8 text-blue-600" />
										</div>
										<div className="flex-1">
											<CardTitle className="text-xl mb-2">{getMarathiText(recruitment.title, recruitment.title_in_marathi)}</CardTitle>
											{recruitment.deadline && (
												<div className="flex items-center gap-2 text-sm text-muted-foreground">
													<Calendar className="h-4 w-4" />
													{language === "mr" ? "अंतिम तारीख" : "Deadline"}: {recruitment.deadline}
												</div>
											)}
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<p className="text-muted-foreground leading-relaxed">{getMarathiText(recruitment.description, recruitment.description_in_marathi)}</p>

										{recruitment.requirements && recruitment.requirements.length > 0 && (
											<div className="mt-4">
												<h4 className="font-semibold mb-3 flex items-center gap-2">
													<FileText className="h-4 w-4" />
													{language === "mr" ? "पात्रता निकष" : "Eligibility Requirements"}:
												</h4>
												<ul className="space-y-2">
													{recruitment.requirements.map((requirement, index) => (
														<li
															key={index}
															className="flex items-start gap-2"
														>
															<CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
															<span className="text-sm">{getMarathiText(requirement, recruitment.requirements_in_marathi?.[index])}</span>
														</li>
													))}
												</ul>
											</div>
										)}

										{recruitment.applicationProcess && (
											<div className="mt-4">
												<h4 className="font-semibold mb-3">{language === "mr" ? "अर्ज प्रक्रिया" : "Application Process"}:</h4>
												<p className="text-sm text-muted-foreground">{getMarathiText(recruitment.applicationProcess, recruitment.applicationProcess_in_marathi)}</p>
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
