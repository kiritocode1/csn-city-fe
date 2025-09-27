"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Calendar } from "lucide-react";

const AnnouncementsPage = () => {
	const announcements = [
		{
			id: 1,
			title: "URGENT: Road Closure on Jalna Road for VIP Movement",
			description: "Jalna Road will be closed from 2:00 PM to 4:00 PM today for VIP convoy movement. Please use alternative routes.",
			date: "2024-01-15",
			priority: "High",
			type: "Traffic Alert",
		},
		{
			id: 2,
			title: "New Police Station Inaugurated in Cidco Area",
			description: "Chhatrapati Sambhaji Nagar Police Commissionerate opens new police station in Cidco N-6 area for better service coverage.",
			date: "2024-01-14",
			priority: "Medium",
			type: "Service Update",
		},
		{
			id: 3,
			title: "Public Notice: Verification Process for New Residents",
			description: "All new residents in Chhatrapati Sambhaji Nagar must complete police verification within 15 days of arrival.",
			date: "2024-01-13",
			priority: "High",
			type: "Public Notice",
		},
		{
			id: 4,
			title: "Festival Security Arrangements - Ganesh Chaturthi",
			description: "Special security measures implemented across the city for Ganesh Chaturthi celebrations. Emergency helpline: 100",
			date: "2024-01-12",
			priority: "Medium",
			type: "Festival Notice",
		},
		{
			id: 5,
			title: "Cyber Crime Prevention - Important Guidelines",
			description: "Citizens advised to be cautious of online frauds. Report suspicious activities immediately to cyber crime helpline: 1930",
			date: "2024-01-11",
			priority: "High",
			type: "Safety Alert",
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
			<div className="max-w-4xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold mb-4">Announcements</h1>
					<p className="text-muted-foreground">Important announcements, alerts, and updates from Chhatrapati Sambhaji Nagar Police Department.</p>
				</div>

				<div className="space-y-6">
					{announcements.map((item) => (
						<Card
							key={item.id}
							className="hover:shadow-lg transition-shadow"
						>
							<CardHeader>
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<CardTitle className="text-xl mb-2 flex items-center gap-2">
											<AlertTriangle className="h-5 w-5 text-orange-500" />
											{item.title}
										</CardTitle>
										<CardDescription className="text-base">{item.description}</CardDescription>
									</div>
									<div className="flex flex-col gap-2">
										<Badge variant={getPriorityColor(item.priority)}>{item.priority}</Badge>
										<Badge variant="outline">{item.type}</Badge>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<div className="flex items-center gap-4 text-sm text-muted-foreground">
									<div className="flex items-center gap-1">
										<Calendar className="h-4 w-4" />
										{item.date}
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};

export default AnnouncementsPage;
