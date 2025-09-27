"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";

const NewsPage = () => {
	const newsItems = [
		{
			id: 1,
			title: "Chhatrapati Sambhaji Nagar Police Launches Digital FIR System",
			description: "Citizens can now file FIRs online through the new digital portal, reducing wait times and improving accessibility.",
			date: "2024-01-15",
			category: "Technology",
			author: "Press Release",
		},
		{
			id: 2,
			title: "Traffic Awareness Campaign in Aurangabad City",
			description: "Special drive conducted to educate citizens about traffic rules and road safety measures in busy areas.",
			date: "2024-01-14",
			category: "Traffic",
			author: "Traffic Division",
		},
		{
			id: 3,
			title: "Women Safety Initiative - Pink Patrol Units",
			description: "New all-women police patrol units deployed across Chhatrapati Sambhaji Nagar for enhanced women safety.",
			date: "2024-01-13",
			category: "Safety",
			author: "Women Safety Cell",
		},
		{
			id: 4,
			title: "Community Policing Program Launched",
			description: "Citizens and police working together to maintain law and order in residential areas of Aurangabad.",
			date: "2024-01-12",
			category: "Community",
			author: "Community Relations",
		},
		{
			id: 5,
			title: "Cyber Crime Awareness Workshop",
			description: "Educational sessions conducted for students and senior citizens about online safety and cyber fraud prevention.",
			date: "2024-01-11",
			category: "Cyber Security",
			author: "Cyber Crime Cell",
		},
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold mb-4">News & Updates</h1>
					<p className="text-muted-foreground">Stay informed with the latest news, announcements, and updates from Chhatrapati Sambhaji Nagar Police Department.</p>
				</div>

				<div className="space-y-6">
					{newsItems.map((item) => (
						<Card
							key={item.id}
							className="hover:shadow-lg transition-shadow"
						>
							<CardHeader>
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<CardTitle className="text-xl mb-2">{item.title}</CardTitle>
										<CardDescription className="text-base">{item.description}</CardDescription>
									</div>
									<Badge variant="secondary">{item.category}</Badge>
								</div>
							</CardHeader>
							<CardContent>
								<div className="flex items-center gap-4 text-sm text-muted-foreground">
									<div className="flex items-center gap-1">
										<Calendar className="h-4 w-4" />
										{item.date}
									</div>
									<div className="flex items-center gap-1">
										<User className="h-4 w-4" />
										{item.author}
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

export default NewsPage;
