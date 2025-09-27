"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Users } from "lucide-react";

type Officer = { name: string; position: string; email?: string; phone?: string; rank?: string; image?: string };

const SeniorOfficersPage = () => {
	// Fallback officer data
	const fallbackOfficers = [
		{
			name: "Shri. Pravin Pawar (I.P.S)",
			position: "Commissioner Of Police",
			email: "cp.aurangabad@mahapolice.gov.in",
			phone: "8888888888",
			rank: "CP",
			image: "/senior-officers/1.png",
		},
		{
			name: "Shri. Pankaj Atulkar",
			position: "Deputy Commissioner Of Police, Zone 1",
			email: "dcpzone1.abad@mahapolice.gov.in",
			phone: "0240-2240503",
			rank: "DCP",
			image: "/senior-officers/2.png",
		},
		{
			name: "Shri. Prashant swami",
			position: "Deputy Commissioner Of Police, Zone 2",
			email: "dcpzone2.abad@mahapolice.gov.in",
			phone: "0240-2240594",
			rank: "DCP",
			image: "/senior-officers/3.png",
		},
		{
			name: "Shri. Sharmishta Gharge - Walavalkar",
			position: "Deputy Commissioner Of Police, DCP HQ",
			email: "cp.aurangabad.dcp.hq@mahapolice.gov.in",
			phone: "0240-2326493",
			rank: "DCP",
			image: "/senior-officers/4.png",
		},
		{
			name: "Shri. Ratnakar navle",
			position: "Deputy Commissioner Of Police, DCP Crime",
			email: "dcpcrime.csncity@mahapolice.gov.in",
			phone: "0240-2326511",
			rank: "DCP",
			image: "/senior-officers/5.png",
		},
	];

	const [officers, setOfficers] = React.useState<Officer[]>(fallbackOfficers);
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
				const res = await fetch(`${base}/api/get-senior-officer`, { method: "GET" });
				const data = await res.json();
				const list = Array.isArray(data?.Data) ? data.Data : [];

				// Use API data if available, otherwise keep fallback data
				if (list.length > 0) {
					setOfficers(
						list.map((o: any, i: number) => ({
							name: String(o?.name ?? ""),
							position: String(o?.designation ?? ""),
							email: o?.email || undefined,
							phone: o?.mobile || o?.phone || undefined,
							rank: undefined,
							// preserve fallback image if API lacks one
							image: o?.image || fallbackOfficers[i]?.image,
						})),
					);
				}
				setLoading(false);
			} catch (e) {
				setError("Failed to load");
				setLoading(false);
			}
		};
		run();
	}, []);

	const getRankColor = (rank: string) => {
		switch (rank) {
			case "CP":
				return "destructive";
			case "DCP":
				return "default";
			case "ACP":
				return "secondary";
			case "DGP":
				return "destructive";
			case "ADGP":
				return "default";
			case "IGP":
				return "secondary";
			default:
				return "outline";
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Senior Officers</h1>
					<p className="text-muted-foreground text-lg">Meet the senior leadership team of Chhatrapati Sambhaji Nagar Police Department, dedicated to serving and protecting our community.</p>
				</div>

				{loading && <div className="text-center text-sm text-muted-foreground">Loading…</div>}

				{error && <div className="text-center text-sm text-red-600">{error}</div>}

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{officers.map((officer, index) => (
						<Card
							key={index}
							className="hover:shadow-lg transition-shadow"
						>
							<CardHeader>
								<div className="text-center">
									{officer.image ? (
										<div className="w-28 h-28 rounded-xl mx-auto mb-4 overflow-hidden ring-1 ring-border">
											<Image
												src={officer.image}
												alt={officer.name}
												width={160}
												height={160}
												className="w-full h-full object-cover"
												priority
											/>
										</div>
									) : (
										<div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
											<Users className="h-12 w-12 text-primary" />
										</div>
									)}
									<CardTitle className="text-xl">{officer.name}</CardTitle>
									<CardDescription className="text-base font-medium">{officer.position}</CardDescription>
									<div className="flex justify-center gap-2 mt-2">{officer.rank && <Badge variant={getRankColor(officer.rank)}>{officer.rank}</Badge>}</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<div className="flex items-center gap-2 text-sm">
										<Mail className="h-4 w-4 text-muted-foreground" />
										<span className="truncate">{officer.email || "—"}</span>
									</div>
									<div className="flex items-center gap-2 text-sm">
										<Phone className="h-4 w-4 text-muted-foreground" />
										<span>{officer.phone || "—"}</span>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};

export default SeniorOfficersPage;