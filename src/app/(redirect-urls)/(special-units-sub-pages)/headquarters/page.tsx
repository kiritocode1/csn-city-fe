"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function HeadquartersPage() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "पोलीस मुख्यालय" : "Police Headquarters"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>
						{language === "mr"
							? "छत्रपती संभाजीनगर शहर पोलीस मुख्यालयाचे पत्ता आणि संपर्क लवकरच उपलब्ध होईल."
							: "Address and contact for the Chhatrapati Sambhajinagar City Police HQ will be available soon."}
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
