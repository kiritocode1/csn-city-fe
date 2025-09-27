"use client";

import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import { AlertTriangle, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, Download, FileText, Globe, Phone, Shield, Users } from "lucide-react";
import { motion, useMotionValue, useTransform, type Variants } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import ExtendedLink from "./ExtendedLink";

interface BentoItem {
	id: string;
	title: string;
	description: string;
	href?: string;
	feature?: "news" | "message" | "carousel" | "services" | "info" | "updates";
	size?: "sm" | "md" | "lg";
	className?: string;
	content?: any;
}

const fadeInUp: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
};

const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.3,
		},
	},
};

const NewsFeature = ({ news }: { news: Array<{ title: string; date: string; content: string }> }) => {
	return (
		<div className="mt-2 space-y-2">
			{news.slice(0, 2).map((item, index) => (
				<motion.div
					key={`news-${index}`}
					initial={{ opacity: 0, x: -10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.1 * index }}
					className="p-2 bg-white/50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200/50 dark:border-neutral-700/50"
				>
					<div className="flex items-center gap-2 mb-1">
						<div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
						<span className="text-xs text-neutral-600 dark:text-neutral-400">{item.date}</span>
					</div>
					<h4 className="text-xs font-medium text-neutral-900 dark:text-neutral-100 mb-1 line-clamp-2">{item.title}</h4>
					<p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">{item.content}</p>
				</motion.div>
			))}
		</div>
	);
};

const MessageFeature = ({ message }: { message: { text: string; author: string; position: string; image: string } }) => {
	return (
		<div className="mt-3 relative">
			<div className="flex items-start gap-5 md:gap-6 flex-col md:flex-row">
				<div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0">
					<Image
						src={message.image}
						alt={message.author}
						width={112}
						height={112}
						className="object-cover "
						quality={75}
						priority={false}
						sizes="(max-width: 768px) 96px, 112px"
					/>
				</div>
				<div className="flex-1 relative">
					<div className="text-6xl text-orange-500/20 absolute -top-1 -left-1">&ldquo;</div>
					<p className="text-sm md:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 italic mb-4 relative z-10">{message.text}</p>
					<div className="text-6xl text-orange-500/20 absolute -bottom-1 -right-1">&rdquo;</div>
				</div>
			</div>
			<div className="mt-4 text-center md:text-right">
				<div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{message.author}</div>
				<div className="text-xs text-neutral-600 dark:text-neutral-400">{message.position}</div>
			</div>
		</div>
	);
};

const CarouselFeature = ({ images }: { images: string[] }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		setCurrentIndex((prev) => (prev + 1) % images.length);
	};

	const prevSlide = () => {
		setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
	};

	return (
		<div className="mt-2 relative">
			<div className="relative h-24 md:h-24 rounded-lg overflow-hidden">
				<Image
					src={images[currentIndex]}
					alt={`Event ${currentIndex + 1}`}
					width={400}
					height={96}
					className="object-cover w-full h-full"
					quality={75}
					priority={false}
					sizes="(max-width: 768px) 100vw, 400px"
				/>
				<button
					onClick={prevSlide}
					aria-label="Previous image"
					className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-8 md:h-8 bg-white/80 dark:bg-black/80 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-black transition-colors touch-manipulation"
				>
					<ChevronLeft className="w-4 h-4" />
				</button>
				<button
					onClick={nextSlide}
					aria-label="Next image"
					className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-8 md:h-8 bg-white/80 dark:bg-black/80 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-black transition-colors touch-manipulation"
				>
					<ChevronRight className="w-4 h-4" />
				</button>
			</div>
			<div className="flex justify-center mt-2 gap-1">
				{images.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentIndex(index)}
						aria-label={`Go to image ${index + 1}`}
						aria-pressed={index === currentIndex}
						className={cn("w-2 h-2 md:w-2 md:h-2 rounded-full transition-colors touch-manipulation", index === currentIndex ? "bg-orange-500" : "bg-neutral-300 dark:bg-neutral-600")}
					/>
				))}
			</div>
		</div>
	);
};

const ServicesFeature = ({ services }: { services: Array<{ name: string; icon: React.ComponentType<{ className?: string }>; href: string }> }) => {
	return (
		<div className="mt-2 grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-1.5">
			{services.slice(0, 6).map((service, index) => (
				<motion.div
					key={`service-${index}`}
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.1 * index }}
					className="p-3 md:p-2 bg-white/50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200/50 dark:border-neutral-700/50 hover:bg-white/70 dark:hover:bg-neutral-700/50 transition-colors touch-manipulation"
				>
					<ExtendedLink
						href={service.href}
						className="flex items-center gap-2 md:gap-1.5 min-h-[44px] md:min-h-0"
					>
						<service.icon className="w-4 h-4 md:w-3 md:h-3 text-orange-500 flex-shrink-0" />
						<span className="text-sm md:text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate">{service.name}</span>
					</ExtendedLink>
				</motion.div>
			))}
		</div>
	);
};

const InfoFeature = ({ info }: { info: Array<{ name: string; icon: any; href: string }> }) => {
	return (
		<div className="mt-2 space-y-2 md:space-y-1.5">
			{info.slice(0, 6).map((item, index) => (
				<motion.div
					key={`info-${index}`}
					initial={{ opacity: 0, x: -10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.1 * index }}
					className="flex items-center gap-3 md:gap-2 p-2 md:p-1.5 hover:bg-white/50 dark:hover:bg-neutral-800/50 rounded-lg transition-colors touch-manipulation min-h-[44px] md:min-h-0"
				>
					<item.icon className="w-4 h-4 md:w-3 md:h-3 text-orange-500 flex-shrink-0" />
					<ExtendedLink
						href={item.href}
						className="text-sm md:text-xs text-neutral-700 dark:text-neutral-300 hover:text-orange-500 transition-colors truncate"
					>
						{item.name}
					</ExtendedLink>
				</motion.div>
			))}
		</div>
	);
};

const UpdatesFeature = ({ updates }: { updates: Array<{ name: string; icon: any; href: string }> }) => {
	return (
		<div className="mt-3 space-y-2">
			{updates.map((update, index) => (
				<motion.div
					key={`update-${index}`}
					initial={{ opacity: 0, x: -10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.1 * index }}
					className="flex items-center gap-3 p-2 hover:bg-white/50 dark:hover:bg-neutral-800/50 rounded-lg transition-colors"
				>
					<update.icon className="w-4 h-4 text-orange-500 flex-shrink-0" />
					<ExtendedLink
						href={update.href}
						className="text-sm text-neutral-700 dark:text-neutral-300 hover:text-orange-500 transition-colors"
					>
						{update.name}
					</ExtendedLink>
				</motion.div>
			))}
		</div>
	);
};

const BentoCard = ({ item }: { item: BentoItem }) => {
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const rotateX = useTransform(y, [-100, 100], [2, -2]);
	const rotateY = useTransform(x, [-100, 100], [-2, 2]);

	function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
		const rect = event.currentTarget.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;
		const mouseX = event.clientX - rect.left;
		const mouseY = event.clientY - rect.top;
		const xPct = mouseX / width - 0.5;
		const yPct = mouseY / height - 0.5;
		x.set(xPct * 100);
		y.set(yPct * 100);
	}

	function handleMouseLeave() {
		x.set(0);
		y.set(0);
	}

	return (
		<motion.div
			variants={fadeInUp}
			whileHover={{ y: -5 }}
			transition={{ type: "spring", stiffness: 300, damping: 20 }}
			className="h-full"
			onHoverEnd={handleMouseLeave}
			onMouseMove={handleMouseMove}
			style={{
				rotateX,
				rotateY,
				transformStyle: "preserve-3d",
			}}
		>
			<div
				className={cn(
					"group relative flex flex-col gap-4 h-full rounded-xl p-5",
					"bg-gradient-to-b from-neutral-50/60 via-neutral-50/40 to-neutral-50/30",
					"dark:from-neutral-900/60 dark:via-neutral-900/40 dark:to-neutral-900/30",
					"border border-neutral-200/60 dark:border-neutral-800/60",
					"before:absolute before:inset-0 before:rounded-xl",
					"before:bg-gradient-to-b before:from-white/10 before:via-white/20 before:to-transparent",
					"dark:before:from-black/10 dark:before:via-black/20 dark:before:to-transparent",
					"before:opacity-100 before:transition-opacity before:duration-500",
					"after:absolute after:inset-0 after:rounded-xl after:bg-neutral-50/70 dark:after:bg-neutral-900/70 after:z-[-1]",
					"backdrop-blur-[4px]",
					"shadow-[0_4px_20px_rgb(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)]",
					"hover:border-neutral-300/50 dark:hover:border-neutral-700/50",
					"hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]",
					"hover:backdrop-blur-[6px]",
					"hover:bg-gradient-to-b hover:from-neutral-50/60 hover:via-neutral-50/30 hover:to-neutral-50/20",
					"dark:hover:from-neutral-800/60 dark:hover:via-neutral-800/30 dark:hover:to-neutral-800/20",
					"transition-all duration-500 ease-out",
					item.className,
				)}
				tabIndex={0}
				aria-label={`${item.title} - ${item.description}`}
			>
				<div
					className="relative z-10 flex flex-col gap-3 h-full"
					style={{ transform: "translateZ(20px)" }}
				>
					<div className="space-y-2 flex-1 flex flex-col">
						<div className="flex items-center justify-between">
							<h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300">
								{item.title}
							</h3>
							<div className="text-neutral-400 dark:text-neutral-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
								<ArrowUpRight className="h-5 w-5" />
							</div>
						</div>

						<p className="text-sm text-neutral-600 dark:text-neutral-400 tracking-tight">{item.description}</p>

						{/* Feature specific content */}
						{item.feature === "news" && item.content && <NewsFeature news={item.content as unknown as Array<{ title: string; date: string; content: string }>} />}

						{item.feature === "message" && item.content && <MessageFeature message={item.content as unknown as { text: string; author: string; position: string; image: string }} />}

						{item.feature === "carousel" && item.content && <CarouselFeature images={item.content as unknown as string[]} />}

						{item.feature === "services" && item.content && <ServicesFeature services={item.content as unknown as Array<{ name: string; icon: React.ComponentType; href: string }>} />}

						{item.feature === "info" && item.content && <InfoFeature info={item.content as unknown as Array<{ name: string; icon: React.ComponentType; href: string }>} />}

						{item.feature === "updates" && item.content && <UpdatesFeature updates={item.content as unknown as Array<{ name: string; icon: React.ComponentType; href: string }>} />}
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default function PoliceBentoGrid() {
	const { t, language } = useLanguage();
	const bentoItems: BentoItem[] = [
		{
			id: "latest-updates",
			title: t("bento.updates.title"),
			description: t("bento.updates.description"),
			feature: "news",
			size: "md",
			className: "col-span-1 row-span-1",
			content: [
				{
					title: t("bento.news.title1"),
					date: "Dec 15, 2024",
					content: t("bento.news.content1"),
				},
				{
					title: t("bento.news.title2"),
					date: "Dec 14, 2024",
					content: t("bento.news.content2"),
				},
				{
					title: t("bento.news.title3"),
					date: "Dec 13, 2024",
					content: t("bento.news.content3"),
				},
			],
		},
		{
			id: "cp-message",
			title: language === "mr" ? "पोलीस आयुक्तांचे संदेश" : "Police Commissioner's Message",
			description: language === "mr" ? "पोलीस आयुक्तांचा नागरिकांना संदेश" : "Message from the Commissioner of Police",
			feature: "message",
			size: "lg",
			className: "col-span-2 row-span-1",
			content: {
				text:
					language === "mr"
						? "छत्रपती संभाजीनगर शहर पोलीस दल नागरिकांच्या सुरक्षितता, संरक्षण आणि कल्याणासाठी सदैव वचनबद्ध आहे. लोकाभिमुख, पारदर्शक आणि जबाबदार पोलीसिंग या तत्त्वांवर आम्ही कार्य करीत आहोत, ज्यात तंत्रज्ञानाचा वापर आणि नागरिकांचा सहभाग महत्वाचा आहे.\n\nआपले ध्येय सुरक्षित, शांततामय आणि कायद्याचे पालन करणारे शहर घडवणे, जिथे प्रत्येक नागरिक आत्मविश्वासाने आणि निर्धास्तपणे आपली स्वप्ने पूर्ण करू शकेल. मी सर्व नागरिकांना आवाहन करतो की त्यांनी पोलीस दलाला सहकार्य करावे, कायद्याचे पालन करावे आणि शहरातील शांतता व सलोखा टिकवण्यासाठी योगदान द्यावे.\n\nनागरिक आणि पोलीस यांच्यातील विश्वासाचे बंध अधिक मजबूत करून आपण एकत्रितपणे सुरक्षित छत्रपती संभाजीनगर शहर घडवूया."
						: "It is our firm commitment at Chhatrapati Sambhajinagar City Police to ensure the safety, security, and well-being of every citizen. We believe in citizen-centric, transparent, and accountable policing where technology and community partnership play a vital role.\n\nOur goal is to build a city that is safe, peaceful, and law-abiding, where citizens feel secure and confident to pursue their aspirations. I appeal to all residents to actively cooperate with the police, follow the law, and contribute towards maintaining harmony in our city.\n\nTogether, let us strengthen the bond between citizens and police for a safer tomorrow.",
				author: language === "mr" ? "श्री. प्रविण पवार (भा.पो.से.)" : "Shri. Pravin Pawar (I.P.S)",
				position: language === "mr" ? "पोलीस आयुक्त, छत्रपती संभाजीनगर शहर पोलीस" : "Commissioner of Police, Chhatrapati Sambhajinagar City Police",
				image: "/people/8.webp",
			},
		},
		{
			id: "recent-events",
			title: t("bento.events.title"),
			description: t("bento.events.description"),
			feature: "carousel",
			size: "md",
			className: "col-span-1 row-span-1",
			content: ["/gallery/1.webp", "/gallery/2.webp", "/gallery/3.webp", "/gallery/4.webp"],
		},
		{
			id: "online-services",
			title: t("bento.services.title"),
			description: t("bento.services.description"),
			feature: "services",
			size: "md",
			className: "col-span-1 row-span-1",
			content: [
				{ name: "E-Challan Payment", icon: FileText, href: "#" },
				{ name: "Cyber Crime Portal", icon: Globe, href: "#" },
				{ name: "Missing Persons", icon: Users, href: "#" },
				{ name: "Download Forms", icon: Download, href: "#" },
				{ name: "Unidentified Bodies", icon: AlertTriangle, href: "#" },
				{ name: "Published FIRs", icon: CheckCircle2, href: "#" },
				{ name: "Police Clearance", icon: Shield, href: "#" },
				{ name: "Arrested Accused", icon: Users, href: "#" },
				{ name: "Citizen Portal", icon: Globe, href: "#" },
			],
		},
		{
			id: "popular-info",
			title: t("bento.info.title"),
			description: t("bento.info.description"),
			feature: "info",
			size: "md",
			className: "col-span-1 row-span-1",
			content: [
				{ name: "Safety Tips", icon: CheckCircle2, href: "#" },
				{ name: "Cyber Alert Wall", icon: Shield, href: "#" },
				{ name: "FAQs", icon: FileText, href: "#" },
				{ name: "Important Contacts", icon: Phone, href: "#" },
				{ name: "Tenders", icon: FileText, href: "#" },
				{ name: "Police Recruitment", icon: Users, href: "#" },
				{ name: "Useful Websites", icon: Globe, href: "#" },
				{ name: "MH Police Units", icon: Globe, href: "#" },
			],
		},
	];

	return (
		<section className="relative py-4 bg-white dark:bg-black overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
				{/* Mobile Layout */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={staggerContainer}
					className="grid grid-cols-1 gap-3 md:hidden"
				>
					{/* DGP Message - Mobile First */}
					<motion.div variants={fadeInUp}>
						<BentoCard item={bentoItems[1]} />
					</motion.div>

					{/* Latest Updates - Mobile Second */}
					<motion.div variants={fadeInUp}>
						<BentoCard item={bentoItems[0]} />
					</motion.div>

					{/* Recent Events - Mobile Third */}
					<motion.div variants={fadeInUp}>
						<BentoCard item={bentoItems[2]} />
					</motion.div>

					{/* Services Grid - Mobile */}
					<motion.div variants={fadeInUp}>
						<BentoCard item={bentoItems[3]} />
					</motion.div>

					{/* Popular Info - Mobile Last */}
					<motion.div variants={fadeInUp}>
						<BentoCard item={bentoItems[4]} />
					</motion.div>
				</motion.div>

				{/* Desktop Layout */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={staggerContainer}
					className="hidden md:grid grid-cols-12 gap-3 h-[calc(100vh-8rem)]"
				>
					{/* Latest Updates - Top Left */}
					<motion.div
						variants={fadeInUp}
						className="col-span-3 row-span-2"
					>
						<BentoCard item={bentoItems[0]} />
					</motion.div>

					{/* DGP Message - Top Right */}
					<motion.div
						variants={fadeInUp}
						className="col-span-9 row-span-2"
					>
						<BentoCard item={bentoItems[1]} />
					</motion.div>

					{/* Recent Events - Bottom Left */}
					<motion.div
						variants={fadeInUp}
						className="col-span-4"
					>
						<BentoCard item={bentoItems[2]} />
					</motion.div>

					{/* Online Services - Bottom Center */}
					<motion.div
						variants={fadeInUp}
						className="col-span-4"
					>
						<BentoCard item={bentoItems[3]} />
					</motion.div>

					{/* Popular Info - Bottom Right */}
					<motion.div
						variants={fadeInUp}
						className="col-span-4"
					>
						<BentoCard item={bentoItems[4]} />
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
