"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function PCBPage() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "केंद्रीय गुन्हे शाखा (PCB)" : "Central Crime Unit (PCB)"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>{language === "mr" ? "आंतरजिल्हा समन्वय आणि उच्च-प्रोफाइल तपास." : "Inter-district coordination and high-profile investigations."}</p>
				</CardContent>
			</Card>
		</div>
	);
}
