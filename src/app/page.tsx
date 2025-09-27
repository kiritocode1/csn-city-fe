"use cache";

import CSMMap from "@/components/CSMMap";
import ImportantLinks from "@/components/ImportantLinks";
import LeadershipSectionHeader from "@/components/LeadershipSectionHeader";
import PeopleRow from "@/components/people-row";
import PictureScrollSection from "@/components/Picture-Scroll-Section";
import PoliceBentoGrid from "@/components/PoliceBentoGrid";
import PortalBoxResponsive from "@/components/portal-box-responsive";
import { PortalMarquee } from "@/components/PortalMarquee";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import * as React from "react";
const Page = async () => {
	// Cache for 1 hour
	cacheLife("1h");

	// Tag for on-demand revalidation
	cacheTag("page-home");
	return (
		<main
			role="main"
			aria-label="Police Department Homepage"
		>
			<section
				aria-label="Welcome to Police Department"
				className="min-h-screen w-full bg-white dark:bg-zinc-950 relative"
			>
				{/* Morning Haze - Light Mode */}
				<div
					className="absolute inset-0 z-0 dark:hidden"
					aria-hidden="true"
					style={{
						backgroundImage: `
							radial-gradient(circle at 50% 100%, rgba(253, 224, 71, 0.4) 0%, transparent 60%),
							radial-gradient(circle at 50% 100%, rgba(251, 191, 36, 0.4) 0%, transparent 70%),
							radial-gradient(circle at 50% 100%, rgba(244, 114, 182, 0.5) 0%, transparent 80%)
						`,
					}}
				/>
				{/* Dark Mode Gradient */}
				<div
					className="absolute inset-0 z-0 hidden dark:block"
					aria-hidden="true"
					style={{
						backgroundImage: `
							radial-gradient(circle at 50% 100%, rgba(253, 224, 71, 0.3) 0%, transparent 60%),
							radial-gradient(circle at 50% 100%, rgba(251, 191, 36, 0.3) 0%, transparent 70%),
							radial-gradient(circle at 50% 100%, rgba(244, 114, 182, 0.4) 0%, transparent 80%)
						`,
					}}
				/>
				{/* Portal Content */}
				<div className="relative z-10 w-full flex items-end justify-center min-h-[96vh]">
					<React.Suspense
						fallback={
							<div
								className="flex items-center justify-center min-h-[96vh]"
								aria-live="polite"
								aria-label="Loading portal"
							>
								<div className="text-lg">Loading Portal...</div>
							</div>
						}
					>
						<PortalBoxResponsive />
					</React.Suspense>
				</div>
			</section>

			{/* Leadership Team Section */}
			<section
				aria-labelledby="leadership-heading"
				className="w-full py-12 bg-muted/30 dark:bg-muted/10"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<LeadershipSectionHeader />

					<React.Suspense
						fallback={
							<div
								className="flex items-center justify-center py-12 xl:py-24"
								aria-live="polite"
								aria-label="Loading content"
							>
								<div className="text-lg">Loading Team...</div>
							</div>
						}
					>
						<PeopleRow />
					</React.Suspense>
				</div>
			</section>

			{/* Services Section */}
			<section
				aria-labelledby="services-heading"
				className="w-full py-12"
				id="main-content"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h1
						id="services-heading"
						className="sr-only"
					>
						Police Services and Information
					</h1>
					<React.Suspense
						fallback={
							<div
								className="flex items-center justify-center py-20"
								aria-live="polite"
								aria-label="Loading content"
							>
								<div className="text-lg">Loading Services...</div>
							</div>
						}
					>
						<PoliceBentoGrid />
					</React.Suspense>
				</div>
			</section>

			{/* Gallery Section */}
			<section
				aria-labelledby="gallery-heading"
				className="w-full py-12"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2
						id="gallery-heading"
						className="sr-only"
					>
						Photo Gallery
					</h2>
					<React.Suspense
						fallback={
							<div
								className="flex items-center justify-center py-12"
								aria-live="polite"
								aria-label="Loading content"
							>
								<div className="text-lg">Loading Gallery...</div>
							</div>
						}
					>
						<PictureScrollSection />
					</React.Suspense>
				</div>
			</section>

			{/* City Tour Section
			<section
				aria-labelledby="city-tour-heading"
				className="w-full py-12 bg-muted/30 dark:bg-muted/10"
			>
				<div className="text-center mb-8">
					<h2
						id="city-tour-heading"
						className="text-3xl font-bold text-foreground mb-2"
					>
						City Tour
					</h2>
					<p className="text-muted-foreground">Discover the beauty and heritage of Chhatrapati Sambhaji Nagar</p>
				</div>
				<React.Suspense
					fallback={
						<div
							className="flex items-center justify-center py-12"
							aria-live="polite"
							aria-label="Loading content"
						>
							<div className="text-lg">Loading City Tour...</div>
						</div>
					}
				>
					<ExpandableCards />
				</React.Suspense>
			</section> */}

			{/* Map Section */}
			<section
				aria-labelledby="map-heading"
				className="w-full py-12"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2
						id="map-heading"
						className="sr-only"
					>
						Interactive Map of Chhatrapati Sambhaji Nagar
					</h2>
					<React.Suspense
						fallback={
							<div
								className="flex items-center justify-center py-12"
								aria-live="polite"
								aria-label="Loading content"
							>
								<div className="text-lg">Loading Map...</div>
							</div>
						}
					>
						<CSMMap />
					</React.Suspense>

					<React.Suspense
						fallback={
							<div className="flex items-center justify-center py-12">
								<div className="text-lg">Loading Map...</div>
							</div>
						}
					>
						<PortalMarquee speed="normal" />
					</React.Suspense>
				</div>
			</section>

			{/* Important Links Section */}
			<section
				aria-labelledby="important-links-heading"
				className="w-full py-12 bg-muted/30 dark:bg-muted/10"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<React.Suspense
						fallback={
							<div
								className="flex items-center justify-center py-12"
								aria-live="polite"
								aria-label="Loading content"
							>
								<div className="text-lg">Loading Links...</div>
							</div>
						}
					>
						<ImportantLinks />
					</React.Suspense>
				</div>
			</section>
		</main>
	);
};

export default Page;
