"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock, FileText, Shield, TrendingUp, Users } from "lucide-react";

const DashboardPage = () => {
	const stats = [
		{
			title: "Total Cases (2024)",
			value: "2,847",
			change: "+8%",
			icon: <FileText className="h-5 w-5" />,
			color: "text-blue-600",
		},
		{
			title: "Active Officers",
			value: "2,500+",
			change: "+3%",
			icon: <Users className="h-5 w-5" />,
			color: "text-green-600",
		},
		{
			title: "Cases Resolved",
			value: "2,156",
			change: "+15%",
			icon: <Shield className="h-5 w-5" />,
			color: "text-purple-600",
		},
		{
			title: "Pending Cases",
			value: "691",
			change: "-12%",
			icon: <AlertTriangle className="h-5 w-5" />,
			color: "text-orange-600",
		},
	];

	const recentActivities = [
		{
			title: "Digital FIR System Implementation",
			description: "Successfully launched online FIR filing system for citizens",
			time: "2 hours ago",
			status: "Completed",
		},
		{
			title: "Traffic Management Optimization",
			description: "Installing new traffic signals at Jalna Road intersection",
			time: "4 hours ago",
			status: "In Progress",
		},
		{
			title: "Community Policing Program",
			description: "Training session for beat officers on community engagement",
			time: "6 hours ago",
			status: "Pending",
		},
		{
			title: "Cyber Crime Cell Setup",
			description: "Establishing dedicated cyber crime investigation unit",
			time: "1 day ago",
			status: "Completed",
		},
		{
			title: "Women Safety Initiative",
			description: "Deploying Pink Patrol units across the city",
			time: "2 days ago",
			status: "In Progress",
		},
	];

	const quickActions = [
		{
			title: "File FIR",
			description: "Report crimes and incidents online",
			icon: <FileText className="h-5 w-5" />,
			color: "bg-blue-600",
		},
		{
			title: "Check Status",
			description: "Track your complaint or FIR status",
			icon: <Shield className="h-5 w-5" />,
			color: "bg-green-600",
		},
		{
			title: "Emergency",
			description: "Call emergency helpline 112",
			icon: <AlertTriangle className="h-5 w-5" />,
			color: "bg-red-600",
		},
		{
			title: "View Reports",
			description: "Access crime statistics and reports",
			icon: <TrendingUp className="h-5 w-5" />,
			color: "bg-purple-600",
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Completed":
				return "default";
			case "In Progress":
				return "secondary";
			case "Pending":
				return "outline";
			default:
				return "destructive";
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold mb-4">Police Dashboard</h1>
					<p className="text-muted-foreground text-lg">Welcome to the Chhatrapati Sambhaji Nagar Police Department dashboard. Monitor activities, statistics, and access quick actions.</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{stats.map((stat, index) => (
						<Card
							key={index}
							className="hover:shadow-lg transition-shadow"
						>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
								<div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${stat.color}`}>{stat.icon}</div>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{stat.value}</div>
								<p className="text-xs text-muted-foreground">
									<span className="text-green-600">{stat.change}</span> from last month
								</p>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="grid lg:grid-cols-3 gap-8 mb-8">
					<Card className="lg:col-span-2">
						<CardHeader>
							<CardTitle className="text-2xl flex items-center gap-2">
								<Clock className="h-6 w-6" />
								Recent Activities
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{recentActivities.map((activity, index) => (
									<div
										key={index}
										className="flex items-start gap-4 p-4 border rounded-lg"
									>
										<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
										<div className="flex-1">
											<div className="flex items-center justify-between mb-1">
												<h3 className="font-semibold">{activity.title}</h3>
												<Badge variant={getStatusColor(activity.status)}>{activity.status}</Badge>
											</div>
											<p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
											<p className="text-xs text-muted-foreground">{activity.time}</p>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">Quick Actions</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{quickActions.map((action, index) => (
									<Button
										key={index}
										variant="outline"
										className="w-full justify-start h-auto p-4"
									>
										<div className={`p-2 rounded-lg ${action.color} mr-3`}>{action.icon}</div>
										<div className="text-left">
											<div className="font-semibold">{action.title}</div>
											<div className="text-xs text-muted-foreground">{action.description}</div>
										</div>
									</Button>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl text-center">Department Overview</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-center space-y-4">
							<p className="text-lg">Chhatrapati Sambhaji Nagar Police Department is committed to maintaining law and order while providing excellent service to the community.</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button size="lg">
									<FileText className="h-4 w-4 mr-2" />
									View Reports
								</Button>
								<Button
									size="lg"
									variant="outline"
								>
									<TrendingUp className="h-4 w-4 mr-2" />
									Analytics
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default DashboardPage;
