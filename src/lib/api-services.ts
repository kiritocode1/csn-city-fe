// API service functions for police corner and special units data
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

// Check if we're in development and backend might not be running
const isDevelopment = process.env.NODE_ENV === "development";
const shouldUseFallback = isDevelopment && !process.env.NEXT_PUBLIC_BACKEND_URL;
import consola from "consola";
// Helper function to get fallback data for special units
consola.box("APIBASEURL", API_BASE_URL);

const getSpecialUnitsFallback = (): SpecialUnit[] => [
	{
		_id: "dummy-1",
		name: "Crime Branch",
		name_in_marathi: "गुन्हेगारी शाखा",
		description: "Specialized unit for investigating serious crimes and economic offenses",
		description_in_marathi: "गंभीर गुन्हे आणि आर्थिक गुन्ह्यांची चौकशी करण्यासाठी विशेष युनिट",
		contact: "0240-247-1000",
		address: "Police Headquarters, Chhatrapati Sambhaji Nagar",
	},
	{
		_id: "dummy-2",
		name: "Cyber Crime Cell",
		name_in_marathi: "सायबर गुन्हा सेल",
		description: "Dedicated unit for cyber crime investigation and prevention",
		description_in_marathi: "सायबर गुन्हा तपासणी आणि प्रतिबंधासाठी समर्पित युनिट",
		contact: "0240-247-1001",
		address: "Cyber Crime Cell, Police Headquarters",
	},
];

// Helper function to create fetch with timeout
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 5000) => {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeout);

	try {
		const response = await fetch(url, {
			...options,
			signal: controller.signal,
		});
		clearTimeout(timeoutId);
		return response;
	} catch (error) {
		clearTimeout(timeoutId);
		// Don't throw the error, return a mock response instead
		console.warn(`Fetch failed for ${url}:`, error);
		return {
			ok: false,
			status: 0,
			json: async () => ({ error: "Network error" }),
		} as Response;
	}
};

export interface SpecialUnit {
	_id: string;
	name: string;
	name_in_marathi?: string;
	address?: string;
	photo?: string;
	contact?: string;
	description?: string;
	description_in_marathi?: string;
}

export interface CircularData {
	_id: string;
	title: string;
	title_in_marathi?: string;
	date: string;
	pdflink: string;
	createdAt: string;
}

export interface WelfareData {
	_id: string;
	title: string;
	title_in_marathi?: string;
	date: string;
	about: string;
	about_in_marathi?: string;
	photo: string;
	createdAt: string;
}

export interface MediaCoverageData {
	_id: string;
	title: string;
	title_in_marathi?: string;
	description: string;
	description_in_marathi?: string;
	link: string;
	createdAt: string;
}

export interface GoodWorkData {
	_id: string;
	title: string;
	title_in_marathi?: string;
	date: string;
	pdflink: string;
	createdAt: string;
}

// Special Units API
export const getSpecialUnits = async (): Promise<SpecialUnit[]> => {
	// Return fallback data immediately in development if no backend URL is set
	if (shouldUseFallback) {
		consola.box("Using fallback data for special units (development mode)");
		return getSpecialUnitsFallback();
	}

	try {
		const response = await fetchWithTimeout(`${API_BASE_URL}/api/get-units`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) throw new Error("Failed to fetch special units");
		const data = await response.json();
		consola.warn("Special Units API Response:", data);
		return data.units || [];
	} catch (error) {
		console.error("Error fetching special units:", error);
		// Return dummy data as fallback
		return getSpecialUnitsFallback();
	}
};

export const getSpecialUnitById = async (id: string): Promise<SpecialUnit | null> => {
	try {
		const response = await fetchWithTimeout(`${API_BASE_URL}/api/unit-detail?id=${id}`);
		if (!response.ok) throw new Error("Failed to fetch special unit details");
		const data = await response.json();
		return data.unit || null;
	} catch (error) {
		console.error("Error fetching special unit details:", error);
		return null;
	}
};

// Police Corner API - Circular/Notifications
export const getCircularData = async (): Promise<CircularData[]> => {
	// Return fallback data immediately in development if no backend URL is set
	if (shouldUseFallback) {
		consola.box("Using fallback data for circulars (development mode)");
		return [
			{
				_id: "dummy-circular-1",
				title: "Department Circular - Security Guidelines",
				title_in_marathi: "विभागीय परिपत्रक - सुरक्षा दिशानिर्देश",
				date: "2024-01-15",
				pdflink: "/sample-circular.pdf",
				createdAt: "2024-01-15T00:00:00.000Z",
			},
			{
				_id: "dummy-circular-2",
				title: "Updated SOP for Traffic Management",
				title_in_marathi: "वाहतूक व्यवस्थापनासाठी अद्यतनित SOP",
				date: "2024-01-10",
				pdflink: "/sample-traffic-sop.pdf",
				createdAt: "2024-01-10T00:00:00.000Z",
			},
		];
	}

	try {
		const response = await fetchWithTimeout(`${API_BASE_URL}/api/get-record-by-tag?tag=circular`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			console.warn("API response not ok, using fallback data");
			return [
				{
					_id: "dummy-circular-1",
					title: "Department Circular - Security Guidelines",
					title_in_marathi: "विभागीय परिपत्रक - सुरक्षा दिशानिर्देश",
					date: "2024-01-15",
					pdflink: "/sample-circular.pdf",
					createdAt: "2024-01-15T00:00:00.000Z",
				},
				{
					_id: "dummy-circular-2",
					title: "Updated SOP for Traffic Management",
					title_in_marathi: "वाहतूक व्यवस्थापनासाठी अद्यतनित SOP",
					date: "2024-01-10",
					pdflink: "/sample-traffic-sop.pdf",
					createdAt: "2024-01-10T00:00:00.000Z",
				},
			];
		}
		const data = await response.json();
		consola.warn("Circular Data API Response:", data);
		return data.records || [];
	} catch (error) {
		console.error("Error fetching circular data:", error);
		// Return dummy data as fallback
		return [
			{
				_id: "dummy-circular-1",
				title: "Department Circular - Security Guidelines",
				title_in_marathi: "विभागीय परिपत्रक - सुरक्षा दिशानिर्देश",
				date: "2024-01-15",
				pdflink: "/sample-circular.pdf",
				createdAt: "2024-01-15T00:00:00.000Z",
			},
			{
				_id: "dummy-circular-2",
				title: "Updated SOP for Traffic Management",
				title_in_marathi: "वाहतूक व्यवस्थापनासाठी अद्यतनित SOP",
				date: "2024-01-10",
				pdflink: "/sample-traffic-sop.pdf",
				createdAt: "2024-01-10T00:00:00.000Z",
			},
		];
	}
};

// Police Corner API - Welfare Activities
export const getWelfareData = async (): Promise<WelfareData[]> => {
	// Return fallback data immediately in development if no backend URL is set
	if (shouldUseFallback) {
		consola.box("Using fallback data for welfare initiatives (development mode)");
		return [
			{
				_id: "dummy-welfare-1",
				title: "Police Family Welfare Program",
				title_in_marathi: "पोलिस कुटुंब कल्याण कार्यक्रम",
				date: "2024-01-20",
				about: "Comprehensive welfare program for police families including healthcare, education, and financial support",
				about_in_marathi: "आरोग्यसेवा, शिक्षण आणि आर्थिक सहाय्यासह पोलिस कुटुंबांसाठी व्यापक कल्याण कार्यक्रम",
				photo: "/sample-welfare1.png",
				createdAt: "2024-01-20T00:00:00.000Z",
			},
			{
				_id: "dummy-welfare-2",
				title: "Community Outreach Initiative",
				title_in_marathi: "समुदाय आउटरीच पहल",
				date: "2024-01-18",
				about: "Regular community engagement programs to build trust and cooperation with citizens",
				about_in_marathi: "नागरिकांसोबत विश्वास आणि सहकार्य निर्माण करण्यासाठी नियमित समुदाय सहभाग कार्यक्रम",
				photo: "/sample-welfare2.png",
				createdAt: "2024-01-18T00:00:00.000Z",
			},
		];
	}

	try {
		const response = await fetchWithTimeout(`${API_BASE_URL}/api/get-all-wellfare`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			console.warn("API response not ok, using fallback data");
			return [
				{
					_id: "dummy-welfare-1",
					title: "Police Family Welfare Program",
					title_in_marathi: "पोलिस कुटुंब कल्याण कार्यक्रम",
					date: "2024-01-20",
					about: "Comprehensive welfare program for police families including healthcare, education, and financial support",
					about_in_marathi: "आरोग्यसेवा, शिक्षण आणि आर्थिक सहाय्यासह पोलिस कुटुंबांसाठी व्यापक कल्याण कार्यक्रम",
					photo: "/sample-welfare-1.jpg",
					createdAt: "2024-01-20T00:00:00.000Z",
				},
				{
					_id: "dummy-welfare-2",
					title: "Community Outreach Initiative",
					title_in_marathi: "समुदाय आउटरीच पहल",
					date: "2024-01-18",
					about: "Regular community engagement programs to build trust and cooperation with citizens",
					about_in_marathi: "नागरिकांसोबत विश्वास आणि सहकार्य निर्माण करण्यासाठी नियमित समुदाय सहभाग कार्यक्रम",
					photo: "/sample-welfare-2.jpg",
					createdAt: "2024-01-18T00:00:00.000Z",
				},
			];
		}
		const data = await response.json();
		consola.warn("Welfare Data API Response:", data);
		return data.wellfare || [];
	} catch (error) {
		console.error("Error fetching welfare data:", error);
		// Return dummy data as fallback
		return [
			{
				_id: "dummy-welfare-1",
				title: "Police Family Welfare Program",
				title_in_marathi: "पोलिस कुटुंब कल्याण कार्यक्रम",
				date: "2024-01-20",
				about: "Comprehensive welfare program for police families including healthcare, education, and financial support",
				about_in_marathi: "आरोग्यसेवा, शिक्षण आणि आर्थिक सहाय्यासह पोलिस कुटुंबांसाठी व्यापक कल्याण कार्यक्रम",
				photo: "/sample-welfare-1.jpg",
				createdAt: "2024-01-20T00:00:00.000Z",
			},
			{
				_id: "dummy-welfare-2",
				title: "Community Outreach Initiative",
				title_in_marathi: "समुदाय आउटरीच पहल",
				date: "2024-01-18",
				about: "Regular community engagement programs to build trust and cooperation with citizens",
				about_in_marathi: "नागरिकांसोबत विश्वास आणि सहकार्य निर्माण करण्यासाठी नियमित समुदाय सहभाग कार्यक्रम",
				photo: "/sample-welfare-2.jpg",
				createdAt: "2024-01-18T00:00:00.000Z",
			},
		];
	}
};

// Police Corner API - Media Coverage
export const getMediaCoverageData = async (): Promise<MediaCoverageData[]> => {
	// Return fallback data immediately in development if no backend URL is set
	if (shouldUseFallback) {
		consola.box("Using fallback data for media coverage (development mode)");
		return [
			{
				_id: "dummy-media-1",
				title: "Police Department's New Initiative Featured in Local News",
				title_in_marathi: "स्थानिक बातम्यांमध्ये पोलिस विभागाची नवीन पहल",
				description: "The new community policing initiative has been widely covered by local media outlets",
				description_in_marathi: "नवीन समुदाय पोलिसिंग पहल स्थानिक माध्यमांद्वारे व्यापक प्रचारित केली गेली",
				link: "https://example.com/news/police-initiative",
				createdAt: "2024-01-22T00:00:00.000Z",
			},
			{
				_id: "dummy-media-2",
				title: "Crime Prevention Campaign Success Story",
				title_in_marathi: "गुन्हा प्रतिबंध मोहिमेची यशोगाथा",
				description: "Recent crime prevention campaign shows significant reduction in local crime rates",
				description_in_marathi: "अलीकडील गुन्हा प्रतिबंध मोहिमेमुळे स्थानिक गुन्ह्यांच्या दरात लक्षणीय घट",
				link: "https://example.com/news/crime-prevention",
				createdAt: "2024-01-19T00:00:00.000Z",
			},
		];
	}

	try {
		const response = await fetchWithTimeout(`${API_BASE_URL}/api/get-record-by-tag?tag=media-coverage`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			console.warn("API response not ok, using fallback data");
			return [
				{
					_id: "dummy-media-1",
					title: "Police Department's New Initiative Featured in Local News",
					title_in_marathi: "स्थानिक बातम्यांमध्ये पोलिस विभागाची नवीन पहल",
					description: "The new community policing initiative has been widely covered by local media outlets",
					description_in_marathi: "नवीन समुदाय पोलिसिंग पहल स्थानिक माध्यमांद्वारे व्यापक प्रचारित केली गेली",
					link: "https://example.com/news/police-initiative",
					createdAt: "2024-01-22T00:00:00.000Z",
				},
				{
					_id: "dummy-media-2",
					title: "Crime Prevention Campaign Success Story",
					title_in_marathi: "गुन्हा प्रतिबंध मोहिमेची यशोगाथा",
					description: "Recent crime prevention campaign shows significant reduction in local crime rates",
					description_in_marathi: "अलीकडील गुन्हा प्रतिबंध मोहिमेमुळे स्थानिक गुन्ह्यांच्या दरात लक्षणीय घट",
					link: "https://example.com/news/crime-prevention",
					createdAt: "2024-01-19T00:00:00.000Z",
				},
			];
		}
		const data = await response.json();
		consola.warn("Media Coverage API Response:", data);
		return data.records || [];
	} catch (error) {
		console.error("Error fetching media coverage data:", error);
		// Return dummy data as fallback
		return [
			{
				_id: "dummy-media-1",
				title: "Police Department's New Initiative Featured in Local News",
				title_in_marathi: "स्थानिक बातम्यांमध्ये पोलिस विभागाची नवीन पहल",
				description: "The new community policing initiative has been widely covered by local media outlets",
				description_in_marathi: "नवीन समुदाय पोलिसिंग पहल स्थानिक माध्यमांद्वारे व्यापक प्रचारित केली गेली",
				link: "https://example.com/news/police-initiative",
				createdAt: "2024-01-22T00:00:00.000Z",
			},
			{
				_id: "dummy-media-2",
				title: "Crime Prevention Campaign Success Story",
				title_in_marathi: "गुन्हा प्रतिबंध मोहिमेची यशोगाथा",
				description: "Recent crime prevention campaign shows significant reduction in local crime rates",
				description_in_marathi: "अलीकडील गुन्हा प्रतिबंध मोहिमेमुळे स्थानिक गुन्ह्यांच्या दरात लक्षणीय घट",
				link: "https://example.com/news/crime-prevention",
				createdAt: "2024-01-19T00:00:00.000Z",
			},
		];
	}
};

// Police Corner API - Good Work
export const getGoodWorkData = async (): Promise<GoodWorkData[]> => {
	// Return fallback data immediately in development if no backend URL is set
	if (shouldUseFallback) {
		consola.box("Using fallback data for good work (development mode)");
		return [
			{
				_id: "dummy-goodwork-1",
				title: "Officer Saves Child from Drowning",
				title_in_marathi: "अधिकाऱ्याने मुलाला बुडण्यापासून वाचवले",
				date: "2024-01-25",
				pdflink: "/sample-goodwork-1.pdf",
				createdAt: "2024-01-25T00:00:00.000Z",
			},
			{
				_id: "dummy-goodwork-2",
				title: "Community Service Excellence Award",
				title_in_marathi: "समुदाय सेवा उत्कृष्टता पुरस्कार",
				date: "2024-01-23",
				pdflink: "/sample-goodwork-2.pdf",
				createdAt: "2024-01-23T00:00:00.000Z",
			},
		];
	}

	try {
		const response = await fetchWithTimeout(`${API_BASE_URL}/api/get-record-by-tag?tag=good-work`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			console.warn("API response not ok, using fallback data");
			return [
				{
					_id: "dummy-goodwork-1",
					title: "Officer Saves Child from Drowning",
					title_in_marathi: "अधिकाऱ्याने मुलाला बुडण्यापासून वाचवले",
					date: "2024-01-25",
					pdflink: "/sample-goodwork-1.pdf",
					createdAt: "2024-01-25T00:00:00.000Z",
				},
				{
					_id: "dummy-goodwork-2",
					title: "Community Service Excellence Award",
					title_in_marathi: "समुदाय सेवा उत्कृष्टता पुरस्कार",
					date: "2024-01-23",
					pdflink: "/sample-goodwork-2.pdf",
					createdAt: "2024-01-23T00:00:00.000Z",
				},
			];
		}
		const data = await response.json();
		consola.warn("Good Work API Response:", data);
		return data.records || [];
	} catch (error) {
		console.error("Error fetching good work data:", error);
		// Return dummy data as fallback
		return [
			{
				_id: "dummy-goodwork-1",
				title: "Officer Saves Child from Drowning",
				title_in_marathi: "अधिकाऱ्याने मुलाला बुडण्यापासून वाचवले",
				date: "2024-01-25",
				pdflink: "/sample-goodwork-1.pdf",
				createdAt: "2024-01-25T00:00:00.000Z",
			},
			{
				_id: "dummy-goodwork-2",
				title: "Community Service Excellence Award",
				title_in_marathi: "समुदाय सेवा उत्कृष्टता पुरस्कार",
				date: "2024-01-23",
				pdflink: "/sample-goodwork-2.pdf",
				createdAt: "2024-01-23T00:00:00.000Z",
			},
		];
	}
};

// Crime Review API
export const getCrimeReviewData = async (): Promise<CircularData[]> => {
	// Return fallback data immediately in development if no backend URL is set
	if (shouldUseFallback) {
		consola.box("Using fallback data for crime review (development mode)");
		return [
			{
				_id: "dummy-crime-1",
				title: "Monthly Crime Statistics Report - January 2024",
				title_in_marathi: "मासिक गुन्हा आकडेवारी अहवाल - जानेवारी 2024",
				date: "2024-01-31",
				pdflink: "/sample-crime-report-1.pdf",
				createdAt: "2024-01-31T00:00:00.000Z",
			},
			{
				_id: "dummy-crime-2",
				title: "Crime Prevention Analysis and Recommendations",
				title_in_marathi: "गुन्हा प्रतिबंध विश्लेषण आणि शिफारसी",
				date: "2024-01-28",
				pdflink: "/sample-crime-report-2.pdf",
				createdAt: "2024-01-28T00:00:00.000Z",
			},
		];
	}

	try {
		const response = await fetchWithTimeout(`${API_BASE_URL}/api/get-record-by-tag?tag=crime-review`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			console.warn("API response not ok, using fallback data");
			return [
				{
					_id: "dummy-crime-1",
					title: "Monthly Crime Statistics Report - January 2024",
					title_in_marathi: "मासिक गुन्हा आकडेवारी अहवाल - जानेवारी 2024",
					date: "2024-01-31",
					pdflink: "/sample-crime-report-1.pdf",
					createdAt: "2024-01-31T00:00:00.000Z",
				},
				{
					_id: "dummy-crime-2",
					title: "Crime Prevention Analysis and Recommendations",
					title_in_marathi: "गुन्हा प्रतिबंध विश्लेषण आणि शिफारसी",
					date: "2024-01-28",
					pdflink: "/sample-crime-report-2.pdf",
					createdAt: "2024-01-28T00:00:00.000Z",
				},
			];
		}
		const data = await response.json();
		consola.warn("Crime Review API Response:", data);
		return data.records || [];
	} catch (error) {
		console.error("Error fetching crime review data:", error);
		// Return dummy data as fallback
		return [
			{
				_id: "dummy-crime-1",
				title: "Monthly Crime Statistics Report - January 2024",
				title_in_marathi: "मासिक गुन्हा आकडेवारी अहवाल - जानेवारी 2024",
				date: "2024-01-31",
				pdflink: "/sample-crime-report-1.pdf",
				createdAt: "2024-01-31T00:00:00.000Z",
			},
			{
				_id: "dummy-crime-2",
				title: "Crime Prevention Analysis and Recommendations",
				title_in_marathi: "गुन्हा प्रतिबंध विश्लेषण आणि शिफारसी",
				date: "2024-01-28",
				pdflink: "/sample-crime-report-2.pdf",
				createdAt: "2024-01-28T00:00:00.000Z",
			},
		];
	}
};

// Utility function to format dates
export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-IN", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

// Utility function to get Marathi text with fallback
export const getMarathiText = (englishText: string, marathiText?: string): string => {
	return marathiText || englishText;
};

// ===== CITIZEN CORNER API SERVICES =====

export interface CitizenWallData {
	_id: string;
	title: string;
	title_in_marathi?: string;
	message: string;
	message_in_marathi?: string;
	author: string;
	date: string;
	createdAt: string;
}

export interface PressReleaseData {
	_id: string;
	title: string;
	title_in_marathi?: string;
	content: string;
	content_in_marathi?: string;
	date: string;
	createdAt: string;
}

export interface TenderData {
	_id: string;
	title: string;
	title_in_marathi?: string;
	description: string;
	description_in_marathi?: string;
	openingDate: string;
	closingDate: string;
	status: string;
	documentLink?: string;
	createdAt: string;
}

export interface RTIData {
	_id: string;
	requestNumber: string;
	subject: string;
	subject_in_marathi?: string;
	description: string;
	description_in_marathi?: string;
	status: string;
	submittedDate: string;
	responseDate?: string;
	createdAt: string;
}

export interface CyberAwarenessData {
	_id: string;
	title: string;
	title_in_marathi?: string;
	content: string;
	content_in_marathi?: string;
	category: string;
	image?: string;
	createdAt: string;
}

export interface PublicServiceRightsData {
	_id: string;
	title: string;
	title_in_marathi?: string;
	description: string;
	description_in_marathi?: string;
	rights: string[];
	rights_in_marathi?: string[];
	createdAt: string;
}

export interface UsefulWebsiteData {
	_id: string;
	title: string;
	title_in_marathi?: string;
	url: string;
	description: string;
	description_in_marathi?: string;
	category: string;
	createdAt: string;
}

export interface PublicServiceRightsData {
	_id: string;
	title: string;
	title_in_marathi?: string;
	description: string;
	description_in_marathi?: string;
	rights: string[];
	rights_in_marathi?: string[];
	createdAt: string;
}

export interface PoliceRecruitmentData {
	_id: string;
	title: string;
	title_in_marathi?: string;
	description: string;
	description_in_marathi?: string;
	requirements: string[];
	requirements_in_marathi?: string[];
	applicationProcess: string;
	applicationProcess_in_marathi?: string;
	deadline?: string;
	createdAt: string;
}

export interface PassportStatusData {
	_id: string;
	title: string;
	title_in_marathi?: string;
	description: string;
	description_in_marathi?: string;
	process: string;
	process_in_marathi?: string;
	requiredDocuments: string[];
	requiredDocuments_in_marathi?: string[];
	createdAt: string;
}

// Citizen Wall API
export const getCitizenWallData = async (): Promise<CitizenWallData[]> => {
	// Return fallback data immediately in development if no backend URL is set
	if (shouldUseFallback) {
		consola.box("Using fallback data for citizen wall (development mode)");
		return [
			{
				_id: "dummy-citizen-1",
				title: "Appreciation for Traffic Management",
				title_in_marathi: "वाहतूक व्यवस्थापनाबद्दल कौतुक",
				message: "Thank you for the excellent traffic management during the festival season. The police officers were very helpful and professional.",
				message_in_marathi: "उत्सवाच्या हंगामात उत्कृष्ट वाहतूक व्यवस्थापनाबद्दल धन्यवाद. पोलिस अधिकारी खूप मदतगार आणि व्यावसायिक होते.",
				author: "Rajesh Kumar",
				date: "2024-01-25",
				createdAt: "2024-01-25T00:00:00.000Z",
			},
			{
				_id: "dummy-citizen-2",
				title: "Quick Response to Emergency",
				title_in_marathi: "आणीबाणीला त्वरित प्रतिसाद",
				message: "The police response to our emergency call was very quick and efficient. We are grateful for their service.",
				message_in_marathi: "आमच्या आणीबाणी कॉलला पोलिसांचा प्रतिसाद खूप वेगवान आणि कार्यक्षम होता. आम्ही त्यांच्या सेवेबद्दल कृतज्ञ आहोत.",
				author: "Priya Sharma",
				date: "2024-01-22",
				createdAt: "2024-01-22T00:00:00.000Z",
			},
		];
	}

	try {
		const response = await fetchWithTimeout(`${API_BASE_URL}/api/records-by-tag?tag=citizen-wall`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			console.warn("API response not ok, using fallback data");
			return [
				{
					_id: "dummy-citizen-1",
					title: "Appreciation for Traffic Management",
					title_in_marathi: "वाहतूक व्यवस्थापनाबद्दल कौतुक",
					message: "Thank you for the excellent traffic management during the festival season. The police officers were very helpful and professional.",
					message_in_marathi: "उत्सवाच्या हंगामात उत्कृष्ट वाहतूक व्यवस्थापनाबद्दल धन्यवाद. पोलिस अधिकारी खूप मदतगार आणि व्यावसायिक होते.",
					author: "Rajesh Kumar",
					date: "2024-01-25",
					createdAt: "2024-01-25T00:00:00.000Z",
				},
				{
					_id: "dummy-citizen-2",
					title: "Quick Response to Emergency",
					title_in_marathi: "आणीबाणीला त्वरित प्रतिसाद",
					message: "The police response to our emergency call was very quick and efficient. We are grateful for their service.",
					message_in_marathi: "आमच्या आणीबाणी कॉलला पोलिसांचा प्रतिसाद खूप वेगवान आणि कार्यक्षम होता. आम्ही त्यांच्या सेवेबद्दल कृतज्ञ आहोत.",
					author: "Priya Sharma",
					date: "2024-01-22",
					createdAt: "2024-01-22T00:00:00.000Z",
				},
			];
		}
		const data = await response.json();
		consola.warn("Citizen Wall API Response:", data);
		return data.records || [];
	} catch (error) {
		console.error("Error fetching citizen wall data:", error);
		return [
			{
				_id: "dummy-citizen-1",
				title: "Appreciation for Traffic Management",
				title_in_marathi: "वाहतूक व्यवस्थापनाबद्दल कौतुक",
				message: "Thank you for the excellent traffic management during the festival season. The police officers were very helpful and professional.",
				message_in_marathi: "उत्सवाच्या हंगामात उत्कृष्ट वाहतूक व्यवस्थापनाबद्दल धन्यवाद. पोलिस अधिकारी खूप मदतगार आणि व्यावसायिक होते.",
				author: "Rajesh Kumar",
				date: "2024-01-25",
				createdAt: "2024-01-25T00:00:00.000Z",
			},
			{
				_id: "dummy-citizen-2",
				title: "Quick Response to Emergency",
				title_in_marathi: "आणीबाणीला त्वरित प्रतिसाद",
				message: "The police response to our emergency call was very quick and efficient. We are grateful for their service.",
				message_in_marathi: "आमच्या आणीबाणी कॉलला पोलिसांचा प्रतिसाद खूप वेगवान आणि कार्यक्षम होता. आम्ही त्यांच्या सेवेबद्दल कृतज्ञ आहोत.",
				author: "Priya Sharma",
				date: "2024-01-22",
				createdAt: "2024-01-22T00:00:00.000Z",
			},
		];
	}
};

// Press Release API
export const getPressReleaseData = async (): Promise<PressReleaseData[]> => {
	// Return fallback data immediately in development if no backend URL is set
	if (shouldUseFallback) {
		consola.box("Using fallback data for press releases (development mode)");
		return [
			{
				_id: "dummy-press-1",
				title: "New Cyber Crime Prevention Initiative",
				title_in_marathi: "नवीन सायबर गुन्हा प्रतिबंध पहल",
				content: "The Chhatrapati Sambhaji Nagar Police Department has launched a new initiative to prevent cyber crimes and educate citizens about online safety.",
				content_in_marathi: "छत्रपती संभाजी नगर पोलिस विभागाने सायबर गुन्हे रोखण्यासाठी आणि नागरिकांना ऑनलाइन सुरक्षिततेबद्दल शिक्षित करण्यासाठी नवीन पहल सुरू केली आहे.",
				date: "2024-01-28",
				createdAt: "2024-01-28T00:00:00.000Z",
			},
			{
				_id: "dummy-press-2",
				title: "Traffic Safety Campaign Results",
				title_in_marathi: "वाहतूक सुरक्षा मोहिमेचे निकाल",
				content: "The recent traffic safety campaign has shown significant improvement in road safety with 30% reduction in accidents.",
				content_in_marathi: "अलीकडील वाहतूक सुरक्षा मोहिमेमुळे रस्त्याच्या सुरक्षिततेत लक्षणीय सुधारणा झाली आहे आणि अपघातांमध्ये 30% घट झाली आहे.",
				date: "2024-01-25",
				createdAt: "2024-01-25T00:00:00.000Z",
			},
		];
	}

	try {
		const response = await fetchWithTimeout(`${API_BASE_URL}/api/records-by-tag?tag=press-release`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			console.warn("API response not ok, using fallback data");
			return [
				{
					_id: "dummy-press-1",
					title: "New Cyber Crime Prevention Initiative",
					title_in_marathi: "नवीन सायबर गुन्हा प्रतिबंध पहल",
					content: "The Chhatrapati Sambhaji Nagar Police Department has launched a new initiative to prevent cyber crimes and educate citizens about online safety.",
					content_in_marathi: "छत्रपती संभाजी नगर पोलिस विभागाने सायबर गुन्हे रोखण्यासाठी आणि नागरिकांना ऑनलाइन सुरक्षिततेबद्दल शिक्षित करण्यासाठी नवीन पहल सुरू केली आहे.",
					date: "2024-01-28",
					createdAt: "2024-01-28T00:00:00.000Z",
				},
				{
					_id: "dummy-press-2",
					title: "Traffic Safety Campaign Results",
					title_in_marathi: "वाहतूक सुरक्षा मोहिमेचे निकाल",
					content: "The recent traffic safety campaign has shown significant improvement in road safety with 30% reduction in accidents.",
					content_in_marathi: "अलीकडील वाहतूक सुरक्षा मोहिमेमुळे रस्त्याच्या सुरक्षिततेत लक्षणीय सुधारणा झाली आहे आणि अपघातांमध्ये 30% घट झाली आहे.",
					date: "2024-01-25",
					createdAt: "2024-01-25T00:00:00.000Z",
				},
			];
		}
		const data = await response.json();
		consola.warn("Press Release API Response:", data);
		return data.records || [];
	} catch (error) {
		console.error("Error fetching press release data:", error);
		return [
			{
				_id: "dummy-press-1",
				title: "New Cyber Crime Prevention Initiative",
				title_in_marathi: "नवीन सायबर गुन्हा प्रतिबंध पहल",
				content: "The Chhatrapati Sambhaji Nagar Police Department has launched a new initiative to prevent cyber crimes and educate citizens about online safety.",
				content_in_marathi: "छत्रपती संभाजी नगर पोलिस विभागाने सायबर गुन्हे रोखण्यासाठी आणि नागरिकांना ऑनलाइन सुरक्षिततेबद्दल शिक्षित करण्यासाठी नवीन पहल सुरू केली आहे.",
				date: "2024-01-28",
				createdAt: "2024-01-28T00:00:00.000Z",
			},
			{
				_id: "dummy-press-2",
				title: "Traffic Safety Campaign Results",
				title_in_marathi: "वाहतूक सुरक्षा मोहिमेचे निकाल",
				content: "The recent traffic safety campaign has shown significant improvement in road safety with 30% reduction in accidents.",
				content_in_marathi: "अलीकडील वाहतूक सुरक्षा मोहिमेमुळे रस्त्याच्या सुरक्षिततेत लक्षणीय सुधारणा झाली आहे आणि अपघातांमध्ये 30% घट झाली आहे.",
				date: "2024-01-25",
				createdAt: "2024-01-25T00:00:00.000Z",
			},
		];
	}
};

// Tenders API
export const getTenderData = async (): Promise<TenderData[]> => {
	// Return fallback data immediately in development if no backend URL is set
	if (shouldUseFallback) {
		consola.box("Using fallback data for tenders (development mode)");
		return [
			{
				_id: "dummy-tender-1",
				title: "Supply of Police Equipment",
				title_in_marathi: "पोलिस उपकरणांची पुरवठा",
				description: "Tender for supply of modern police equipment including communication devices and safety gear.",
				description_in_marathi: "संप्रेषण उपकरणे आणि सुरक्षा गियरसह आधुनिक पोलिस उपकरणांच्या पुरवठ्यासाठी निविदा.",
				openingDate: "2024-02-01",
				closingDate: "2024-02-28",
				status: "Active",
				documentLink: "/sample-tender-1.pdf",
				createdAt: "2024-01-20T00:00:00.000Z",
			},
			{
				_id: "dummy-tender-2",
				title: "Vehicle Maintenance Services",
				title_in_marathi: "वाहन देखभाल सेवा",
				description: "Annual maintenance contract for police vehicles including cars, motorcycles, and emergency vehicles.",
				description_in_marathi: "कार, मोटारसायकल आणि आणीबाणी वाहनांसह पोलिस वाहनांच्या वार्षिक देखभाल करार.",
				openingDate: "2024-02-15",
				closingDate: "2024-03-15",
				status: "Active",
				documentLink: "/sample-tender-2.pdf",
				createdAt: "2024-01-18T00:00:00.000Z",
			},
		];
	}

	try {
		const response = await fetchWithTimeout(`${API_BASE_URL}/api/records-by-tag?tag=tender`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			console.warn("API response not ok, using fallback data");
			return [
				{
					_id: "dummy-tender-1",
					title: "Supply of Police Equipment",
					title_in_marathi: "पोलिस उपकरणांची पुरवठा",
					description: "Tender for supply of modern police equipment including communication devices and safety gear.",
					description_in_marathi: "संप्रेषण उपकरणे आणि सुरक्षा गियरसह आधुनिक पोलिस उपकरणांच्या पुरवठ्यासाठी निविदा.",
					openingDate: "2024-02-01",
					closingDate: "2024-02-28",
					status: "Active",
					documentLink: "/sample-tender-1.pdf",
					createdAt: "2024-01-20T00:00:00.000Z",
				},
				{
					_id: "dummy-tender-2",
					title: "Vehicle Maintenance Services",
					title_in_marathi: "वाहन देखभाल सेवा",
					description: "Annual maintenance contract for police vehicles including cars, motorcycles, and emergency vehicles.",
					description_in_marathi: "कार, मोटारसायकल आणि आणीबाणी वाहनांसह पोलिस वाहनांच्या वार्षिक देखभाल करार.",
					openingDate: "2024-02-15",
					closingDate: "2024-03-15",
					status: "Active",
					documentLink: "/sample-tender-2.pdf",
					createdAt: "2024-01-18T00:00:00.000Z",
				},
			];
		}
		const data = await response.json();
		consola.warn("Tender API Response:", data);
		return data.records || [];
	} catch (error) {
		console.error("Error fetching tender data:", error);
		return [
			{
				_id: "dummy-tender-1",
				title: "Supply of Police Equipment",
				title_in_marathi: "पोलिस उपकरणांची पुरवठा",
				description: "Tender for supply of modern police equipment including communication devices and safety gear.",
				description_in_marathi: "संप्रेषण उपकरणे आणि सुरक्षा गियरसह आधुनिक पोलिस उपकरणांच्या पुरवठ्यासाठी निविदा.",
				openingDate: "2024-02-01",
				closingDate: "2024-02-28",
				status: "Active",
				documentLink: "/sample-tender-1.pdf",
				createdAt: "2024-01-20T00:00:00.000Z",
			},
			{
				_id: "dummy-tender-2",
				title: "Vehicle Maintenance Services",
				title_in_marathi: "वाहन देखभाल सेवा",
				description: "Annual maintenance contract for police vehicles including cars, motorcycles, and emergency vehicles.",
				description_in_marathi: "कार, मोटारसायकल आणि आणीबाणी वाहनांसह पोलिस वाहनांच्या वार्षिक देखभाल करार.",
				openingDate: "2024-02-15",
				closingDate: "2024-03-15",
				status: "Active",
				documentLink: "/sample-tender-2.pdf",
				createdAt: "2024-01-18T00:00:00.000Z",
			},
		];
	}
};

// RTI API
export const getRTIData = async (): Promise<RTIData[]> => {
	// Return fallback data immediately in development if no backend URL is set
	if (shouldUseFallback) {
		consola.box("Using fallback data for RTI (development mode)");
		return [
			{
				_id: "dummy-rti-1",
				requestNumber: "RTI/2024/001234",
				subject: "Police Station Wise Crime Statistics for 2023",
				subject_in_marathi: "2023 साठी पोलिस स्टेशनवार गुन्हा आकडेवारी",
				description: "Request for detailed crime statistics from all police stations in Chhatrapati Sambhaji Nagar for the year 2023.",
				description_in_marathi: "छत्रपती संभाजी नगरातील सर्व पोलिस स्टेशनांकडून 2023 साठी तपशीलवार गुन्हा आकडेवारीची मागणी.",
				status: "Under Review",
				submittedDate: "2024-01-15",
				responseDate: "2024-02-15",
				createdAt: "2024-01-15T00:00:00.000Z",
			},
			{
				_id: "dummy-rti-2",
				requestNumber: "RTI/2024/001235",
				subject: "Police Recruitment Process and Vacancies",
				subject_in_marathi: "पोलिस भरती प्रक्रिया आणि रिक्त पदे",
				description: "Information about current police recruitment process, eligibility criteria, and available vacancies.",
				description_in_marathi: "सध्याच्या पोलिस भरती प्रक्रिया, पात्रता निकष आणि उपलब्ध रिक्त पदांबद्दल माहिती.",
				status: "Response Ready",
				submittedDate: "2024-01-10",
				responseDate: "2024-02-10",
				createdAt: "2024-01-10T00:00:00.000Z",
			},
		];
	}

	try {
		const response = await fetchWithTimeout(`${API_BASE_URL}/api/records-by-tag?tag=rti`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			console.warn("API response not ok, using fallback data");
			return [
				{
					_id: "dummy-rti-1",
					requestNumber: "RTI/2024/001234",
					subject: "Police Station Wise Crime Statistics for 2023",
					subject_in_marathi: "2023 साठी पोलिस स्टेशनवार गुन्हा आकडेवारी",
					description: "Request for detailed crime statistics from all police stations in Chhatrapati Sambhaji Nagar for the year 2023.",
					description_in_marathi: "छत्रपती संभाजी नगरातील सर्व पोलिस स्टेशनांकडून 2023 साठी तपशीलवार गुन्हा आकडेवारीची मागणी.",
					status: "Under Review",
					submittedDate: "2024-01-15",
					responseDate: "2024-02-15",
					createdAt: "2024-01-15T00:00:00.000Z",
				},
				{
					_id: "dummy-rti-2",
					requestNumber: "RTI/2024/001235",
					subject: "Police Recruitment Process and Vacancies",
					subject_in_marathi: "पोलिस भरती प्रक्रिया आणि रिक्त पदे",
					description: "Information about current police recruitment process, eligibility criteria, and available vacancies.",
					description_in_marathi: "सध्याच्या पोलिस भरती प्रक्रिया, पात्रता निकष आणि उपलब्ध रिक्त पदांबद्दल माहिती.",
					status: "Response Ready",
					submittedDate: "2024-01-10",
					responseDate: "2024-02-10",
					createdAt: "2024-01-10T00:00:00.000Z",
				},
			];
		}
		const data = await response.json();
		consola.warn("RTI API Response:", data);
		return data.records || [];
	} catch (error) {
		console.error("Error fetching RTI data:", error);
		return [
			{
				_id: "dummy-rti-1",
				requestNumber: "RTI/2024/001234",
				subject: "Police Station Wise Crime Statistics for 2023",
				subject_in_marathi: "2023 साठी पोलिस स्टेशनवार गुन्हा आकडेवारी",
				description: "Request for detailed crime statistics from all police stations in Chhatrapati Sambhaji Nagar for the year 2023.",
				description_in_marathi: "छत्रपती संभाजी नगरातील सर्व पोलिस स्टेशनांकडून 2023 साठी तपशीलवार गुन्हा आकडेवारीची मागणी.",
				status: "Under Review",
				submittedDate: "2024-01-15",
				responseDate: "2024-02-15",
				createdAt: "2024-01-15T00:00:00.000Z",
			},
			{
				_id: "dummy-rti-2",
				requestNumber: "RTI/2024/001235",
				subject: "Police Recruitment Process and Vacancies",
				subject_in_marathi: "पोलिस भरती प्रक्रिया आणि रिक्त पदे",
				description: "Information about current police recruitment process, eligibility criteria, and available vacancies.",
				description_in_marathi: "सध्याच्या पोलिस भरती प्रक्रिया, पात्रता निकष आणि उपलब्ध रिक्त पदांबद्दल माहिती.",
				status: "Response Ready",
				submittedDate: "2024-01-10",
				responseDate: "2024-02-10",
				createdAt: "2024-01-10T00:00:00.000Z",
			},
		];
	}
};

// Cyber Awareness API
export const getCyberAwarenessData = async (): Promise<CyberAwarenessData[]> => {
	// Return fallback data immediately in development if no backend URL is set
	if (shouldUseFallback) {
		consola.box("Using fallback data for cyber awareness (development mode)");
		return [
			{
				_id: "dummy-cyber-1",
				title: "Protect Yourself from Online Scams",
				title_in_marathi: "ऑनलाइन घोटाळ्यांपासून स्वतःचे रक्षण करा",
				content: "Learn how to identify and avoid common online scams including phishing emails, fake websites, and fraudulent calls.",
				content_in_marathi: "फिशिंग ईमेल, नकली वेबसाइट्स आणि फसव्या कॉल्ससह सामान्य ऑनलाइन घोटाळे ओळखणे आणि टाळणे कसे शिका.",
				category: "Online Safety",
				image: "/sample-cyber-1.jpg",
				createdAt: "2024-01-25T00:00:00.000Z",
			},
			{
				_id: "dummy-cyber-2",
				title: "Strong Password Guidelines",
				title_in_marathi: "मजबूत पासवर्ड दिशानिर्देश",
				content: "Create strong passwords and use two-factor authentication to protect your online accounts from unauthorized access.",
				content_in_marathi: "मजबूत पासवर्ड तयार करा आणि आपल्या ऑनलाइन खात्यांना अनधिकृत प्रवेशापासून संरक्षित करण्यासाठी दोन-फॅक्टर प्रमाणीकरण वापरा.",
				category: "Password Security",
				image: "/sample-cyber-2.jpg",
				createdAt: "2024-01-22T00:00:00.000Z",
			},
		];
	}

	try {
		const response = await fetchWithTimeout(`${API_BASE_URL}/api/records-by-tag?tag=cyber-awareness`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			console.warn("API response not ok, using fallback data");
			return [
				{
					_id: "dummy-cyber-1",
					title: "Protect Yourself from Online Scams",
					title_in_marathi: "ऑनलाइन घोटाळ्यांपासून स्वतःचे रक्षण करा",
					content: "Learn how to identify and avoid common online scams including phishing emails, fake websites, and fraudulent calls.",
					content_in_marathi: "फिशिंग ईमेल, नकली वेबसाइट्स आणि फसव्या कॉल्ससह सामान्य ऑनलाइन घोटाळे ओळखणे आणि टाळणे कसे शिका.",
					category: "Online Safety",
					image: "/sample-cyber-1.jpg",
					createdAt: "2024-01-25T00:00:00.000Z",
				},
				{
					_id: "dummy-cyber-2",
					title: "Strong Password Guidelines",
					title_in_marathi: "मजबूत पासवर्ड दिशानिर्देश",
					content: "Create strong passwords and use two-factor authentication to protect your online accounts from unauthorized access.",
					content_in_marathi: "मजबूत पासवर्ड तयार करा आणि आपल्या ऑनलाइन खात्यांना अनधिकृत प्रवेशापासून संरक्षित करण्यासाठी दोन-फॅक्टर प्रमाणीकरण वापरा.",
					category: "Password Security",
					image: "/sample-cyber-2.jpg",
					createdAt: "2024-01-22T00:00:00.000Z",
				},
			];
		}
		const data = await response.json();
		consola.warn("Cyber Awareness API Response:", data);
		return data.records || [];
	} catch (error) {
		console.error("Error fetching cyber awareness data:", error);
		return [
			{
				_id: "dummy-cyber-1",
				title: "Protect Yourself from Online Scams",
				title_in_marathi: "ऑनलाइन घोटाळ्यांपासून स्वतःचे रक्षण करा",
				content: "Learn how to identify and avoid common online scams including phishing emails, fake websites, and fraudulent calls.",
				content_in_marathi: "फिशिंग ईमेल, नकली वेबसाइट्स आणि फसव्या कॉल्ससह सामान्य ऑनलाइन घोटाळे ओळखणे आणि टाळणे कसे शिका.",
				category: "Online Safety",
				image: "/sample-cyber-1.jpg",
				createdAt: "2024-01-25T00:00:00.000Z",
			},
			{
				_id: "dummy-cyber-2",
				title: "Strong Password Guidelines",
				title_in_marathi: "मजबूत पासवर्ड दिशानिर्देश",
				content: "Create strong passwords and use two-factor authentication to protect your online accounts from unauthorized access.",
				content_in_marathi: "मजबूत पासवर्ड तयार करा आणि आपल्या ऑनलाइन खात्यांना अनधिकृत प्रवेशापासून संरक्षित करण्यासाठी दोन-फॅक्टर प्रमाणीकरण वापरा.",
				category: "Password Security",
				image: "/sample-cyber-2.jpg",
				createdAt: "2024-01-22T00:00:00.000Z",
			},
		];
	}
};

// Useful Websites API
export const getUsefulWebsiteData = async (): Promise<UsefulWebsiteData[]> => {
	// Return fallback data immediately in development if no backend URL is set
	if (shouldUseFallback) {
		consola.box("Using fallback data for useful websites (development mode)");
		return [
			{
				_id: "dummy-website-1",
				title: "Maharashtra Police Official Website",
				title_in_marathi: "महाराष्ट्र पोलिस अधिकृत वेबसाइट",
				url: "https://mahapolice.gov.in",
				description: "Official website of Maharashtra Police Department with latest updates and services.",
				description_in_marathi: "महाराष्ट्र पोलिस विभागाची अधिकृत वेबसाइट नवीनतम अद्यतने आणि सेवांसह.",
				category: "Government",
				createdAt: "2024-01-20T00:00:00.000Z",
			},
			{
				_id: "dummy-website-2",
				title: "Online FIR Registration",
				title_in_marathi: "ऑनलाइन FIR नोंदणी",
				url: "https://mahapolice.gov.in/fir",
				description: "Register FIR online for various types of crimes and incidents.",
				description_in_marathi: "विविध प्रकारच्या गुन्हे आणि घटनांसाठी ऑनलाइन FIR नोंदणी करा.",
				category: "Services",
				createdAt: "2024-01-18T00:00:00.000Z",
			},
		];
	}

	try {
		const response = await fetchWithTimeout(`${API_BASE_URL}/api/get-website`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			console.warn("API response not ok, using fallback data");
			return [
				{
					_id: "dummy-website-1",
					title: "Maharashtra Police Official Website",
					title_in_marathi: "महाराष्ट्र पोलिस अधिकृत वेबसाइट",
					url: "https://mahapolice.gov.in",
					description: "Official website of Maharashtra Police Department with latest updates and services.",
					description_in_marathi: "महाराष्ट्र पोलिस विभागाची अधिकृत वेबसाइट नवीनतम अद्यतने आणि सेवांसह.",
					category: "Government",
					createdAt: "2024-01-20T00:00:00.000Z",
				},
				{
					_id: "dummy-website-2",
					title: "Online FIR Registration",
					title_in_marathi: "ऑनलाइन FIR नोंदणी",
					url: "https://mahapolice.gov.in/fir",
					description: "Register FIR online for various types of crimes and incidents.",
					description_in_marathi: "विविध प्रकारच्या गुन्हे आणि घटनांसाठी ऑनलाइन FIR नोंदणी करा.",
					category: "Services",
					createdAt: "2024-01-18T00:00:00.000Z",
				},
			];
		}
		const data = await response.json();
		consola.warn("Useful Website API Response:", data);
		return data.sites || [];
	} catch (error) {
		console.error("Error fetching useful website data:", error);
		return [
			{
				_id: "dummy-website-1",
				title: "Maharashtra Police Official Website",
				title_in_marathi: "महाराष्ट्र पोलिस अधिकृत वेबसाइट",
				url: "https://mahapolice.gov.in",
				description: "Official website of Maharashtra Police Department with latest updates and services.",
				description_in_marathi: "महाराष्ट्र पोलिस विभागाची अधिकृत वेबसाइट नवीनतम अद्यतने आणि सेवांसह.",
				category: "Government",
				createdAt: "2024-01-20T00:00:00.000Z",
			},
			{
				_id: "dummy-website-2",
				title: "Online FIR Registration",
				title_in_marathi: "ऑनलाइन FIR नोंदणी",
				url: "https://mahapolice.gov.in/fir",
				description: "Register FIR online for various types of crimes and incidents.",
				description_in_marathi: "विविध प्रकारच्या गुन्हे आणि घटनांसाठी ऑनलाइन FIR नोंदणी करा.",
				category: "Services",
				createdAt: "2024-01-18T00:00:00.000Z",
			},
		];
	}
};

// Public Service Rights API
export const getPublicServiceRightsData = async (): Promise<PublicServiceRightsData[]> => {
	// Return fallback data immediately in development if no backend URL is set
	if (shouldUseFallback) {
		consola.box("Using fallback data for public service rights (development mode)");
		return [
			{
				_id: "dummy-rights-1",
				title: "Right to Information (RTI)",
				title_in_marathi: "माहितीचा अधिकार (RTI)",
				description: "Citizens have the right to access information from public authorities under the Right to Information Act.",
				description_in_marathi: "नागरिकांना माहितीचा अधिकार कायद्याअंतर्गत सार्वजनिक प्राधिकरणांकडून माहिती मिळविण्याचा अधिकार आहे.",
				rights: ["Access to government records", "Request information about policies", "Get copies of documents", "Appeal against denial of information"],
				rights_in_marathi: ["सरकारी रेकॉर्ड्समध्ये प्रवेश", "धोरणांबद्दल माहिती मागणे", "दस्तऐवजांच्या प्रती मिळविणे", "माहिती नाकारल्यावर अपील करणे"],
				createdAt: "2024-01-20T00:00:00.000Z",
			},
		];
	}

	try {
		const response = await fetchWithTimeout(`${API_BASE_URL}/api/records-by-tag?tag=public-service-rights`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			console.warn("API response not ok, using fallback data");
			return [
				{
					_id: "dummy-rights-1",
					title: "Right to Information (RTI)",
					title_in_marathi: "माहितीचा अधिकार (RTI)",
					description: "Citizens have the right to access information from public authorities under the Right to Information Act.",
					description_in_marathi: "नागरिकांना माहितीचा अधिकार कायद्याअंतर्गत सार्वजनिक प्राधिकरणांकडून माहिती मिळविण्याचा अधिकार आहे.",
					rights: ["Access to government records", "Request information about policies", "Get copies of documents", "Appeal against denial of information"],
					rights_in_marathi: ["सरकारी रेकॉर्ड्समध्ये प्रवेश", "धोरणांबद्दल माहिती मागणे", "दस्तऐवजांच्या प्रती मिळविणे", "माहिती नाकारल्यावर अपील करणे"],
					createdAt: "2024-01-20T00:00:00.000Z",
				},
			];
		}
		const data = await response.json();
		consola.warn("Public Service Rights API Response:", data);
		return data.records || [];
	} catch (error) {
		console.error("Error fetching public service rights data:", error);
		return [
			{
				_id: "dummy-rights-1",
				title: "Right to Information (RTI)",
				title_in_marathi: "माहितीचा अधिकार (RTI)",
				description: "Citizens have the right to access information from public authorities under the Right to Information Act.",
				description_in_marathi: "नागरिकांना माहितीचा अधिकार कायद्याअंतर्गत सार्वजनिक प्राधिकरणांकडून माहिती मिळविण्याचा अधिकार आहे.",
				rights: ["Access to government records", "Request information about policies", "Get copies of documents", "Appeal against denial of information"],
				rights_in_marathi: ["सरकारी रेकॉर्ड्समध्ये प्रवेश", "धोरणांबद्दल माहिती मागणे", "दस्तऐवजांच्या प्रती मिळविणे", "माहिती नाकारल्यावर अपील करणे"],
				createdAt: "2024-01-20T00:00:00.000Z",
			},
		];
	}
};

// Police Recruitment API
export const getPoliceRecruitmentData = async (): Promise<PoliceRecruitmentData[]> => {
	// Return fallback data immediately in development if no backend URL is set
	if (shouldUseFallback) {
		consola.box("Using fallback data for police recruitment (development mode)");
		return [
			{
				_id: "dummy-recruitment-1",
				title: "Constable Recruitment 2024",
				title_in_marathi: "कॉन्स्टेबल भरती 2024",
				description: "Maharashtra Police Department is conducting recruitment for constable positions.",
				description_in_marathi: "महाराष्ट्र पोलिस विभाग कॉन्स्टेबल पदांसाठी भरती करत आहे.",
				requirements: ["Age: 18-28 years", "Education: 10th pass", "Physical fitness test", "Written examination"],
				requirements_in_marathi: ["वय: 18-28 वर्षे", "शिक्षण: 10वी उत्तीर्ण", "शारीरिक फिटनेस चाचणी", "लिखित परीक्षा"],
				applicationProcess: "Online application through official website",
				applicationProcess_in_marathi: "अधिकृत वेबसाइटद्वारे ऑनलाइन अर्ज",
				deadline: "2024-03-31",
				createdAt: "2024-01-20T00:00:00.000Z",
			},
		];
	}

	try {
		const response = await fetchWithTimeout(`${API_BASE_URL}/api/records-by-tag?tag=police-recruitment`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			console.warn("API response not ok, using fallback data");
			return [
				{
					_id: "dummy-recruitment-1",
					title: "Constable Recruitment 2024",
					title_in_marathi: "कॉन्स्टेबल भरती 2024",
					description: "Maharashtra Police Department is conducting recruitment for constable positions.",
					description_in_marathi: "महाराष्ट्र पोलिस विभाग कॉन्स्टेबल पदांसाठी भरती करत आहे.",
					requirements: ["Age: 18-28 years", "Education: 10th pass", "Physical fitness test", "Written examination"],
					requirements_in_marathi: ["वय: 18-28 वर्षे", "शिक्षण: 10वी उत्तीर्ण", "शारीरिक फिटनेस चाचणी", "लिखित परीक्षा"],
					applicationProcess: "Online application through official website",
					applicationProcess_in_marathi: "अधिकृत वेबसाइटद्वारे ऑनलाइन अर्ज",
					deadline: "2024-03-31",
					createdAt: "2024-01-20T00:00:00.000Z",
				},
			];
		}
		const data = await response.json();
		consola.warn("Police Recruitment API Response:", data);
		return data.records || [];
	} catch (error) {
		console.error("Error fetching police recruitment data:", error);
		return [
			{
				_id: "dummy-recruitment-1",
				title: "Constable Recruitment 2024",
				title_in_marathi: "कॉन्स्टेबल भरती 2024",
				description: "Maharashtra Police Department is conducting recruitment for constable positions.",
				description_in_marathi: "महाराष्ट्र पोलिस विभाग कॉन्स्टेबल पदांसाठी भरती करत आहे.",
				requirements: ["Age: 18-28 years", "Education: 10th pass", "Physical fitness test", "Written examination"],
				requirements_in_marathi: ["वय: 18-28 वर्षे", "शिक्षण: 10वी उत्तीर्ण", "शारीरिक फिटनेस चाचणी", "लिखित परीक्षा"],
				applicationProcess: "Online application through official website",
				applicationProcess_in_marathi: "अधिकृत वेबसाइटद्वारे ऑनलाइन अर्ज",
				deadline: "2024-03-31",
				createdAt: "2024-01-20T00:00:00.000Z",
			},
		];
	}
};

// Passport Status API
export const getPassportStatusData = async (): Promise<PassportStatusData[]> => {
	// Return fallback data immediately in development if no backend URL is set
	if (shouldUseFallback) {
		consola.box("Using fallback data for passport status (development mode)");
		return [
			{
				_id: "dummy-passport-1",
				title: "Passport Verification Process",
				title_in_marathi: "पासपोर्ट पडताळणी प्रक्रिया",
				description: "Information about passport verification process and status checking.",
				description_in_marathi: "पासपोर्ट पडताळणी प्रक्रिया आणि स्थिती तपासण्याबद्दल माहिती.",
				process: "Submit application → Verification → Police verification → Passport issuance",
				process_in_marathi: "अर्ज सबमिट करा → पडताळणी → पोलिस पडताळणी → पासपोर्ट जारी",
				requiredDocuments: ["Birth certificate", "Address proof", "Identity proof", "Passport size photographs"],
				requiredDocuments_in_marathi: ["जन्म प्रमाणपत्र", "पत्ता पुरावा", "ओळख पुरावा", "पासपोर्ट आकाराचे फोटो"],
				createdAt: "2024-01-20T00:00:00.000Z",
			},
		];
	}

	try {
		const response = await fetchWithTimeout(`${API_BASE_URL}/api/records-by-tag?tag=passport-status`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			console.warn("API response not ok, using fallback data");
			return [
				{
					_id: "dummy-passport-1",
					title: "Passport Verification Process",
					title_in_marathi: "पासपोर्ट पडताळणी प्रक्रिया",
					description: "Information about passport verification process and status checking.",
					description_in_marathi: "पासपोर्ट पडताळणी प्रक्रिया आणि स्थिती तपासण्याबद्दल माहिती.",
					process: "Submit application → Verification → Police verification → Passport issuance",
					process_in_marathi: "अर्ज सबमिट करा → पडताळणी → पोलिस पडताळणी → पासपोर्ट जारी",
					requiredDocuments: ["Birth certificate", "Address proof", "Identity proof", "Passport size photographs"],
					requiredDocuments_in_marathi: ["जन्म प्रमाणपत्र", "पत्ता पुरावा", "ओळख पुरावा", "पासपोर्ट आकाराचे फोटो"],
					createdAt: "2024-01-20T00:00:00.000Z",
				},
			];
		}
		const data = await response.json();
		consola.warn("Passport Status API Response:", data);
		return data.records || [];
	} catch (error) {
		console.error("Error fetching passport status data:", error);
		return [
			{
				_id: "dummy-passport-1",
				title: "Passport Verification Process",
				title_in_marathi: "पासपोर्ट पडताळणी प्रक्रिया",
				description: "Information about passport verification process and status checking.",
				description_in_marathi: "पासपोर्ट पडताळणी प्रक्रिया आणि स्थिती तपासण्याबद्दल माहिती.",
				process: "Submit application → Verification → Police verification → Passport issuance",
				process_in_marathi: "अर्ज सबमिट करा → पडताळणी → पोलिस पडताळणी → पासपोर्ट जारी",
				requiredDocuments: ["Birth certificate", "Address proof", "Identity proof", "Passport size photographs"],
				requiredDocuments_in_marathi: ["जन्म प्रमाणपत्र", "पत्ता पुरावा", "ओळख पुरावा", "पासपोर्ट आकाराचे फोटो"],
				createdAt: "2024-01-20T00:00:00.000Z",
			},
		];
	}
};
