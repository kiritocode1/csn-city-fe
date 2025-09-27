"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { getCitizenWallData, formatDate, getMarathiText, CitizenWallData } from "@/lib/api-services";
import { useEffect, useState } from "react";
import { Loader2, MessageSquare, User, Calendar } from "lucide-react";

export default function CitizenWallPage() {
	const { language } = useLanguage();
	const [citizenMessages, setCitizenMessages] = useState<CitizenWallData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCitizenMessages = async () => {
			try {
				setLoading(true);
				const data = await getCitizenWallData();
				setCitizenMessages(data);
			} catch (err) {
				setError("Failed to load citizen messages");
				console.error("Error fetching citizen messages:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchCitizenMessages();
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
					<h1 className="text-3xl font-bold mb-4">{language === "mr" ? "सिटीझन वॉल" : "Citizen Wall"}</h1>
					<p className="text-muted-foreground text-lg">{language === "mr" ? "नागरिकांकडून अभिप्राय आणि कौतुक संदेश" : "Citizen feedback and appreciation messages"}</p>
				</div>

				{error ? (
					<Card className="max-w-4xl mx-auto">
						<CardContent className="pt-6">
							<div className="text-center text-red-500">
								<p>{error}</p>
							</div>
						</CardContent>
					</Card>
				) : citizenMessages.length === 0 ? (
					<Card className="max-w-4xl mx-auto">
						<CardContent className="pt-6">
							<div className="text-center text-muted-foreground">
								<MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
								<p>{language === "mr" ? "कोणतेही संदेश उपलब्ध नाहीत" : "No messages available"}</p>
							</div>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-6">
						{citizenMessages.map((message) => (
							<Card
								key={message._id}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<CardTitle className="text-xl mb-2">{getMarathiText(message.title, message.title_in_marathi)}</CardTitle>
											<div className="flex items-center gap-4 text-sm text-muted-foreground">
												<div className="flex items-center gap-1">
													<User className="h-4 w-4" />
													{message.author}
												</div>
												<div className="flex items-center gap-1">
													<Calendar className="h-4 w-4" />
													{formatDate(message.date)}
												</div>
											</div>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">{getMarathiText(message.message, message.message_in_marathi)}</p>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
