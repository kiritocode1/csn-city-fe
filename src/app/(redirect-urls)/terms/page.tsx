"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function TermsPage() {
	const { language } = useLanguage();

	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "अटी व शर्ती" : "Terms & Conditions"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
					<ul className="list-disc pl-5 space-y-2">
						<li>
							{language === "mr"
								? "ही वेबसाइट सार्वजनिक माहिती आणि सेवांसाठी आहे. अनधिकृत वापर टाळा."
								: "This website is for public information and services. Unauthorized use is prohibited."}
						</li>
						<li>{language === "mr" ? "साइटवर अपलोड केलेले कोणतेही सामग्री कायद्याचे पालन करणारे असावे." : "Any content submitted must comply with applicable laws."}</li>
						<li>{language === "mr" ? "या अटींमध्ये बदल होऊ शकतात; बदल प्रकाशित झाल्यानंतर तत्काळ लागू होतील." : "Terms may change; updates take effect upon publication."}</li>
					</ul>
				</CardContent>
			</Card>
		</div>
	);
}
