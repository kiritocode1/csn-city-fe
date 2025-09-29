import { useEffect, useState } from "react";

interface PoliceStation {
	_id: string;
	name: string;
	name_in_marathi: string;
	address: string;
	address_in_marathi: string;
	contact_no: string;
	email: string;
	zone?: {
		name: string;
		name_in_marathi: string;
	};
	division?: {
		name: string;
		name_in_marathi: string;
	};
}

interface UsePoliceStationsReturn {
	stations: PoliceStation[];
	loading: boolean;
	error: string | null;
}

export const usePoliceStations = (): UsePoliceStationsReturn => {
	const [stations, setStations] = useState<PoliceStation[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchStations = async () => {
			try {
				setLoading(true);
				setError(null);

				// Use local API proxy to avoid CORS and centralize backend URL
				const response = await fetch("/api/stations", { cache: "no-store" });

				if (!response.ok) {
					throw new Error(`HTTP ${response.status}: ${response.statusText}`);
				}

				const data = await response.json();

				// If API returned upstreamError, surface it but don't hard-fail
				if (data && typeof data.upstreamError === "string" && data.upstreamError.length > 0) {
					setError(data.upstreamError);
				}

				// Transform the data to include required fields (allow empty array)
				if (Array.isArray(data.stations)) {
					const transformedStations = data.stations.map((station: any) => ({
						_id: station._id,
						name: station.name,
						name_in_marathi: station.name_in_marathi,
						address: station.address || "",
						address_in_marathi: station.address_in_marathi || "",
						contact_no: station.contact_no || "",
						email: station.email || "",
						zone: station.zone || null,
						division: station.division || null,
					}));
					setStations(transformedStations);
				} else {
					setStations([]);
					setError("Invalid data format received from server");
				}
			} catch (err) {
				console.error("Error fetching police stations:", err);
				const message = err instanceof Error ? err.message : "Network error";
				setError(message);
				setStations([]);
			} finally {
				setLoading(false);
			}
		};

		fetchStations();
	}, []);

	return { stations, loading, error };
};

export type { PoliceStation };
