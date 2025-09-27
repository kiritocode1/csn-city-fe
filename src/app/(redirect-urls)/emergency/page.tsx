"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Car, Clock, Heart, Phone, Shield, Users } from "lucide-react";

const EmergencyPage = () => {
	const emergencyServices = [
		{
			number: "112",
			title: "Police Emergency",
			description: "24/7 emergency police assistance for Chhatrapati Sambhaji Nagar",
			icon: <Shield className="h-6 w-6" />,
			color: "bg-red-600",
			available: "24/7",
		},
		{
			number: "1091",
			title: "Women Helpline",
			description: "Dedicated helpline for women safety and emergency assistance",
			icon: <Heart className="h-6 w-6" />,
			color: "bg-pink-600",
			available: "24/7",
		},
		{
			number: "1098",
			title: "Child Helpline",
			description: "Specialized helpline for child safety and protection services",
			icon: <Users className="h-6 w-6" />,
			color: "bg-blue-600",
			available: "24/7",
		},
		{
			number: "1033",
			title: "Traffic Emergency",
			description: "Traffic-related emergencies and road safety assistance",
			icon: <Car className="h-6 w-6" />,
			color: "bg-orange-600",
			available: "24/7",
		},
	];

	const quickActions = [
		{
			title: "Report Crime",
			description: "Report criminal activities or suspicious behavior immediately",
			action: "Report Now",
			icon: <AlertTriangle className="h-5 w-5" />,
			color: "bg-red-600",
		},
		{
			title: "Share Location",
			description: "Share your current location with emergency services",
			action: "Share Location",
			icon: <Phone className="h-5 w-5" />,
			color: "bg-blue-600",
		},
		{
			title: "Safety Tips",
			description: "Learn important safety guidelines and emergency procedures",
			action: "View Tips",
			icon: <Shield className="h-5 w-5" />,
			color: "bg-green-600",
		},
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Emergency Services</h1>
					<p className="text-muted-foreground text-lg">Immediate assistance and emergency response services for Chhatrapati Sambhaji Nagar. Call 112 for police emergencies.</p>
				</div>

				<Card className="mb-8 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
					<CardHeader>
						<CardTitle className="text-3xl flex items-center justify-center gap-3 text-red-700 dark:text-red-300">
							<AlertTriangle className="h-8 w-8" />
							URGENT - Police Emergency
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-center space-y-6">
							<p className="text-xl font-medium">For immediate police assistance, call our emergency helpline</p>
							<Button
								size="lg"
								className="bg-red-600 hover:bg-red-700 text-xl px-12 py-6"
							>
								<Phone className="h-6 w-6 mr-3" />
								Call Emergency - 112
							</Button>
							<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
								<Clock className="h-4 w-4" />
								Available 24/7
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-6 text-center">Emergency Helplines</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{emergencyServices.map((service, index) => (
							<Card
								key={index}
								className="hover:shadow-lg transition-shadow text-center"
							>
								<CardHeader>
									<div className={`w-20 h-20 ${service.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>{service.icon}</div>
									<CardTitle className="text-4xl font-bold text-primary mb-2">{service.number}</CardTitle>
									<CardDescription className="font-semibold text-lg">{service.title}</CardDescription>
									<Badge
										variant="secondary"
										className="mt-2"
									>
										{service.available}
									</Badge>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground mb-4">{service.description}</p>
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
										<div className={`p-2 ${action.color} rounded-lg`}>{action.icon}</div>
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
								<p>Provide clear location details and describe the emergency situation accurately</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
								<p>Stay calm and follow the operator&apos;s instructions during emergency calls</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
								<p>Keep emergency numbers saved in your phone for quick access</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default EmergencyPage;
