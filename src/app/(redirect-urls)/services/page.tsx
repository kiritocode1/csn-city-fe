"use client";

import ExtendedLink from "@/components/ExtendedLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, FileText, MapPin, Phone, Shield, UserCheck, Users } from "lucide-react";

const ServicesPage = () => {
	const services = [
		{
			icon: <UserCheck className="h-6 w-6" />,
			title: "Police Verification",
			description: "Get police verification for employment, passport, or other official purposes in Chhatrapati Sambhaji Nagar",
			href: "/verification",
			color: "text-blue-600",
		},
		{
			icon: <FileText className="h-6 w-6" />,
			title: "Online FIR Filing",
			description: "File First Information Reports online through our digital portal for faster processing and tracking",
			href: "/fir",
			color: "text-green-600",
		},
		{
			icon: <MapPin className="h-6 w-6" />,
			title: "Traffic Management",
			description: "Real-time traffic updates, violation payments, and traffic safety information for Chhatrapati Sambhaji Nagar",
			href: "/traffic",
			color: "text-orange-600",
		},
		{
			icon: <Shield className="h-6 w-6" />,
			title: "Women Safety",
			description: "24/7 women safety helpline, Pink Patrol units, and dedicated support services across the city",
			href: "/women-safety",
			color: "text-pink-600",
		},
		{
			icon: <Users className="h-6 w-6" />,
			title: "Community Policing",
			description: "Engage with local police for community safety initiatives and neighborhood watch programs",
			href: "/community",
			color: "text-purple-600",
		},
		{
			icon: <Phone className="h-6 w-6" />,
			title: "Emergency Response",
			description: "24/7 emergency helpline and immediate response services for Chhatrapati Sambhaji Nagar",
			href: "/emergency-contacts",
			color: "text-red-600",
		},
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Our Services</h1>
					<p className="text-muted-foreground text-lg">
						Chhatrapati Sambhaji Nagar Police Department offers a comprehensive range of services to ensure safety, security, and assistance for all citizens.
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{services.map((service, index) => (
						<Card
							key={index}
							className="hover:shadow-lg transition-shadow group"
						>
							<CardHeader>
								<div className="flex items-center gap-3">
									<div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${service.color}`}>{service.icon}</div>
									<CardTitle className="text-lg">{service.title}</CardTitle>
								</div>
								<CardDescription className="text-base">{service.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<Button
									asChild
									className="w-full group-hover:bg-primary/90"
								>
									<ExtendedLink href={service.href}>Access Service</ExtendedLink>
								</Button>
							</CardContent>
						</Card>
					))}
				</div>

				<Card className="mt-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
							<AlertTriangle className="h-6 w-6 text-orange-500" />
							Emergency Services
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-center space-y-4">
							<p className="text-lg">For immediate police assistance in case of emergency, call our 24/7 helpline</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button
									asChild
									size="lg"
									className="bg-red-600 hover:bg-red-700"
								>
									<ExtendedLink href="tel:112">
										<Phone className="h-4 w-4 mr-2" />
										Call Emergency - 112
									</ExtendedLink>
								</Button>
								<Button
									asChild
									size="lg"
									variant="outline"
								>
									<ExtendedLink href="/emergency-contacts">More Contacts</ExtendedLink>
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default ServicesPage;
