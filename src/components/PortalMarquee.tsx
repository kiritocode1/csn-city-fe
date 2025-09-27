"use client";

import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import React from "react";
import ExtendedLink from "./ExtendedLink";

// Define the type for individual portal props
interface Portal {
	src: string;
	alt: string;
	title: string;
	description: string;
	link: string;
	gradient: {
		from: string;
		via: string;
		to: string;
	};
}

// Define the props for the main component
interface PortalMarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
	speed?: "normal" | "slow" | "fast";
}

/**
 * A responsive, self-contained, and infinitely scrolling marquee component for police portals.
 * It pauses on hover and uses shadcn/ui theme variables for styling.
 */
const PortalMarquee = React.forwardRef<HTMLDivElement, PortalMarqueeProps>(({ speed = "normal", className, ...props }, ref) => {
	const { t } = useLanguage();
	const [paused, setPaused] = React.useState(false);
	const [reducedMotion, setReducedMotion] = React.useState(false);

	React.useEffect(() => {
		if (typeof window === "undefined" || !window.matchMedia) return;
		const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
		const onChange = (e: MediaQueryListEvent | MediaQueryList) => setReducedMotion("matches" in e ? e.matches : (e as MediaQueryList).matches);
		onChange(mql);
		// Support older browsers
		if (mql.addEventListener) mql.addEventListener("change", onChange as (this: MediaQueryList, ev: MediaQueryListEvent) => any);
		else mql.addListener(onChange as (this: MediaQueryList, ev: MediaQueryListEvent) => any);
		return () => {
			if (mql.removeEventListener) mql.removeEventListener("change", onChange as (this: MediaQueryList, ev: MediaQueryListEvent) => any);
			else mql.removeListener(onChange as (this: MediaQueryList, ev: MediaQueryListEvent) => any);
		};
	}, []);

	// Portal data with gradients
	const portals: Portal[] = [
		{
			src: "/portals/maharashtrapolice.webp",
			alt: "Maharashtra Police Portal",
			title: t("portals.maharashtra.title"),
			description: t("portals.maharashtra.description"),
			link: "https://mahapolice.gov.in",
			gradient: {
				from: "#1e40af",
				via: "#3b82f6",
				to: "#60a5fa",
			},
		},
		{
			src: "/portals/cybercrime.webp",
			alt: "Cyber Crime Portal",
			title: t("portals.cybercrime.title"),
			description: t("portals.cybercrime.description"),
			link: "https://cybercrime.gov.in",
			gradient: {
				from: "#dc2626",
				via: "#ef4444",
				to: "#f87171",
			},
		},
		{
			src: "/portals/grp.webp",
			alt: "GRP Portal",
			title: t("portals.grp.title"),
			description: t("portals.grp.description"),
			link: "https://grp.mahapolice.gov.in",
			gradient: {
				from: "#059669",
				via: "#10b981",
				to: "#34d399",
			},
		},
		{
			src: "/portals/pgportal.webp",
			alt: "PG Portal",
			title: t("portals.pg.title"),
			description: t("portals.pg.description"),
			link: "https://pg.mahapolice.gov.in",
			gradient: {
				from: "#7c3aed",
				via: "#8b5cf6",
				to: "#a78bfa",
			},
		},
		{
			src: "/portals/aaplesarkar.webp",
			alt: "Aaple Sarkar Portal",
			title: t("portals.aaple.title"),
			description: t("portals.aaple.description"),
			link: "https://aaplesarkar.mahaonline.gov.in",
			gradient: {
				from: "#ea580c",
				via: "#f97316",
				to: "#fb923c",
			},
		},
	];

	// Map speed prop to animation duration
	const durationMap = {
		normal: "40s",
		slow: "80s",
		fast: "5s",
	};
	const animationDuration = durationMap[speed];

	return (
		<>
			{/* The @keyframes for the marquee animation are defined directly here for robustness. */}
			<style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>

			<section
				ref={ref}
				aria-label={t("portals.title")}
				className={cn("w-full bg-background text-foreground rounded-lg border overflow-hidden", className)}
				{...props}
			>
				{/* Header Section */}
				<div className="p-6 md:p-8 lg:p-10">
					<div className="pb-6 md:pb-8 border-b">
						<h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-balance text-center">{t("portals.title")}</h2>
					</div>
				</div>

				{/* Marquee Section */}
				<div
					className="w-full overflow-hidden"
					style={{
						maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
					}}
				>
					<div
						className="flex w-max items-center gap-4 py-4 pr-4 transition-all duration-300 ease-in-out"
						style={{
							animation: reducedMotion ? "none" : `marquee ${animationDuration} linear infinite`,
							animationPlayState: paused || reducedMotion ? "paused" : "running",
						}}
					>
						{/* Render portals twice to create a seamless loop */}
						{[...portals, ...portals].map((portal, index) => (
							<ExtendedLink
								key={index}
								href={portal.link}
								target="_blank"
								rel="noopener noreferrer"
								className="group relative w-64 h-48 shrink-0 flex flex-col items-center justify-center rounded-lg bg-secondary/70 overflow-hidden hover:bg-secondary/90 transition-all duration-300"
								onMouseEnter={() => setPaused(true)}
								onMouseLeave={() => setPaused(false)}
								onFocus={() => setPaused(true)}
								onBlur={() => setPaused(false)}
							>
								{/* Gradient background revealed on hover */}
								<div
									style={
										{
											"--from": portal.gradient.from,
											"--via": portal.gradient.via,
											"--to": portal.gradient.to,
										} as React.CSSProperties
									}
									className="absolute inset-0 scale-150 opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100 bg-gradient-to-br from-[var(--from)] via-[var(--via)] to-[var(--to)]"
								/>

								{/* Portal Image */}
								<div className="relative h-16 w-16 mb-3 flex items-center justify-center">
									<img
										src={portal.src}
										alt={portal.alt}
										className="h-full w-auto object-contain"
									/>
								</div>

								{/* Portal Title */}
								<h3 className="relative text-sm font-semibold text-center mb-2 px-2 line-clamp-2 group-hover:text-white dark:group-hover:text-white">{portal.title}</h3>

								{/* Portal Description */}
								<p className="relative text-xs text-muted-foreground text-center px-2 line-clamp-3 group-hover:text-white dark:group-hover:text-white">{portal.description}</p>
							</ExtendedLink>
						))}
					</div>
				</div>
			</section>
		</>
	);
});

PortalMarquee.displayName = "PortalMarquee";

export { PortalMarquee };
