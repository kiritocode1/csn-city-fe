"use client";

import { useLanguage } from "../../../../contexts/language-context";
import Link from "next/link";

interface ACPDivision {
	id: string;
	name: string;
	name_in_marathi: string;
	description: string;
	description_in_marathi: string;
	color: string;
	href: string;
}

// ACP Division data with real officer information
const ACP_DIVISIONS: ACPDivision[] = [
	{
		id: "acp-admin",
		name: "ACP Admin",
		name_in_marathi: "एसीपी प्रशासन",
		description: "Administrative headquarters and coordination center",
		description_in_marathi: "प्रशासकीय मुख्यालय आणि समन्वय केंद्र",
		color: "blue",
		href: "/divisional-acps/acp-admin",
	},
	{
		id: "acp-chavani",
		name: "ACP Chavani Division",
		name_in_marathi: "एसीपी छावनी विभाग",
		description: "Cantonment area policing and security",
		description_in_marathi: "छावनी क्षेत्र पोलीसिंग आणि सुरक्षा",
		color: "green",
		href: "/divisional-acps/acp-chavani",
	},
	{
		id: "acp-cidco",
		name: "ACP CIDCO Division",
		name_in_marathi: "एसीपी सिडको विभाग",
		description: "Industrial area security and commercial crime",
		description_in_marathi: "औद्योगिक क्षेत्र सुरक्षा आणि व्यावसायिक गुन्हे",
		color: "sky",
		href: "/divisional-acps/acp-cidco",
	},
	{
		id: "acp-city",
		name: "ACP City Division",
		name_in_marathi: "एसीपी शहर विभाग",
		description: "City area crime investigation and public safety",
		description_in_marathi: "शहर क्षेत्र गुन्हा तपासणी आणि सार्वजनिक सुरक्षा",
		color: "pink",
		href: "/divisional-acps/acp-city",
	},
	{
		id: "acp-crime",
		name: "ACP Crime Division",
		name_in_marathi: "एसीपी गुन्हा विभाग",
		description: "Specialized crime investigation and cyber crimes",
		description_in_marathi: "विशेष गुन्हा तपासणी आणि सायबर गुन्हे",
		color: "orange",
		href: "/divisional-acps/acp-crime",
	},
	{
		id: "acp-osmanpura",
		name: "ACP Osmanpura Division",
		name_in_marathi: "एसीपी उस्मानपुरा विभाग",
		description: "Community policing and women safety",
		description_in_marathi: "समुदाय पोलीसिंग आणि महिला सुरक्षा",
		color: "green",
		href: "/divisional-acps/acp-osmanpura",
	},
	{
		id: "acp-sb",
		name: "ACP Special Branch",
		name_in_marathi: "एसीपी विशेष शाखा",
		description: "Intelligence gathering and counter terrorism",
		description_in_marathi: "बुद्धिमत्ता गोळा करणे आणि दहशतवाद विरोधी",
		color: "sky",
		href: "/divisional-acps/acp-sb",
	},
	{
		id: "acp-traffic",
		name: "ACP Traffic Division",
		name_in_marathi: "एसीपी वाहतूक विभाग",
		description: "Traffic management and road safety enforcement",
		description_in_marathi: "वाहतूक व्यवस्थापन आणि रस्ता सुरक्षा अंमलबजावणी",
		color: "pink",
		href: "/divisional-acps/acp-traffic",
	},
];

const DivisionalSpsPage = () => {
	const { language, t } = useLanguage();

	const getColorClasses = (color: string) => {
		const colorMap = {
			blue: {
				bg: "bg-blue-100 dark:bg-blue-900",
				text: "text-blue-600 dark:text-blue-400",
				hover: "hover:bg-blue-50 dark:hover:bg-blue-800",
			},
			green: {
				bg: "bg-green-100 dark:bg-green-900",
				text: "text-green-600 dark:text-green-400",
				hover: "hover:bg-green-50 dark:hover:bg-green-800",
			},
			sky: {
				bg: "bg-sky-100 dark:bg-sky-900",
				text: "text-sky-600 dark:text-sky-400",
				hover: "hover:bg-sky-50 dark:hover:bg-sky-800",
			},
			pink: {
				bg: "bg-pink-100 dark:bg-pink-900",
				text: "text-pink-600 dark:text-pink-400",
				hover: "hover:bg-pink-50 dark:hover:bg-pink-800",
			},
			orange: {
				bg: "bg-orange-100 dark:bg-orange-900",
				text: "text-orange-600 dark:text-orange-400",
				hover: "hover:bg-orange-50 dark:hover:bg-orange-800",
			},
		};
		return colorMap[color as keyof typeof colorMap] || colorMap.blue;
	};

	return (
		<div className="container mx-auto px-4 py-8 min-h-screen w-full">
			<h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">{t("nav.about.divacp")}</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{ACP_DIVISIONS.map((division) => {
					const colors = getColorClasses(division.color);
					return (
						<Link
							key={division.id}
							href={division.href}
							className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 ${colors.hover} cursor-pointer`}
						>
							<div className="text-center mb-4">
								<div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
									<span className={`${colors.text} font-semibold text-lg`}>
										{division.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</span>
								</div>
								<h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{language === "mr" ? division.name_in_marathi : division.name}</h3>
								<p className={`${colors.text} font-medium text-sm`}>{language === "mr" ? division.description_in_marathi : division.description}</p>
							</div>
						</Link>
					);
				})}
			</div>

			<div className="mt-8 text-center">
				<p className="text-gray-600 dark:text-gray-300">
					{language === "mr" ? "एकूण विभागीय एसीपी:" : "Total Divisional ACPs:"} <span className="font-semibold text-blue-600 dark:text-blue-400">{ACP_DIVISIONS.length}</span>
				</p>
			</div>
		</div>
	);
};

export default DivisionalSpsPage;
