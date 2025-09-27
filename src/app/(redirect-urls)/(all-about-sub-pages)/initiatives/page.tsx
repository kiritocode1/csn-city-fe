"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import React from "react";

export default function InitiativesPage() {
	const { language } = useLanguage();
	const [items, setItems] = React.useState<
		Array<{
			_id: string;
			title: string;
			title_in_marathi?: string;
			photo?: string[];
			date?: string;
		}>
	>([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		const run = async () => {
			try {
				const base = process.env.NEXT_PUBLIC_BACKEND_URL;
				if (!base) {
					setError("Backend URL missing");
					setLoading(false);
					return;
				}
				const res = await fetch(`${base}/api/get-all-wellfare?tag=initiative`, { method: "GET" });
				const data = await res.json();
				const list = Array.isArray(data) ? data : Array.isArray(data?.Data) ? data.Data : [];
				setItems(
					list.map((x: any) => ({
						_id: String(x?._id),
						title: String(x?.title ?? ""),
						title_in_marathi: x?.title_in_marathi,
						photo: Array.isArray(x?.photo) ? x.photo : undefined,
						date: x?.date,
					})),
				);
				setLoading(false);
			} catch (e) {
				setError("Failed to load");
				setLoading(false);
			}
		};
		run();
	}, []);

	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-5xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "उपक्रम" : "Initiatives"}</CardTitle>
					<CardDescription>{language === "mr" ? "छत्रपती संभाजीनगर शहर पोलीस तर्फे नागरिक-केंद्रित उपक्रम" : "Citizen-centric initiatives by the Police"}</CardDescription>
				</CardHeader>
				<CardContent>
					{loading && <div className="text-sm text-muted-foreground">Loading…</div>}
					{error && <div className="text-sm text-red-600">{error}</div>}
					<div className="grid gap-4">
						{items.map((it) => (
							<Card
								key={it._id}
								className="border"
							>
								<CardContent className="p-4">
									<div className="space-y-2">
										<h3 className="font-semibold text-base">{language === "mr" ? it.title_in_marathi ?? it.title : it.title}</h3>
										{it.date && <p className="text-xs text-muted-foreground">{it.date}</p>}
										{it.photo && it.photo.length > 0 && (
											<div className="flex gap-2 flex-wrap">
												{it.photo.slice(0, 3).map((src, idx) => (
													<img
														key={idx}
														src={src}
														alt="initiative"
														className="h-28 w-auto rounded-md border"
													/>
												))}
											</div>
										)}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
