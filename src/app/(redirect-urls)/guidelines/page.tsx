"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Info, Shield, Users } from "lucide-react";

const GuidelinesPage = () => {
	const guidelines = [
		{
			title: "Safety Guidelines",
			description: "Important safety guidelines for citizens in Chhatrapati Sambhaji Nagar",
			icon: <Shield className="h-5 w-5" />,
			color: "bg-red-600",
			items: 15,
			lastUpdated: "2024-01-15",
		},
		{
			title: "Police Procedures",
			description: "Step-by-step procedures for police services and official processes",
			icon: <FileText className="h-5 w-5" />,
			color: "bg-blue-600",
			items: 23,
			lastUpdated: "2024-01-10",
		},
		{
			title: "Community Engagement",
			description: "Guidelines for community participation and neighborhood watch programs",
			icon: <Users className="h-5 w-5" />,
			color: "bg-green-600",
			items: 18,
			lastUpdated: "2024-01-08",
		},
		{
			title: "Emergency Procedures",
			description: "Step-by-step procedures for emergency situations and crisis management",
			icon: <Info className="h-5 w-5" />,
			color: "bg-orange-600",
			items: 12,
			lastUpdated: "2024-01-05",
		},
	];

	const recentGuidelines = [
		{
			title: "Updated Safety Guidelines for Public Events",
			description: "New safety protocols for large gatherings and public events in Chhatrapati Sambhaji Nagar",
			category: "Safety",
			date: "2024-01-15",
			status: "Updated",
		},
		{
			title: "Digital Evidence Collection Procedures",
			description: "Step-by-step guidelines for collecting and preserving digital evidence in criminal cases",
			category: "Procedures",
			date: "2024-01-10",
			status: "New",
		},
		{
			title: "Community Policing Engagement Guidelines",
			description: "Updated guidelines for community participation in neighborhood watch and safety programs",
			category: "Community",
			date: "2024-01-08",
			status: "Updated",
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "New":
				return "default";
			case "Updated":
				return "secondary";
			default:
				return "outline";
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Guidelines</h1>
					<p className="text-muted-foreground text-lg">
						Official guidelines, procedures, and safety protocols for citizens and police personnel in Chhatrapati Sambhaji Nagar Police Department.
					</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center">Guideline Categories</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
							{guidelines.map((guideline, index) => (
								<Card
									key={index}
									className="hover:shadow-lg transition-shadow"
								>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<div className={`p-2 ${guideline.color} rounded-lg`}>{guideline.icon}</div>
											{guideline.title}
										</CardTitle>
										<CardDescription className="text-sm">{guideline.description}</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-2 mb-4">
											<div className="flex justify-between text-sm">
												<span className="text-muted-foreground">Items</span>
												<span className="font-medium">{guideline.items}</span>
											</div>
											<div className="flex justify-between text-sm">
												<span className="text-muted-foreground">Last Updated</span>
												<span className="font-medium">{guideline.lastUpdated}</span>
											</div>
										</div>
										<Button
											className="w-full"
											size="sm"
										>
											<Download className="h-4 w-4 mr-2" />
											View Guidelines
										</Button>
									</CardContent>
								</Card>
							))}
						</div>
					</CardContent>
				</Card>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<FileText className="h-6 w-6" />
							Recent Guidelines
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{recentGuidelines.map((guideline, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-4 border rounded-lg"
								>
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<span className="font-semibold">{guideline.title}</span>
											<Badge variant="outline">{guideline.category}</Badge>
											<Badge variant={getStatusColor(guideline.status)}>{guideline.status}</Badge>
										</div>
										<p className="text-sm text-muted-foreground mb-2">{guideline.description}</p>
										<p className="text-xs text-muted-foreground">Date: {guideline.date}</p>
									</div>
									<Button
										size="sm"
										variant="outline"
									>
										<Download className="h-4 w-4 mr-2" />
										Download
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center">Important Safety Tips</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
								<p>Always call 112 for police emergencies - it&apos;s free and available 24/7</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
								<p>Keep emergency contacts saved in your phone and share your location with trusted contacts</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
								<p>Report suspicious activities immediately to the nearest police station or call helpline</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
								<p>Follow traffic rules and safety guidelines to prevent accidents and ensure public safety</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl text-center">Need Help?</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-center space-y-4">
							<p className="text-lg">For questions about guidelines or to request specific procedures, contact our guidelines department</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button size="lg">
									<FileText className="h-4 w-4 mr-2" />
									Request Guidelines
								</Button>
								<Button
									size="lg"
									variant="outline"
								>
									<Download className="h-4 w-4 mr-2" />
									Get Help
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default GuidelinesPage;
