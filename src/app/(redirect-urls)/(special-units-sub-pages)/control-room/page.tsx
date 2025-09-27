"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function ControlRoomPage() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "नियंत्रण कक्ष" : "Control Room"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>{language === "mr" ? "आपत्कालीन परिस्थितीत 112 वर कॉल करा. नियंत्रण कक्ष 24x7 कार्यरत आहे." : "In emergencies call 112. The control room operates 24x7."}</p>
				</CardContent>
			</Card>
		</div>
	);
}
