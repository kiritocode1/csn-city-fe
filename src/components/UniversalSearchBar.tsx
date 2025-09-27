"use client";

import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import { ChevronRight, CornerRightUp, Mic, MicOff } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAutoResizeTextarea } from "../hooks/use-auto-resize-textarea";
// Import search data
import { getSearchData, SearchItem } from "../data/searchData";
// Import semantic search
import { hybridSearch } from "@/lib/semantic-search";
import ExtendedLink from "./ExtendedLink";

// TypeScript declarations for Speech Recognition API
interface SpeechRecognition extends EventTarget {
	continuous: boolean;
	interimResults: boolean;
	maxAlternatives: number;
	lang: string;
	start(): void;
	stop(): void;
	abort(): void;
	onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
	onend: ((this: SpeechRecognition, ev: Event) => any) | null;
	onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
	onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
	onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
}

interface SpeechRecognitionEvent extends Event {
	resultIndex: number;
	results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
	error: string;
	message: string;
}

interface SpeechRecognitionResultList {
	readonly length: number;
	item(index: number): SpeechRecognitionResult;
	[index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
	readonly length: number;
	item(index: number): SpeechRecognitionAlternative;
	[index: number]: SpeechRecognitionAlternative;
	isFinal: boolean;
}

interface SpeechRecognitionAlternative {
	transcript: string;
	confidence: number;
}

declare global {
	interface Window {
		SpeechRecognition: new () => SpeechRecognition;
		webkitSpeechRecognition: new () => SpeechRecognition;
	}
}

const UniversalSearchBar = () => {
	const [mounted, setMounted] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<SearchItem[]>([]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isListening, setIsListening] = useState(false);
	const [speechSupported, setSpeechSupported] = useState(false);
	const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
	const [isSearching, setIsSearching] = useState(false);
	const { t, language } = useLanguage();
	const resultsRef = useRef<HTMLDivElement>(null);

	const { textareaRef, adjustHeight } = useAutoResizeTextarea({
		minHeight: 52,
		maxHeight: 200,
	});

	// Avoid SSR/CSR mismatches by rendering only after mount
	useEffect(() => {
		setMounted(true);
	}, []);

	// After mount, set focus programmatically to avoid SSR autoFocus mismatch
	useEffect(() => {
		if (mounted) {
			textareaRef.current?.focus();
		}
	}, [mounted, textareaRef]);

	// Optimized search data with memoization - only generate when mounted
	const searchData = useMemo(() => {
		if (!mounted) return [];
		return getSearchData(t);
	}, [t, language, mounted]);

	// Initialize speech recognition
	useEffect(() => {
		initializeSpeechRecognition();
	}, []);

	const initializeSpeechRecognition = () => {
		if (typeof window !== "undefined") {
			const isSecureContext = window.isSecureContext || window.location.protocol === "https:" || window.location.hostname === "localhost";

			if (!isSecureContext) {
				console.warn("Speech recognition requires HTTPS or localhost");
				setSpeechSupported(false);
				return;
			}

			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

			if (SpeechRecognition) {
				try {
					const recognitionInstance = new SpeechRecognition();
					recognitionInstance.continuous = false;
					recognitionInstance.interimResults = false;
					recognitionInstance.maxAlternatives = 1;

					recognitionInstance.onstart = () => {
						setIsListening(true);
					};

					recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
						let transcript = "";
						for (let i = event.resultIndex; i < event.results.length; i++) {
							transcript += event.results[i][0].transcript;
						}

						if (transcript.trim()) {
							setQuery((prev) => {
								const newText = prev + (prev && !prev.endsWith(" ") ? " " : "") + transcript;
								return newText.length <= 1000 ? newText : newText.slice(0, 1000);
							});
						}
					};

					recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
						console.error("Speech recognition error:", event.error);
						setIsListening(false);
					};

					recognitionInstance.onend = () => {
						setIsListening(false);
					};

					setRecognition(recognitionInstance);
					setSpeechSupported(true);
				} catch (error) {
					console.error("Error initializing speech recognition:", error);
					setSpeechSupported(false);
				}
			} else {
				setSpeechSupported(false);
			}
		}
	};

	const toggleSpeechRecognition = () => {
		if (!recognition) {
			console.error("Speech recognition not initialized");
			return;
		}

		if (isListening) {
			try {
				recognition.stop();
			} catch (error) {
				console.error("Error stopping speech recognition:", error);
				setIsListening(false);
			}
		} else {
			if (!navigator.onLine) {
				console.warn("No internet connection");
				return;
			}

			try {
				recognition.start();
			} catch (error) {
				console.error("Error starting speech recognition:", error);
				setIsListening(false);
			}
		}
	};

	// Search function - memoized to prevent re-creation
	const performSearch = useMemo(() => {
		return async (searchQuery: string) => {
			if (!searchQuery.trim()) {
				setResults([]);
				setIsSearching(false);
				return;
			}

			setIsSearching(true);

			try {
				// Use hybrid search for best results (combines text + semantic)
				// Only run semantic search in browser environment
				const filteredResults =
					typeof window !== "undefined"
						? await hybridSearch(searchQuery, searchData, language)
						: searchData
								.filter((item: SearchItem) => {
									const searchTerm = searchQuery.toLowerCase();
									return (
										item.title.toLowerCase().includes(searchTerm) ||
										item.description.toLowerCase().includes(searchTerm) ||
										item.keywords.some((keyword: string) => keyword.toLowerCase().includes(searchTerm)) ||
										item.category.toLowerCase().includes(searchTerm)
									);
								})
								.slice(0, 10);

				console.log(
					"Search results before setting:",
					filteredResults.slice(0, 3).map((item) => ({ id: item.id, title: item.title })),
				);
				setResults(filteredResults);
				setSelectedIndex(0);
			} catch (error) {
				console.error("Search failed:", error);
				// Fallback to text search
				const fallbackResults = searchData
					.filter((item: SearchItem) => {
						const searchTerm = searchQuery.toLowerCase();
						return (
							item.title.toLowerCase().includes(searchTerm) ||
							item.description.toLowerCase().includes(searchTerm) ||
							item.keywords.some((keyword: string) => keyword.toLowerCase().includes(searchTerm)) ||
							item.category.toLowerCase().includes(searchTerm)
						);
					})
					.slice(0, 10);
				console.log(
					"Fallback search results:",
					fallbackResults.slice(0, 3).map((item) => ({ id: item.id, title: item.title })),
				);
				setResults(fallbackResults);
				setSelectedIndex(0);
			} finally {
				setIsSearching(false);
			}
		};
	}, [searchData]);

	// Debounced search - fixed to prevent infinite re-renders
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			performSearch(query);
		}, 300);

		return () => clearTimeout(timeoutId);
	}, [query, performSearch]);

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		setQuery(value);
		adjustHeight();
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!isOpen || results.length === 0) return;

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setSelectedIndex((prev) => (prev + 1) % results.length);
				break;
			case "ArrowUp":
				e.preventDefault();
				setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
				break;
			case "Enter":
				e.preventDefault();
				if (results[selectedIndex]) {
					window.location.href = results[selectedIndex].href;
				}
				break;
			case "Escape":
				setIsOpen(false);
				setQuery("");
				setResults([]);
				break;
		}
	};

	const handleSearch = () => {
		if (results[selectedIndex]) {
			window.location.href = results[selectedIndex].href;
		}
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Scroll selected item into view
	useEffect(() => {
		if (resultsRef.current && selectedIndex >= 0) {
			const selectedElement = resultsRef.current.querySelector(`[data-index="${selectedIndex}"]`);
			if (selectedElement) {
				selectedElement.scrollIntoView({ block: "nearest" });
			}
		}
	}, [selectedIndex]);

	if (!mounted) {
		return null;
	}

	return (
		<div
			className="relative w-full max-w-3xl mx-auto min-w-0 sm:min-w-[400px] p-2 sm:p-4"
			ref={resultsRef}
		>
			{/* Search Input */}
			<div className="w-full py-2 sm:py-4">
				<div className="relative max-w-xl w-full mx-auto">
					<Textarea
						placeholder={isListening ? "" : language === "mr" ? "सर्व सेवा शोधा..." : "Search all services..."}
						className={cn(
							"w-full max-w-xl bg-black/5 dark:bg-white/5 rounded-3xl pl-4 sm:pl-6 pr-12 sm:pr-16",
							"placeholder:text-black/50 dark:placeholder:text-white/50",
							"border-none ring-black/20 dark:ring-white/20",
							"text-black dark:text-white text-wrap",
							"overflow-y-auto resize-none",
							"focus-visible:ring-0 focus-visible:ring-offset-0",
							"transition-all duration-200 ease-out",
							"leading-[1.2] py-3 sm:py-[16px]",
							"min-h-[48px] sm:min-h-[52px]",
							"max-h-[200px]",
							"text-sm sm:text-base",
							"[&::-webkit-resizer]:hidden",
							isListening && "ring-2 ring-red-200 dark:ring-red-800 bg-red-50/50 dark:bg-red-900/10",
						)}
						ref={textareaRef}
						value={query}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						onFocus={() => setIsOpen(true)}
						// Avoid hydration issues from differing focus state
						autoFocus={false}
					/>
					{speechSupported && (
						<div
							className={cn(
								"absolute top-1/2 -translate-y-1/2 rounded-xl bg-black/5 dark:bg-white/5 py-1 px-1 transition-all duration-200",
								query ? "right-8 sm:right-10" : "right-2 sm:right-3",
							)}
						>
							<button
								type="button"
								onClick={toggleSpeechRecognition}
								disabled={false}
								className={cn(
									"group w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
									isListening
										? "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
										: "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black/70 dark:text-white/70",
								)}
								title={isListening ? "Stop recording" : "Start voice input"}
							>
								{isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
							</button>
						</div>
					)}

					<button
						onClick={handleSearch}
						type="button"
						className={cn(
							"absolute top-1/2 -translate-y-1/2 right-2 sm:right-3",
							"rounded-xl bg-black/5 dark:bg-white/5 py-1 px-1",
							"transition-all duration-200",
							query ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
						)}
					>
						<CornerRightUp className="w-3 h-3 sm:w-4 sm:h-4 text-black/70 dark:text-white/70" />
					</button>

					{isListening && (
						<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
							<div className="h-4 w-32 flex items-center justify-center gap-0.5">
								{[...Array(24)].map((_, i) => (
									<div
										key={i}
										className="w-0.5 rounded-full bg-red-500 dark:bg-red-400 animate-pulse transition-all duration-300"
										style={{
											height: `${20 + Math.random() * 80}%`,
											animationDelay: `${i * 0.05}s`,
										}}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Search Results */}
			{isOpen && (query || results.length > 0) && (
				<div className="absolute top-full left-2 right-2 sm:left-4 sm:right-4 mt-2 bg-background/95 backdrop-blur-lg border border-border rounded-xl shadow-2xl z-50 max-h-80 sm:max-h-96 overflow-y-auto">
					{isSearching ? (
						<div className="p-4 text-center text-muted-foreground">
							<div className="flex items-center justify-center gap-2">
								<div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
								{language === "mr" ? "शोधत आहे..." : "Searching..."}
							</div>
						</div>
					) : results.length === 0 && query ? (
						<div className="p-4 text-center text-muted-foreground">{language === "mr" ? "कोणतेही परिणाम सापडले नाहीत" : "No results found"}</div>
					) : (
						<div className="py-2">
							{results.map((item, index) => {
								console.log("Rendering search result:", { id: item.id, title: item.title, index });
								return (
									<ExtendedLink
										key={item.id}
										href={item.href}
										data-index={index}
										className={cn("flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 hover:bg-muted/50 transition-colors", index === selectedIndex && "bg-muted/50")}
										onClick={() => {
											setIsOpen(false);
											setQuery("");
											setResults([]);
										}}
									>
										<div className="flex-shrink-0 text-muted-foreground">{item.icon}</div>
										<div className="flex-1 min-w-0">
											<div className="font-medium text-foreground truncate text-sm sm:text-base">{item.title}</div>
											<div className="text-xs sm:text-sm text-muted-foreground truncate">{item.description}</div>
											<div className="text-xs text-muted-foreground/70 mt-1">{item.category}</div>
										</div>
										<div className="flex-shrink-0 text-muted-foreground">
											<ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
										</div>
									</ExtendedLink>
								);
							})}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default UniversalSearchBar;
