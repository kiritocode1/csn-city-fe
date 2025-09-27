"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Calendar, Mail, MapPin, Phone, Users } from "lucide-react";

const SPTillDatePage = () => {
	const spOfficers = [
		{
			name: "Shri. Manoj Lohiya, IPS",
			period: "2020 - Present",
			district: "Chhatrapati Sambhaji Nagar",
			achievements: ["Implemented digital policing initiatives", "Reduced crime rate by 15% in 2023"],
			status: "Current",
			email: "cp.aurangabad@mahapolice.gov.in",
			phone: "+91-240-247-1000",
		},
		{
			name: "Shri. Rajesh Bansode, IPS",
			period: "2018 - 2020",
			district: "Chhatrapati Sambhaji Nagar",
			achievements: ["Led major crime investigations", "Established cyber crime cell"],
			status: "Previous",
			email: "addlcp.aurangabad@mahapolice.gov.in",
			phone: "+91-240-247-1001",
		},
		{
			name: "Smt. Priya Sharma, IPS",
			period: "2016 - 2018",
			district: "Chhatrapati Sambhaji Nagar",
			achievements: ["Improved traffic management", "Enhanced women safety measures"],
			status: "Previous",
			email: "dcp.aurangabad@mahapolice.gov.in",
			phone: "+91-240-247-1002",
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Current":
				return "default";
			case "Previous":
				return "secondary";
			default:
				return "outline";
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">SP Till Date</h1>
					<p className="text-muted-foreground text-lg">Historical record of Superintendents of Police who have served in Chhatrapati Sambhaji Nagar Police Department over the years.</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center">Current SP</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-center space-y-4">
							<div className="w-32 h-32 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
								<Users className="h-16 w-16 text-primary" />
							</div>
							<h2 className="text-2xl font-bold">{spOfficers[0].name}</h2>
							<p className="text-lg text-muted-foreground">{spOfficers[0].district}</p>
							<Badge
								variant={getStatusColor(spOfficers[0].status)}
								className="text-lg px-4 py-2"
							>
								{spOfficers[0].status}
							</Badge>
							<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
								<Calendar className="h-4 w-4" />
								{spOfficers[0].period}
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-6 text-center">Historical Record</h2>
					<div className="space-y-6">
						{spOfficers.map((officer, index) => (
							<Card
								key={index}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<CardTitle className="text-xl flex items-center gap-2">
												<Users className="h-5 w-5 text-primary" />
												{officer.name}
											</CardTitle>
											<CardDescription className="text-base mt-2">{officer.district}</CardDescription>
										</div>
										<Badge variant={getStatusColor(officer.status)}>{officer.status}</Badge>
									</div>
								</CardHeader>
								<CardContent>
									<div className="grid md:grid-cols-2 gap-6">
										<div className="space-y-3">
											<div className="flex items-center gap-2">
												<Calendar className="h-4 w-4 text-muted-foreground" />
												<span className="text-sm">{officer.period}</span>
											</div>
											<div className="flex items-center gap-2">
												<MapPin className="h-4 w-4 text-muted-foreground" />
												<span className="text-sm">{officer.district}</span>
											</div>
											<div className="flex items-center gap-2">
												<Mail className="h-4 w-4 text-muted-foreground" />
												<span className="text-sm">{officer.email}</span>
											</div>
											<div className="flex items-center gap-2">
												<Phone className="h-4 w-4 text-muted-foreground" />
												<span className="text-sm">{officer.phone}</span>
											</div>
										</div>
										<div>
											<h4 className="font-semibold mb-2 flex items-center gap-1">
												<Award className="h-4 w-4" />
												Key Achievements
											</h4>
											<ul className="space-y-1">
												{officer.achievements.map((achievement, idx) => (
													<li
														key={idx}
														className="text-sm flex items-start gap-2"
													>
														<div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
														<span>{achievement}</span>
													</li>
												))}
											</ul>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl text-center">Contact Information</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-center space-y-4">
							<p className="text-lg">For inquiries about SP records or to contact the current SP, use the information below</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button size="lg">
									<Phone className="h-4 w-4 mr-2" />
									Call Us
								</Button>
								<Button
									size="lg"
									variant="outline"
								>
									<Mail className="h-4 w-4 mr-2" />
									Email Us
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default SPTillDatePage;
