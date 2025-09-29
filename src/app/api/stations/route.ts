import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Simple proxy to backend to avoid CORS and centralize URL
export async function GET() {
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://csn-city-backend-production.up.railway.app";

	try {
		// Add timeout and a simple retry to be resilient to transient upstream failures
		const fetchWithTimeout = async (url: string, timeoutMs = 10000) => {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
			try {
				return await fetch(url, {
					cache: "no-store",
					headers: { Accept: "application/json" },
					signal: controller.signal,
				});
			} finally {
				clearTimeout(timeoutId);
			}
		};

		let response: Response | null = null;
		let lastError: unknown = null;
		for (let attempt = 1; attempt <= 2; attempt++) {
			try {
				response = await fetchWithTimeout(`${backendUrl}/api/get-stations`, 10000);
				break;
			} catch (err) {
				lastError = err;
			}
		}

		if (!response) {
			throw lastError ?? new Error("No response from upstream");
		}

		if (!response.ok) {
			// Graceful fallback: return empty list so UI keeps working
			return NextResponse.json({ stations: [], upstreamError: `Upstream error ${response.status}: ${response.statusText}` }, { status: 200, headers: { "Cache-Control": "no-store" } });
		}

		const data = await response.json();
		return NextResponse.json(data, {
			status: 200,
			headers: {
				"Cache-Control": "no-store",
			},
		});
	} catch (error: unknown) {
		console.error("Stations proxy failed:", error);
		const message = error instanceof Error ? error.message : "Unknown error";
		// Graceful fallback: return empty stations array so client doesn't hard-fail
		return NextResponse.json({ stations: [], upstreamError: `Failed to fetch stations: ${message}` }, { status: 200, headers: { "Cache-Control": "no-store" } });
	}
}
