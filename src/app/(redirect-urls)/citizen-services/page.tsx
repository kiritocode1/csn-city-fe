"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, FileText, Phone, Shield, Users } from "lucide-react";

const CitizenServicesPage = () => {
	const services = [
		{
			title: "Police Verification",
			description: "Get police verification for employment, passport, or other official purposes in Chhatrapati Sambhaji Nagar",
			icon: <FileText className="h-5 w-5" />,
			color: "bg-blue-600",
			status: "Available",
			time: "7-10 days",
		},
		{
			title: "Online FIR Filing",
			description: "File First Information Reports online through our digital portal for faster processing and tracking",
			icon: <Shield className="h-5 w-5" />,
			color: "bg-green-600",
			status: "Available",
			time: "Immediate",
		},
		{
			title: "Complaint Registration",
			description: "Register complaints about police services, corruption, or other grievances",
			icon: <Users className="h-5 w-5" />,
			color: "bg-orange-600",
			status: "Available",
			time: "24 hours",
		},
		{
			title: "Character Certificate",
			description: "Obtain character certificate required for various official purposes and applications",
			icon: <FileText className="h-5 w-5" />,
			color: "bg-purple-600",
			status: "Available",
			time: "7-14 days",
		},
	];

	const quickActions = [
		{
			title: "File Complaint",
			description: "Register complaints about police services or report grievances",
			action: "File Now",
			icon: <FileText className="h-5 w-5" />,
		},
		{
			title: "Check Status",
			description: "Track the status of your applications and complaints",
			action: "Check Status",
			icon: <CheckCircle className="h-5 w-5" />,
		},
		{
			title: "Emergency Help",
			description: "Get immediate police assistance in case of emergency",
			action: "Call 112",
			icon: <Phone className="h-5 w-5" />,
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Available":
				return "default";
			case "Coming Soon":
				return "secondary";
			default:
				return "outline";
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Citizen Services</h1>
					<p className="text-muted-foreground text-lg">Access various police services and citizen-friendly initiatives provided by Chhatrapati Sambhaji Nagar Police Department.</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center">Quick Actions</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-3 gap-6">
							{quickActions.map((action, index) => (
								<Card
									key={index}
									className="hover:shadow-lg transition-shadow"
								>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											{action.icon}
											{action.title}
										</CardTitle>
										<CardDescription className="text-base">{action.description}</CardDescription>
									</CardHeader>
									<CardContent>
										<Button className="w-full">{action.action}</Button>
									</CardContent>
								</Card>
							))}
						</div>
					</CardContent>
				</Card>

				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-6 text-center">Available Services</h2>
					<div className="grid md:grid-cols-2 gap-6">
						{services.map((service, index) => (
							<Card
								key={index}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<CardTitle className="flex items-center gap-2 text-xl">
												<div className={`p-2 ${service.color} rounded-lg`}>{service.icon}</div>
												{service.title}
											</CardTitle>
											<CardDescription className="text-base mt-2">{service.description}</CardDescription>
										</div>
										<Badge variant={getStatusColor(service.status)}>{service.status}</Badge>
									</div>
								</CardHeader>
								<CardContent>
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<Clock className="h-4 w-4" />
											{service.time}
										</div>
									</div>
									<Button className="w-full">Access Service</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center">How to Use Our Services</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
								<div>
									<h3 className="font-semibold">Select Service</h3>
									<p className="text-sm text-muted-foreground">Choose the service you need from our available options</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
								<div>
									<h3 className="font-semibold">Fill Application</h3>
									<p className="text-sm text-muted-foreground">Complete the required forms and provide necessary documents</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
								<div>
									<h3 className="font-semibold">Track Progress</h3>
									<p className="text-sm text-muted-foreground">Monitor your application status and receive updates</p>
								</div>
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
							<p className="text-lg">If you need assistance with any of our services or have questions, contact us</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button size="lg">
									<Phone className="h-4 w-4 mr-2" />
									Call Helpline
								</Button>
								<Button
									size="lg"
									variant="outline"
								>
									<FileText className="h-4 w-4 mr-2" />
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

export default CitizenServicesPage;
