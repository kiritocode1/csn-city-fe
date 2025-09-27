"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";

const HistoryPage = () => {
	const timeline = [
		{
			year: "1861",
			title: "Police Act Formation",
			description: "The Indian Police Act of 1861 established the foundation of modern policing in India, including Chhatrapati Sambhaji Nagar",
			type: "Foundation",
		},
		{
			year: "1947",
			title: "Independence Era",
			description: "Post-independence restructuring of police forces and establishment of democratic policing principles",
			type: "Independence",
		},
		{
			year: "1960",
			title: "Maharashtra State Formation",
			description: "Formation of Maharashtra state and reorganization of police forces in the region",
			type: "State Formation",
		},
		{
			year: "2000",
			title: "Police Commissionerate Formation",
			description: "Chhatrapati Sambhaji Nagar Police Commissionerate officially established as an independent unit",
			type: "Modernization",
		},
		{
			year: "2020",
			title: "Digital Transformation",
			description: "Comprehensive digital transformation including online FIR filing and citizen services in Chhatrapati Sambhaji Nagar",
			type: "Digital Era",
		},
	];

	const getTypeColor = (type: string) => {
		switch (type) {
			case "Foundation":
				return "default";
			case "Independence":
				return "secondary";
			case "State Formation":
				return "outline";
			case "Modernization":
				return "default";
			case "Digital Era":
				return "secondary";
			default:
				return "outline";
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Our History</h1>
					<p className="text-muted-foreground text-lg">Explore the rich history and evolution of Chhatrapati Sambhaji Nagar Police Department from its establishment to modern times.</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center">Historical Overview</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-center text-lg leading-relaxed">
							Chhatrapati Sambhaji Nagar Police Department has a rich heritage spanning over 160 years, evolving from colonial policing to modern community-oriented law enforcement. Our
							department has consistently adapted to changing times while maintaining the highest standards of service and integrity.
						</p>
					</CardContent>
				</Card>

				<div className="space-y-6">
					<h2 className="text-2xl font-bold text-center mb-8">Historical Timeline</h2>
					{timeline.map((item, index) => (
						<Card
							key={index}
							className="hover:shadow-lg transition-shadow"
						>
							<CardHeader>
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<Calendar className="h-5 w-5 text-primary" />
											<span className="text-2xl font-bold text-primary">{item.year}</span>
										</div>
										<CardTitle className="text-xl">{item.title}</CardTitle>
										<CardDescription className="text-base mt-2">{item.description}</CardDescription>
									</div>
									<Badge variant={getTypeColor(item.type)}>{item.type}</Badge>
								</div>
							</CardHeader>
						</Card>
					))}
				</div>

				<Card className="mt-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center">Our Legacy</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-3 gap-6 text-center">
							<div>
								<Users className="h-12 w-12 text-primary mx-auto mb-3" />
								<h3 className="font-semibold mb-2">Dedicated Officers</h3>
								<p className="text-sm text-muted-foreground">Over 2,500 dedicated police officers serving the community with honor and integrity</p>
							</div>
							<div>
								<MapPin className="h-12 w-12 text-primary mx-auto mb-3" />
								<h3 className="font-semibold mb-2">Wide Coverage</h3>
								<p className="text-sm text-muted-foreground">Serving 15 police stations across Chhatrapati Sambhaji Nagar district</p>
							</div>
							<div>
								<Calendar className="h-12 w-12 text-primary mx-auto mb-3" />
								<h3 className="font-semibold mb-2">Rich Heritage</h3>
								<p className="text-sm text-muted-foreground">160+ years of continuous service to the community and nation</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default HistoryPage;
