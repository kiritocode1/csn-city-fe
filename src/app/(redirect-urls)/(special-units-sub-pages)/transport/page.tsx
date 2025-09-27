"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function TransportPage() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "मोटर वाहतूक" : "Motor Transport"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>{language === "mr" ? "वाहन व्यवस्थापन, देखभाल आणि लॉजिस्टिक्स संदर्भातील माहिती लवकरच." : "Information on fleet management, maintenance and logistics coming soon."}</p>
				</CardContent>
			</Card>
		</div>
	);
}
