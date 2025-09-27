"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, CheckCircle, Clock, FileText, Search } from "lucide-react";

const FIRStatusPage = () => {
	const firStatuses = [
		{
			id: "FIR001234",
			date: "2024-01-15",
			status: "Under Investigation",
			description: "Theft case investigation in progress, evidence being collected and witnesses being questioned",
			officer: "Inspector Rajesh Kumar",
			station: "Chhatrapati Sambhaji Nagar Central Police Station",
			priority: "High",
		},
		{
			id: "FIR001235",
			date: "2024-01-14",
			status: "Chargesheet Filed",
			description: "Fraud case chargesheet filed in court, awaiting trial proceedings",
			officer: "Inspector Priya Sharma",
			station: "Cidco Police Station",
			priority: "Medium",
		},
		{
			id: "FIR001236",
			date: "2024-01-13",
			status: "Case Closed",
			description: "Traffic violation case resolved, fine collected and case closed",
			officer: "Inspector Amit Patel",
			station: "Jalna Road Police Station",
			priority: "Low",
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Under Investigation":
				return "default";
			case "Chargesheet Filed":
				return "secondary";
			case "Case Closed":
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
					<h1 className="text-3xl font-bold mb-4">FIR Status</h1>
					<p className="text-muted-foreground text-lg">Check the status of your First Information Report (FIR) filed with Chhatrapati Sambhaji Nagar Police Department.</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<Search className="h-6 w-6" />
							Search FIR Status
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<Label htmlFor="fir-number">FIR Number</Label>
									<Input
										id="fir-number"
										placeholder="Enter FIR number (e.g., FIR/2024/001234)"
										className="mt-1"
									/>
								</div>
								<div>
									<Label htmlFor="mobile">Mobile Number</Label>
									<Input
										id="mobile"
										placeholder="Enter your mobile number"
										className="mt-1"
									/>
								</div>
							</div>
							<Button className="w-full">
								<Search className="h-4 w-4 mr-2" />
								Search Status
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<FileText className="h-6 w-6" />
							Recent FIR Status
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-6">
							{firStatuses.map((fir, index) => (
								<Card
									key={index}
									className="hover:shadow-lg transition-shadow"
								>
									<CardHeader>
										<div className="flex items-start justify-between">
											<div className="flex-1">
												<CardTitle className="text-xl flex items-center gap-2">
													<FileText className="h-5 w-5 text-primary" />
													{fir.id}
												</CardTitle>
												<CardDescription className="text-base mt-2">{fir.description}</CardDescription>
											</div>
											<div className="flex flex-col gap-2">
												<Badge variant={getStatusColor(fir.status)}>{fir.status}</Badge>
												<Badge variant={getPriorityColor(fir.priority)}>{fir.priority}</Badge>
											</div>
										</div>
									</CardHeader>
									<CardContent>
										<div className="grid md:grid-cols-2 gap-6">
											<div className="space-y-3">
												<div className="flex items-center gap-2">
													<Clock className="h-4 w-4 text-muted-foreground" />
													<span className="text-sm">{fir.date}</span>
												</div>
												<div className="flex items-center gap-2">
													<CheckCircle className="h-4 w-4 text-muted-foreground" />
													<span className="text-sm">{fir.officer}</span>
												</div>
												<div className="flex items-center gap-2">
													<AlertTriangle className="h-4 w-4 text-muted-foreground" />
													<span className="text-sm">{fir.station}</span>
												</div>
											</div>
											<div className="flex items-center justify-end">
												<Button
													size="sm"
													variant="outline"
												>
													View Details
												</Button>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</CardContent>
				</Card>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center">FIR Process</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
								<div>
									<h3 className="font-semibold">File FIR</h3>
									<p className="text-sm text-muted-foreground">Submit your complaint and file an FIR at the nearest police station or online</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
								<div>
									<h3 className="font-semibold">Investigation</h3>
									<p className="text-sm text-muted-foreground">Police investigate the case, collect evidence, and question witnesses</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
								<div>
									<h3 className="font-semibold">Resolution</h3>
									<p className="text-sm text-muted-foreground">Case is resolved through chargesheet filing, court proceedings, or case closure</p>
								</div>
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
							<p className="text-lg">For assistance with FIR filing or status inquiries, contact our help desk</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button size="lg">
									<FileText className="h-4 w-4 mr-2" />
									File New FIR
								</Button>
								<Button
									size="lg"
									variant="outline"
								>
									<Search className="h-4 w-4 mr-2" />
									Search Status
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default FIRStatusPage;
