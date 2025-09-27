"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function AntiNarcoticPage() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "अंमली पदार्थ विरोधी सेल" : "Anti-Narcotic Cell"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>{language === "mr" ? "अंमली पदार्थ विक्री व तस्करीविरोधात कारवाई." : "Action against drug sale and trafficking."}</p>
				</CardContent>
			</Card>
		</div>
	);
}
