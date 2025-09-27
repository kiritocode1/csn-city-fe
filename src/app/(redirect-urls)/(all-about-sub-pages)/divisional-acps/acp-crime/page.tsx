"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../../../../../contexts/language-context";

interface ACPOfficer {
	_id: string;
	name: string;
	name_in_marathi: string;
	photo: string;
	designation: string;
	designation_in_marathi: string;
	phone: string;
	email: string;
	mobile?: string;
	location: string;
	location_in_marathi: string;
}

interface Branch {
	name: string;
	name_in_marathi: string;
	description: string;
	description_in_marathi: string;
}

// Real data for ACP Crime Division
const ACP_CRIME_DATA: ACPOfficer = {
	_id: "acp-crime-1",
	name: "Shri. Manoj Pagare",
	name_in_marathi: "श्री. मनोज पगारे",
	photo: "",
	designation: "Assistant Commissioner of Police - Crime Division",
	designation_in_marathi: "सहाय्यक पोलीस आयुक्त - गुन्हा विभाग",
	phone: "02402326515",
	email: "acpcrime.abad@mahapolice.gov.in",
	mobile: "9226514006",
	location: "CP Office, Mill Corner, Chh. Sambhajinagar",
	location_in_marathi: "सीपी कार्यालय, मिल कॉर्नर, छ. संभाजीनगर",
};

const BRANCHES: Branch[] = [
	{
		name: "Crime Investigation Unit",
		name_in_marathi: "गुन्हा तपासणी युनिट",
		description: "Specialized crime investigation and detection",
		description_in_marathi: "विशेष गुन्हा तपासणी आणि शोध",
	},
	{
		name: "Cyber Crime Cell",
		name_in_marathi: "सायबर गुन्हा सेल",
		description: "Cyber crime investigation and digital forensics",
		description_in_marathi: "सायबर गुन्हा तपासणी आणि डिजिटल फॉरेन्सिक्स",
	},
	{
		name: "Economic Offenses Wing",
		name_in_marathi: "आर्थिक गुन्हे विंग",
		description: "Financial crimes and fraud investigation",
		description_in_marathi: "आर्थिक गुन्हे आणि फसवणूक तपासणी",
	},
	{
		name: "Narcotics Control",
		name_in_marathi: "नशीबंदी नियंत्रण",
		description: "Drug enforcement and narcotics control",
		description_in_marathi: "ड्रग अंमलबजावणी आणि नशीबंदी नियंत्रण",
	},
	{
		name: "Special Operations",
		name_in_marathi: "विशेष कार्यक्रम",
		description: "High-risk operations and special investigations",
		description_in_marathi: "उच्च-जोखीम कार्यक्रम आणि विशेष तपासणी",
	},
];

const ACPCrimePage = () => {
	const { language } = useLanguage();
	const [officerData, setOfficerData] = useState<ACPOfficer>(ACP_CRIME_DATA);
	const [branches, setBranches] = useState<Branch[]>(BRANCHES);

	const nameLabel = language === "mr" ? "नाव" : "Name";
	const designationLabel = language === "mr" ? "पद" : "Designation";
	const locationLabel = language === "mr" ? "स्थान" : "Location";
	const emailLabel = language === "mr" ? "ईमेल" : "Email";
	const phoneLabel = language === "mr" ? "फोन" : "Phone";
	const mobileLabel = language === "mr" ? "मोबाइल" : "Mobile";
	const contactsLabel = language === "mr" ? "संपर्क" : "Contacts";
	const branchesLabel = language === "mr" ? "शाखा तपशील" : "Branches Details";

	return (
		<div className="container mx-auto px-4 py-8 min-h-screen w-full">
			<h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">{language === "mr" ? "एसीपी गुन्हा विभाग" : "ACP Crime Division"}</h1>

			<div className="mb-4 text-sm text-gray-600 dark:text-gray-300">{language === "mr" ? "मुख्यपृष्ठ > एसीपी गुन्हा विभाग" : "Home > ACP Crime Division"}</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Officer Details */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
					<div className="flex items-start space-x-6">
						<div className="w-24 h-24 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
							<span className="text-orange-600 dark:text-orange-400 font-semibold text-xl">
								{(language === "mr" ? officerData.name_in_marathi : officerData.name)
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</span>
						</div>
						<div className="flex-1">
							<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{language === "mr" ? officerData.name_in_marathi : officerData.name}</h2>
							<p className="text-orange-600 dark:text-orange-400 font-medium mb-4">{language === "mr" ? officerData.designation_in_marathi : officerData.designation}</p>
							<div className="space-y-2">
								<p className="text-sm text-gray-600 dark:text-gray-300">
									<span className="font-medium">{locationLabel}:</span> {language === "mr" ? officerData.location_in_marathi : officerData.location}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Contacts */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
					<h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 bg-orange-600 dark:bg-orange-700 text-white px-4 py-2 rounded-t-lg -mx-6 -mt-6 mb-4">{contactsLabel}</h3>
					<div className="space-y-3">
						<div className="flex items-center text-sm">
							<span className="text-gray-600 dark:text-gray-300 w-20">📱</span>
							<a
								href={`tel:${officerData.mobile}`}
								className="text-orange-600 dark:text-orange-400 hover:underline"
							>
								{officerData.mobile}
							</a>
						</div>
						<div className="flex items-center text-sm">
							<span className="text-gray-600 dark:text-gray-300 w-20">📞</span>
							<a
								href={`tel:${officerData.phone}`}
								className="text-orange-600 dark:text-orange-400 hover:underline"
							>
								{officerData.phone}
							</a>
						</div>
						<div className="flex items-center text-sm">
							<span className="text-gray-600 dark:text-gray-300 w-20">✉️</span>
							<a
								href={`mailto:${officerData.email}`}
								className="text-orange-600 dark:text-orange-400 hover:underline"
							>
								{officerData.email}
							</a>
						</div>
						<div className="flex items-center text-sm">
							<span className="text-gray-600 dark:text-gray-300 w-20">💬</span>
							<span className="text-gray-500 dark:text-gray-400">WhatsApp Available</span>
						</div>
					</div>
				</div>
			</div>

			{/* Branches Details */}
			<div className="mt-8">
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
					<h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 bg-orange-600 dark:bg-orange-700 text-white px-4 py-2 rounded-t-lg -mx-6 -mt-6 mb-6">{branchesLabel}</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{branches.map((branch, index) => (
							<div
								key={index}
								className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
							>
								<h4 className="font-semibold text-gray-800 dark:text-white mb-2">{language === "mr" ? branch.name_in_marathi : branch.name}</h4>
								<p className="text-sm text-gray-600 dark:text-gray-300">{language === "mr" ? branch.description_in_marathi : branch.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ACPCrimePage;
