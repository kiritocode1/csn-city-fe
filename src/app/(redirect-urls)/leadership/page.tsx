"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Mail, Phone, Users } from "lucide-react";

const LeadershipPage = () => {
	const leadership = [
		{
			name: "Shri. Manoj Lohiya, IPS",
			position: "Commissioner of Police",
			department: "Chhatrapati Sambhaji Nagar Police Commissionerate",
			experience: "25+ years",
			email: "cp.aurangabad@mahapolice.gov.in",
			phone: "+91-240-247-1000",
			achievements: ["Implemented digital policing initiatives", "Reduced crime rate by 15% in 2023"],
		},
		{
			name: "Shri. Rajesh Bansode, IPS",
			position: "Additional Commissioner of Police",
			department: "Crime & Administration",
			experience: "20+ years",
			email: "addlcp.aurangabad@mahapolice.gov.in",
			phone: "+91-240-247-1001",
			achievements: ["Led major crime investigations", "Established cyber crime cell"],
		},
		{
			name: "Smt. Priya Sharma, IPS",
			position: "Deputy Commissioner of Police",
			department: "Traffic & Women Safety",
			experience: "15+ years",
			email: "dcp.aurangabad@mahapolice.gov.in",
			phone: "+91-240-247-1002",
			achievements: ["Improved traffic management", "Enhanced women safety measures"],
		},
		{
			name: "Shri. Amit Kumar, IPS",
			position: "Deputy Commissioner of Police",
			department: "Zone I - City Division",
			experience: "12+ years",
			email: "dcp.zone1.aurangabad@mahapolice.gov.in",
			phone: "+91-240-247-1003",
			achievements: ["Community policing initiatives", "Reduced street crimes"],
		},
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Leadership Team</h1>
					<p className="text-muted-foreground text-lg">
						Meet the dedicated leadership team of Chhatrapati Sambhaji Nagar Police Department, committed to serving and protecting our community.
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{leadership.map((leader, index) => (
						<Card
							key={index}
							className="hover:shadow-lg transition-shadow"
						>
							<CardHeader>
								<div className="text-center">
									<div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
										<Users className="h-10 w-10 text-primary" />
									</div>
									<CardTitle className="text-xl">{leader.name}</CardTitle>
									<CardDescription className="text-base font-medium">{leader.position}</CardDescription>
									<Badge
										variant="secondary"
										className="mt-2"
									>
										{leader.department}
									</Badge>
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<p className="text-sm text-muted-foreground">Experience</p>
									<p className="font-medium">{leader.experience}</p>
								</div>

								<div className="space-y-2">
									<div className="flex items-center gap-2 text-sm">
										<Mail className="h-4 w-4 text-muted-foreground" />
										<span className="truncate">{leader.email}</span>
									</div>
									<div className="flex items-center gap-2 text-sm">
										<Phone className="h-4 w-4 text-muted-foreground" />
										<span>{leader.phone}</span>
									</div>
								</div>

								<div>
									<p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
										<Award className="h-4 w-4" />
										Key Achievements
									</p>
									<ul className="space-y-1">
										{leader.achievements.map((achievement, idx) => (
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
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};

export default LeadershipPage;
