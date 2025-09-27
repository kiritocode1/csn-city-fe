"use client";

import { ReactNode } from "react";
import { useLanguage } from "@/contexts/language-context";

interface ClientWrapperProps {
	children: (t: (key: string) => string, language: string) => ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
	const { t, language } = useLanguage();
	return <>{children(t, language)}</>;
}
