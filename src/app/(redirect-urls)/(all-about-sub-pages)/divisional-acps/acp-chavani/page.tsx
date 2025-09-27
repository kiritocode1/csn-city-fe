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

// Real data for ACP Chavani Division
const ACP_CHAVANI_DATA: ACPOfficer = {
	_id: "acp-chavani-1",
	name: "Shri. Sanjay Sanap",
	name_in_marathi: "श्री. संजय सानप",
	photo: "",
	designation: "Assistant Commissioner of Police - Chavani Division",
	designation_in_marathi: "सहाय्यक पोलीस आयुक्त - छावनी विभाग",
	phone: "02402240587",
	email: "acpcantt.abad@mahapolice.gov.in",
	mobile: "02402380147",
	location: "Topkhana Gali, Chawani, Aurangabad Cantonment, Padegaon, Chhatrapati Sambhaji Nagar, Maharashtra 431002",
	location_in_marathi: "टॉपखाना गली, छावनी, औरंगाबाद छावनी, पडेगाव, छत्रपती संभाजी नगर, महाराष्ट्र 431002",
};

const BRANCHES: Branch[] = [
	{
		name: "Chavani Police Station",
		name_in_marathi: "छावनी पोलीस स्टेशन",
		description: "Main police station for Chavani area",
		description_in_marathi: "छावनी क्षेत्रासाठी मुख्य पोलीस स्टेशन",
	},
	{
		name: "Patrol Unit",
		name_in_marathi: "पेट्रोल युनिट",
		description: "24/7 patrolling and surveillance",
		description_in_marathi: "24/7 पेट्रोलिंग आणि निरीक्षण",
	},
	{
		name: "Traffic Control",
		name_in_marathi: "वाहतूक नियंत्रण",
		description: "Traffic management and enforcement",
		description_in_marathi: "वाहतूक व्यवस्थापन आणि अंमलबजावणी",
	},
	{
		name: "Community Relations",
		name_in_marathi: "समुदाय संबंध",
		description: "Public outreach and community engagement",
		description_in_marathi: "सार्वजनिक आउटरीच आणि समुदाय सहभाग",
	},
	{
		name: "Crime Prevention",
		name_in_marathi: "गुन्हा प्रतिबंध",
		description: "Crime prevention and investigation support",
		description_in_marathi: "गुन्हा प्रतिबंध आणि तपासणी सहाय्य",
	},
];

const ACPChavaniPage = () => {
	const { language } = useLanguage();
	const [officerData, setOfficerData] = useState<ACPOfficer>(ACP_CHAVANI_DATA);
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
			<h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">{language === "mr" ? "एसीपी छावनी विभाग" : "ACP Chavani Division"}</h1>

			<div className="mb-4 text-sm text-gray-600 dark:text-gray-300">{language === "mr" ? "मुख्यपृष्ठ > एसीपी छावनी विभाग" : "Home > ACP Chavani Division"}</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Officer Details */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
					<div className="flex items-start space-x-6">
						<div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
							<span className="text-green-600 dark:text-green-400 font-semibold text-xl">
								{(language === "mr" ? officerData.name_in_marathi : officerData.name)
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</span>
						</div>
						<div className="flex-1">
							<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{language === "mr" ? officerData.name_in_marathi : officerData.name}</h2>
							<p className="text-green-600 dark:text-green-400 font-medium mb-4">{language === "mr" ? officerData.designation_in_marathi : officerData.designation}</p>
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
					<h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded-t-lg -mx-6 -mt-6 mb-4">{contactsLabel}</h3>
					<div className="space-y-3">
						<div className="flex items-center text-sm">
							<span className="text-gray-600 dark:text-gray-300 w-20">📱</span>
							<a
								href={`tel:${officerData.mobile}`}
								className="text-green-600 dark:text-green-400 hover:underline"
							>
								{officerData.mobile}
							</a>
						</div>
						<div className="flex items-center text-sm">
							<span className="text-gray-600 dark:text-gray-300 w-20">📞</span>
							<a
								href={`tel:${officerData.phone}`}
								className="text-green-600 dark:text-green-400 hover:underline"
							>
								{officerData.phone}
							</a>
						</div>
						<div className="flex items-center text-sm">
							<span className="text-gray-600 dark:text-gray-300 w-20">✉️</span>
							<a
								href={`mailto:${officerData.email}`}
								className="text-green-600 dark:text-green-400 hover:underline"
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
					<h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded-t-lg -mx-6 -mt-6 mb-6">{branchesLabel}</h3>
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

export default ACPChavaniPage;
