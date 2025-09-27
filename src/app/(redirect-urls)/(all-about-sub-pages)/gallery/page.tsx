"use client";

import LanguageSwitch from "@/components/language-switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { Award, Calendar, Shield, Users } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function GalleryPage() {
	const { language } = useLanguage();

	const defaultContent = {
		en: {
			title: "Police Gallery",
			description: "Events, initiatives, and achievements of Chhatrapati Sambhaji Nagar Police Department",
			events: [
				{
					id: 1,
					title: "Officers and employees were awarded certificates of appreciation",
					description:
						"Officers and employees were awarded certificates of appreciation on 23 July 2025 for outstanding work in using the C.I.M.S. system to record and manage crime data from 2019 to 2025.",
					date: "23 July 2025",
					location: "Thane City Police Commissionerate",
					image: "/gallery/1.webp",
					category: "Awards",
					icon: <Award className="h-5 w-5" />,
				},
				{
					id: 2,
					title: "Thane Police Commissionerate has launched an innovative initiative",
					description:
						"Thane Police Commissionerate has launched an innovative initiative called 'Let's embrace modern technology, let's support Thane Police' on Ashadhi Ekadashi with renowned artists and dignitaries.",
					date: "6 July 2025",
					location: "Thane Police Commissionerate",
					image: "/gallery/2.webp",
					category: "Initiative",
					icon: <Shield className="h-5 w-5" />,
				},
				{
					id: 3,
					title: "Anti-Atrocities Day for Senior Citizens",
					description:
						"On the occasion of Anti-Atrocities Day for Senior Citizens, 'Susamvad Melave' dialogue meeting was organized to address concerns and build better community relations.",
					date: "Recent Event",
					location: "Community Hall",
					image: "/gallery/3.webp",
					category: "Community",
					icon: <Users className="h-5 w-5" />,
				},
			],
		},
		mr: {
			title: "पोलीस गॅलरी",
			description: "छत्रपती संभाजी नगर पोलीस विभागाचे कार्यक्रम, उपक्रम आणि यश",
			events: [
				{
					id: 1,
					title: "अधिकारी आणि कर्मचाऱ्यांना प्रशंसा प्रमाणपत्रे देण्यात आली",
					description:
						"2019 ते 2025 या कालावधीत गुन्हेगारी डेटा रेकॉर्ड करण्यासाठी आणि व्यवस्थापित करण्यासाठी C.I.M.S. सिस्टम वापरण्यात उत्कृष्ट कामगिरीबद्दल 23 जुलै 2025 रोजी अधिकारी आणि कर्मचाऱ्यांना प्रशंसा प्रमाणपत्रे देण्यात आली.",
					date: "23 जुलै 2025",
					location: "ठाणे शहर पोलिस आयुक्तालय",
					image: "/gallery/1.webp",
					category: "पुरस्कार",
					icon: <Award className="h-5 w-5" />,
				},
				{
					id: 2,
					title: "ठाणे पोलीस आयुक्तालयाने अभिनव उपक्रम सुरू केला",
					description:
						"ठाणे पोलीस आयुक्तालयाने 'धरूया कास आधुनिक तंत्रज्ञानाची देऊया साथ ठाणे पोलिसांची' या नावाने अभिनव उपक्रम सुरू केला आहे. यात प्रसिद्ध कलावंत आणि मान्यवरांचा सहभाग होता.",
					date: "6 जुलै 2025",
					location: "ठाणे पोलीस आयुक्तालय",
					image: "/gallery/2.webp",
					category: "उपक्रम",
					icon: <Shield className="h-5 w-5" />,
				},
				{
					id: 3,
					title: "जेष्ठ नागरिक अत्याचार विरोधी दिन",
					description: "जेष्ठ नागरिक अत्याचार विरोधी दिनानिमित्त 'सुसंवाद मेळावा' संवाद सभा आयोजित करण्यात आली होती ज्यामध्ये समुदायाच्या चिंतांचे निराकरण करण्यात आले.",
					date: "अलीकडील कार्यक्रम",
					location: "समुदाय हॉल",
					image: "/gallery/3.webp",
					category: "समुदाय",
					icon: <Users className="h-5 w-5" />,
				},
			],
		},
	};

	const [items, setItems] = React.useState<Array<{ id: string; title: string; titleMr?: string; date?: string; location?: string; image: string; category: string }>>(
		defaultContent.en.events.map((e) => ({ id: String(e.id), title: e.title, date: e.date, location: e.location, image: e.image, category: e.category })),
	);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		const run = async () => {
			try {
				const base = process.env.NEXT_PUBLIC_BACKEND_URL;
				if (!base) return; // keep defaults
				setLoading(true);
				const res = await fetch(`${base}/api/get-gallery?tag=gallery`);
				if (!res.ok) return setLoading(false);
				const data = await res.json();
				if (!Array.isArray(data)) return setLoading(false);
				const mapped = data.map((a: any, idx: number) => ({
					id: String(a?._id ?? idx),
					title: String(a?.title ?? ""),
					titleMr: a?.titleInMarathi,
					date: a?.createdAt?.slice(0, 10),
					location: "",
					image: a?.image?.imagelink ?? "",
					category: "Gallery",
				}));
				if (mapped.length) setItems(mapped);
				setLoading(false);
			} catch {
				setLoading(false);
			}
		};
		run();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8 text-center">
					<div className="flex justify-end mb-4">
						<LanguageSwitch />
					</div>
					<h1 className="text-4xl font-bold mb-4">{defaultContent[language].title}</h1>
					<p className="text-muted-foreground text-lg">{defaultContent[language].description}</p>
				</div>

				{loading && <div className="text-center text-sm text-muted-foreground">Loading…</div>}

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{items.map((event) => (
						<Card
							key={event.id}
							className="overflow-hidden hover:shadow-lg transition-shadow"
						>
							<div className="relative h-48 w-full">
								<Image
									src={event.image || "/gallery/1.webp"}
									alt={event.title}
									fill
									className="object-cover"
								/>
								<div className="absolute top-4 right-4">
									<Badge
										variant="secondary"
										className="flex items-center gap-1"
									>
										{event.category}
									</Badge>
								</div>
							</div>
							<CardHeader>
								<CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
								<CardDescription className="flex items-center gap-2 text-sm">
									<Calendar className="h-4 w-4" />
									{event.date}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground line-clamp-3">{language === "mr" ? event.titleMr ?? event.title : event.title}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
