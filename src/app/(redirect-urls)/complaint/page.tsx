"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, FileText } from "lucide-react";

const ComplaintPage = () => {
	const complaintTypes = [
		{
			value: "officer",
			label: "Police Officer Misconduct",
			description: "Report unprofessional behavior, harassment, or misconduct by police officers in Chhatrapati Sambhaji Nagar",
		},
		{
			value: "service",
			label: "Poor Service Quality",
			description: "Report delays, unresponsiveness, or inadequate assistance from police services",
		},
		{
			value: "facility",
			label: "Facility Issues",
			description: "Report problems with police station facilities, equipment, or infrastructure",
		},
		{
			value: "corruption",
			label: "Corruption & Bribery",
			description: "Report corruption, bribery, or illegal activities by police personnel",
		},
	];

	const urgencyLevels = [
		{ value: "high", label: "High Priority" },
		{ value: "medium", label: "Medium Priority" },
		{ value: "low", label: "Low Priority" },
	];

	const recentComplaints = [
		{
			id: "COMP001234",
			subject: "Delayed response to emergency call",
			date: "2024-01-15",
			status: "Under Review",
			priority: "High",
		},
		{
			id: "COMP001235",
			subject: "Rude behavior by traffic officer",
			date: "2024-01-10",
			status: "Resolved",
			priority: "Medium",
		},
		{
			id: "COMP001236",
			subject: "Poor condition of police station facilities",
			date: "2024-01-05",
			status: "In Progress",
			priority: "Low",
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Under Review":
				return "default";
			case "In Progress":
				return "secondary";
			case "Resolved":
				return "outline";
			default:
				return "destructive";
		}
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "High":
				return "destructive";
			case "Medium":
				return "default";
			case "Low":
				return "secondary";
			default:
				return "outline";
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">File a Complaint</h1>
					<p className="text-muted-foreground text-lg">Report issues, grievances, or concerns about police services in Chhatrapati Sambhaji Nagar. Your feedback helps us improve.</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<FileText className="h-6 w-6" />
							Complaint Form
						</CardTitle>
						<CardDescription>Please fill out the form below to submit your complaint. All fields are required.</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="space-y-6">
							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<Label htmlFor="name">Full Name</Label>
									<Input
										id="name"
										placeholder="Enter your full name"
										className="mt-1"
									/>
								</div>
								<div>
									<Label htmlFor="phone">Phone Number</Label>
									<Input
										id="phone"
										placeholder="Enter your phone number"
										className="mt-1"
									/>
								</div>
							</div>

							<div>
								<Label htmlFor="email">Email Address</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter your email address"
									className="mt-1"
								/>
							</div>

							<div>
								<Label>Complaint Type</Label>
								<RadioGroup
									className="mt-2"
									defaultValue="officer"
								>
									{complaintTypes.map((type) => (
										<div
											key={type.value}
											className="flex items-start space-x-2"
										>
											<RadioGroupItem
												value={type.value}
												id={type.value}
											/>
											<Label
												htmlFor={type.value}
												className="flex-1"
											>
												<div className="font-medium">{type.label}</div>
												<div className="text-sm text-muted-foreground">{type.description}</div>
											</Label>
										</div>
									))}
								</RadioGroup>
							</div>

							<div>
								<Label>Priority Level</Label>
								<RadioGroup
									className="mt-2"
									defaultValue="medium"
								>
									{urgencyLevels.map((level) => (
										<div
											key={level.value}
											className="flex items-center space-x-2"
										>
											<RadioGroupItem
												value={level.value}
												id={`urgency-${level.value}`}
											/>
											<Label htmlFor={`urgency-${level.value}`}>{level.label}</Label>
										</div>
									))}
								</RadioGroup>
							</div>

							<div>
								<Label htmlFor="subject">Subject</Label>
								<Input
									id="subject"
									placeholder="Brief description of your complaint"
									className="mt-1"
								/>
							</div>

							<div>
								<Label htmlFor="description">Detailed Description</Label>
								<Textarea
									id="description"
									placeholder="Provide detailed information about your complaint"
									className="mt-1"
									rows={5}
								/>
							</div>

							<Button
								className="w-full"
								size="lg"
							>
								<FileText className="h-4 w-4 mr-2" />
								Submit Complaint
							</Button>
						</form>
					</CardContent>
				</Card>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<CheckCircle className="h-6 w-6" />
							Recent Complaints
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{recentComplaints.map((complaint, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-4 border rounded-lg"
								>
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<span className="font-semibold">{complaint.id}</span>
											<span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>{complaint.status}</span>
											<span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>{complaint.priority}</span>
										</div>
										<p className="text-sm text-muted-foreground">{complaint.subject}</p>
										<p className="text-xs text-muted-foreground mt-1">{complaint.date}</p>
									</div>
									<Button
										size="sm"
										variant="outline"
									>
										View Details
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<Clock className="h-6 w-6" />
							Complaint Process
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
								<div>
									<h3 className="font-semibold">Submit Complaint</h3>
									<p className="text-sm text-muted-foreground">Fill out the complaint form with all required details and submit it online</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
								<div>
									<h3 className="font-semibold">Review & Investigation</h3>
									<p className="text-sm text-muted-foreground">Your complaint will be reviewed and investigated by the appropriate department</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
								<div>
									<h3 className="font-semibold">Resolution & Feedback</h3>
									<p className="text-sm text-muted-foreground">You will receive updates on the status and final resolution of your complaint</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default ComplaintPage;
