"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Clock, FileText, Search } from "lucide-react";

const FIRPage = () => {
	const firStatuses = [
		{
			id: "FIR/2024/001234",
			date: "2024-01-15",
			status: "Under Investigation",
			description: "Theft case reported from Cidco area - Investigation in progress",
		},
		{
			id: "FIR/2024/001235",
			date: "2024-01-14",
			status: "Chargesheet Filed",
			description: "Fraud case - Chargesheet submitted to court",
		},
		{
			id: "FIR/2024/001236",
			date: "2024-01-13",
			status: "Case Closed",
			description: "Dispute case - Resolved through mediation",
		},
		{
			id: "FIR/2024/001237",
			date: "2024-01-12",
			status: "Under Investigation",
			description: "Cyber crime case - Digital evidence being analyzed",
		},
		{
			id: "FIR/2024/001238",
			date: "2024-01-11",
			status: "Chargesheet Filed",
			description: "Traffic accident case - Chargesheet filed in court",
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Under Investigation":
				return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
			case "Chargesheet Filed":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
			case "Case Closed":
				return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">FIR Services</h1>
					<p className="text-muted-foreground text-lg">File First Information Reports (FIR) online, check status, and track your complaints with Chhatrapati Sambhaji Nagar Police.</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl flex items-center gap-2">
								<Search className="h-6 w-6" />
								Search FIR Status
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
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
										placeholder="Enter registered mobile number"
										className="mt-1"
									/>
								</div>
								<Button className="w-full">
									<Search className="h-4 w-4 mr-2" />
									Search Status
								</Button>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-2xl flex items-center gap-2">
								<FileText className="h-6 w-6" />
								File New FIR
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<Label htmlFor="incident-type">Incident Type</Label>
									<Input
										id="incident-type"
										placeholder="Enter type of incident (e.g., theft, fraud, assault)"
										className="mt-1"
									/>
								</div>
								<div>
									<Label htmlFor="description">Description</Label>
									<Textarea
										id="description"
										placeholder="Provide detailed description of the incident"
										className="mt-1"
										rows={3}
									/>
								</div>
								<Button className="w-full">
									<FileText className="h-4 w-4 mr-2" />
									File FIR
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>

				<Card className="mt-8">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<Clock className="h-6 w-6" />
							Recent FIR Status
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{firStatuses.map((fir, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-4 border rounded-lg"
								>
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<span className="font-semibold">{fir.id}</span>
											<span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(fir.status)}`}>{fir.status}</span>
										</div>
										<p className="text-sm text-muted-foreground">{fir.description}</p>
										<p className="text-xs text-muted-foreground mt-1">{fir.date}</p>
									</div>
									<Button
										variant="outline"
										size="sm"
									>
										View Details
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card className="mt-8">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<AlertTriangle className="h-6 w-6 text-orange-500" />
							Emergency Reporting
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-center space-y-4">
							<p className="text-lg">For immediate police assistance in case of emergency, call our helpline</p>
							<Button
								size="lg"
								className="bg-red-600 hover:bg-red-700"
							>
								<AlertTriangle className="h-4 w-4 mr-2" />
								Call Emergency - 112
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default FIRPage;
