"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Car, Heart, Phone, Shield, Users } from "lucide-react";

const EmergencyContactsPage = () => {
	const emergencyNumbers = [
		{
			number: "112",
			service: "Police Emergency",
			description: "24/7 emergency police assistance for Chhatrapati Sambhaji Nagar",
			icon: <Shield className="h-6 w-6" />,
			color: "bg-red-600",
			priority: "High",
		},
		{
			number: "1091",
			service: "Women Helpline",
			description: "Dedicated helpline for women safety and emergency assistance",
			icon: <Heart className="h-6 w-6" />,
			color: "bg-pink-600",
			priority: "High",
		},
		{
			number: "1098",
			service: "Child Helpline",
			description: "Specialized helpline for child safety and protection services",
			icon: <Users className="h-6 w-6" />,
			color: "bg-blue-600",
			priority: "High",
		},
		{
			number: "1033",
			service: "Traffic Emergency",
			description: "Traffic-related emergencies and road safety assistance",
			icon: <Car className="h-6 w-6" />,
			color: "bg-orange-600",
			priority: "Medium",
		},
	];

	const quickActions = [
		{
			title: "Report Emergency",
			description: "Report crimes, accidents, or any emergency situation immediately to police",
			action: "Report Now",
			icon: <AlertTriangle className="h-5 w-5" />,
		},
		{
			title: "Share Location",
			description: "Share your current location with police for faster emergency response",
			action: "Share Location",
			icon: <Phone className="h-5 w-5" />,
		},
		{
			title: "Safety Tips",
			description: "Access important safety tips and emergency preparedness guidelines",
			action: "View Tips",
			icon: <Shield className="h-5 w-5" />,
		},
	];

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "High":
				return "destructive";
			case "Medium":
				return "default";
			default:
				return "secondary";
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Emergency Contacts</h1>
					<p className="text-muted-foreground text-lg">Important emergency contact numbers and helplines for immediate police assistance in Chhatrapati Sambhaji Nagar.</p>
				</div>

				<Card className="mb-8 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2 text-red-700 dark:text-red-300">
							<AlertTriangle className="h-6 w-6" />
							URGENT - Police Emergency
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-center space-y-4">
							<p className="text-lg font-medium">For immediate police assistance in case of emergency, call our 24/7 helpline</p>
							<Button
								size="lg"
								className="bg-red-600 hover:bg-red-700 text-lg px-8"
							>
								<Phone className="h-5 w-5 mr-2" />
								Call Emergency - 112
							</Button>
						</div>
					</CardContent>
				</Card>

				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-6 text-center">Emergency Helplines</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{emergencyNumbers.map((contact, index) => (
							<Card
								key={index}
								className="hover:shadow-lg transition-shadow text-center"
							>
								<CardHeader>
									<div className={`w-16 h-16 ${contact.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>{contact.icon}</div>
									<CardTitle className="text-3xl font-bold text-primary mb-2">{contact.number}</CardTitle>
									<CardDescription className="font-semibold text-base">{contact.service}</CardDescription>
									<Badge
										variant={getPriorityColor(contact.priority)}
										className="mt-2"
									>
										{contact.priority}
									</Badge>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground mb-4">{contact.description}</p>
									<Button
										className="w-full"
										size="sm"
									>
										<Phone className="h-4 w-4 mr-2" />
										Call Now
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-6 text-center">Quick Actions</h2>
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
				</div>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl text-center">Important Safety Tips</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
								<p>Always call 112 for police emergencies - it&apos;s free and available 24/7</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
								<p>Keep emergency contacts saved in your phone and share your location with trusted contacts</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
								<p>Report suspicious activities immediately to the nearest police station or call helpline</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
								<p>Follow traffic rules and safety guidelines to prevent accidents and ensure public safety</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default EmergencyContactsPage;
