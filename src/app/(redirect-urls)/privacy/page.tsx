"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function PrivacyPage() {
	const { language } = useLanguage();

	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "गोपनीयता धोरण" : "Privacy Policy"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
					<p>
						{language === "mr"
							? "ही वेबसाइट आपला डेटा सुरक्षित ठेवण्यासाठी वचनबद्ध आहे. आम्ही फक्त आवश्यक माहिती गोळा करतो आणि ती कायदेशीर व सुरक्षा उद्देशांसाठी वापरतो."
							: "We are committed to protecting your data. We collect only necessary information and use it for lawful and security purposes."}
					</p>
					<p>
						{language === "mr"
							? "कुकीज/लोकल स्टोरेज वापरून वापरकर्ता अनुभव सुधारला जाऊ शकतो. आपण आपल्या ब्राउजर सेटिंगमध्ये हे नियंत्रित करू शकता."
							: "Cookies/local storage may be used to enhance user experience. You can control this in your browser settings."}
					</p>
					<p>{language === "mr" ? "कुठल्याही गोपनीयता संबंधित प्रश्नांसाठी कृपया संपर्क पृष्ठ वापरा." : "For privacy-related queries, please use the contact page."}</p>
				</CardContent>
			</Card>
		</div>
	);
}
