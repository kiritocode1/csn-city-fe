"use client";

import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { Button } from "./ui/button";

interface LanguageSwitchProps {
	className?: string;
}

const LanguageSwitch = ({ className }: LanguageSwitchProps) => {
	const { language, setLanguage } = useLanguage();

	const toggleLanguage = () => {
		setLanguage(language === "en" ? "mr" : "en");
	};

	return (
		<Button
			onClick={toggleLanguage}
			variant="ghost"
			size="sm"
			className={cn("flex items-center gap-2 text-sm hover:text-foreground transition-colors duration-150", className)}
			aria-label={`Switch to ${language === "en" ? "Marathi" : "English"}`}
			suppressHydrationWarning
		>
			<Globe
				className="h-4 w-4"
				suppressHydrationWarning
			/>
			<span
				className="font-medium"
				suppressHydrationWarning
			>
				{language === "en" ? "मराठी" : "English"}
			</span>
		</Button>
	);
};

export default LanguageSwitch;
