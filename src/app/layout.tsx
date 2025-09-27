import EmergencyContactsDrawer from "@/components/EmergencyContactsDrawer";
import Navbar from "@/components/navbar";
import PageAccessibilityChanger from "@/components/Page-Accessibility-Changer";
import PoliceFooter from "@/components/PoliceFooter";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/language-context";
import type { Metadata, Viewport } from "next";
import "./globals.css";
{
	/** we live in a cruel cruel world */
}
export const metadata: Metadata = {
	title: "Chhatrapati Sambhajinagar City Police | Official Website",
	description: "Official website of Chhatrapati Sambhajinagar City Police. Access police services, report crimes, emergency contacts, and community safety information.",
	keywords: [
		"Chhatrapati Sambhajinagar City Police",
		"City Police",
		"Crime Report",
		"Emergency",
		"Safety",

		"Maharashtra Police",
		"Police Verification",
		"FIR Registration",
		"Traffic Police",
		"Women Safety",
		"Community Policing",
		"Police Station",
		"Emergency Contacts",
		"Police Services",
	],
	authors: [{ name: "Chhatrapati Sambhajinagar City Police" }],
	creator: "Chhatrapati Sambhajinagar City Police",
	publisher: "Chhatrapati Sambhajinagar City Police",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	alternates: {
		canonical: "https://csmpolice.vercel.app",
		languages: {
			en: "https://csmpolice.vercel.app",
			mr: "https://csmpolice.vercel.app?lang=mr",
		},
	},
	openGraph: {
		type: "website",
		locale: "en_IN",
		url: "https://csmpolice.vercel.app",
		title: "Chhatrapati Sambhajinagar City Police | Official Website",
		description: "Official website of Chhatrapati Sambhajinagar City Police. Access police services, report crimes, emergency contacts, and community safety information.",
		siteName: "Chhatrapati Sambhajinagar City Police",
		images: [
			{
				url: "/opengraph-image",
				width: 1200,
				height: 630,
				alt: "Chhatrapati Sambhajinagar City Police Emblem",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Chhatrapati Sambhajinagar City Police | Official Website",
		description: "Official website of Chhatrapati Sambhajinagar City Police. Access police services, report crimes, emergency contacts, and community safety information.",
		images: ["/opengraph-image"],
	},
	viewport: {
		width: "device-width",
		initialScale: 1,
		maximumScale: 1,
	},

	category: "Government",
	classification: "Official Government Website",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<body className="antialiased">
				<ThemeProvider>
					<LanguageProvider>
						<Navbar />
						{children}
						<PoliceFooter />
						<PageAccessibilityChanger />
						<EmergencyContactsDrawer />
					</LanguageProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
