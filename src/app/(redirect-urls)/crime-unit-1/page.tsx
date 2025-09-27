"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function CrimeUnit1Page() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "गुन्हे शाखा विभाग १" : "Crime Branch Unit 1"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>{language === "mr" ? "मुख्य गुन्हे अन्वेषण, छापे आणि समन्वय." : "Primary crime investigations, raids and coordination."}</p>
				</CardContent>
			</Card>
		</div>
	);
}
