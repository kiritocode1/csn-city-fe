"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Heart, MapPin, Phone, Users } from "lucide-react";

const CommunityPage = () => {
	const programs = [
		{
			title: "Youth Safety Awareness Program",
			description: "Educational sessions for young people about safety, crime prevention, and community responsibility",
			date: "2024-01-20",
			location: "Chhatrapati Sambhaji Nagar Police Commissionerate",
			participants: "50+",
			icon: <Users className="h-5 w-5" />,
		},
		{
			title: "Community Safety Workshop",
			description: "Interactive workshops on home security, neighborhood watch, and emergency preparedness",
			date: "2024-01-25",
			location: "Cidco Community Center",
			participants: "100+",
			icon: <Heart className="h-5 w-5" />,
		},
		{
			title: "Cyber Safety Awareness",
			description: "Training sessions on online safety, cyber crime prevention, and digital security",
			date: "2024-02-01",
			location: "Aurangpura Police Station",
			participants: "75+",
			icon: <Calendar className="h-5 w-5" />,
		},
	];

	const initiatives = [
		{
			title: "Neighborhood Watch Program",
			description: "Citizens work together with police to monitor and report suspicious activities in their areas",
			status: "Active",
			icon: <Users className="h-5 w-5" />,
		},
		{
			title: "School Safety Initiative",
			description: "Educational programs and safety measures implemented in schools across the city",
			status: "Active",
			icon: <Heart className="h-5 w-5" />,
		},
		{
			title: "Senior Citizen Support",
			description: "Special assistance and safety programs for elderly citizens in the community",
			status: "Planning",
			icon: <Calendar className="h-5 w-5" />,
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Active":
				return "default";
			case "Planning":
				return "secondary";
			default:
				return "outline";
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Community Policing</h1>
					<p className="text-muted-foreground text-lg">Building safer communities through collaboration between police and citizens in Chhatrapati Sambhaji Nagar.</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<Calendar className="h-6 w-6" />
							Upcoming Programs
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-6">
							{programs.map((program, index) => (
								<Card
									key={index}
									className="hover:shadow-lg transition-shadow"
								>
									<CardHeader>
										<div className="flex items-start justify-between">
											<div className="flex-1">
												<CardTitle className="flex items-center gap-2 text-xl">
													{program.icon}
													{program.title}
												</CardTitle>
												<CardDescription className="text-base mt-2">{program.description}</CardDescription>
											</div>
											<Badge variant="outline">{program.participants}</Badge>
										</div>
									</CardHeader>
									<CardContent>
										<div className="flex items-center gap-4 text-sm text-muted-foreground">
											<div className="flex items-center gap-1">
												<Calendar className="h-4 w-4" />
												{program.date}
											</div>
											<div className="flex items-center gap-1">
												<MapPin className="h-4 w-4" />
												{program.location}
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</CardContent>
				</Card>

				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-6 text-center">Community Initiatives</h2>
					<div className="grid md:grid-cols-3 gap-6">
						{initiatives.map((initiative, index) => (
							<Card
								key={index}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										{initiative.icon}
										{initiative.title}
									</CardTitle>
									<CardDescription className="text-base">{initiative.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="flex items-center justify-between">
										<Badge variant={getStatusColor(initiative.status)}>{initiative.status}</Badge>
										<Button
											size="sm"
											variant="outline"
										>
											Learn More
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<Phone className="h-6 w-6" />
							Contact Us
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-2 gap-6">
							<div>
								<h3 className="font-semibold mb-2">Community Coordinator</h3>
								<p className="text-sm text-muted-foreground mb-2">For community policing programs and initiatives</p>
								<p className="text-lg font-medium">+91-240-247-1000</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">Email</h3>
								<p className="text-sm text-muted-foreground mb-2">Send us your suggestions and feedback</p>
								<p className="text-lg font-medium">community.aurangabad@mahapolice.gov.in</p>
							</div>
						</div>
						<div className="mt-6 text-center">
							<Button size="lg">
								<Users className="h-4 w-4 mr-2" />
								Join Community Program
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default CommunityPage;
