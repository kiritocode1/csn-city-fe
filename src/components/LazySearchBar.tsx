"use client";

import { Suspense, lazy } from "react";
import { Search } from "lucide-react";

// Lazy load the heavy search component
const UniversalSearchBar = lazy(() => import("./UniversalSearchBar"));

// Lightweight fallback component
const SearchBarFallback = () => (
	<div className="relative w-full max-w-3xl mx-auto min-w-0 sm:min-w-[400px] p-2 sm:p-4">
		<div className="w-full py-2 sm:py-4">
			<div className="relative max-w-xl w-full mx-auto">
				<div className="w-full max-w-xl bg-black/5 dark:bg-white/5 rounded-3xl pl-4 sm:pl-6 pr-12 sm:pr-16 py-3 sm:py-4 min-h-[48px] sm:min-h-[52px] flex items-center">
					<div className="flex items-center gap-2 sm:gap-3 text-black/50 dark:text-white/50">
						<Search className="w-3 h-3 sm:w-4 sm:h-4" />
						<span className="text-xs sm:text-sm">Loading search...</span>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default function LazySearchBar() {
	return (
		<Suspense fallback={<SearchBarFallback />}>
			<UniversalSearchBar />
		</Suspense>
	);
}
