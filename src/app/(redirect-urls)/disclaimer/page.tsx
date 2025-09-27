"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function DisclaimerPage() {
	const { language } = useLanguage();

	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "अस्वीकरण" : "Disclaimer"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
					<p>
						{language === "mr"
							? "या वेबसाइटवरील माहिती छत्रपती संभाजीनगर शहर पोलीस यांच्या सेवांबद्दल सामान्य जागरूकतेसाठी प्रदान केली आहे. येथे दिलेली माहिती सूचना न देता बदलू शकते. कोणत्याही त्रुटी, अचूकतेतील चूक किंवा अद्ययावत बदलांसाठी विभाग जबाबदार राहणार नाही."
							: "Information on this website is provided to increase public awareness of services by the Chhatrapati Sambhajinagar City Police. Content may change without notice. The department is not liable for errors, omissions, or updates."}
					</p>
					<p>
						{language === "mr"
							? "या साइटवरील बाह्य दुवे फक्त सोयीसाठी दिले आहेत. बाह्य वेबसाइटवरील सामग्रीबाबत किंवा तिच्या उपलब्धतेबाबत आम्ही जबाबदार नाही."
							: "External links are provided for convenience. We are not responsible for the content or availability of external websites."}
					</p>
					<p>
						{language === "mr"
							? "आपत्कालीन परिस्थितीत कृपया 112 वर कॉल करा किंवा जवळच्या पोलीस स्टेशनशी संपर्क साधा."
							: "For emergencies, please call 112 or contact your nearest police station."}
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
