"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function CrimeUnit2Page() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "गुन्हे शाखा विभाग २" : "Crime Branch Unit 2"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>{language === "mr" ? "विशेष तपास, नाजूक प्रकरणे आणि तांत्रिक सहाय्य." : "Special investigations, sensitive cases and technical assistance."}</p>
				</CardContent>
			</Card>
		</div>
	);
}
