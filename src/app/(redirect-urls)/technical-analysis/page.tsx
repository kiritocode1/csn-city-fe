"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function TechnicalAnalysisPage() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "तांत्रिक विश्लेषण" : "Technical Analysis"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>{language === "mr" ? "डिजिटल पुरावे, सीसीटीव्ही आणि कॉल डेटा विश्लेषण." : "Digital evidence, CCTV and call data analysis."}</p>
				</CardContent>
			</Card>
		</div>
	);
}
