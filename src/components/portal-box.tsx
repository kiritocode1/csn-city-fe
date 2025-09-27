"use client";

import ExtendedLink from "@/components/ExtendedLink";
import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";
import Image from "next/image";
import LazySearchBar from "./LazySearchBar";

function ArrowIcon() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			className="h-4 w-4"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M5 12h14" />
			<path d="M13 5l7 7-7 7" />
		</svg>
	);
}


export default function CustomsPortalBox() {
	const { t } = useLanguage();

	return (
		<section className="w-full px-4 pb-12 md:pb-10 lg:pb-6 pt-10 md:pt-14 lg:pt-6 xl:pt-4 lg:-mt-8 xl:-mt-12 lg:min-h-[88vh] -translate-y-20">
			<div className="mx-auto w-full max-w-8xl overflow-hidden rounded-3xl ">
				{/* Top (hero) */}
				<div className="px-6 pt-8 pb-4 text-center md:px-10 md:pt-10 md:pb-6">
					<h1 className="text-pretty mx-auto mt-4 max-w-3xl text-3xl font-semibold leading-tight text-neutral-900 md:text-5xl dark:text-white">{t("portal.title")}</h1>

					<div className="mt-3 max-w-2xl mx-auto">
						<LazySearchBar />
					</div>
				</div>

				{/* Cards row - Sunrise Layout */}
				<div className="flex items-end justify-center gap-8 md:gap-8 lg:gap-8 px-6 pb-6 md:pb-6 lg:pb-4 md:px-8 h-[440px] md:h-[460px] lg:h-[380px] xl:h-[360px] w-full max-w-full">
					{/* Card 1: National Cyber Crime Reporting Portal - Tallest (leftmost) */}
					<ExtendedLink
						href="https://cybercrime.gov.in/"
						aria-label="National Cyber Crime Reporting Portal"
					>
						<motion.div
							className="relative rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm flex-1 max-w-xs h-96 flex flex-col justify-between dark:bg-neutral-800 dark:border-neutral-700 overflow-hidden group cursor-pointer"
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
						>
							{/* Background image on hover */}
							<div
								className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-cover bg-center"
								style={{ backgroundImage: "url('/gallery/1.webp')" }}
							/>
							<span
								aria-hidden="true"
								className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring -rotate-45 dark:bg-neutral-700 dark:text-neutral-300"
							>
								<ArrowIcon />
							</span>

							<div className="flex items-center justify-center mt-6">
								<Image
									src="/columns/i4c.avif"
									alt="Cyber Crime Portal Logo"
									width={1500}
									height={1500}

									priority={false}
									className="scale-150 "
								/>
							</div>
							<div className="mt-20">
								<h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{t("portal.cards.link.cybercrime")}</h3>
								<p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">{t("portal.cards.news.description")}</p>
							</div>
						</motion.div>
					</ExtendedLink>

					{/* Card 2: Block Lost / Stolen Mobile - Medium height */}
					<ExtendedLink
						href="https://sancharsaathi.gov.in/sfc/"
						aria-label="Block Lost or Stolen Mobile"
					>
						<motion.div
							className="relative rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm flex-1 max-w-xs h-80 flex flex-col justify-between dark:bg-neutral-800 dark:border-neutral-700 overflow-hidden group cursor-pointer"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
						>
							{/* Background image on hover */}
							<div
								className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-cover bg-center"
								style={{ backgroundImage: "url('/gallery/2.webp')" }}
							/>
							<span
								aria-hidden="true"
								className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring-1 -rotate-45 dark:bg-neutral-700 dark:text-neutral-300"
							>
								<ArrowIcon />
							</span>
							<div className="flex items-center justify-center mt-4">
								<Image
									src="/columns/s-sathi.webp"
									alt="CEIR Portal Logo"
									width={800}
									height={800}
									priority={false}
									sizes="80px"
								/>
							</div>
							<div>
								<h3 className="text-base font-semibold text-neutral-900 dark:text-white">{t("portal.cards.link.ceir")}</h3>
								<p className="mt-2 text-sm leading-5 text-neutral-600 dark:text-neutral-300">{t("portal.cards.portal.description")}</p>
							</div>
						</motion.div>
					</ExtendedLink>

					{/* National Emblem - Center, shortest */}
					<motion.div
						className="flex flex-col items-center justify-center flex-1 min-w-sm max-w-md h-64"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.3 }}
					>
						<Image
							src="/national-emblem/MaharashtraPolice.avif"
							alt="Maharashtra Police Logo"
							width={140}
							height={140}
							quality={50}
							priority={false}
							sizes="140px"
						/>
						<h3 className="text-amber-800 font-semibold text-3xl text-center leading-tight dark:text-amber-400">{t("portal.emblem.city")}</h3>
					</motion.div>

					{/* Card 3: Report Fraud Call - Medium height */}
					<ExtendedLink
						href="https://www.ceir.gov.in/Request/CeirUserBlockRequestDirect.jsp"
						aria-label="Report Fraud Call"
					>
						<motion.div
							className="relative rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm flex-1 max-w-xs h-80 flex flex-col justify-between dark:bg-neutral-800 dark:border-neutral-700 overflow-hidden group cursor-pointer"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
						>
							{/* Background image on hover */}
							<div
								className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-cover bg-center"
								style={{ backgroundImage: "url('/gallery/3.webp')" }}
							/>
							<span
								aria-hidden="true"
								className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring-1 -rotate-45 dark:bg-neutral-700 dark:text-neutral-300"
							>
								<ArrowIcon />
							</span>
							<div className="flex items-center justify-center mt-4">
								<Image
									src="/columns/fraud-calls.avif"
									alt="Sanchar Saathi Logo"
									width={800}
									height={800}
									priority={false}
									sizes="80px"
								/>
							</div>
							<div>
								<h3 className="text-base font-semibold text-neutral-900 dark:text-white">{t("portal.cards.link.fraud")}</h3>
								<p className="mt-2 text-sm leading-5 text-neutral-600 dark:text-neutral-300">{t("portal.cards.about.description")}</p>
							</div>
						</motion.div>
					</ExtendedLink>

					{/* Card 4: Social Media Complaints - Tallest (rightmost) */}
					<ExtendedLink
						href="https://cybercrime.gov.in/Webform/report_abuse_social_media.aspx"
						aria-label="Social Media Complaints"
					>
						<motion.div
							className="relative rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm flex-1 max-w-xs h-96 flex flex-col justify-between dark:bg-neutral-800 dark:border-neutral-700 overflow-hidden group cursor-pointer"
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.5 }}
							whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
						>
							{/* Background image on hover */}
							<div
								className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 bg-cover bg-center"
								style={{ backgroundImage: "url('/gallery/4.webp')" }}
							/>
							<span
								aria-hidden="true"
								className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring-1 -rotate-45 dark:bg-neutral-700 dark:text-neutral-300"
							>
								<ArrowIcon />
							</span>
							<div className="flex items-center justify-center mt-6">
								<Image
									src="/columns/social-media.avif"
									alt="Social Media Complaints Logo"
									width={200}
									height={200}
									priority={false}
									sizes="80px"
								/>
							</div>
							<div className="mt-2">
								<h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{t("portal.cards.link.social")}</h3>
								<p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">{t("portal.cards.services.description")}</p>
							</div>
						</motion.div>
					</ExtendedLink>
				</div>
			</div>
		</section>
	);
}
