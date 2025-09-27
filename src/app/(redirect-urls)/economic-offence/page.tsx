"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function EconomicOffencePage() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "आर्थिक गुन्हे शाखा" : "Economic Offence Wing"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>{language === "mr" ? "आर्थिक फसवणूक, सायबर आर्थिक गुन्हे आणि तपास." : "Financial fraud, cyber-financial crimes and investigations."}</p>
				</CardContent>
			</Card>
		</div>
	);
}
