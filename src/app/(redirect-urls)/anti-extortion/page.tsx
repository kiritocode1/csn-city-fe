"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function AntiExtortionPage() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "खंडणी विरोधी पथक" : "Anti-Extortion Cell"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>{language === "mr" ? "खंडणी प्रकरणांची तपासणी आणि प्रतिबंध." : "Investigation and prevention of extortion cases."}</p>
				</CardContent>
			</Card>
		</div>
	);
}
