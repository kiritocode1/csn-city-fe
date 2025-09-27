"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

const MissionPage = () => {
	const { language } = useLanguage();
	const isMarathi = language === "mr";

	return (
		<div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
			{/* Header Section */}
			<div className="bg-gray-200 dark:bg-gray-800 dark:text-white py-12">
				<div className="container mx-auto px-4">
					<div className="max-w-6xl mx-auto text-center">
						<h1 className="text-4xl font-bold mb-4">{isMarathi ? "आमचे मिशन" : "Our Mission"}</h1>
						<p className="text-lg opacity-90">
							{isMarathi
								? "छत्रपती संभाजी नगर पोलीस विभागाच्या मिशन, मूल्ये आणि समुदायाची सेवा आणि संरक्षण करण्याच्या प्रतिबद्धतेबद्दल जाणून घ्या."
								: "Learn about the mission, values, and commitment of Chhatrapati Sambhaji Nagar Police Department in serving and protecting our community."}
						</p>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-8">
				<div className="max-w-6xl mx-auto">
					{/* Mission Statement Section */}
					<Card className="mb-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
						<CardHeader>
							<CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">{isMarathi ? "मिशन स्टेटमेंट" : "Mission Statement"}</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="prose prose-gray dark:prose-invert max-w-none">
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
									{isMarathi
										? "पोलीस विभाग ही आधुनिक समाजातील एक अपरिहार्य संस्था आहे. वर्षांमध्ये, पोलीसांनी केवळ अंमलबजावणीची एजन्सी असण्यापासून समाजाला सेवा देणाऱ्या संस्थेमध्ये संक्रमण केले आहे. आम्ही पोलीस आमच्या घोषवाक्यासह पुष्टी देतो की आम्ही समाजाच्या प्रती आमच्या कर्तव्यांची पूर्तता करू, सतत आणि सतर्क नजर ठेवण्याची प्रतिज्ञा करून. आम्ही गुन्ह्यांच्या प्रतिबंध आणि शोध, कायदा आणि सुव्यवस्थेचे रक्षण, समाजाच्या असुरक्षित घटकांची सुरक्षा आणि सुरक्षितता सुनिश्चित करणे, आणि जनतेला प्रभावित करणाऱ्या इतर बाबींच्या संदर्भात समुदायाच्या व्यवहारांचे नियमन आणि नियंत्रण करतो."
										: "The Police Department is an indispensable organisation in modern society. Over the years, the police have undergone a transition from only being an agency of enforcement to an organisation offering service. We police confirm with our motto that we will discharge our duties towards society, with a vow to keep a constant and vigilant watch. We regulate and control the affairs of the community with respect to the prevention and detection of crimes, the maintenance of law and order, ensuring the safety and security of the vulnerable sections of society, and other matters affecting the public."}
								</p>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
									{isMarathi
										? "आम्ही आमच्या कर्तव्याच्या निर्वहनातील प्रत्येक संभाव्य आव्हानावर मात करण्यास सक्षम आहोत. आमचे मिशन म्हणजे आमच्या देशाच्या संविधानात दिलेल्या तरतुदींचे पालन करणाऱ्या लोकांच्या सक्रिय सहभागाने क्षेत्राला राहण्यासाठी सुरक्षित ठिकाण बनविणे. पोलीस अधिकारी असणे म्हणजे दररोज तुमच्या जीवाला धोका आहे. अधिकारी असणे हे अक्षरशः एक कृतज्ञतारहित नोकरी आहे. पोलीस अधिकाऱ्यांना केवळ गृहीत धरले जात नाही, तर बरेच लोक पोलिसांबद्दल त्यांच्या नापसंतीबद्दल खूप मुखर आहेत."
										: "We are competent to overcome every possible challenge towards the disposal of our duty. Our mission is to make the area a safe place to live with the active participation of people adhering to the provisions as envisaged by the constitution of our country. Being a police officer risks your life daily. Being an officer is literally quite a thankless job. Not only are police officers often taken for granted, many people are highly vocal about their dislike for cops."}
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Statistics Tables Section */}
					<div className="mb-12">
						<h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">{isMarathi ? "पोलीस अधिकारक्षेत्र माहिती" : "Police Jurisdiction Information"}</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{/* Area Population Table */}
							<Card className=" border-gray-200 dark:border-gray-600">
								<CardHeader className=" text-white py-3">
									<CardTitle className="text-lg font-semibold text-center">{isMarathi ? "क्षेत्र लोकसंख्या" : "Area Population"}</CardTitle>
								</CardHeader>
								<CardContent className="p-4">
									<div className="space-y-2 text-sm">
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-300">{isMarathi ? "निर्देशांक:" : "Coordinates:"}</span>
											<span className="text-gray-800 dark:text-white font-medium">19.88°N 75.32°E</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-300">{isMarathi ? "क्षेत्रफळ:" : "Area:"}</span>
											<span className="text-gray-800 dark:text-white font-medium">10,100 Sq. Km</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-300">{isMarathi ? "लोकसंख्या:" : "Population:"}</span>
											<span className="text-gray-800 dark:text-white font-medium">1,175,116</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-300">{isMarathi ? "राज्य:" : "State:"}</span>
											<span className="text-gray-800 dark:text-white font-medium">{isMarathi ? "महाराष्ट्र" : "Maharashtra"}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-300">{isMarathi ? "जिल्हा:" : "District:"}</span>
											<span className="text-gray-800 dark:text-white font-medium">{isMarathi ? "छत्रपती संभाजीनगर" : "Chhatrapati Sambhajinagar"}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-300">{isMarathi ? "देश:" : "Country:"}</span>
											<span className="text-gray-800 dark:text-white font-medium">{isMarathi ? "भारत" : "India"}</span>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Police Offices Table */}
							<Card className=" border-gray-200 dark:border-gray-600">
								<CardHeader className=" text-white py-3">
									<CardTitle className="text-lg font-semibold text-center">{isMarathi ? "पोलीस कार्यालये" : "Police Offices"}</CardTitle>
								</CardHeader>
								<CardContent className="p-4">
									<div className="space-y-2 text-sm">
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-300">{isMarathi ? "कायदा आणि सुव्यवस्था झोन:" : "Law & Order Zones:"}</span>
											<span className="text-gray-800 dark:text-white font-medium">2</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-300">{isMarathi ? "कायदा आणि सुव्यवस्था विभाग:" : "Law & Order Divisions:"}</span>
											<span className="text-gray-800 dark:text-white font-medium">4</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-300">{isMarathi ? "कायदा आणि सुव्यवस्था पोलीस स्टेशन:" : "Law & Order Police Stations:"}</span>
											<span className="text-gray-800 dark:text-white font-medium">17</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-300">{isMarathi ? "वाहतूक पोलीस झोन:" : "Traffic Police Zone:"}</span>
											<span className="text-gray-800 dark:text-white font-medium">1</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-300">{isMarathi ? "वाहतूक पोलीस विभाग:" : "Traffic Police Divisions:"}</span>
											<span className="text-gray-800 dark:text-white font-medium">1</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-300">{isMarathi ? "वाहतूक पोलीस स्टेशन:" : "Traffic Police Stations:"}</span>
											<span className="text-gray-800 dark:text-white font-medium">5</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-300">{isMarathi ? "गुन्हा शाखा:" : "Crime Branch:"}</span>
											<span className="text-gray-800 dark:text-white font-medium">1</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-300">{isMarathi ? "सायबर पोलीस स्टेशन:" : "Cyber Police Station:"}</span>
											<span className="text-gray-800 dark:text-white font-medium">1</span>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Legislative Constituencies Table */}
							<Card className=" border-gray-200 dark:border-gray-600 md:col-span-2 lg:col-span-1">
								<CardHeader className=" text-white py-3">
									<CardTitle className="text-lg font-semibold text-center">{isMarathi ? "विधानसभा मतदारसंघ" : "Legislative Constituencies"}</CardTitle>
								</CardHeader>
								<CardContent className="p-4">
									<div className="space-y-2 text-sm">
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-300">{isMarathi ? "लोकसभा सदस्य:" : "Member of Parliament:"}</span>
											<span className="text-gray-800 dark:text-white font-medium">1</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-300">{isMarathi ? "विधानसभा सदस्य:" : "Member of Legislative Assembly:"}</span>
											<span className="text-gray-800 dark:text-white font-medium">3</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Our Commitment Section */}
					<Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
						<CardHeader>
							<CardTitle className="text-2xl text-center text-gray-800 dark:text-white">{isMarathi ? "आमची प्रतिबद्धता" : "Our Commitment"}</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
									<p className="text-gray-700 dark:text-gray-300">
										{isMarathi
											? "पार्श्वभूमी किंवा परिस्थितीची पर्वा न करता सर्व नागरिकांना समान आदर आणि प्रतिष्ठेसह संरक्षण आणि सेवा करणे"
											: "Protect and serve all citizens with equal respect and dignity, regardless of background or circumstances"}
									</p>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
									<p className="text-gray-700 dark:text-gray-300">
										{isMarathi
											? "सर्व कार्यक्रमांमध्ये व्यावसायिकता, सचोटी आणि नैतिक वर्तनाचे उच्चतम मानदंड राखणे"
											: "Maintain the highest standards of professionalism, integrity, and ethical conduct in all operations"}
									</p>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
									<p className="text-gray-700 dark:text-gray-300">
										{isMarathi
											? "मजबूत समुदाय भागीदारी विकसित करणे आणि सक्रिय गुन्हा प्रतिबंध उपक्रमांमध्ये सहभागी होणे"
											: "Foster strong community partnerships and engage in proactive crime prevention initiatives"}
									</p>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
									<p className="text-gray-700 dark:text-gray-300">
										{isMarathi
											? "नाविन्य, प्रशिक्षण आणि समुदाय प्रतिक्रियेद्वारे आमच्या सेवा सतत सुधारणे"
											: "Continuously improve our services through innovation, training, and community feedback"}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default MissionPage;
