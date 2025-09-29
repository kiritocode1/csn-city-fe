"use client";

import { useLanguage } from "@/contexts/language-context";
import { usePoliceStations } from "@/hooks/usePoliceStations";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Building, ChevronDown, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ExtendedLink from "./ExtendedLink";
import { Button } from "./ui/button";

interface PoliceStationDropdownProps {
	className?: string;
}

const PoliceStationDropdown = ({ className }: PoliceStationDropdownProps) => {
	const { language } = useLanguage();
	const { stations, loading, error } = usePoliceStations();
	const [isOpen, setIsOpen] = useState(false);
	const [isClient, setIsClient] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleStationClick = () => {
		setIsOpen(false);
	};

	// Always render dropdown trigger; show content based on loading/error state inside the menu

	return (
		<div
			className={cn("relative", className)}
			ref={dropdownRef}
		>
			<Button
				onClick={() => setIsOpen(!isOpen)}
				variant="ghost"
				className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors duration-150 relative group flex items-center gap-2 text-sm w-full justify-between"
				aria-expanded={isOpen}
				aria-haspopup="true"
			>
				<span className="flex items-center gap-2">Police Stations</span>
				<motion.span
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.2, ease: "easeInOut" }}
				>
					<ChevronDown className="h-3 w-3" />
				</motion.span>
				<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
			</Button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ y: -10, opacity: 0, scale: 0.95 }}
						animate={{ y: 0, opacity: 1, scale: 1 }}
						exit={{ y: -10, opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="absolute z-50 w-80 mt-2 p-1 bg-background/95 backdrop-blur-lg rounded-lg shadow-lg border border-border/50 max-h-96 overflow-y-auto"
					>
						<div className="p-2">
							<div className="text-xs font-medium text-muted-foreground mb-2 px-2">Select Police Station</div>
							{loading && <div className="px-3 py-2 text-xs text-muted-foreground">Loading stations…</div>}
							{!loading && (error || stations.length === 0) && (
								<div className="px-3 py-2 text-xs text-muted-foreground">
									{error ? `Unable to load stations (${error})` : "No stations available"}
									<div className="mt-2">
										<ExtendedLink
											href="/stations"
											className="text-primary"
										>
											View all stations
										</ExtendedLink>
									</div>
								</div>
							)}
							{!loading && stations.length > 0 && (
								<div className="space-y-1">
									{stations.map((station) => (
										<motion.div
											key={station._id}
											whileHover={{ scale: 1.02 }}
											transition={{ duration: 0.15 }}
										>
											<ExtendedLink
												href={`/police-station/${station._id}`}
												onClick={handleStationClick}
												className="block p-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors duration-150 group"
											>
												<div className="flex items-start gap-3">
													<div className="flex-shrink-0 mt-0.5">
														<Building className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
													</div>
													<div className="flex-1 min-w-0">
														<div className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
															{language === "mr" ? station.name_in_marathi : station.name}
														</div>
														{language === "en" && station.name_in_marathi && <div className="text-xs text-muted-foreground mt-0.5">{station.name_in_marathi}</div>}
														<div className="text-xs text-muted-foreground mt-1 line-clamp-2">{language === "mr" ? station.address_in_marathi : station.address}</div>
														{station.contact_no && (
															<div className="flex items-center gap-1 mt-1">
																<Phone className="h-3 w-3 text-muted-foreground" />
																<span className="text-xs text-muted-foreground">{station.contact_no}</span>
															</div>
														)}
													</div>
												</div>
											</ExtendedLink>
										</motion.div>
									))}
								</div>
							)}
							<div className="border-t border-border mt-2 pt-2">
								<motion.div
									whileHover={{ scale: 1.02 }}
									transition={{ duration: 0.15 }}
								>
									<ExtendedLink
										href="/stations"
										onClick={handleStationClick}
										className="block p-2 text-center text-xs text-primary hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
									>
										View All Stations
									</ExtendedLink>
								</motion.div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default PoliceStationDropdown;
