"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ExtendedLink from "../ExtendedLink";

type DropdownOption = {
	label: string;
	href?: string | null;
	onClick?: () => void;
	Icon?: React.ReactNode;
	subOptions?: DropdownOption[];
};

type DropdownMenuProps = {
	options: DropdownOption[];
	children: React.ReactNode;
	className?: string;
	buttonClassName?: string;
	onOptionClick?: () => void;
	index?: number;
	openDropdown?: number | null;
	onDropdownToggle?: (index: number) => void;
};

const DropdownMenu = ({ options, children, className, buttonClassName, onOptionClick, index, openDropdown, onDropdownToggle }: DropdownMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => {
		if (onDropdownToggle && index !== undefined) {
			onDropdownToggle(index);
		}
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (option: DropdownOption) => {
		if (option.onClick) {
			option.onClick();
		}
		if (onOptionClick) {
			onOptionClick();
		}
		setIsOpen(false);
	};

	// Sync with parent's openDropdown state
	useEffect(() => {
		if (index !== undefined && openDropdown !== undefined) {
			setIsOpen(openDropdown === index);
		}
	}, [openDropdown, index]);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
				if (onDropdownToggle && index !== undefined) {
					onDropdownToggle(-1); // Close all dropdowns
				}
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onDropdownToggle, index]);

	return (
		<div
			ref={dropdownRef}
			className={cn("relative", className)}
		>
			<Button
				onClick={toggleDropdown}
				variant="ghost"
				className={cn("px-4 py-2 text-muted-foreground hover:text-foreground transition-colors duration-150 relative group", buttonClassName)}
				aria-expanded={isOpen}
				aria-haspopup="true"
			>
				{children}
				<motion.span
					className="ml-1"
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
						className="absolute z-50 w-48 mt-2 p-1 bg-background/95 backdrop-blur-lg rounded-lg shadow-lg border border-border/50 flex flex-col gap-1"
					>
						{options && options.length > 0 ? (
							options.map((option, index) => (
								<motion.div
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -10 }}
									transition={{
										duration: 0.15,
										delay: index * 0.05,
									}}
									key={option.label}
									className="relative group"
								>
									{option.subOptions ? (
										<div className="relative">
											<button className="px-3 py-2 cursor-pointer text-sm rounded-md w-full text-left flex items-center gap-x-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-150 justify-between">
												<div className="flex items-center gap-x-2">
													{option.Icon}
													{option.label}
												</div>
												<ChevronDown className="h-3 w-3" />
											</button>
											<div className="absolute left-full top-0 ml-1 p-1 bg-background/95 backdrop-blur-lg rounded-lg shadow-lg border border-border/50 flex flex-col gap-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-48">
												{option.subOptions.map((subOption, subIndex) => (
													<div key={subOption.label}>
														{subOption.href ? (
															<ExtendedLink
																href={subOption.href}
																className="px-3 py-2 cursor-pointer text-sm rounded-md w-full text-left flex items-center gap-x-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
																onClick={() => handleOptionClick(subOption)}
															>
																{subOption.Icon}
																{subOption.label}
															</ExtendedLink>
														) : (
															<button
																onClick={() => handleOptionClick(subOption)}
																className="px-3 py-2 cursor-pointer text-sm rounded-md w-full text-left flex items-center gap-x-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
															>
																{subOption.Icon}
																{subOption.label}
															</button>
														)}
													</div>
												))}
											</div>
										</div>
									) : option.href ? (
										<ExtendedLink
											href={option.href}
											className="px-3 py-2 cursor-pointer text-sm rounded-md w-full text-left flex items-center gap-x-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
											onClick={() => handleOptionClick(option)}
										>
											{option.Icon}
											{option.label}
										</ExtendedLink>
									) : (
										<button
											onClick={() => handleOptionClick(option)}
											className="px-3 py-2 cursor-pointer text-sm rounded-md w-full text-left flex items-center gap-x-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
										>
											{option.Icon}
											{option.label}
										</button>
									)}
								</motion.div>
							))
						) : (
							<div className="px-3 py-2 text-muted-foreground text-xs">No options</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export { DropdownMenu };
