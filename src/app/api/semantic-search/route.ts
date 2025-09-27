import { getSearchData } from "@/data/searchData";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client (server-side only)
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY, // Server-side env var
});

// Cache for embeddings with 1-hour expiry
interface CachedEmbedding {
	embedding: number[];
	timestamp: number;
}

interface CachedSimilarity {
	similarities: number[];
	timestamp: number;
}

const embeddingCache = new Map<string, CachedEmbedding>();
const similarityCache = new Map<string, CachedSimilarity>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Global variables for caching
let documentEmbeddings: number[][] = [];
let documents: any[] = [];

// Generate embedding using OpenAI
async function generateEmbedding(text: string): Promise<number[]> {
	// Check cache first
	const cacheKey = text.toLowerCase().trim();
	const cached = embeddingCache.get(cacheKey);

	if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
		return cached.embedding;
	}

	try {
		const response = await openai.embeddings.create({
			model: "text-embedding-ada-002",
			input: text,
		});

		const embedding = response.data[0].embedding;

		// Cache the result
		embeddingCache.set(cacheKey, {
			embedding,
			timestamp: Date.now(),
		});

		return embedding;
	} catch (error) {
		console.error("OpenAI embedding generation failed:", error);
		throw error;
	}
}

// Cosine similarity function
function cosineSimilarity(a: number[], b: number[]): number {
	if (a.length !== b.length) return 0;

	let dotProduct = 0;
	let normA = 0;
	let normB = 0;

	for (let i = 0; i < a.length; i++) {
		dotProduct += a[i] * b[i];
		normA += a[i] * a[i];
		normB += b[i] * b[i];
	}

	if (normA === 0 || normB === 0) return 0;

	return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Initialize embeddings
async function initializeEmbeddings(searchData: any[]): Promise<void> {
	if (documentEmbeddings.length === searchData.length && documents.length === searchData.length) {
		return; // Already initialized
	}

	try {
		documents = searchData;
		const documentTexts = documents.map((doc) => `${doc.title} ${doc.description} ${doc.category} ${doc.keywords.join(" ")}`);

		// Generate embeddings for all documents
		documentEmbeddings = await Promise.all(documentTexts.map((text) => generateEmbedding(text)));

		console.log("🔍 Server: Embeddings initialized", {
			documentCount: documents.length,
			embeddingCount: documentEmbeddings.length,
		});
	} catch (error) {
		console.error("Failed to initialize embeddings:", error);
		throw error;
	}
}

export async function POST(request: NextRequest) {
	try {
		const { query, language = "en" } = await request.json();

		if (!query || typeof query !== "string") {
			return NextResponse.json({ error: "Query is required" }, { status: 400 });
		}

		// Create a proper translation function based on language
		const translations = {
			en: {
				"nav.home.simple": "Home",
				"nav.about.us": "About Us",
				"nav.about.senior": "Senior Officer Profile",
				"nav.about.organization": "Organizational Structure",
				"nav.about.jurisdiction": "Jurisdiction Map",
				"nav.about.initiatives": "Initiatives",
				"nav.about.gallery": "Photo Gallery",
				"nav.about.history": "History of Nashik Police",
				"nav.about.stations": "Police Station Incharge",
				"nav.about.contact": "Contact Us",
				"nav.about.feedback": "Feedback",
				"nav.special.crime.unit1": "Crime Branch Unit 1",
				"nav.special.crime.unit2": "Crime Branch Unit 2",
				"nav.special.crime.pcb": "Central Crime Unit (PCB)",
				"nav.special.crime.antiGunda": "Anti-Gunda Squad",
				"nav.special.crime.antiNarcotic": "Anti-Narcotic Cell",
				"nav.special.crime.antiExtortion": "Anti-Extortion Cell",
				"nav.special.crime.technical": "Technical Analysis",
				"nav.special.crime.wing": "Technical Analysis Wing",
				"nav.special.crime.women": "Women Safety Cell",
				"nav.special.crime.economic": "Economic Offence Wing",
				"nav.special.control": "Control Room",
				"nav.special.headquarters": "Police Headquarters",
				"nav.special.bomb": "Bomb Detection and Disposal Squad",
				"nav.special.transport": "Motor Transport Organization",
				"nav.citizen.cyberTips": "Cyber Security Tips",
				"nav.citizen.cyberAwareness": "Cyber Awareness",
				"nav.citizen.recruitment": "Police Recruitment",
				"nav.citizen.pressRelease": "Press Release",
				"nav.citizen.rti": "Right to Information",
				"nav.citizen.publicService": "Maharashtra Public Service Rights Act",
				"nav.citizen.passport": "Passport Status",
				"nav.citizen.websites": "Useful Websites",
				"nav.citizen.wall": "Citizen Wall",
				"nav.citizen.tenders": "Tenders",
				"nav.police.circular": "Circular / Notification",
				"nav.police.welfare": "Welfare Initiatives",
				"nav.police.media": "Media Coverage",
				"nav.police.crimeReview": "Crime Review",
				"nav.police.goodWork": "Good Work",
			},
			mr: {
				"nav.home.simple": "मुख्यपृष्ठ",
				"nav.about.us": "आमच्या विषयी",
				"nav.about.senior": "वरिष्ठ अधिकारी प्रोफाइल",
				"nav.about.organization": "संघटनात्मक रचना",
				"nav.about.jurisdiction": "अधिकार क्षेत्र नकाशा",
				"nav.about.initiatives": "उपक्रम",
				"nav.about.gallery": "छायाचित्र संग्रह",
				"nav.about.history": "नाशिक पोलीसांचा इतिहास",
				"nav.about.stations": "पोलीस स्टेशन प्रभारी",
				"nav.about.contact": "आमच्याशी संपर्क साधा",
				"nav.about.feedback": "अभिप्राय",
				"nav.special.crime.unit1": "गुन्हे शाखा विविध क्रमांक १",
				"nav.special.crime.unit2": "गुन्हे शाखा विविध क्रमांक २",
				"nav.special.crime.pcb": "मध्यवर्ती गुन्हे शाखा",
				"nav.special.crime.antiGunda": "गुंडाविरोधी पथक",
				"nav.special.crime.antiNarcotic": "अंमली पदार्थ विरोधी सेल",
				"nav.special.crime.antiExtortion": "खंडणी विरोधी पथक",
				"nav.special.crime.technical": "तांत्रिक विश्लेषण",
				"nav.special.crime.wing": "तांत्रिक विश्लेषण विंग",
				"nav.special.crime.women": "महिला सुरक्षा कक्ष",
				"nav.special.crime.economic": "आर्थिक गुन्हे शाखा",
				"nav.special.control": "नियंत्रण कक्ष",
				"nav.special.headquarters": "पोलीस मुख्यालय",
				"nav.special.bomb": "बाँब शोधक व नाशक पथक",
				"nav.special.transport": "मोटर वाहन विभाग",
				"nav.citizen.cyberTips": "सायबर सुरक्षा टिप्स",
				"nav.citizen.cyberAwareness": "सायबर जनजागृती",
				"nav.citizen.recruitment": "पोलीस भरती",
				"nav.citizen.pressRelease": "प्रेस प्रकाशन",
				"nav.citizen.rti": "माहितीचा अधिकार",
				"nav.citizen.publicService": "महाराष्ट्र लोकसेवा हक्क अधिनियम",
				"nav.citizen.passport": "पासपोर्ट स्थिती",
				"nav.citizen.websites": "उपयुक्त वेबसाइट",
				"nav.citizen.wall": "सिटीझन वॉल",
				"nav.citizen.tenders": "निविदा",
				"nav.police.circular": "परिपत्रक / अधिसूचना",
				"nav.police.welfare": "कल्याणकारी उपक्रम",
				"nav.police.media": "वृत्तांकन",
				"nav.police.crimeReview": "गुन्हे आढावा",
				"nav.police.goodWork": "उत्कृष्ट कामगिरी",
			},
		};

		const t = (key: string) => translations[language as keyof typeof translations][key as keyof (typeof translations)[keyof typeof translations]] || key;

		// Get search data and strip React components for serialization
		const rawSearchData = getSearchData(t);
		const searchData = rawSearchData.map((item) => ({
			...item,
			icon: null, // Remove React components for server processing
		}));

		// Initialize embeddings if needed
		await initializeEmbeddings(searchData);

		// Generate query embedding
		const queryEmbedding = await generateEmbedding(query);

		// Check similarity cache first
		const similarityCacheKey = `${query.toLowerCase().trim()}_${documentEmbeddings.length}`;
		const cachedSimilarity = similarityCache.get(similarityCacheKey);

		let similarities: number[];
		if (cachedSimilarity && Date.now() - cachedSimilarity.timestamp < CACHE_DURATION) {
			similarities = cachedSimilarity.similarities;
			console.log("🔍 Server: Using cached similarities for query:", query);
		} else {
			// Calculate similarities
			similarities = documentEmbeddings.map((docEmb) => cosineSimilarity(queryEmbedding, docEmb));

			// Cache the similarities
			similarityCache.set(similarityCacheKey, {
				similarities,
				timestamp: Date.now(),
			});

			console.log("🔍 Server: Calculated new similarities for query:", query);
		}

		// Map to results with scores and sort
		const results = documents
			.map((doc, i) => ({
				doc,
				score: similarities[i],
			}))
			.filter((result) => result.score > 0.1) // Filter out very low similarity
			.sort((a, b) => b.score - a.score)
			.slice(0, 10) // Limit to 10 results
			.map((result) => result.doc);

		console.log("🔍 Server: Semantic search results:", {
			query,
			resultCount: results.length,
			topResults: results.slice(0, 3).map((r: any) => ({ title: r.title, score: similarities[documents.indexOf(r)] })),
		});

		return NextResponse.json({ results });
	} catch (error) {
		console.error("Semantic search API error:", error);
		return NextResponse.json({ error: "Semantic search failed" }, { status: 500 });
	}
}
