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

// Real data for ACP SB (Special Branch)
const ACP_SB_DATA: ACPOfficer = {
	_id: "acp-sb-1",
	name: "Smt. Vasundhara Vitthalrao Borgaonkar",
	name_in_marathi: "स्मत. वसुंधरा विठ्ठलराव बोरगावकर",
	photo: "",
	designation: "Assistant Commissioner of Police - Special Branch",
	designation_in_marathi: "सहाय्यक पोलीस आयुक्त - विशेष शाखा",
	phone: "0240-2326519",
	email: "acpwisha.abad@mahapolice.gov.in",
	mobile: "0240-2326519",
	location: "CP Office, Mill Corner, Chh. Sambhajinagar",
	location_in_marathi: "सीपी कार्यालय, मिल कॉर्नर, छ. संभाजीनगर",
};

const BRANCHES: Branch[] = [
	{
		name: "Intelligence Unit",
		name_in_marathi: "बुद्धिमत्ता युनिट",
		description: "Intelligence gathering and analysis",
		description_in_marathi: "बुद्धिमत्ता गोळा करणे आणि विश्लेषण",
	},
	{
		name: "Counter Terrorism",
		name_in_marathi: "दहशतवाद विरोधी",
		description: "Counter-terrorism operations and prevention",
		description_in_marathi: "दहशतवाद विरोधी कार्यक्रम आणि प्रतिबंध",
	},
	{
		name: "VIP Security",
		name_in_marathi: "व्हीआयपी सुरक्षा",
		description: "VIP protection and security arrangements",
		description_in_marathi: "व्हीआयपी संरक्षण आणि सुरक्षा व्यवस्था",
	},
	{
		name: "Surveillance",
		name_in_marathi: "निरीक्षण",
		description: "Covert surveillance and monitoring operations",
		description_in_marathi: "गुप्त निरीक्षण आणि निरीक्षण कार्यक्रम",
	},
	{
		name: "Special Operations",
		name_in_marathi: "विशेष कार्यक्रम",
		description: "High-risk special operations and investigations",
		description_in_marathi: "उच्च-जोखीम विशेष कार्यक्रम आणि तपासणी",
	},
];

const ACPSBPage = () => {
	const { language } = useLanguage();
	const [officerData, setOfficerData] = useState<ACPOfficer>(ACP_SB_DATA);
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
			<h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">{language === "mr" ? "एसीपी विशेष शाखा" : "ACP Special Branch"}</h1>

			<div className="mb-4 text-sm text-gray-600 dark:text-gray-300">{language === "mr" ? "मुख्यपृष्ठ > एसीपी विशेष शाखा" : "Home > ACP Special Branch"}</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Officer Details */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
					<div className="flex items-start space-x-6">
						<div className="w-24 h-24 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center">
							<span className="text-sky-600 dark:text-sky-400 font-semibold text-xl">
								{(language === "mr" ? officerData.name_in_marathi : officerData.name)
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</span>
						</div>
						<div className="flex-1">
							<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{language === "mr" ? officerData.name_in_marathi : officerData.name}</h2>
							<p className="text-sky-600 dark:text-sky-400 font-medium mb-4">{language === "mr" ? officerData.designation_in_marathi : officerData.designation}</p>
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
					<h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 bg-sky-600 dark:bg-sky-700 text-white px-4 py-2 rounded-t-lg -mx-6 -mt-6 mb-4">{contactsLabel}</h3>
					<div className="space-y-3">
						<div className="flex items-center text-sm">
							<span className="text-gray-600 dark:text-gray-300 w-20">📱</span>
							<a
								href={`tel:${officerData.mobile}`}
								className="text-sky-600 dark:text-sky-400 hover:underline"
							>
								{officerData.mobile}
							</a>
						</div>
						<div className="flex items-center text-sm">
							<span className="text-gray-600 dark:text-gray-300 w-20">📞</span>
							<a
								href={`tel:${officerData.phone}`}
								className="text-sky-600 dark:text-sky-400 hover:underline"
							>
								{officerData.phone}
							</a>
						</div>
						<div className="flex items-center text-sm">
							<span className="text-gray-600 dark:text-gray-300 w-20">✉️</span>
							<a
								href={`mailto:${officerData.email}`}
								className="text-sky-600 dark:text-sky-400 hover:underline"
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
					<h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 bg-sky-600 dark:bg-sky-700 text-white px-4 py-2 rounded-t-lg -mx-6 -mt-6 mb-6">{branchesLabel}</h3>
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

export default ACPSBPage;
