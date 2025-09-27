"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function AntiGundaPage() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "गुंडाविरोधी पथक" : "Anti-Gunda Squad"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>{language === "mr" ? "गुंडगिरी व खंडणीविरोधी कारवाई." : "Actions against hooliganism and extortion."}</p>
				</CardContent>
			</Card>
		</div>
	);
}
