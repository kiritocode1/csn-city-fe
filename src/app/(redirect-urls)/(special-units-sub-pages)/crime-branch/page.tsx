"use client";

import ExtendedLink from "@/components/ExtendedLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { AlertTriangle, Building, Clock, FileText, MapPin, Phone, Shield, Users, Loader2 } from "lucide-react";
import { getSpecialUnits, getMarathiText, SpecialUnit } from "@/lib/api-services";
import { useEffect, useState } from "react";

const CrimeBranchPage = () => {
	const { language } = useLanguage();
	const [specialUnits, setSpecialUnits] = useState<SpecialUnit[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchSpecialUnits = async () => {
			try {
				setLoading(true);
				const data = await getSpecialUnits();
				setSpecialUnits(data);
			} catch (err) {
				setError("Failed to load special units");
				console.error("Error fetching special units:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchSpecialUnits();
	}, []);

	const isMarathi = language === "mr";

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="flex items-center justify-center">
					<Loader2 className="h-8 w-8 animate-spin" />
					<span className="ml-2">{isMarathi ? "लोड होत आहे..." : "Loading..."}</span>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold mb-4">{isMarathi ? "गुन्हेगारी शाखा" : "Crime Branch"}</h1>
					<p className="text-muted-foreground text-lg">
						{isMarathi
							? "चतरपती संभाजी नगर पोलिस विभागाची गुन्हेगारी शाखा गंभीर गुन्हे, आर्थिक गुन्हे आणि विशेष गुन्ह्यांची चौकशी करण्यासाठी समर्पित आहे."
							: "The Crime Branch of Chhatrapati Sambhaji Nagar Police Department is dedicated to investigating serious crimes, economic offenses, and specialized criminal activities."}
					</p>
				</div>

				{error && (
					<Card className="mb-6 border-red-200 bg-red-50">
						<CardContent className="pt-6">
							<p className="text-red-600">{error}</p>
						</CardContent>
					</Card>
				)}

				<div className="grid md:grid-cols-2 gap-6 mb-8">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Shield className="h-5 w-5" />
								{isMarathi ? "आमचे ध्येय" : "Our Mission"}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription className="text-base">
								{isMarathi
									? "गंभीर गुन्ह्यांची कार्यक्षम चौकशी करून न्यायालयात पुरावे सादर करणे आणि गुन्हेगारांना न्यायालयात उभे करणे."
									: "To conduct efficient investigations of serious crimes, present evidence in court, and ensure criminals are brought to justice."}
							</CardDescription>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<AlertTriangle className="h-5 w-5" />
								{isMarathi ? "विशेष क्षेत्रे" : "Specialized Areas"}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription className="text-base">
								{isMarathi
									? "आर्थिक गुन्हे, सायबर गुन्हे, महिला सुरक्षा, मादक पदार्थ व्यापार आणि गंभीर गुन्ह्यांची चौकशी."
									: "Economic crimes, cyber crimes, women safety, narcotics trafficking, and investigation of serious criminal offenses."}
							</CardDescription>
						</CardContent>
					</Card>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Users className="h-5 w-5" />
							{isMarathi ? "शाखा सांख्यिकी" : "Branch Statistics"}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div className="text-center">
								<div className="text-2xl font-bold text-primary">150+</div>
								<div className="text-sm text-muted-foreground">{isMarathi ? "अधिकारी" : "Officers"}</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-primary">95%</div>
								<div className="text-sm text-muted-foreground">{isMarathi ? "यशदर" : "Success Rate"}</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-primary">24/7</div>
								<div className="text-sm text-muted-foreground">{isMarathi ? "सेवा" : "Service"}</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-primary">5</div>
								<div className="text-sm text-muted-foreground">{isMarathi ? "विशेष युनिट" : "Special Units"}</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="grid md:grid-cols-2 gap-6 mb-8">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Phone className="h-5 w-5" />
								{isMarathi ? "संपर्क माहिती" : "Contact Information"}
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="flex items-center gap-2">
								<Phone className="h-4 w-4" />
								<span className="text-sm">{isMarathi ? "आपत्कालीन: 112" : "Emergency: 112"}</span>
							</div>
							<div className="flex items-center gap-2">
								<Clock className="h-4 w-4" />
								<span className="text-sm">{isMarathi ? "कामाचे तास: 24x7" : "Working Hours: 24x7"}</span>
							</div>
							<div className="flex items-center gap-2">
								<MapPin className="h-4 w-4" />
								<span className="text-sm">{isMarathi ? "स्थान: पोलिस मुख्यालय" : "Location: Police Headquarters"}</span>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<FileText className="h-5 w-5" />
								{isMarathi ? "सेवा" : "Services"}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-primary rounded-full"></div>
									<span className="text-sm">{isMarathi ? "गंभीर गुन्ह्यांची चौकशी" : "Serious Crime Investigation"}</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-primary rounded-full"></div>
									<span className="text-sm">{isMarathi ? "सायबर गुन्हे" : "Cyber Crime Investigation"}</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-primary rounded-full"></div>
									<span className="text-sm">{isMarathi ? "महिला सुरक्षा" : "Women Safety"}</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-primary rounded-full"></div>
									<span className="text-sm">{isMarathi ? "आर्थिक गुन्हे" : "Economic Offenses"}</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Special Units Section */}
				{specialUnits.length > 0 && (
					<Card className="mb-8">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Building className="h-5 w-5" />
								{isMarathi ? "विशेष युनिट्स" : "Special Units"}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
								{specialUnits.map((unit) => (
									<Card
										key={unit._id}
										className="hover:shadow-md transition-shadow"
									>
										<CardHeader className="pb-3">
											<CardTitle className="text-lg">{getMarathiText(unit.name, unit.name_in_marathi)}</CardTitle>
										</CardHeader>
										<CardContent className="pt-0">
											{unit.description && <p className="text-sm text-muted-foreground line-clamp-3">{getMarathiText(unit.description, unit.description_in_marathi)}</p>}
											{unit.contact && (
												<div className="mt-3 flex items-center gap-2 text-sm">
													<Phone className="h-4 w-4" />
													<span>{unit.contact}</span>
												</div>
											)}
										</CardContent>
									</Card>
								))}
							</div>
						</CardContent>
					</Card>
				)}

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Building className="h-5 w-5" />
							{isMarathi ? "संबंधित पाने" : "Related Pages"}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
							<Button
								asChild
								variant="outline"
								className="h-auto p-4"
							>
								<ExtendedLink href="/women-safety">
									<div className="text-center">
										<Shield className="h-6 w-6 mx-auto mb-2" />
										<span className="text-sm">{isMarathi ? "महिला सुरक्षा" : "Women Safety"}</span>
									</div>
								</ExtendedLink>
							</Button>
							<Button
								asChild
								variant="outline"
								className="h-auto p-4"
							>
								<ExtendedLink href="/cyber-awareness">
									<div className="text-center">
										<AlertTriangle className="h-6 w-6 mx-auto mb-2" />
										<span className="text-sm">{isMarathi ? "सायबर जागरूकता" : "Cyber Awareness"}</span>
									</div>
								</ExtendedLink>
							</Button>
							<Button
								asChild
								variant="outline"
								className="h-auto p-4"
							>
								<ExtendedLink href="/economic-offence">
									<div className="text-center">
										<FileText className="h-6 w-6 mx-auto mb-2" />
										<span className="text-sm">{isMarathi ? "आर्थिक गुन्हे" : "Economic Offenses"}</span>
									</div>
								</ExtendedLink>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default CrimeBranchPage;
