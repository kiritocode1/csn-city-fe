"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Download, FileText, Search, Loader2 } from "lucide-react";
import { getRTIData, formatDate, getMarathiText, RTIData } from "@/lib/api-services";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";

const RTIPage = () => {
	const { language } = useLanguage();
	const [rtiRequests, setRtiRequests] = useState<RTIData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchRTIRequests = async () => {
			try {
				setLoading(true);
				const data = await getRTIData();
				setRtiRequests(data);
			} catch (err) {
				setError("Failed to load RTI requests");
				console.error("Error fetching RTI requests:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchRTIRequests();
	}, []);

	const rtiTypes = [
		{
			title: language === "mr" ? "पोलिस रेकॉर्ड्स" : "Police Records",
			description:
				language === "mr"
					? "छत्रपती संभाजी नगर पोलिसकडून पोलिस रेकॉर्ड्स, केस फाइल्स आणि तपासणी अहवाल मिळवा"
					: "Access police records, case files, and investigation reports from Chhatrapati Sambhaji Nagar Police",
			icon: <FileText className="h-5 w-5" />,
		},
		{
			title: language === "mr" ? "बजेट माहिती" : "Budget Information",
			description: language === "mr" ? "पोलिस बजेट, खर्च आणि आर्थिक वाटपाबद्दल माहिती मिळवा" : "Get information about police budget, expenditure, and financial allocations",
			icon: <FileText className="h-5 w-5" />,
		},
		{
			title: language === "mr" ? "धोरणे आणि प्रक्रिया" : "Policies & Procedures",
			description: language === "mr" ? "विविध कार्यक्रमांसाठी पोलिस धोरणे, प्रक्रिया आणि दिशानिर्देश मिळवा" : "Access police policies, procedures, and guidelines for various operations",
			icon: <FileText className="h-5 w-5" />,
		},
		{
			title: language === "mr" ? "प्रशासकीय निर्णय" : "Administrative Decisions",
			description: language === "mr" ? "प्रशासकीय निर्णय, स्थानांतरण आणि नियुक्त्यांबद्दल माहिती मिळवा" : "Get information about administrative decisions, transfers, and appointments",
			icon: <FileText className="h-5 w-5" />,
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Under Review":
				return "default";
			case "Response Ready":
				return "secondary";
			case "Completed":
				return "outline";
			default:
				return "destructive";
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">RTI</h1>
					<p className="text-muted-foreground text-lg">Right to Information (RTI) services for accessing police records and information from Chhatrapati Sambhaji Nagar Police Department.</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<Search className="h-6 w-6" />
							Search RTI Status
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<Label htmlFor="rti-number">RTI Number</Label>
									<Input
										id="rti-number"
										placeholder="Enter RTI number (e.g., RTI/2024/001234)"
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

				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-6 text-center">RTI Information Types</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{rtiTypes.map((type, index) => (
							<Card
								key={index}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-lg">
										{type.icon}
										{type.title}
									</CardTitle>
									<CardDescription className="text-sm">{type.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<Button
										className="w-full"
										size="sm"
									>
										Request Information
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<FileText className="h-6 w-6" />
							New RTI Request
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form className="space-y-4">
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
									<Label htmlFor="email">Email Address</Label>
									<Input
										id="email"
										type="email"
										placeholder="Enter your email address"
										className="mt-1"
									/>
								</div>
							</div>
							<div>
								<Label htmlFor="subject">Subject</Label>
								<Input
									id="subject"
									placeholder="Brief description of information requested"
									className="mt-1"
								/>
							</div>
							<div>
								<Label htmlFor="description">Detailed Description</Label>
								<Textarea
									id="description"
									placeholder="Provide detailed description of the information you need"
									className="mt-1"
									rows={4}
								/>
							</div>
							<Button className="w-full">
								<FileText className="h-4 w-4 mr-2" />
								Submit Request
							</Button>
						</form>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<Clock className="h-6 w-6" />
							{language === "mr" ? "अलीकडील RTI विनंत्या" : "Recent RTI Requests"}
						</CardTitle>
					</CardHeader>
					<CardContent>
						{loading ? (
							<div className="flex items-center justify-center py-8">
								<Loader2 className="h-6 w-6 animate-spin" />
								<span className="ml-2">{language === "mr" ? "लोड होत आहे..." : "Loading..."}</span>
							</div>
						) : error ? (
							<div className="text-center text-red-500 py-8">
								<p>{error}</p>
							</div>
						) : rtiRequests.length === 0 ? (
							<div className="text-center text-muted-foreground py-8">
								<FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
								<p>{language === "mr" ? "कोणतेही RTI विनंत्या उपलब्ध नाहीत" : "No RTI requests available"}</p>
							</div>
						) : (
							<div className="space-y-4">
								{rtiRequests.map((request) => (
									<div
										key={request._id}
										className="flex items-center justify-between p-4 border rounded-lg"
									>
										<div className="flex-1">
											<div className="flex items-center gap-3 mb-2">
												<span className="font-semibold">{request.requestNumber}</span>
												<span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>{request.status}</span>
											</div>
											<p className="text-sm text-muted-foreground">{getMarathiText(request.subject, request.subject_in_marathi)}</p>
											<p className="text-xs text-muted-foreground mt-1">
												{language === "mr" ? "सबमिट केले" : "Submitted"}: {formatDate(request.submittedDate)} |
												{request.responseDate && ` ${language === "mr" ? "अंतिम तारीख" : "Deadline"}: ${formatDate(request.responseDate)}`}
											</p>
										</div>
										<Button
											size="sm"
											variant="outline"
										>
											<Download className="h-4 w-4 mr-2" />
											{language === "mr" ? "डाउनलोड" : "Download"}
										</Button>
									</div>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default RTIPage;
