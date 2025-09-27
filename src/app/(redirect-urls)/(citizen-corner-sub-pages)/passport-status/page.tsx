"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { getPassportStatusData, getMarathiText, PassportStatusData } from "@/lib/api-services";
import { useEffect, useState } from "react";
import { Loader2, FileText, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PassportStatusPage() {
	const { language } = useLanguage();
	const [passportInfo, setPassportInfo] = useState<PassportStatusData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPassportInfo = async () => {
			try {
				setLoading(true);
				const data = await getPassportStatusData();
				setPassportInfo(data);
			} catch (err) {
				setError("Failed to load passport status information");
				console.error("Error fetching passport status:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchPassportInfo();
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
					<h1 className="text-3xl font-bold mb-4">{language === "mr" ? "पासपोर्ट स्थिती" : "Passport Status"}</h1>
					<p className="text-muted-foreground text-lg">
						{language === "mr" ? "पासपोर्ट पडताळणी स्थिती तपासण्यासाठी अधिकृत पोर्टलचा वापर करा" : "Use the official portal to check passport verification status"}
					</p>
				</div>

				{error ? (
					<Card className="max-w-4xl mx-auto">
						<CardContent className="pt-6">
							<div className="text-center text-red-500">
								<p>{error}</p>
							</div>
						</CardContent>
					</Card>
				) : passportInfo.length === 0 ? (
					<Card className="max-w-4xl mx-auto">
						<CardContent className="pt-6">
							<div className="text-center text-muted-foreground">
								<FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
								<p>{language === "mr" ? "पासपोर्ट माहिती उपलब्ध नाही" : "No passport information available"}</p>
							</div>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-6">
						{passportInfo.map((info) => (
							<Card
								key={info._id}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<div className="flex items-start gap-4">
										<div className="flex-shrink-0">
											<FileText className="h-8 w-8 text-blue-600" />
										</div>
										<div className="flex-1">
											<CardTitle className="text-xl mb-2">{getMarathiText(info.title, info.title_in_marathi)}</CardTitle>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<p className="text-muted-foreground leading-relaxed">{getMarathiText(info.description, info.description_in_marathi)}</p>

										{info.process && (
											<div className="mt-4">
												<h4 className="font-semibold mb-3">{language === "mr" ? "प्रक्रिया" : "Process"}:</h4>
												<p className="text-sm text-muted-foreground">{getMarathiText(info.process, info.process_in_marathi)}</p>
											</div>
										)}

										{info.requiredDocuments && info.requiredDocuments.length > 0 && (
											<div className="mt-4">
												<h4 className="font-semibold mb-3">{language === "mr" ? "आवश्यक दस्तऐवज" : "Required Documents"}:</h4>
												<ul className="space-y-2">
													{info.requiredDocuments.map((doc, index) => (
														<li
															key={index}
															className="flex items-start gap-2"
														>
															<CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
															<span className="text-sm">{getMarathiText(doc, info.requiredDocuments_in_marathi?.[index])}</span>
														</li>
													))}
												</ul>
											</div>
										)}

										<div className="mt-6 pt-4 border-t">
											<Button
												onClick={() => window.open("https://portal2.passportindia.gov.in/AppOnlineProject/statusTracker/trackStatusInpNew", "_blank")}
												className="w-full"
											>
												<ExternalLink className="h-4 w-4 mr-2" />
												{language === "mr" ? "पासपोर्ट स्थिती तपासा" : "Check Passport Status"}
											</Button>
										</div>
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
