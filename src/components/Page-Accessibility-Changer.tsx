"use client";

import { useScreenReader } from "@/hooks/use-screen-reader";
import { AlignJustify, FlipHorizontal, ImageOff, Link, Minus, Moon, MousePointer, Palette, Pause, PersonStanding, Plus, RotateCcw, Type, Volume2, VolumeX, Waves } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";

const drawerVariants = {
	hidden: {
		x: "100%",
		opacity: 0,
		rotateY: 5,
		transition: {
			type: "spring" as const,
			stiffness: 300,
			damping: 30,
		},
	},
	visible: {
		x: 0,
		opacity: 1,
		rotateY: 0,
		transition: {
			type: "spring" as const,
			stiffness: 300,
			damping: 30,
			mass: 0.8,
			staggerChildren: 0.07,
			delayChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: {
		x: 20,
		opacity: 0,
		transition: {
			type: "spring" as const,
			stiffness: 300,
			damping: 30,
		},
	},
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			type: "spring" as const,
			stiffness: 300,
			damping: 30,
			mass: 0.8,
		},
	},
};

const PageAccessibilityChanger = () => {
	const { theme, setTheme } = useTheme();

	const [isOpen, setIsOpen] = React.useState(false);
	const { isEnabled: screenReaderEnabled, toggleScreenReader } = useScreenReader();

	// Accessibility state management
	const [textSpacing, setTextSpacing] = React.useState(false);
	const [lineHeight, setLineHeight] = React.useState(false);
	const [dyslexiaFont, setDyslexiaFont] = React.useState(false);
	const [adhdMode, setAdhdMode] = React.useState(false);
	const [saturation, setSaturation] = React.useState(false);
	const [invertColors, setInvertColors] = React.useState(false);
	const [highlightLinks, setHighlightLinks] = React.useState(false);
	const [largeCursor, setLargeCursor] = React.useState(false);
	const [pauseAnimations, setPauseAnimations] = React.useState(false);
	const [hideImages, setHideImages] = React.useState(false);

	const handleFontSizeChange = (size: string) => {
		document.body.style.fontSize = size;
	};

	const applyGlobalCSS = (property: string, value: string) => {
		const root = document.documentElement;
		root.style.setProperty(property, value);
	};

	const removeGlobalCSS = (property: string) => {
		const root = document.documentElement;
		root.style.removeProperty(property);
	};

	const handleTextSpacing = () => {
		setTextSpacing(!textSpacing);
		if (!textSpacing) {
			applyGlobalCSS("--text-spacing", "0.16em");
			document.body.style.letterSpacing = "var(--text-spacing)";
		} else {
			removeGlobalCSS("--text-spacing");
			document.body.style.letterSpacing = "";
		}
	};

	const handleLineHeight = () => {
		setLineHeight(!lineHeight);
		if (!lineHeight) {
			applyGlobalCSS("--line-height", "1.6");
			document.body.style.lineHeight = "var(--line-height)";
		} else {
			removeGlobalCSS("--line-height");
			document.body.style.lineHeight = "";
		}
	};

	const handleDyslexiaFont = () => {
		setDyslexiaFont(!dyslexiaFont);
		if (!dyslexiaFont) {
			applyGlobalCSS("--dyslexia-font", "OpenDyslexic, Comic Sans MS, sans-serif");
			const style = document.createElement("style");
			style.id = "dyslexia-font";
			style.textContent = `
				body, body *:not([data-accessibility-panel]):not([data-accessibility-panel] *) { 
					font-family: var(--dyslexia-font) !important; 
				}
			`;
			document.head.appendChild(style);
		} else {
			removeGlobalCSS("--dyslexia-font");
			const existingStyle = document.getElementById("dyslexia-font");
			if (existingStyle) existingStyle.remove();
		}
	};

	const handleAdhdMode = () => {
		setAdhdMode(!adhdMode);
		if (!adhdMode) {
			applyGlobalCSS("--reduced-motion", "reduce");
			document.body.style.setProperty("animation-duration", "0.01ms");
			document.body.style.setProperty("animation-iteration-count", "1");
			document.body.style.setProperty("transition-duration", "0.01ms");
		} else {
			removeGlobalCSS("--reduced-motion");
			document.body.style.removeProperty("animation-duration");
			document.body.style.removeProperty("animation-iteration-count");
			document.body.style.removeProperty("transition-duration");
		}
	};

	const handleSaturation = () => {
		setSaturation(!saturation);
		if (!saturation) {
			applyGlobalCSS("--saturation", "0.3");
			const style = document.createElement("style");
			style.id = "saturation-filter";
			style.textContent = `
				body > *:not([data-accessibility-panel]):not([data-accessibility-panel] *) { 
					filter: saturate(var(--saturation)) !important; 
				}
				[data-accessibility-panel], [data-accessibility-panel] * {
					filter: none !important;
				}
			`;
			document.head.appendChild(style);
		} else {
			removeGlobalCSS("--saturation");
			const existingStyle = document.getElementById("saturation-filter");
			if (existingStyle) existingStyle.remove();
		}
	};

	const handleInvertColors = () => {
		setInvertColors(!invertColors);
		if (!invertColors) {
			applyGlobalCSS("--invert", "1");
			const style = document.createElement("style");
			style.id = "invert-filter";
			style.textContent = `
				body > *:not([data-accessibility-panel]):not([data-accessibility-panel] *) { 
					filter: invert(var(--invert)) !important; 
				}
				[data-accessibility-panel], [data-accessibility-panel] * {
					filter: none !important;
				}
			`;
			document.head.appendChild(style);
		} else {
			removeGlobalCSS("--invert");
			const existingStyle = document.getElementById("invert-filter");
			if (existingStyle) existingStyle.remove();
		}
	};

	const handleHighlightLinks = () => {
		setHighlightLinks(!highlightLinks);
		if (!highlightLinks) {
			applyGlobalCSS("--link-highlight", "2px solid #ff0000");
			const style = document.createElement("style");
			style.id = "link-highlight";
			style.textContent = "a { border: var(--link-highlight) !important; background: rgba(255, 0, 0, 0.1) !important; }";
			document.head.appendChild(style);
		} else {
			removeGlobalCSS("--link-highlight");
			const existingStyle = document.getElementById("link-highlight");
			if (existingStyle) existingStyle.remove();
		}
	};

	const handleLargeCursor = () => {
		setLargeCursor(!largeCursor);
		if (!largeCursor) {
			applyGlobalCSS("--cursor-size", "large");
			document.body.style.cursor =
				"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath d='M0 0h32v32H0z' fill='%23000'/%3E%3C/svg%3E\"), auto";
		} else {
			removeGlobalCSS("--cursor-size");
			document.body.style.cursor = "";
		}
	};

	const handlePauseAnimations = () => {
		setPauseAnimations(!pauseAnimations);
		if (!pauseAnimations) {
			applyGlobalCSS("--animation-play-state", "paused");
			const style = document.createElement("style");
			style.id = "pause-animations";
			style.textContent = "* { animation-play-state: var(--animation-play-state) !important; }";
			document.head.appendChild(style);
		} else {
			removeGlobalCSS("--animation-play-state");
			const existingStyle = document.getElementById("pause-animations");
			if (existingStyle) existingStyle.remove();
		}
	};

	const handleHideImages = () => {
		setHideImages(!hideImages);
		if (!hideImages) {
			applyGlobalCSS("--hide-images", "none");
			const style = document.createElement("style");
			style.id = "hide-images";
			style.textContent = "img, picture, video, svg { display: var(--hide-images) !important; }";
			document.head.appendChild(style);
		} else {
			removeGlobalCSS("--hide-images");
			const existingStyle = document.getElementById("hide-images");
			if (existingStyle) existingStyle.remove();
		}
	};

	const resetAllSettings = () => {
		handleFontSizeChange("1rem");
		setTheme("light");
		setTextSpacing(false);
		setLineHeight(false);
		setDyslexiaFont(false);
		setAdhdMode(false);
		setSaturation(false);
		setInvertColors(false);
		setHighlightLinks(false);
		setLargeCursor(false);
		setPauseAnimations(false);
		setHideImages(false);
		toggleScreenReader(); // Reset screen reader if enabled

		// Clear all custom styles
		document.body.style.fontSize = "";
		document.body.style.letterSpacing = "";
		document.body.style.lineHeight = "";
		document.body.style.fontFamily = "";
		document.body.style.filter = "";
		document.body.style.cursor = "";
		document.body.style.removeProperty("animation-duration");
		document.body.style.removeProperty("animation-iteration-count");
		document.body.style.removeProperty("transition-duration");

		// Remove custom style elements
		["link-highlight", "pause-animations", "hide-images", "saturation-filter", "invert-filter", "dyslexia-font"].forEach((id) => {
			const element = document.getElementById(id);
			if (element) element.remove();
		});

		// Clear CSS custom properties
		["--text-spacing", "--line-height", "--dyslexia-font", "--reduced-motion", "--saturation", "--invert", "--link-highlight", "--cursor-size", "--animation-play-state", "--hide-images"].forEach(
			(prop) => {
				removeGlobalCSS(prop);
			},
		);
	};

	// Keyboard shortcut handler
	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === "F2") {
				event.preventDefault();
				setIsOpen(!isOpen);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen]);

	const accessibilityOptions = [
		{ icon: Plus, label: "Bigger Text", action: () => handleFontSizeChange("1.2rem") },
		{ icon: Minus, label: "Smaller Text", action: () => handleFontSizeChange("0.8rem") },
		{ icon: AlignJustify, label: "Text Spacing", action: handleTextSpacing, active: textSpacing },
		{ icon: Type, label: "Line Height", action: handleLineHeight, active: lineHeight },
		{ icon: Type, label: "Dyslexia Friendly", action: handleDyslexiaFont, active: dyslexiaFont },
		{ icon: Waves, label: "ADHD Mode", action: handleAdhdMode, active: adhdMode },
		{ icon: Palette, label: "Saturation", action: handleSaturation, active: saturation },
		{ icon: Moon, label: "Light-Dark", action: () => setTheme(theme === "light" ? "dark" : "light") },
		{ icon: FlipHorizontal, label: "Invert Colors", action: handleInvertColors, active: invertColors },
		{ icon: Link, label: "Highlight Links", action: handleHighlightLinks, active: highlightLinks },

		{ icon: screenReaderEnabled ? VolumeX : Volume2, label: "Screen Reader", action: toggleScreenReader, active: screenReaderEnabled },
		{ icon: MousePointer, label: "Cursor", action: handleLargeCursor, active: largeCursor },
		{ icon: Pause, label: "Pause Animation", action: handlePauseAnimations, active: pauseAnimations },
		{ icon: ImageOff, label: "Hide Images", action: handleHideImages, active: hideImages },
	];

	return (
		<div
			className="fixed bottom-8 right-8 z-50"
			data-accessibility-panel
		>
			<Drawer
				direction="right"
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<DrawerTrigger asChild>
					<div className="group">
						<Button
							aria-label="Accessibility options"
							className="flex items-center justify-center gap-3 rounded-full w-16 group-hover:w-64 h-16  bg-slate-200 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-lg transition-all duration-300 overflow-hidden pr-4 pl-0 group-hover:pl-6"
						>
							<PersonStanding className="w-64 h-64 scale-[2.5] shrink-0 dark:text-white text-black hover:translate-x-0  translate-x-1 transition-all duration-300 group-hover:translate-x-0 " />
							<div className="overflow-hidden max-w-0 group-hover:max-w-[160px] transition-all duration-300">
								<span className="block text-black text-base font-medium whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
									Accessibility options
								</span>
							</div>
						</Button>
					</div>
				</DrawerTrigger>
				<DrawerContent className="h-full w-1/2 ml-auto p-6 rounded-l-2xl shadow-xl">
					<motion.div
						variants={drawerVariants}
						initial="hidden"
						animate="visible"
						className="h-full flex flex-col"
					>
						{/* Header */}
						<motion.div variants={itemVariants}>
							<DrawerHeader className="px-0 pb-4">
								<div className="flex items-center justify-between">
									<DrawerTitle className="text-xl font-semibold text-black">Accessibility options</DrawerTitle>
									<div className="flex items-center gap-2">
										<Button
											variant="outline"
											size="sm"
											className="text-black border-gray-200 hover:bg-gray-50"
										>
											Ctrl+F2
										</Button>
										<DrawerClose asChild>
											<Button
												variant="ghost"
												size="sm"
												className="h-8 w-8 p-0"
											>
												×
											</Button>
										</DrawerClose>
									</div>
								</div>
							</DrawerHeader>
						</motion.div>

						{/* Grid of accessibility options */}
						<motion.div
							variants={itemVariants}
							className="flex-1 grid grid-cols-3 gap-4"
						>
							{accessibilityOptions.map((option, index) => (
								<motion.div
									key={index}
									variants={itemVariants}
									transition={{ delay: index * 0.05 }}
								>
									<Button
										variant="outline"
										onClick={option.action}
										className={`h-20 w-full flex flex-col items-center justify-center gap-2 rounded-lg transition-all ${
											option.active
												? "bg-purple-100 border-purple-300 text-purple-700 dark:bg-purple-900 dark:border-purple-600 dark:text-purple-300"
												: "bg-white hover:bg-gray-50 border-gray-200 text-black dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-white"
										}`}
									>
										<option.icon className={`w-6 h-6 ${option.active ? "text-purple-700 dark:text-purple-300" : "text-black dark:text-white"}`} />
										<span className={`text-xs font-medium ${option.active ? "text-purple-700 dark:text-purple-300" : "text-black dark:text-white"}`}>{option.label}</span>
									</Button>
								</motion.div>
							))}
						</motion.div>

						{/* Footer */}
						<motion.div
							variants={itemVariants}
							className="mt-6 flex flex-col items-center justify-between"
						>
							<Button
								variant="outline"
								onClick={resetAllSettings}
								className="text-purple-600 border-purple-200 hover:bg-purple-50 flex items-center gap-2"
							>
								<RotateCcw className="w-4 h-4" />
								Reset All Settings
							</Button>
							<span className="text-xs text-gray-500">Created by Chhatrapati Shambhaji Nagar City Police </span>
						</motion.div>
					</motion.div>
				</DrawerContent>
			</Drawer>
		</div>
	);
};

export default PageAccessibilityChanger;
