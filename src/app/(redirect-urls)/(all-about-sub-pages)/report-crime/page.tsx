"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Clock, FileText, Phone } from "lucide-react";

const ReportCrimePage = () => {
	const crimeTypes = [
		{
			value: "theft",
			label: "Theft & Burglary",
			description: "Report theft, burglary, or property crimes in Chhatrapati Sambhaji Nagar",
		},
		{
			value: "assault",
			label: "Assault & Violence",
			description: "Report physical assault, domestic violence, or violent crimes",
		},
		{
			value: "fraud",
			label: "Fraud & Scam",
			description: "Report financial fraud, scams, or economic crimes",
		},
		{
			value: "cyber",
			label: "Cyber Crime",
			description: "Report online fraud, cyber bullying, hacking, or digital crimes",
		},
		{
			value: "domestic",
			label: "Domestic Violence",
			description: "Report domestic violence, harassment, or family-related crimes",
		},
		{
			value: "other",
			label: "Other Crimes",
			description: "Report other criminal activities not covered in the above categories",
		},
	];

	const urgencyLevels = [
		{ value: "immediate", label: "Immediate - Life Threatening" },
		{ value: "urgent", label: "Urgent - Within 1 Hour" },
		{ value: "normal", label: "Normal - Within 24 Hours" },
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Report Crime</h1>
					<p className="text-muted-foreground text-lg">
						Report criminal activities, incidents, or suspicious behavior to Chhatrapati Sambhaji Nagar Police Department. Your report helps us maintain safety and security.
					</p>
				</div>

				<Card className="mb-8 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2 text-red-700 dark:text-red-300">
							<AlertTriangle className="h-6 w-6" />
							Emergency - Call 112
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-center space-y-4">
							<p className="text-lg font-medium">For immediate police assistance in case of emergency, call our 24/7 helpline</p>
							<Button
								size="lg"
								className="bg-red-600 hover:bg-red-700"
							>
								<Phone className="h-4 w-4 mr-2" />
								Call Emergency - 112
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<FileText className="h-6 w-6" />
							Crime Report Form
						</CardTitle>
						<CardDescription>Fill out the form below to report a crime or incident. All information will be kept confidential and used for investigation purposes.</CardDescription>
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
								<Label>Type of Crime</Label>
								<RadioGroup
									className="mt-2"
									defaultValue="theft"
								>
									{crimeTypes.map((type) => (
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
								<Label>Urgency Level</Label>
								<RadioGroup
									className="mt-2"
									defaultValue="normal"
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
								<Label htmlFor="location">Location of Incident</Label>
								<Input
									id="location"
									placeholder="Enter the exact location where the incident occurred"
									className="mt-1"
								/>
							</div>

							<div>
								<Label htmlFor="date">Date & Time of Incident</Label>
								<Input
									id="date"
									type="datetime-local"
									className="mt-1"
								/>
							</div>

							<div>
								<Label htmlFor="description">Description of Incident</Label>
								<Textarea
									id="description"
									placeholder="Provide a detailed description of what happened, including any relevant details"
									className="mt-1"
									rows={5}
								/>
							</div>

							<div>
								<Label htmlFor="witnesses">Witness Information</Label>
								<Textarea
									id="witnesses"
									placeholder="List any witnesses and their contact information if available"
									className="mt-1"
									rows={3}
								/>
							</div>

							<Button
								className="w-full"
								size="lg"
							>
								<FileText className="h-4 w-4 mr-2" />
								Submit Report
							</Button>
						</form>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<Clock className="h-6 w-6" />
							Report Process
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
								<div>
									<h3 className="font-semibold">Submit Report</h3>
									<p className="text-sm text-muted-foreground">Fill out the crime report form with all necessary details and submit it online</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
								<div>
									<h3 className="font-semibold">Review & Investigation</h3>
									<p className="text-sm text-muted-foreground">Our team will review your report and begin investigation if required</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
								<div>
									<h3 className="font-semibold">Follow-up</h3>
									<p className="text-sm text-muted-foreground">We will contact you for additional information and provide updates on the case</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default ReportCrimePage;
