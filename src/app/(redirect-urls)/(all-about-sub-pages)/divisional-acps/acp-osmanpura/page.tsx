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

// Real data for ACP Osmanpura Division
const ACP_OSMANPURA_DATA: ACPOfficer = {
	_id: "acp-osmanpura-1",
	name: "Shri. Ranjit Patil",
	name_in_marathi: "श्री. रंजित पाटील",
	photo: "",
	designation: "Assistant Commissioner of Police - Osmanpura Division",
	designation_in_marathi: "सहाय्यक पोलीस आयुक्त - उस्मानपुरा विभाग",
	phone: "9226514011",
	email: "acposmanpura.abad@mahapolice.gov.in",
	mobile: "9226514011",
	location: "Dargah Road, Osmanpura, Aurangabad-Maharashtra - 431005",
	location_in_marathi: "दरगाह रोड, उस्मानपुरा, औरंगाबाद-महाराष्ट्र - 431005",
};

const BRANCHES: Branch[] = [
	{
		name: "Osmanpura Police Station",
		name_in_marathi: "उस्मानपुरा पोलीस स्टेशन",
		description: "Main police station for Osmanpura area",
		description_in_marathi: "उस्मानपुरा क्षेत्रासाठी मुख्य पोलीस स्टेशन",
	},
	{
		name: "Community Policing",
		name_in_marathi: "समुदाय पोलीसिंग",
		description: "Community engagement and neighborhood watch",
		description_in_marathi: "समुदाय सहभाग आणि शेजारी निरीक्षण",
	},
	{
		name: "Women Safety Cell",
		name_in_marathi: "महिला सुरक्षा सेल",
		description: "Women safety and gender-based crime prevention",
		description_in_marathi: "महिला सुरक्षा आणि लिंग-आधारित गुन्हा प्रतिबंध",
	},
	{
		name: "Juvenile Justice",
		name_in_marathi: "बाल न्याय",
		description: "Juvenile crime prevention and rehabilitation",
		description_in_marathi: "बाल गुन्हा प्रतिबंध आणि पुनर्वसन",
	},
	{
		name: "Traffic Management",
		name_in_marathi: "वाहतूक व्यवस्थापन",
		description: "Traffic control and road safety for Osmanpura",
		description_in_marathi: "उस्मानपुरासाठी वाहतूक नियंत्रण आणि रस्ता सुरक्षा",
	},
];

const ACPOsmanpuraPage = () => {
	const { language } = useLanguage();
	const [officerData, setOfficerData] = useState<ACPOfficer>(ACP_OSMANPURA_DATA);
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
			<h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">{language === "mr" ? "एसीपी उस्मानपुरा विभाग" : "ACP Osmanpura Division"}</h1>

			<div className="mb-4 text-sm text-gray-600 dark:text-gray-300">{language === "mr" ? "मुख्यपृष्ठ > एसीपी उस्मानपुरा विभाग" : "Home > ACP Osmanpura Division"}</div>

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

export default ACPOsmanpuraPage;
