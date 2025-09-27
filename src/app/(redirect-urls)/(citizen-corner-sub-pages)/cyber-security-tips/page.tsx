"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { getCyberAwarenessData, getMarathiText, CyberAwarenessData } from "@/lib/api-services";
import { useEffect, useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

export default function CyberSecurityTipsPage() {
	const { language } = useLanguage();
	const [cyberTips, setCyberTips] = useState<CyberAwarenessData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCyberTips = async () => {
			try {
				setLoading(true);
				const data = await getCyberAwarenessData();
				// Filter for cyber security tips specifically
				const tips = data.filter(
					(item) =>
						item.category.toLowerCase().includes("security") ||
						item.category.toLowerCase().includes("tips") ||
						item.title.toLowerCase().includes("password") ||
						item.title.toLowerCase().includes("security"),
				);
				setCyberTips(tips);
			} catch (err) {
				setError("Failed to load cyber security tips");
				console.error("Error fetching cyber security tips:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchCyberTips();
	}, []);

	// Fallback tips if no data from API
	const fallbackTips: CyberAwarenessData[] = [
		{
			_id: "fallback-tip-1",
			title: language === "mr" ? "मजबूत पासवर्ड वापरा" : "Use Strong Passwords",
			title_in_marathi: "मजबूत पासवर्ड वापरा",
			content: language === "mr" ? "किमान 8 अक्षरे, संख्या आणि विशेष वर्ण असलेले मजबूत पासवर्ड वापरा" : "Use passwords with at least 8 characters including numbers and special characters",
			content_in_marathi: "किमान 8 अक्षरे, संख्या आणि विशेष वर्ण असलेले मजबूत पासवर्ड वापरा",
			category: "Password Security",
			createdAt: "2024-01-20T00:00:00.000Z",
		},
		{
			_id: "fallback-tip-2",
			title: language === "mr" ? "OTP कधीही शेअर करू नका" : "Never Share OTP",
			title_in_marathi: "OTP कधीही शेअर करू नका",
			content: language === "mr" ? "OTP कधीही कोणालाही शेअर करू नका, ते केवळ तुमच्यासाठी आहे" : "Never share OTP with anyone, it's only for your use",
			content_in_marathi: "OTP कधीही कोणालाही शेअर करू नका, ते केवळ तुमच्यासाठी आहे",
			category: "Online Safety",
			createdAt: "2024-01-20T00:00:00.000Z",
		},
		{
			_id: "fallback-tip-3",
			title: language === "mr" ? "फिशिंग लिंकपासून सावध रहा" : "Beware of Phishing Links",
			title_in_marathi: "फिशिंग लिंकपासून सावध रहा",
			content: language === "mr" ? "अज्ञात ईमेल किंवा संदेशांमधील लिंकवर क्लिक करण्यापूर्वी दोनदा विचार करा" : "Think twice before clicking links in unknown emails or messages",
			content_in_marathi: "अज्ञात ईमेल किंवा संदेशांमधील लिंकवर क्लिक करण्यापूर्वी दोनदा विचार करा",
			category: "Online Safety",
			createdAt: "2024-01-20T00:00:00.000Z",
		},
	];

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
					<h1 className="text-3xl font-bold mb-4">{language === "mr" ? "सायबर सुरक्षा टिप्स" : "Cyber Security Tips"}</h1>
					<p className="text-muted-foreground text-lg">{language === "mr" ? "ऑनलाइन सुरक्षित राहण्यासाठी महत्वाचे टिप्स" : "Important tips to stay safe online"}</p>
				</div>

				{error ? (
					<Card className="max-w-4xl mx-auto">
						<CardContent className="pt-6">
							<div className="text-center text-red-500">
								<p>{error}</p>
							</div>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-6">
						{/* Show API data if available, otherwise show fallback tips */}
						{(cyberTips.length > 0 ? cyberTips : fallbackTips).map((tip, index) => (
							<Card
								key={index}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<div className="flex items-start gap-4">
										<div className="flex-shrink-0">
											<CheckCircle className="h-8 w-8 text-green-600" />
										</div>
										<div className="flex-1">
											<CardTitle className="text-xl mb-2">{getMarathiText(tip.title, tip.title_in_marathi)}</CardTitle>
											{tip.category && (
												<div className="text-sm text-muted-foreground">
													<span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{tip.category}</span>
												</div>
											)}
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">{getMarathiText(tip.content, tip.content_in_marathi)}</p>
									{tip.image && (
										<div className="mt-4">
											<img
												src={tip.image || "/sample-cyber-1.jpg"}
												alt={getMarathiText(tip.title, tip.title_in_marathi)}
												className="w-full h-48 object-cover rounded-lg"
											/>
										</div>
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
