"use client";

import { cn } from "@/lib/utils";
import { Mic, MicOff } from "lucide-react";
import { useEffect, useState } from "react";

interface VoiceVisualizerProps {
	isListening: boolean;
	onToggle: () => void;
	disabled?: boolean;
	className?: string;
	visualizerBars?: number;
}

export function VoiceVisualizer({ isListening, onToggle, disabled = false, className, visualizerBars = 24 }: VoiceVisualizerProps) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<div className={cn("flex items-center gap-2", className)}>
			<button
				type="button"
				onClick={onToggle}
				disabled={disabled}
				className={cn(
					"group w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
					disabled
						? "opacity-50 cursor-not-allowed"
						: isListening
						? "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
						: "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black/70 dark:text-white/70",
				)}
				title={isListening ? "Stop recording" : "Start voice input"}
			>
				{isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
			</button>

			{isListening && (
				<div className="h-4 w-20 flex items-center justify-center gap-0.5">
					{[...Array(visualizerBars)].map((_, i) => (
						<div
							key={i}
							className={cn("w-0.5 rounded-full transition-all duration-300", isListening ? "bg-red-500 dark:bg-red-400 animate-pulse" : "bg-black/10 dark:bg-white/10 h-1")}
							style={
								isListening && isClient
									? {
											height: `${20 + Math.random() * 80}%`,
											animationDelay: `${i * 0.05}s`,
									  }
									: undefined
							}
						/>
					))}
				</div>
			)}
		</div>
	);
}
