"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Heart, Phone, Shield, Users } from "lucide-react";

const WomenSafetyPage = () => {
	const emergencyNumbers = [
		{
			number: "1091",
			service: "Women Helpline",
			description: "24/7 dedicated helpline for women safety concerns in Chhatrapati Sambhaji Nagar",
			icon: <Shield className="h-5 w-5" />,
		},
		{
			number: "112",
			service: "Emergency Police",
			description: "General emergency helpline for immediate police assistance",
			icon: <Phone className="h-5 w-5" />,
		},
		{
			number: "1098",
			service: "Child Helpline",
			description: "Specialized helpline for child safety and protection services",
			icon: <Users className="h-5 w-5" />,
		},
	];

	const safetyTips = [
		{
			title: "Emergency Contacts",
			description: "Always keep emergency numbers saved in your phone and share your location with trusted contacts",
			icon: <Phone className="h-5 w-5" />,
		},
		{
			title: "Travel Safety",
			description: "Avoid traveling alone at night, use well-lit routes, and inform someone about your travel plans",
			icon: <Users className="h-5 w-5" />,
		},
		{
			title: "Public Spaces",
			description: "Be aware of your surroundings, trust your instincts, and don't hesitate to seek help if uncomfortable",
			icon: <AlertTriangle className="h-5 w-5" />,
		},
		{
			title: "Self-Defense",
			description: "Learn basic self-defense techniques and carry personal safety devices when possible",
			icon: <Shield className="h-5 w-5" />,
		},
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Women Safety</h1>
					<p className="text-muted-foreground text-lg">Dedicated women safety services, helplines, and support initiatives by Chhatrapati Sambhaji Nagar Police Department.</p>
				</div>

				<Card className="mb-8 bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-800">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2 text-pink-700 dark:text-pink-300">
							<Heart className="h-6 w-6" />
							Emergency Helplines
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-3 gap-6">
							{emergencyNumbers.map((emergency, index) => (
								<div
									key={index}
									className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg"
								>
									<div className="flex justify-center mb-3">
										<div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-full">{emergency.icon}</div>
									</div>
									<h3 className="font-bold text-2xl text-pink-600 dark:text-pink-400 mb-2">{emergency.number}</h3>
									<p className="font-semibold mb-2">{emergency.service}</p>
									<p className="text-sm text-muted-foreground">{emergency.description}</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-6 text-center">Safety Tips</h2>
					<div className="grid md:grid-cols-2 gap-6">
						{safetyTips.map((tip, index) => (
							<Card
								key={index}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										{tip.icon}
										{tip.title}
									</CardTitle>
									<CardDescription className="text-base">{tip.description}</CardDescription>
								</CardHeader>
							</Card>
						))}
					</div>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<Shield className="h-6 w-6" />
							Safety Initiatives
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
								<p>Pink Patrol units deployed across the city for enhanced women safety</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
								<p>24/7 women helpline (1091) for immediate assistance and support</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
								<p>Self-defense training programs conducted regularly in schools and colleges</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
								<p>Special investigation cells for handling women-related crimes and harassment cases</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl text-center">Get Help & Support</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-center space-y-4">
							<p className="text-lg">If you need immediate assistance or want to report an incident, we&apos;re here to help</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button
									size="lg"
									className="bg-pink-600 hover:bg-pink-700"
								>
									<Phone className="h-4 w-4 mr-2" />
									Call Helpline - 1091
								</Button>
								<Button
									size="lg"
									variant="outline"
								>
									<Shield className="h-4 w-4 mr-2" />
									Report Incident
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default WomenSafetyPage;
