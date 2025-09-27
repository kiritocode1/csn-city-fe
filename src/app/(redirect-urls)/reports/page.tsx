"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Download, FileText, TrendingUp, Users } from "lucide-react";

const ReportsPage = () => {
	const reportTypes = [
		{
			title: "Annual Crime Report 2023",
			description: "Comprehensive annual report on crime statistics and police activities in Chhatrapati Sambhaji Nagar",
			icon: <FileText className="h-5 w-5" />,
			color: "bg-blue-600",
			year: "2023",
			size: "2.5 MB",
		},
		{
			title: "Monthly Activity Report",
			description: "Monthly report on police activities, cases, and community engagement initiatives",
			icon: <Calendar className="h-5 w-5" />,
			color: "bg-green-600",
			year: "2024",
			size: "1.2 MB",
		},
		{
			title: "Crime Statistics Dashboard",
			description: "Detailed crime statistics and trends analysis for Chhatrapati Sambhaji Nagar",
			icon: <TrendingUp className="h-5 w-5" />,
			color: "bg-orange-600",
			year: "2024",
			size: "3.1 MB",
		},
		{
			title: "Traffic Management Report",
			description: "Traffic violations, accidents, and road safety initiatives in the city",
			icon: <Users className="h-5 w-5" />,
			color: "bg-purple-600",
			year: "2024",
			size: "1.8 MB",
		},
	];

	const recentReports = [
		{
			title: "January 2024 Monthly Report",
			date: "2024-01-15",
			type: "Monthly",
			downloads: "1,234",
			status: "Available",
		},
		{
			title: "Crime Statistics Q4 2023",
			date: "2024-01-10",
			type: "Crime",
			downloads: "856",
			status: "Available",
		},
		{
			title: "Traffic Violations Report",
			date: "2024-01-05",
			type: "Traffic",
			downloads: "642",
			status: "Available",
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
					<h1 className="text-3xl font-bold mb-4">Reports</h1>
					<p className="text-muted-foreground text-lg">Access official reports, crime statistics, and police activity reports for Chhatrapati Sambhaji Nagar Police Department.</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center">Report Types</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
							{reportTypes.map((report, index) => (
								<Card
									key={index}
									className="hover:shadow-lg transition-shadow"
								>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<div className={`p-2 ${report.color} rounded-lg`}>{report.icon}</div>
											{report.title}
										</CardTitle>
										<CardDescription className="text-sm">{report.description}</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-2 mb-4">
											<div className="flex justify-between text-sm">
												<span className="text-muted-foreground">Year</span>
												<span className="font-medium">{report.year}</span>
											</div>
											<div className="flex justify-between text-sm">
												<span className="text-muted-foreground">Size</span>
												<span className="font-medium">{report.size}</span>
											</div>
										</div>
										<Button
											className="w-full"
											size="sm"
										>
											<Download className="h-4 w-4 mr-2" />
											Download
										</Button>
									</CardContent>
								</Card>
							))}
						</div>
					</CardContent>
				</Card>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<FileText className="h-6 w-6" />
							Recent Reports
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{recentReports.map((report, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-4 border rounded-lg"
								>
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<span className="font-semibold">{report.title}</span>
											<Badge variant="outline">{report.type}</Badge>
											<Badge variant={getStatusColor(report.status)}>{report.status}</Badge>
										</div>
										<p className="text-sm text-muted-foreground">
											Date: {report.date} | Downloads: {report.downloads}
										</p>
									</div>
									<Button
										size="sm"
										variant="outline"
									>
										<Download className="h-4 w-4 mr-2" />
										Download
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center">Report Categories</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-3 gap-6">
							<div className="text-center">
								<FileText className="h-12 w-12 text-primary mx-auto mb-3" />
								<h3 className="font-semibold mb-2">Official Reports</h3>
								<p className="text-sm text-muted-foreground mb-4">Annual and monthly official police reports and activity summaries</p>
								<Button size="sm">
									<Download className="h-4 w-4 mr-2" />
									Download
								</Button>
							</div>
							<div className="text-center">
								<TrendingUp className="h-12 w-12 text-primary mx-auto mb-3" />
								<h3 className="font-semibold mb-2">Crime Statistics</h3>
								<p className="text-sm text-muted-foreground mb-4">Detailed crime statistics, trends, and analysis reports</p>
								<Button size="sm">
									<Download className="h-4 w-4 mr-2" />
									Download
								</Button>
							</div>
							<div className="text-center">
								<Users className="h-12 w-12 text-primary mx-auto mb-3" />
								<h3 className="font-semibold mb-2">Community Reports</h3>
								<p className="text-sm text-muted-foreground mb-4">Community policing initiatives and public engagement reports</p>
								<Button size="sm">
									<Download className="h-4 w-4 mr-2" />
									Download
								</Button>
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
							<p className="text-lg">If you need specific reports or have questions about our data, contact us for assistance</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button size="lg">
									<FileText className="h-4 w-4 mr-2" />
									Request Report
								</Button>
								<Button
									size="lg"
									variant="outline"
								>
									<Download className="h-4 w-4 mr-2" />
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

export default ReportsPage;
