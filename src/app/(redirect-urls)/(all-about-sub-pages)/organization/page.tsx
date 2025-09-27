"use client";

import ReactFlowOrgChart from "@/components/ReactFlowOrgChart";
import LanguageSwitch from "@/components/language-switch";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { policeHierarchy } from "@/data/policeHierarchy";

const OrganizationPage = () => {
	const { language } = useLanguage();

	const content = {
		en: {
			title: "CSN Police Organization Chart",
			description: "Interactive organizational hierarchy of Chhatrapati Sambhaji Nagar Police Department",
		},
		mr: {
			title: "CSN पोलीस संघटनात्मक आकृती",
			description: "छत्रपती संभाजी नगर पोलीस विभागाची परस्परसंवादी संघटनात्मक पदानुक्रम",
		},
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-7xl mx-auto">

					<h1 className="text-4xl font-bold mb-4 text-center">{content[language].title}</h1>
					<p className="text-muted-foreground text-lg text-center">{content[language].description}</p>
				</div>

				<Card>
					<CardContent className="p-8">
						<ReactFlowOrgChart hierarchy={policeHierarchy} />
					</CardContent>
				</Card>
			</div>
	);
};

export default OrganizationPage;
