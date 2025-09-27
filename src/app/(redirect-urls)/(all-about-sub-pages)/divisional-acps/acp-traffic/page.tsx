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

// Real data for ACP Traffic Division
const ACP_TRAFFIC_DATA: ACPOfficer = {
	_id: "acp-traffic-1",
	name: "Shri. Subhash Nanasaheb Bhujang",
	name_in_marathi: "श्री. सुभाष नानासाहेब भुजंग",
	photo: "",
	designation: "Assistant Commissioner of Police - Traffic Division",
	designation_in_marathi: "सहाय्यक पोलीस आयुक्त - वाहतूक विभाग",
	phone: "9226514012",
	email: "acptraff.abad@mahapolice.gov.in",
	mobile: "9226514012",
	location: "Jalna Road, Mondha Naka, Chh. Sambhajinagar",
	location_in_marathi: "जालना रोड, मोंढा नाका, छ. संभाजीनगर",
};

const BRANCHES: Branch[] = [
	{
		name: "Traffic Control Room",
		name_in_marathi: "वाहतूक नियंत्रण कक्ष",
		description: "24/7 traffic monitoring and control center",
		description_in_marathi: "24/7 वाहतूक निरीक्षण आणि नियंत्रण केंद्र",
	},
	{
		name: "Signal Management",
		name_in_marathi: "सिग्नल व्यवस्थापन",
		description: "Traffic signal control and optimization",
		description_in_marathi: "वाहतूक सिग्नल नियंत्रण आणि अनुकूलन",
	},
	{
		name: "Enforcement Unit",
		name_in_marathi: "अंमलबजावणी युनिट",
		description: "Traffic law enforcement and violation penalties",
		description_in_marathi: "वाहतूक कायदा अंमलबजावणी आणि उल्लंघन दंड",
	},
	{
		name: "Accident Investigation",
		name_in_marathi: "अपघात तपासणी",
		description: "Traffic accident investigation and analysis",
		description_in_marathi: "वाहतूक अपघात तपासणी आणि विश्लेषण",
	},
	{
		name: "Road Safety",
		name_in_marathi: "रस्ता सुरक्षा",
		description: "Road safety awareness and prevention programs",
		description_in_marathi: "रस्ता सुरक्षा जागरूकता आणि प्रतिबंध कार्यक्रम",
	},
];

const ACPTrafficPage = () => {
	const { language } = useLanguage();
	const [officerData, setOfficerData] = useState<ACPOfficer>(ACP_TRAFFIC_DATA);
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
			<h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">{language === "mr" ? "एसीपी वाहतूक विभाग" : "ACP Traffic Division"}</h1>

			<div className="mb-4 text-sm text-gray-600 dark:text-gray-300">{language === "mr" ? "मुख्यपृष्ठ > एसीपी वाहतूक विभाग" : "Home > ACP Traffic Division"}</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Officer Details */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
					<div className="flex items-start space-x-6">
						<div className="w-24 h-24 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
							<span className="text-pink-600 dark:text-pink-400 font-semibold text-xl">
								{(language === "mr" ? officerData.name_in_marathi : officerData.name)
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</span>
						</div>
						<div className="flex-1">
							<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{language === "mr" ? officerData.name_in_marathi : officerData.name}</h2>
							<p className="text-pink-600 dark:text-pink-400 font-medium mb-4">{language === "mr" ? officerData.designation_in_marathi : officerData.designation}</p>
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
					<h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 bg-pink-600 dark:bg-pink-700 text-white px-4 py-2 rounded-t-lg -mx-6 -mt-6 mb-4">{contactsLabel}</h3>
					<div className="space-y-3">
						<div className="flex items-center text-sm">
							<span className="text-gray-600 dark:text-gray-300 w-20">📱</span>
							<a
								href={`tel:${officerData.mobile}`}
								className="text-pink-600 dark:text-pink-400 hover:underline"
							>
								{officerData.mobile}
							</a>
						</div>
						<div className="flex items-center text-sm">
							<span className="text-gray-600 dark:text-gray-300 w-20">📞</span>
							<a
								href={`tel:${officerData.phone}`}
								className="text-pink-600 dark:text-pink-400 hover:underline"
							>
								{officerData.phone}
							</a>
						</div>
						<div className="flex items-center text-sm">
							<span className="text-gray-600 dark:text-gray-300 w-20">✉️</span>
							<a
								href={`mailto:${officerData.email}`}
								className="text-pink-600 dark:text-pink-400 hover:underline"
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
					<h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 bg-pink-600 dark:bg-pink-700 text-white px-4 py-2 rounded-t-lg -mx-6 -mt-6 mb-6">{branchesLabel}</h3>
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

export default ACPTrafficPage;
