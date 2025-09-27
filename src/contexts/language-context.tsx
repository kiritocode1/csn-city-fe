"use client";

import * as React from "react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Language = "en" | "mr";

interface LanguageContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys
const translations = {
	en: {
		// Navigation
		"nav.home": "Home Page",
		"nav.home.simple": "Home",
		"nav.about": "About Us",
		"nav.special": "Special Units",
		"nav.citizen": "Citizen Corner",
		"nav.police": "Police Corner",

		// Home dropdown
		"nav.home.dashboard": "Dashboard",
		"nav.home.news": "Latest News",
		"nav.home.announcements": "Announcements",

		// About dropdown
		"nav.about.us": "About Us",
		"nav.about.senior": "Senior Officer Profile",
		"nav.about.organization": "Organizational Structure",
		"nav.about.jurisdiction": "Jurisdiction Map",
		"nav.about.initiatives": "Initiatives",
		"nav.about.gallery": "Photo Gallery",
		"nav.about.history": "History of Nashik Police",
		"nav.about.stations": "Police Station Incharge",
		"nav.about.contact": "Contact Us",
		"nav.about.feedback": "Feedback",
		"nav.about.report": "Report Crime",
		"nav.about.mission": "Our Mission",
		"nav.about.special": "Special Units",
		"nav.about.divacp": "Divisional ACPs",
		"nav.about.formercp": "Former CPs",
		"nav.about.medal": "Medal Winners",
		"nav.about.martyrs": "Martyrs",

		// Special Units dropdown
		"nav.special.crime": "Crime Branch",
		"nav.special.crime.unit1": "Crime Branch Unit 1",
		"nav.special.crime.unit2": "Crime Branch Unit 2",
		"nav.special.crime.pcb": "Central Crime Unit (PCB)",
		"nav.special.crime.antiGunda": "Anti-Gunda Squad",
		"nav.special.crime.antiNarcotic": "Anti-Narcotic Cell",
		"nav.special.crime.antiExtortion": "Anti-Extortion Cell",
		"nav.special.crime.technical": "Technical Analysis",
		"nav.special.crime.wing": "Technical Analysis Wing",
		"nav.special.crime.women": "Women Safety Cell",
		"nav.special.crime.economic": "Economic Offence Wing",
		"nav.special.control": "Control Room",
		"nav.special.headquarters": "Police Headquarters",
		"nav.special.bomb": "Bomb Detection and Disposal Squad",
		"nav.special.transport": "Motor Transport Organization",

		// Citizen Corner dropdown
		"nav.citizen.cyberTips": "Cyber Security Tips",
		"nav.citizen.cyberAwareness": "Cyber Awareness",
		"nav.citizen.recruitment": "Police Recruitment",
		"nav.citizen.pressRelease": "Press Release",
		"nav.citizen.rti": "Right to Information",
		"nav.citizen.publicService": "Maharashtra Public Service Rights Act",
		"nav.citizen.passport": "Passport Status",
		"nav.citizen.websites": "Useful Websites",
		"nav.citizen.wall": "Citizen Wall",
		"nav.citizen.tenders": "Tenders",

		// Police Corner dropdown
		"nav.police.circular": "Circular / Notification",
		"nav.police.welfare": "Welfare Initiatives",
		"nav.police.media": "Media Coverage",
		"nav.police.crimeReview": "Crime Review",
		"nav.police.goodWork": "Good Work",

		// Buttons
		"btn.emergency": "Emergency",
		"btn.contact": "Contact Us",
		"nav.emergency.call": "Call 112",

		// Portal Marquee
		"portals.title": "Citizen Grievance Redressal Portals of Central and State Governments",
		"portals.description": "Access to various police service portals",

		// Individual Portal Details
		"portals.maharashtra.title": "Citizen Portal Maharashtra Police",
		"portals.maharashtra.description": "Official portal for registering police-related complaints and obtaining updated information",
		"portals.cybercrime.title": "Cyber Crime Portal",
		"portals.cybercrime.description": "Portal for registering cyber crimes and obtaining guidance",
		"portals.grp.title": "Public Grievances",
		"portals.grp.description": "Easily submit and track public grievances online",
		"portals.pg.title": "P.G. Portal",
		"portals.pg.description": "Portal for public grievances with government services",
		"portals.aaple.title": "Aaple Sarkar",
		"portals.aaple.description": "Official portal for citizen services and grievances in Maharashtra",

		// Accessibility
		"accessibility.skip": "Skip to main content",
		"accessibility.screen": "Screen Reader Access",
		"accessibility.sitemap": "Sitemap",
		"accessibility.disclaimer": "Disclaimer",
		"accessibility.terms": "Terms & Conditions",
		"accessibility.privacy": "Privacy Policy",
		"accessibility.theme": "Toggle theme",
		"accessibility.font.increase": "Increase font size",
		"accessibility.font.reset": "Reset font size",
		"accessibility.font.decrease": "Decrease font size",
		"accessibility.menu.open": "Open Menu",
		"accessibility.menu.close": "Close Menu",

		// Department name
		"dept.name": "Chhatrapati Sambhajinagar City Police",
		"dept.type": "Official Website",
		"dept.home": "Chhatrapati Sambhajinagar City Police - Home",

		// External Link Modal
		"externalLink.title": "Leaving Our Website",
		"externalLink.message": "You are about to leave the Chhatrapati Sambhajinagar City Police website and visit an external site.",
		"externalLink.disclaimer.title": "Disclaimer",
		"externalLink.disclaimer.text": "Chhatrapati Sambhajinagar City Police is not responsible for the content, accuracy, or updates of external websites.",
		"externalLink.cancel": "Stay Here",
		"externalLink.continue": "Continue to External Site",

		// Portal
		"portal.welcome": "Welcome to Chhatrapati Sambhajinagar City Police",
		"portal.title": "One-Stop Portal For Police Services",
		"portal.description": "The Chhatrapati Sambhajinagar City Police is your go-to source for police services—simplifying access to various police services for citizens.",
		"portal.viewDetails": "View Details",

		// Portal Cards
		"portal.cards.news.title": "Latest News & Updates",
		"portal.cards.news.description": "Report cybercrimes and track complaints online.",
		"portal.cards.portal.title": "Portal Access",
		"portal.cards.portal.description": "Report fraud calls and review mobile connections with Sanchar Saathi.",
		"portal.cards.about.title": "About Us",
		"portal.cards.about.description": "Block lost or stolen mobiles via CEIR and track status.",
		"portal.cards.services.title": "Police Services",
		"portal.cards.services.description": "Report abusive social media content and impersonation to authorities.",

		// External portal link titles
		"portal.cards.link.cybercrime": "National Cyber Crime Reporting Portal",
		"portal.cards.link.ceir": "Block Lost / Stolen Mobile",
		"portal.cards.link.fraud": "Report Fraud Call",
		"portal.cards.link.social": "Social Media Complaints",

		// Portal Emblem
		"portal.emblem.national": "National",
		"portal.emblem.emblem": "Emblem",
		"portal.emblem.city": "Chhatrapati\nSambhajinagar City Police",

		// Leadership Team
		"leadership.title": "Our Leadership",
		"leadership.subtitle": "Meet our dedicated  leadership",

		// Picture Scroll Section
		"picture.title": "Chhatrapati Sambhajinagar City Police",
		"picture.subtitle": "A city of heritage, culture, and modern development",
		"picture.description": "Welcome to the heart of Maharashtra, where tradition meets progress and every citizen is valued.",

		// Map Section
		"map.title": "Find Us",
		"map.description": "Visit our headquarters in Chhatrapati Sambhajinagar. We're here to serve you with dedication and commitment.",
		"map.headquarters": "Police Headquarters",
		"map.location": "Chhatrapati Sambhajinagar City Police",
		"map.state": "Maharashtra, India",
		"map.emergency": "Emergency: 100",
		"map.helpline": "Helpline: 1090",
		"map.email": "police@csr.gov.in",
		"map.inquiries": "General Inquiries",
		"map.directions": "Get Directions",
		"map.call": "Call Now",

		// Footer
		"footer.title": "Chhatrapati Sambhajinagar City Police",
		"footer.subtitle": "Police Department Official Website issued by Govt. of Maharashtra",
		"footer.description":
			"Welcome to Chhatrapati Sambhajinagar City Police, where we are committed to ensuring the safety and security of our citizens. Our mission is to maintain law and order, prevent crime, and provide efficient police services to the community. We believe in transparency, accountability, and building trust with the public through professional policing. Our dedicated officers work around the clock to protect and serve the people of Maharashtra with integrity and excellence.",
		"footer.visits": "Visits",
		"footer.lastUpdated": "Last Updated:",
		"footer.copyright": "Made with",
		"footer.for": "for the people of",
		"footer.maharashtra": "Maharashtra 🇮🇳",
		"footer.police": "Chhatrapati Sambhajinagar City Police",

		// Bento Grid
		"bento.updates.title": "Latest Updates",
		"bento.updates.description": "Stay informed with the latest news and updates from Chhatrapati Sambhajinagar City Police",
		"bento.dgp.title": "DGP's Message",
		"bento.dgp.description": "A message from our Superintendent of Police",
		"bento.dgp.message":
			"The purpose of this website is to provide the platform to the citizens to voice their grievances & offer suggestions. I hope that this interactive relationship between Police & Public will help us in preventing crime & winning trust of People.",
		"bento.dgp.author": "Smt. Rashmi Shukla (DGP)",
		"bento.dgp.position": "Director General of Police, Chhatrapati Sambhajinagar City Police",
		"bento.events.title": "Recent Events",
		"bento.events.description": "Latest events and activities from our department",
		"bento.services.title": "Online Services and Forms",
		"bento.services.description": "Access various police services and forms online",
		"bento.info.title": "Popular Information",
		"bento.info.description": "Essential information and resources for citizens",
		"bento.news.title1": "सराईत घरफोड्या जेरबंद",
		"bento.news.content1": "04 घरफोडीचे गुन्हे उघड.... स्थानिक गुन्हे शाखा, छत्रपती संभाजीनगर ग्रामीण यांची कारवाई.",
		"bento.news.title2": "Traffic Safety Campaign",
		"bento.news.content2": "New traffic safety measures implemented across major highways in the district.",
		"bento.news.title3": "Community Outreach Program",
		"bento.news.content3": "Police department launches new community engagement initiatives for better public relations.",

		// City Tour Section
		"city.tour.title": "City Tour",
		"city.tour.subtitle": "Discover the beauty and heritage of Chhatrapati Sambhajinagar",
		"city.tour.forts.title": "Historic Forts",
		"city.tour.forts.content":
			"Explore the magnificent historic forts that stand as testaments to CSM's rich cultural heritage and architectural brilliance. These ancient structures tell stories of valor, culture, and the glorious past of Maharashtra.",
		"city.tour.cityscape.title": "Modern Cityscape",
		"city.tour.cityscape.content":
			"Discover the vibrant modern cityscape of CSM, showcasing contemporary architecture and urban development. Experience the perfect blend of tradition and modernity in this rapidly growing city.",
		"city.tour.landmarks.title": "Cultural Landmarks",
		"city.tour.landmarks.content":
			"Visit iconic cultural landmarks that define the identity and spirit of Chhatrapati Sambhajinagar city. These monuments preserve the rich Maratha heritage and cultural significance.",
		"city.tour.nature.title": "Natural Beauty",
		"city.tour.nature.content":
			"Experience the natural beauty and scenic landscapes that surround the historic city of CSM. From rolling hills to serene lakes, nature's bounty complements the city's urban charm.",

		// Important Links
		"links.title": "Important Links",
		"links.description": "Access to various government and police services",
		"links.dgp": "Director General of Police, Maharashtra State, Mumbai",
		"links.dgp.aria": "Director General of Police, Maharashtra State, Mumbai - PDF",
		"links.prisons": "Maharashtra Prison Department",
		"links.prisons.aria": "Maharashtra Prison Department - PDF",
		"links.excise": "Maharashtra State Excise",
		"links.excise.aria": "Maharashtra State Excise - PDF",
		"links.exciseOnline": "Maharashtra State Excise (Online Services)",
		"links.exciseOnline.aria": "Maharashtra State Excise (Online Services) - PDF",
		"links.aapleSarkar": "Aaple Sarkar",
		"links.aapleSarkar.aria": "Aaple Sarkar - PDF",
		"links.maharashtraPolice": "Maharashtra State Police",
		"links.maharashtraPolice.aria": "Maharashtra State Police - PDF",
		"links.mumbaiPolice": "Greater Mumbai Police",
		"links.mumbaiPolice.aria": "Greater Mumbai Police - PDF",
		"links.maritimeBoard": "Maharashtra Maritime Board",
		"links.maritimeBoard.aria": "Maharashtra Maritime Board - PDF",
		"links.mvd": "Motor Vehicles Department",
		"links.mvd.aria": "Motor Vehicles Department - PDF",
		"links.actsRules": "Government of Maharashtra (Acts/Rules)",
		"links.actsRules.aria": "Government of Maharashtra (Acts/Rules) - PDF",
		"links.governmentResolutions": "Government Resolutions",
		"links.governmentResolutions.aria": "Government Resolutions - PDF",
		"links.acb": "Anti-Corruption Bureau, Maharashtra State",
		"links.acb.aria": "ANTI-CORRUPTION BUREAU, MAHARASHTRA STATE - PDF",
		"links.svpnpa": "Sardar Vallabhbhai Patel National Police Academy",
		"links.svpnpa.aria": "Sardar Vallabhbhai Patel National Police Academy - PDF",
		"links.cbi": "Central Bureau of Investigation",
		"links.cbi.aria": "Central Bureau of Investigation - PDF",
		"links.cpr": "Centre For Police Research, (CPR) Pune",
		"links.cpr.aria": "Centre For Police Research, (CPR) Pune - PDF",
		"links.cid": "Criminal Investigation Department,Pune",
		"links.cid.aria": "Criminal Investigation Department,Pune - PDF",
		"links.securityForce": "Maharashtra Security Force",
		"links.securityForce.aria": "Maharashtra Security Force - PDF",
		"links.trafficPolice": "Mumbai Traffic Police",
		"links.trafficPolice.aria": "Mumbai Traffic Police - PDF",
		"links.bombayHighCourt": "Bombay High Court",
		"links.bombayHighCourt.aria": "Bombay High Court - PDF",
		"links.supremeCourt": "Supreme Court of India",
		"links.supremeCourt.aria": "Supreme Court of India - PDF",
		"links.njdg": "NJDG | National Judicial Data Grid",
		"links.njdg.aria": "NJDG | National Judicial Data Grid - PDF",
		"links.mediaCorner": "Indian Police in Service of the Nation",
		"links.mediaCorner.aria": "Indian Police in Service of the Nation - PDF",
		"links.ePrison": "ePrison",
		"links.ePrison.aria": "ePrison - PDF",
		"links.eProsecution": "e-Prosecution",
		"links.eProsecution.aria": "e-Prosecution - PDF",
	},
	mr: {
		// Navigation
		"nav.home": "मुख्यपृष्ठ",
		"nav.home.simple": "मुख्यपृष्ठ",
		"nav.about": "आमच्या विषयी",
		"nav.special": "विशेष पथके",
		"nav.citizen": "नागरिकांकरिता",
		"nav.police": "पोलीस विभाग",

		// Home dropdown
		"nav.home.dashboard": "डॅशबोर्ड",
		"nav.home.news": "ताज्या बातम्या",
		"nav.home.announcements": "घोषणा",

		// About dropdown
		"nav.about.us": "आमच्या विषयी",
		"nav.about.senior": "वरिष्ठ अधिकारी प्रोफाइल",
		"nav.about.organization": "संघटनात्मक रचना",
		"nav.about.jurisdiction": "अधिकार क्षेत्र नकाशा",
		"nav.about.initiatives": "उपक्रम",
		"nav.about.gallery": "छायाचित्र संग्रह",
		"nav.about.history": "नाशिक पोलीसांचा इतिहास",
		"nav.about.stations": "पोलीस स्टेशन प्रभारी",
		"nav.about.contact": "आमच्याशी संपर्क साधा",
		"nav.about.feedback": "अभिप्राय",
		"nav.about.mission": "आमची मिशन",
		"nav.about.special": "विशेष पथके",
		"nav.about.divacp": "विभागांचे अधिकारी",
		"nav.about.formercp": "पूर्व अधिकारी",
		"nav.about.medal": "मेडल विजेत्यां",
		"nav.about.martyrs": "मार्त्यर्स",

		// Special Units dropdown
		"nav.special.crime": "गुन्हे शाखा",
		"nav.special.crime.unit1": "गुन्हे शाखा विविध क्रमांक १",
		"nav.special.crime.unit2": "गुन्हे शाखा विविध क्रमांक २",
		"nav.special.crime.pcb": "मध्यवर्ती गुन्हे शाखा",
		"nav.special.crime.antiGunda": "गुंडाविरोधी पथक",
		"nav.special.crime.antiNarcotic": "अंमली पदार्थ विरोधी सेल",
		"nav.special.crime.antiExtortion": "खंडणी विरोधी पथक",
		"nav.special.crime.technical": "तांत्रिक विश्लेषण",
		"nav.special.crime.wing": "तांत्रिक विश्लेषण विंग",
		"nav.special.crime.women": "महिला सुरक्षा कक्ष",
		"nav.special.crime.economic": "आर्थिक गुन्हे शाखा",
		"nav.special.control": "नियंत्रण कक्ष",
		"nav.special.headquarters": "पोलीस मुख्यालय",
		"nav.special.bomb": "बाँब शोधक व नाशक पथक",
		"nav.special.transport": "मोटर वाहन विभाग",

		// Citizen Corner dropdown
		"nav.citizen.cyberTips": "सायबर सुरक्षा टिप्स",
		"nav.citizen.cyberAwareness": "सायबर जनजागृती",
		"nav.citizen.recruitment": "पोलीस भरती",
		"nav.citizen.pressRelease": "प्रेस प्रकाशन",
		"nav.citizen.rti": "माहितीचा अधिकार",
		"nav.citizen.publicService": "महाराष्ट्र लोकसेवा हक्क अधिनियम",
		"nav.citizen.passport": "पासपोर्ट स्थिती",
		"nav.citizen.websites": "उपयुक्त वेबसाइट",
		"nav.citizen.wall": "सिटीझन वॉल",
		"nav.citizen.tenders": "निविदा",

		// Police Corner dropdown
		"nav.police.circular": "परिपत्रक / अधिसूचना",
		"nav.police.welfare": "कल्याणकारी उपक्रम",
		"nav.police.media": "वृत्तांकन",
		"nav.police.crimeReview": "गुन्हे आढावा",
		"nav.police.goodWork": "उत्कृष्ट कामगिरी",

		// Buttons
		"btn.emergency": "आणीबाणी",
		"btn.contact": "संपर्क करा",
		"nav.emergency.call": "112 कॉल करा",

		// Portal Marquee
		"portals.title": "केंद्र व राज्य शासनाचे नागरिक तक्रार निवारण पोर्टल्स",
		"portals.description": "विविध पोलीस सेवा पोर्टल्सचा प्रवेश",

		// Individual Portal Details
		"portals.maharashtra.title": "महाराष्ट्र पोलीस",
		"portals.maharashtra.description": "पोलीस संबंधित तक्रारी नोंदविण्यासाठी आणि अद्ययावत माहिती मिळविण्यासाठी अधिकृत पोर्टल",
		"portals.cybercrime.title": "सायबर क्राइम पोर्टल",
		"portals.cybercrime.description": "सायबर क्राइम नोंदविण्यासाठी आणि मार्गदर्शन मिळविण्यासाठी पोर्टल",
		"portals.grp.title": "सार्वजनिक तक्रारी",
		"portals.grp.description": "सार्वजनिक तक्रारी ऑनलाइन सहज सादर करा आणि त्याचा मागोवा घ्या",
		"portals.pg.title": "सार्वजनिक तक्रारी",
		"portals.pg.description": "सार्वजनिक तक्रारी ऑनलाइन सहज सादर करा आणि त्याचा मागोवा घ्या",
		"portals.aaple.title": "आपले सरकार",
		"portals.aaple.description": "महाराष्ट्रातील नागरिक सेवा आणि तक्रारींसाठी अधिकृत पोर्टल",

		// Accessibility
		"accessibility.skip": "मुख्य सामग्रीवर जा",
		"accessibility.screen": "स्क्रीन रीडर प्रवेश",
		"accessibility.sitemap": "साइटमॅप",
		"accessibility.disclaimer": "अस्वीकरण",
		"accessibility.terms": "अटी व शर्ती",
		"accessibility.privacy": "गोपनीयता धोरण",
		"accessibility.theme": "थीम बदला",
		"accessibility.font.increase": "फॉन्ट आकार वाढवा",
		"accessibility.font.reset": "फॉन्ट आकार रीसेट करा",
		"accessibility.font.decrease": "फॉन्ट आकार कमी करा",
		"accessibility.menu.open": "मेनू उघडा",
		"accessibility.menu.close": "मेनू बंद करा",

		// Department name
		"dept.name": "छत्रपती संभाजीनगर शहर पोलीस",
		"dept.type": "अधिकृत वेबसाइट",
		"dept.home": "छत्रपती संभाजीनगर पोलिस विभाग - मुख्यपृष्ठ",

		// External Link Modal
		"externalLink.title": "आमच्या वेबसाइटवरून बाहेर जात आहात",
		"externalLink.message": "आपण छत्रपती संभाजीनगर पोलिस विभागाच्या वेबसाइटवरून बाहेर जाऊन बाह्य साइटला भेट देणार आहात.",
		"externalLink.disclaimer.title": "सूचना",
		"externalLink.disclaimer.text": "छत्रपती संभाजीनगर पोलिस विभाग बाह्य वेबसाइटच्या सामग्री, अचूकता किंवा अद्यतनांसाठी जबाबदार नाही.",
		"externalLink.cancel": "येथेच रहा",
		"externalLink.continue": "बाह्य साइटवर जा",

		// Portal
		"portal.welcome": "छत्रपती संभाजीनगर पोलिस विभागात आपले स्वागत आहे",
		"portal.title": "पोलिस सेवांसाठी वन-स्टॉप पोर्टल",
		"portal.description": "छत्रपती संभाजीनगर पोलिस विभाग हे नागरिकांसाठी विविध पोलिस सेवांचा प्रवेश सुलभ करणारा आपला विश्वसनीय स्रोत आहे.",
		"portal.viewDetails": "तपशील पहा",

		// Portal Cards
		"portal.cards.news.title": "ताज्या बातम्या आणि अपडेट्स",
		"portal.cards.news.description": "सायबर गुन्हे नोंदवा व तक्रारींची स्थिती पाहा.",
		"portal.cards.portal.title": "पोर्टल प्रवेश",
		"portal.cards.portal.description": "फसवे कॉल नोंदवा व मोबाइल कनेक्शन्स तपासा (Sanchar Saathi).",
		"portal.cards.about.title": "आमच्याबद्दल",
		"portal.cards.about.description": "CEIR द्वारे हरवलेला/चोरलेला मोबाइल ब्लॉक/अनब्लॉक करा.",
		"portal.cards.services.title": "पोलिस सेवा",
		"portal.cards.services.description": "अभद्र/भ्रामक सोशल कंटेंट व भेसळ तक्रारी नोंदवा.",

		// External portal link titles
		"portal.cards.link.cybercrime": "राष्ट्रीय सायबर गुन्हे रिपोर्टिंग पोर्टल",
		"portal.cards.link.ceir": "चोरिला गेलेला / हरवलेला मोबाइल ब्लॉक करा",
		"portal.cards.link.fraud": "फसवणूक (फ्रॉड) कॉलची तक्रार करा",
		"portal.cards.link.social": "सोशल मीडियाच्या तक्रारी नोंदवा",

		// Portal Emblem
		"portal.emblem.national": "राष्ट्रीय",
		"portal.emblem.emblem": "चिन्ह",
		"portal.emblem.city": "छत्रपती\nसंभाजीनगर शहर पोलीस",

		// Leadership Team
		"leadership.title": "आमचे नेतृत्व",
		"leadership.subtitle": "आमच्या समर्पित  नेतृत्वाशी भेटा",

		// Picture Scroll Section
		"picture.title": "छत्रपती संभाजीनगर",
		"picture.subtitle": "वारसा, संस्कृती आणि आधुनिक विकासाचे शहर",
		"picture.description": "महाराष्ट्राच्या हृदयस्थानी आपले स्वागत आहे, जिथे परंपरा आणि प्रगती एकत्र येतात आणि प्रत्येक नागरिकाला महत्त्व दिले जाते.",

		// Map Section
		"map.title": "आमच्याला शोधा",
		"map.description": "छत्रपती संभाजीनगरमध्ये आमच्या मुख्यालयाला भेट द्या. आम्ही समर्पण आणि प्रतिबद्धतेसह आपल्या सेवेत उपस्थित आहोत.",
		"map.headquarters": "पोलिस मुख्यालय",
		"map.location": "छत्रपती संभाजीनगर शहर पोलीस",
		"map.state": "महाराष्ट्र, भारत",
		"map.emergency": "आणीबाणी: 100",
		"map.helpline": "हेल्पलाइन: 1090",
		"map.email": "police@csr.gov.in",
		"map.inquiries": "सामान्य चौकशी",
		"map.directions": "दिशा मिळवा",
		"map.call": "आता कॉल करा",

		// Footer
		"footer.title": "छत्रपती संभाजीनगर शहर पोलीस",
		"footer.subtitle": "महाराष्ट्र सरकारच्या वतीने जारी केलेले पोलिस विभागाचे अधिकृत वेबसाइट",
		"footer.description":
			"छत्रपती संभाजीनगर ग्रामीण पोलिस विभागात आपले स्वागत आहे, जिथे आम्ही आमच्या नागरिकांच्या सुरक्षा आणि सुरक्षिततेची हमी देण्यासाठी प्रतिबद्ध आहोत. आमचे ध्येय कायदा आणि सुव्यवस्था राखणे, गुन्हे रोखणे आणि समुदायाला कार्यक्षम पोलिस सेवा पुरवणे हे आहे. आम्ही पारदर्शकता, जबाबदारी आणि व्यावसायिक पोलिसिंगद्वारे जनतेशी विश्वास निर्माण करण्यावर विश्वास ठेवतो. आमचे समर्पित अधिकारी महाराष्ट्रातील लोकांचे सचोटी आणि उत्कृष्टतेसह संरक्षण आणि सेवा करण्यासाठी चोवीस तास काम करतात.",
		"footer.visits": "भेटी",
		"footer.lastUpdated": "शेवटचे अद्यतन:",
		"footer.copyright": "बनवले",
		"footer.for": "लोकांसाठी",
		"footer.maharashtra": "महाराष्ट्र 🇮🇳",
		"footer.police": "छत्रपती संभाजीनगर शहर पोलीस",

		// Bento Grid
		"bento.updates.title": "नवीनतम अपडेट्स",
		"bento.updates.description": "छत्रपती संभाजीनगर शहर पोलीसच्या नवीनतम बातम्या आणि अपडेट्ससह सूचित रहा",
		"bento.dgp.title": "DGP चे संदेश",
		"bento.dgp.description": "आमच्या पोलिस अधीक्षकांचा संदेश",
		"bento.dgp.message":
			"या वेबसाइटचा उद्देश नागरिकांना त्यांच्या तक्रारी व्यक्त करण्यासाठी आणि सूचना देण्यासाठी मंच प्रदान करणे आहे. मला आशा आहे की पोलिस आणि जनता यांच्यातील हा परस्परसंबंध आम्हाला गुन्हे रोखण्यात आणि लोकांचा विश्वास जिंकण्यात मदत करेल.",
		"bento.dgp.author": "श्रीमती. रश्मी शुक्ला (DGP)",
		"bento.dgp.position": "पोलिस महासंचालक, छत्रपती संभाजीनगर शहर पोलीस",
		"bento.events.title": "अलीकडील कार्यक्रम",
		"bento.events.description": "आमच्या विभागातील नवीनतम कार्यक्रम आणि क्रियाकलाप",
		"bento.services.title": "ऑनलाइन सेवा आणि फॉर्म",
		"bento.services.description": "विविध पोलिस सेवा आणि फॉर्म ऑनलाइन प्रवेश करा",
		"bento.info.title": "लोकप्रिय माहिती",
		"bento.info.description": "नागरिकांसाठी आवश्यक माहिती आणि संसाधने",
		"bento.news.title1": "सराईत घरफोड्या जेरबंद",
		"bento.news.content1": "04 घरफोडीचे गुन्हे उघड.... स्थानिक गुन्हे शाखा, छत्रपती संभाजीनगर ग्रामीण यांची कारवाई.",
		"bento.news.title2": "वाहतूक सुरक्षा मोहीम",
		"bento.news.content2": "जिल्ह्यातील प्रमुख महामार्गांवर नवीन वाहतूक सुरक्षा उपाय लागू केले.",
		"bento.news.title3": "समुदाय आउटरीच कार्यक्रम",
		"bento.news.content3": "चांगल्या सार्वजनिक संबंधांसाठी पोलिस विभागाने नवीन समुदाय व्यस्तता पुढाकार सुरू केले.",

		// City Tour Section
		"city.tour.title": "शहर भ्रमण",
		"city.tour.subtitle": "छत्रपती संभाजीनगरच्या सौंदर्य आणि वारसाचा शोध घ्या",
		"city.tour.forts.title": "ऐतिहासिक किल्ले",
		"city.tour.forts.content":
			"CSM च्या समृद्ध सांस्कृतिक वारसा आणि वास्तुशिल्प प्रतिभेचे साक्षीदार असलेल्या भव्य ऐतिहासिक किल्ल्यांचा शोध घ्या. ही प्राचीन रचना वीरता, संस्कृती आणि महाराष्ट्राच्या गौरवशाली भूतकाळाच्या कथा सांगतात.",
		"city.tour.cityscape.title": "आधुनिक शहरी दृश्य",
		"city.tour.cityscape.content":
			"CSM च्या जीवंत आधुनिक शहरी दृश्याचा शोध घ्या, जे समकालीन वास्तुकला आणि शहरी विकास दाखवते. या वेगाने वाढत्या शहरात परंपरा आणि आधुनिकतेचे परिपूर्ण मिश्रण अनुभवा.",
		"city.tour.landmarks.title": "सांस्कृतिक स्थळे",
		"city.tour.landmarks.content": "छत्रपती संभाजीनगर शहराची ओळख आणि भावना परिभाषित करणाऱ्या प्रतिष्ठित सांस्कृतिक स्थळांची भेट द्या. ही स्मारके समृद्ध मराठा वारसा आणि सांस्कृतिक महत्त्व जपतात.",
		"city.tour.nature.title": "नैसर्गिक सौंदर्य",
		"city.tour.nature.content":
			"CSM च्या ऐतिहासिक शहराला वेढलेल्या नैसर्गिक सौंदर्य आणि नयनरम्य भूदृश्यांचा अनुभव घ्या. लहरी डोंगरांपासून ते शांत तळ्यांपर्यंत, निसर्गाची दानशीलता शहराच्या शहरी आकर्षणाला पूरक आहे.",

		// Important Links
		"links.title": "महत्त्वाचे दुवे",
		"links.description": "विविध सरकारी आणि पोलीस सेवांचा प्रवेश",
		"links.dgp": "महाराष्ट्र राज्य पोलीस महासंचालक, मुंबई",
		"links.dgp.aria": "महाराष्ट्र राज्य पोलीस महासंचालक, मुंबई - PDF",
		"links.prisons": "महाराष्ट्र तुरुंग विभाग",
		"links.prisons.aria": "महाराष्ट्र तुरुंग विभाग - PDF",
		"links.excise": "महाराष्ट्र राज्य अबकारी",
		"links.excise.aria": "महाराष्ट्र राज्य अबकारी - PDF",
		"links.exciseOnline": "महाराष्ट्र राज्य अबकारी (ऑनलाइन सेवा)",
		"links.exciseOnline.aria": "महाराष्ट्र राज्य अबकारी (ऑनलाइन सेवा) - PDF",
		"links.aapleSarkar": "आपले सरकार",
		"links.aapleSarkar.aria": "आपले सरकार - PDF",
		"links.maharashtraPolice": "महाराष्ट्र राज्य पोलीस",
		"links.maharashtraPolice.aria": "महाराष्ट्र राज्य पोलीस - PDF",
		"links.mumbaiPolice": "मुंबई महानगर पोलीस",
		"links.mumbaiPolice.aria": "मुंबई महानगर पोलीस - PDF",
		"links.maritimeBoard": "महाराष्ट्र समुद्री मंडळ",
		"links.maritimeBoard.aria": "महाराष्ट्र समुद्री मंडळ - PDF",
		"links.mvd": "मोटर वाहन विभाग",
		"links.mvd.aria": "मोटर वाहन विभाग - PDF",
		"links.actsRules": "महाराष्ट्र सरकार (कायदे/नियम)",
		"links.actsRules.aria": "महाराष्ट्र सरकार (कायदे/नियम) - PDF",
		"links.governmentResolutions": "सरकारी निर्णय",
		"links.governmentResolutions.aria": "सरकारी निर्णय - PDF",
		"links.acb": "भ्रष्टाचार विरोधी ब्युरो, महाराष्ट्र राज्य",
		"links.acb.aria": "भ्रष्टाचार विरोधी ब्युरो, महाराष्ट्र राज्य - PDF",
		"links.svpnpa": "सरदार वल्लभभाई पटेल राष्ट्रीय पोलीस अकादमी",
		"links.svpnpa.aria": "सरदार वल्लभभाई पटेल राष्ट्रीय पोलीस अकादमी - PDF",
		"links.cbi": "केंद्रीय गुन्हेगारी तपास ब्युरो",
		"links.cbi.aria": "केंद्रीय गुन्हेगारी तपास ब्युरो - PDF",
		"links.cpr": "पोलीस संशोधन केंद्र, (CPR) पुणे",
		"links.cpr.aria": "पोलीस संशोधन केंद्र, (CPR) पुणे - PDF",
		"links.cid": "गुन्हेगारी तपास विभाग, पुणे",
		"links.cid.aria": "गुन्हेगारी तपास विभाग, पुणे - PDF",
		"links.securityForce": "महाराष्ट्र सुरक्षा दल",
		"links.securityForce.aria": "महाराष्ट्र सुरक्षा दल - PDF",
		"links.trafficPolice": "मुंबई वाहतूक पोलीस",
		"links.trafficPolice.aria": "मुंबई वाहतूक पोलीस - PDF",
		"links.bombayHighCourt": "बॉम्बे उच्च न्यायालय",
		"links.bombayHighCourt.aria": "बॉम्बे उच्च न्यायालय - PDF",
		"links.supremeCourt": "भारताचे सर्वोच्च न्यायालय",
		"links.supremeCourt.aria": "भारताचे सर्वोच्च न्यायालय - PDF",
		"links.njdg": "NJDG | राष्ट्रीय न्यायिक डेटा ग्रिड",
		"links.njdg.aria": "NJDG | राष्ट्रीय न्यायिक डेटा ग्रिड - PDF",
		"links.mediaCorner": "राष्ट्राच्या सेवेत भारतीय पोलीस",
		"links.mediaCorner.aria": "राष्ट्राच्या सेवेत भारतीय पोलीस - PDF",
		"links.ePrison": "ई-तुरुंग",
		"links.ePrison.aria": "ई-तुरुंग - PDF",
		"links.eProsecution": "ई-फिर्याद",
		"links.eProsecution.aria": "ई-फिर्याद - PDF",
	},
};

interface LanguageProviderProps {
	children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps): React.JSX.Element => {
	const [language, setLanguage] = useState<Language>("en"); // Default to English

	useEffect(() => {
		// Load saved language preference
		const savedLang = localStorage.getItem("language") as Language;
		if (savedLang && (savedLang === "en" || savedLang === "mr")) {
			setLanguage(savedLang);
		}
	}, []);

	useEffect(() => {
		// Save language preference
		localStorage.setItem("language", language);
	}, [language]);

	const t = (key: string): string => {
		return translations[language][key as keyof (typeof translations)[typeof language]] || key;
	};

	return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
};
