"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Car, Clock, MapPin, Users } from "lucide-react";

const TrafficPage = () => {
	const trafficUpdates = [
		{
			location: "Jalna Road - Near Railway Station",
			status: "Heavy Traffic",
			delay: "15-20 mins",
			severity: "high",
		},
		{
			location: "Cidco N-6 to N-9",
			status: "Moderate Traffic",
			delay: "5-10 mins",
			severity: "medium",
		},
		{
			location: "Aurangpura to Waluj Road",
			status: "Clear",
			delay: "No delay",
			severity: "low",
		},
		{
			location: "Station Road - Bus Stand Area",
			status: "Heavy Traffic",
			delay: "10-15 mins",
			severity: "high",
		},
		{
			location: "Paithan Gate to Bibi Ka Maqbara",
			status: "Moderate Traffic",
			delay: "5-8 mins",
			severity: "medium",
		},
	];

	const services = [
		{
			title: "Driving License Services",
			description: "Apply for new driving license, renewal, and related services",
			icon: <Car className="h-5 w-5" />,
		},
		{
			title: "Vehicle Registration",
			description: "New vehicle registration, transfer, and modification services",
			icon: <Car className="h-5 w-5" />,
		},
		{
			title: "Traffic Violation Payment",
			description: "Pay traffic fines and violations online or at traffic offices",
			icon: <AlertTriangle className="h-5 w-5" />,
		},
		{
			title: "Accident Reporting",
			description: "Report traffic accidents and get assistance for insurance claims",
			icon: <AlertTriangle className="h-5 w-5" />,
		},
	];

	const getSeverityColor = (severity: string) => {
		switch (severity) {
			case "high":
				return "destructive";
			case "medium":
				return "default";
			case "low":
				return "secondary";
			default:
				return "outline";
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Traffic Management</h1>
					<p className="text-muted-foreground text-lg">Real-time traffic updates, road safety information, and traffic services for Chhatrapati Sambhaji Nagar.</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<MapPin className="h-6 w-6" />
							Live Traffic Updates
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{trafficUpdates.map((update, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-4 border rounded-lg"
								>
									<div className="flex items-center gap-4">
										<div className="flex items-center gap-2">
											<MapPin className="h-4 w-4 text-muted-foreground" />
											<span className="font-medium">{update.location}</span>
										</div>
										<Badge variant={getSeverityColor(update.severity)}>{update.status}</Badge>
									</div>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<Clock className="h-4 w-4" />
										{update.delay}
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-6 text-center">Traffic Services</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{services.map((service, index) => (
							<Card
								key={index}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-lg">
										{service.icon}
										{service.title}
									</CardTitle>
									<CardDescription className="text-sm">{service.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<Button
										className="w-full"
										size="sm"
									>
										Access Service
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<Users className="h-6 w-6" />
							Contact Information
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-2 gap-6">
							<div>
								<h3 className="font-semibold mb-2">Traffic Helpline</h3>
								<p className="text-2xl font-bold text-primary">1033</p>
								<p className="text-sm text-muted-foreground">24/7 traffic assistance and road safety information</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">Emergency</h3>
								<p className="text-2xl font-bold text-red-600">112</p>
								<p className="text-sm text-muted-foreground">Police emergency for traffic accidents and violations</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default TrafficPage;
