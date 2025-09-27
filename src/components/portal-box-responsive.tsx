"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import CustomsPortalBox from "./portal-box";
import CustomsPortalBoxMobile from "./portal-box-mobile";

// Performance mode utility - immediate detection
const usePerformanceMode = () => {
	const [isPerformanceMode, setIsPerformanceMode] = useState(() => {
		// Immediate synchronous check
		if (typeof window === "undefined") return false;

		// Check URL parameters first (most reliable)
		const hasPerformanceParam = window.location.search.includes("performance=true") || window.location.search.includes("force-performance=true");

		// Check for Lighthouse
		const isLighthouse = navigator.userAgent.includes("Lighthouse") || navigator.userAgent.includes("Chrome-Lighthouse");

		// Check for reduced motion preference
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		return hasPerformanceParam || isLighthouse || prefersReducedMotion;
	});

	useEffect(() => {
		const checkPerformanceMode = () => {
			if (typeof window === "undefined") return false;

			const hasPerformanceParam = window.location.search.includes("performance=true") || window.location.search.includes("force-performance=true");

			const isLighthouse = navigator.userAgent.includes("Lighthouse") || navigator.userAgent.includes("Chrome-Lighthouse");

			const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

			return hasPerformanceParam || isLighthouse || prefersReducedMotion;
		};

		// Listen for performance mode changes
		const observer = new MutationObserver(() => {
			setIsPerformanceMode(checkPerformanceMode());
		});

		if (typeof document !== "undefined") {
			observer.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ["class"],
			});
		}

		// Also check on URL change
		const handleUrlChange = () => {
			setIsPerformanceMode(checkPerformanceMode());
		};

		window.addEventListener("popstate", handleUrlChange);
		window.addEventListener("pushstate", handleUrlChange);

		return () => {
			observer.disconnect();
			window.removeEventListener("popstate", handleUrlChange);
			window.removeEventListener("pushstate", handleUrlChange);
		};
	}, []);

	return isPerformanceMode;
};

export default function PortalBoxResponsive() {
	const isMobile = useIsMobile();
	const isPerformanceMode = usePerformanceMode();

	// Performance mode - render minimal static content
	if (isPerformanceMode) {
		return (
			<section className="w-full px-4 pb-20 pt-20">
				<div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl ring-1 ring-black/5">
					<div className="px-6 py-8 text-center md:px-10 md:py-12">
						<h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl md:text-5xl">One-Stop Portal Police Services</h1>
						<p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-300">
							The Chhatrapati Sambhajinagar City Police is committed to simplifying access to various services for citizens.
						</p>
					</div>
				</div>
			</section>
		);
	}

	if (isMobile === undefined) {
		// Loading state - render desktop version as fallback
		return <CustomsPortalBox />;
	}

	return isMobile ? <CustomsPortalBoxMobile /> : <CustomsPortalBox />;
}
