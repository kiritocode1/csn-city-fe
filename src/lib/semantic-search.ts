import { SearchItem } from "@/data/searchData";

// Initialize the embedding pipeline (now using OpenAI)
export async function initializeSemanticSearch(_searchData: SearchItem[]) {
	// This function is kept for compatibility but now uses OpenAI
	// The actual initialization happens in the API route
	return;
}

// Enhanced text search function with natural language support
function textSearch(query: string, searchData: SearchItem[]): SearchItem[] {
	const searchTerm = query.toLowerCase();

	// Natural language synonyms and patterns
	const synonyms: { [key: string]: string[] } = {
		help: ["support", "assist", "aid", "service", "complaint", "emergency", "contact"],
		me: ["my", "myself", "personal"],
		need: ["want", "require", "looking for", "seeking"],
		find: ["search", "locate", "get", "access"],
		how: ["way", "method", "process", "procedure"],
		where: ["location", "place", "address"],
		when: ["time", "schedule", "hours"],
		what: ["information", "details", "about"],
		file: ["submit", "report", "register", "complaint", "fir"],
		check: ["status", "verify", "lookup", "track"],
		police: ["officer", "cop", "law enforcement", "authority"],
		emergency: ["urgent", "crisis", "help", "danger"],
		contact: ["phone", "call", "reach", "get in touch"],
		officer: ["police", "cop", "authority", "senior"],
		complaint: ["grievance", "issue", "problem", "concern"],
		status: ["progress", "update", "check", "tracking"],
		service: ["help", "support", "assistance", "aid"],
		// FIR and incident related synonyms
		first: ["initial", "primary", "main"],
		incident: ["event", "occurrence", "case", "matter", "fir"],
		report: ["fir", "complaint", "statement", "document"],
		fir: ["first information report", "incident report", "police report", "complaint"],
	};

	// Expand query with synonyms
	const expandQuery = (term: string): string[] => {
		const words = term.split(" ").filter((w) => w.length > 1);
		const expanded = [...words];

		words.forEach((word) => {
			if (synonyms[word]) {
				expanded.push(...synonyms[word]);
			}
		});

		return [...new Set(expanded)]; // Remove duplicates
	};

	const expandedTerms = expandQuery(searchTerm);

	console.log("🔍 Text Search Debug:", {
		query: searchTerm,
		expandedTerms,
		searchDataLength: searchData.length,
	});

	const results = searchData
		.map((item: SearchItem) => {
			let score = 0;
			const title = item.title.toLowerCase();
			const description = item.description.toLowerCase();
			const category = item.category.toLowerCase();
			const keywords = item.keywords.map((k) => k.toLowerCase());
			const allText = `${title} ${description} ${category} ${keywords.join(" ")}`;

			// Exact title match gets highest score
			if (title === searchTerm) score += 100;
			else if (title.includes(searchTerm)) score += 50;

			// Check each expanded term
			expandedTerms.forEach((term) => {
				// Title matches
				if (title.includes(term)) {
					score += term === searchTerm ? 50 : 30;
				}

				// Description matches
				if (description.includes(term)) {
					score += term === searchTerm ? 30 : 20;
				}

				// Category matches
				if (category.includes(term)) {
					score += term === searchTerm ? 20 : 15;
				}

				// Keywords matches
				const keywordMatches = keywords.filter((k) => k.includes(term)).length;
				score += keywordMatches * (term === searchTerm ? 10 : 8);
			});

			// Natural language patterns
			if (searchTerm.includes("help") || searchTerm.includes("support")) {
				if (category === "services" || category === "contact") score += 25;
				if (keywords.some((k) => ["complaint", "emergency", "contact"].includes(k))) score += 20;
			}

			if (searchTerm.includes("emergency") || searchTerm.includes("urgent")) {
				if (keywords.some((k) => ["emergency", "urgent", "contact"].includes(k))) score += 30;
			}

			if (searchTerm.includes("officer") || searchTerm.includes("police")) {
				if (keywords.some((k) => ["officer", "police", "senior", "leadership"].includes(k))) score += 25;
			}

			if (searchTerm.includes("file") || searchTerm.includes("submit")) {
				if (keywords.some((k) => ["complaint", "file", "submit"].includes(k))) score += 25;
			}

			if (searchTerm.includes("check") || searchTerm.includes("status")) {
				if (keywords.some((k) => ["status", "check", "fir"].includes(k))) score += 25;
			}

			// FIR and incident report patterns
			if (searchTerm.includes("fir") || searchTerm.includes("first") || searchTerm.includes("incident")) {
				if (keywords.some((k) => ["fir", "status", "check"].includes(k))) score += 30;
				if (title.toLowerCase().includes("fir")) score += 40;
			}

			if (searchTerm.includes("report") && (searchTerm.includes("first") || searchTerm.includes("incident"))) {
				if (keywords.some((k) => ["fir", "report"].includes(k))) score += 35;
			}

			// Partial word matches with higher weight for meaningful words
			const queryWords = searchTerm.split(" ").filter((w) => w.length > 2);
			queryWords.forEach((word) => {
				if (title.includes(word)) score += 5;
				if (description.includes(word)) score += 3;
				if (keywords.some((k) => k.includes(word))) score += 2;
			});

			// Boost score for items that match multiple terms
			const matchingTerms = expandedTerms.filter((term) => allText.includes(term)).length;
			if (matchingTerms > 1) {
				score += matchingTerms * 5;
			}

			return { item, score };
		})
		.filter((result) => result.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, 10)
		.map((result) => result.item);

	console.log("🔍 Text Search Results:", {
		query: searchTerm,
		results: results.slice(0, 3).map((r: SearchItem) => ({ title: r.title })),
	});

	return results;
}

// Semantic search function (now using server-side API)
export async function semanticSearch(query: string, searchData: SearchItem[], language: string = "en"): Promise<SearchItem[]> {
	try {
		const response = await fetch("/api/semantic-search", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ query, language }),
		});

		if (!response.ok) {
			throw new Error(`API request failed: ${response.status}`);
		}

		const data = await response.json();
		const results = data.results || [];

		// Restore icons from original search data
		const resultsWithIcons = results.map((result: any) => {
			const originalItem = searchData.find((item) => item.id === result.id);
			return {
				...result,
				icon: originalItem?.icon || null,
			};
		});

		return resultsWithIcons;
	} catch (error) {
		console.error("Semantic search API failed:", error);
		return [];
	}
}

// Hybrid search combining semantic and text search
export async function hybridSearch(query: string, searchData: SearchItem[], language: string = "en"): Promise<SearchItem[]> {
	// First try text search
	const textResults = textSearch(query, searchData);

	// If text search returns good results (more than 3), use them
	if (textResults.length >= 3) {
		console.log("🔍 Using text search results:", textResults.length);
		return textResults;
	}

	// If text search has few results, try semantic search as fallback
	console.log("🔍 Text search returned few results, trying semantic search...");
	try {
		const semanticResults = await semanticSearch(query, searchData, language);

		// If semantic search has results, combine them
		if (semanticResults.length > 0) {
			console.log("🔍 Combining text and semantic results");
			const combinedResults = combineSearchResults(semanticResults, textResults, query);
			return combinedResults;
		}

		// If no semantic results, return text results
		return textResults;
	} catch (error) {
		console.error("Semantic search failed, using text results only:", error);
		return textResults;
	}
}

// Combine semantic and text search results with deduplication and scoring
function combineSearchResults(semanticResults: SearchItem[], textResults: SearchItem[], _query: string): SearchItem[] {
	const resultMap = new Map<string, { item: SearchItem; score: number; source: "semantic" | "text" | "both" }>();

	// Add semantic results with higher base score
	semanticResults.forEach((item, index) => {
		const score = Math.max(0.1, 1 - index * 0.1); // Decreasing score based on position
		resultMap.set(item.id, { item, score, source: "semantic" });
	});

	// Add text results, boosting existing items or adding new ones
	textResults.forEach((item, index) => {
		const textScore = Math.max(0.1, 1 - index * 0.05); // Lower base score for text
		const existing = resultMap.get(item.id);

		if (existing) {
			// Boost existing semantic result with text match
			existing.score += textScore * 0.3; // 30% boost
			existing.source = "both";
		} else {
			// Add new text result
			resultMap.set(item.id, { item, score: textScore, source: "text" });
		}
	});

	// Convert back to array and sort by score
	return Array.from(resultMap.values())
		.sort((a, b) => b.score - a.score)
		.slice(0, 10) // Limit to 10 results
		.map((result) => result.item);
}
