"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { Award, Shield, Target, Users, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

const AboutPage = () => {
	const { language } = useLanguage();
	const [isVisible, setIsVisible] = useState(false);
	const isMarathi = language === "mr";

	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className={`mb-8 transition-all flex flex-col gap-8 duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
					<h1 className="text-3xl font-bold mb-4 text-center">{isMarathi ? "आमच्याबद्दल" : "About Us"}</h1>
					<p className="text-muted-foreground text-lg">
						{isMarathi
							? "चतरपती संभाजी नगर पोलिस विभाग नागरिकांना सचोटी, व्यावसायिकता आणि कायदा आणि सुव्यवस्था राखण्याच्या समर्पणासह सेवा देण्यासाठी वचनबद्ध आहे."
							: "Chhatrapati Sambhaji Nagar Police Department is committed to serving and protecting the citizens with integrity, professionalism, and dedication to maintaining law and order."}
					</p>
					<p className="text-muted-foreground text-lg">
						{isMarathi
							? "चतरपती संभाजी नगरमध्ये व्यावसायिक पोलिसिंग आणि समुदाय भागीदारीद्वारे कायदा आणि सुव्यवस्था राखणे, गुन्हे रोखणे आणि सर्व नागरिकांची सुरक्षा आणि सुरक्षितता सुनिश्चित करणे."
							: "To maintain law and order, prevent crime, and ensure the safety and security of all citizens in Chhatrapati Sambhaji Nagar through professional policing and community partnership."}
					</p>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
