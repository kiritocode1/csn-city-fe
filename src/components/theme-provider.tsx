"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";

interface ThemeProviderProps {
	children: any;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			{children}
		</NextThemesProvider>
	);
}
