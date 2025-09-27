"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, FileText, Search, UserCheck } from "lucide-react";

const VerificationPage = () => {
	const verificationTypes = [
		{
			title: "Police Clearance Certificate",
			description: "Get police clearance certificate for employment, visa, or other official purposes in Chhatrapati Sambhaji Nagar",
			icon: <FileText className="h-5 w-5" />,
		},
		{
			title: "Character Certificate",
			description: "Obtain character certificate required for various official purposes and applications",
			icon: <UserCheck className="h-5 w-5" />,
		},
		{
			title: "Address Verification",
			description: "Verify your residential address for official documentation and government services",
			icon: <FileText className="h-5 w-5" />,
		},
		{
			title: "Employment Verification",
			description: "Police verification required for government and private sector employment in Chhatrapati Sambhaji Nagar",
			icon: <UserCheck className="h-5 w-5" />,
		},
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Verification Services</h1>
					<p className="text-muted-foreground text-lg">
						Police verification services for various official purposes including employment, visa applications, and character certificates in Chhatrapati Sambhaji Nagar.
					</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center">Check Application Status</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<Label htmlFor="application-id">Application ID</Label>
									<Input
										id="application-id"
										placeholder="Enter your application ID"
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
								Check Status
							</Button>
						</div>
					</CardContent>
				</Card>

				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-6 text-center">Verification Types</h2>
					<div className="grid md:grid-cols-2 gap-6">
						{verificationTypes.map((type, index) => (
							<Card
								key={index}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<CardTitle className="flex items-center gap-3">
										{type.icon}
										{type.title}
									</CardTitle>
									<CardDescription className="text-base">{type.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<Button className="w-full">Apply Now</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
							<CheckCircle className="h-6 w-6 text-green-500" />
							Verification Process
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
								<div>
									<h3 className="font-semibold">Submit Application</h3>
									<p className="text-sm text-muted-foreground">Fill out the verification application form with all required documents and information</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
								<div>
									<h3 className="font-semibold">Background Check</h3>
									<p className="text-sm text-muted-foreground">Our team conducts thorough background verification and document verification</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
								<div>
									<h3 className="font-semibold">Certificate Issuance</h3>
									<p className="text-sm text-muted-foreground">Receive your verified certificate via email or collect from the police station</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default VerificationPage;
