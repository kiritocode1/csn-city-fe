"use client";

import { useLanguage } from "@/contexts/language-context";
import { Facebook, Globe, Instagram, Mail, Shield, Twitter, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import ExtendedLink from "./ExtendedLink";

const navigation = {
	categories: [
		{
			id: "police",
			name: "Police Services",
			sections: [
				{
					id: "about",
					name: "About",
					items: [
						{ name: "About Us", href: "/about" },
						{ name: "Leadership", href: "/leadership" },
						{ name: "History", href: "/history" },
					],
				},
				{
					id: "services",
					name: "Services",
					items: [
						{ name: "E-Challan Payment", href: "/e-challan" },
						{ name: "File FIR Online", href: "/fir" },
						{ name: "Police Clearance", href: "/police-clearance" },
					],
				},
				{
					id: "emergency",
					name: "Emergency",
					items: [
						{ name: "Emergency: 100", href: "tel:100" },
						{ name: "Helpline: 1090", href: "tel:1090" },
						{ name: "Women Helpline", href: "tel:1091" },
					],
				},
				{
					id: "citizen",
					name: "Citizen Services",
					items: [
						{ name: "Missing Persons", href: "/missing-persons" },
						{ name: "Complaints", href: "/complaints" },
						{ name: "Feedback", href: "/feedback" },
					],
				},
				{
					id: "legal",
					name: "Legal",
					items: [
						{ name: "RTI", href: "/rti" },
						{ name: "Tenders", href: "/tenders" },
						{ name: "Recruitment", href: "/recruitment" },
					],
				},
				{
					id: "contact",
					name: "Contact",
					items: [
						{ name: "Contact Us", href: "/contact" },
						{ name: "Locations", href: "/locations" },
						{ name: "Email", href: "mailto:police@csr.gov.in" },
					],
				},
			],
		},
	],
};

const Underline = `hover:-translate-y-1 border border-dotted rounded-xl p-2.5 transition-transform`;

const PoliceFooter = () => {
	const [visitCount, setVisitCount] = useState(0);
	const { t } = useLanguage();
	const [lastUpdated, setLastUpdated] = useState("");

	useEffect(() => {
		const storedCount = localStorage.getItem("police-visit-count");
		const count = storedCount ? parseInt(storedCount) + 1 : 1;
		setVisitCount(count);
		localStorage.setItem("police-visit-count", count.toString());
	}, []);

	useEffect(() => {
		try {
			const now = new Date();
			const formatted = new Intl.DateTimeFormat(undefined, { dateStyle: "long", timeStyle: "short" }).format(now);
			setLastUpdated(formatted);
		} catch (e) {
			setLastUpdated(new Date().toLocaleString());
		}
	}, []);

	const formatCount = (num: number) => {
		if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
		if (num >= 1000) return (num / 1000).toFixed(1) + "K";
		return num.toString();
	};

	return (
		<footer className="border-neutral-200/20 mx-auto w-full border-b border-t px-2 dark:border-neutral-800/20">
			{/* Big Heading Section */}
			<div className="w-full bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 py-16">
				<div className="flex flex-col items-center">
					<h1 className="md:text-[4.5rem] text-[2.25rem] text-center w-[90vw] font-extrabold tracking-tighter text-[#555555] dark:text-neutral-400">{t("footer.title")}</h1>
				</div>
			</div>



			{/* Quick Links Row */}
			<div className="mx-auto max-w-7xl px-6">
				<div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-600 dark:text-neutral-400">
					<ExtendedLink
						href="/sitemap.xml"
						className="hover:text-orange-500"
					>
						{t("accessibility.sitemap")}
					</ExtendedLink>
					<span className="text-neutral-400">|</span>
					<ExtendedLink
						href="/disclaimer"
						className="hover:text-orange-500"
					>
						{t("accessibility.disclaimer")}
					</ExtendedLink>
					<span className="text-neutral-400">|</span>
					<ExtendedLink
						href="/terms"
						className="hover:text-orange-500"
					>
						{t("accessibility.terms")}
					</ExtendedLink>
					<span className="text-neutral-400">|</span>
					<ExtendedLink
						href="/privacy"
						className="hover:text-orange-500"
					>
						{t("accessibility.privacy")}
					</ExtendedLink>
					<span className="text-neutral-400">|</span>
					<span className="whitespace-nowrap">
						{t("footer.lastUpdated")} {lastUpdated}
					</span>
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-6 py-10">
				<div className="border-b border-dotted"></div>
				<div className="py-10">
					{navigation.categories.map((category) => (
						<div
							key={category.name}
							className="grid grid-cols-3 flex-row justify-between gap-6 leading-6 md:flex"
						>
							{category.sections.map((section) => (
								<div key={section.name}>
									<ul
										role="list"
										aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
										className="flex flex-col space-y-2"
									>
										{section.items.map((item) => (
											<li
												key={item.name}
												className="flow-root"
											>
												<ExtendedLink
													href={item.href}
													className="text-sm text-slate-600 hover:text-orange-500 dark:text-slate-400 hover:dark:text-white md:text-xs"
												>
													{item.name}
												</ExtendedLink>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					))}
				</div>
				<div className="border-b border-dotted"></div>
			</div>

			<div className="flex flex-wrap justify-center gap-y-6">
				<div className="flex flex-wrap items-center justify-center gap-6 gap-y-4 px-6">
					<ExtendedLink
						aria-label="Twitter (X) "
						href="https://x.com/csncitypolice"
						rel="noreferrer"
						target="_blank"
						className={Underline}
					>
						<Twitter className="h-5 w-5" />
					</ExtendedLink>
					<ExtendedLink
						aria-label="Instagram"
						href="https://www.instagram.com/csncitypolice"
						rel="noreferrer"
						target="_blank"
						className={Underline}
					>
						<Instagram className="h-5 w-5" />
					</ExtendedLink>
					<ExtendedLink
						aria-label="Facebook"
						href="https://www.facebook.com/aurangabadpolice"
						rel="noreferrer"
						target="_blank"
						className={Underline}
					>
						<Facebook className="h-5 w-5" />
					</ExtendedLink>
					<ExtendedLink
						aria-label="YouTube"
						href="https://www.youtube.com/@cpcsncity"
						rel="noreferrer"
						target="_blank"
						className={Underline}
					>
						<Youtube className="h-5 w-5" />
					</ExtendedLink>
					{/* Visit Counter */}
					<div className="bg-orange-500 text-white p-3 rounded-lg text-center min-w-[120px]">
						<div className="flex items-center justify-center gap-1 mb-1">
							<Globe className="w-4 h-4" />
							<span className="text-sm font-medium">{t("footer.visits")}</span>
						</div>
						<div className="text-xl font-bold">{formatCount(visitCount)}</div>
					</div>
				</div>
			</div>

			<div className="mx-auto mb-10 mt-10 flex flex-col justify-between text-center text-xs md:max-w-7xl">
				<div className="flex flex-row items-center justify-center gap-1 text-slate-600 dark:text-slate-400">
					<span>©</span>
					<span>{new Date().getFullYear()}</span>-
					<span className="hover:text-orange-500 dark:hover:text-orange-500 cursor-pointer text-slate-600 dark:text-slate-400">
						<ExtendedLink
							aria-label="Police Department"
							className=""
							href="/"
						>
							{t("footer.police")}
						</ExtendedLink>
					</span>
				</div>
			</div>
		</footer>
	);
};

export default PoliceFooter;
