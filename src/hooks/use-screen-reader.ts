"use client";

import { useEffect, useState } from "react";

export const useScreenReader = () => {
	const [isEnabled, setIsEnabled] = useState(false);

	useEffect(() => {
		const handleMouseOver = (event: MouseEvent) => {
			if (!isEnabled) return;

			const target = event.target as HTMLElement;
			if (!target) return;

			// Get text content or aria-label
			const text = target.getAttribute("aria-label") || target.textContent?.trim() || target.getAttribute("title") || target.getAttribute("alt");

			if (text && text.length > 0) {
				// Use Web Speech API to speak the text
				if ("speechSynthesis" in window) {
					// Cancel any ongoing speech
					speechSynthesis.cancel();

					const utterance = new SpeechSynthesisUtterance(text);
					utterance.rate = 0.8;
					utterance.pitch = 1;
					utterance.volume = 0.7;

					speechSynthesis.speak(utterance);
				}
			}
		};

		if (isEnabled) {
			document.addEventListener("mouseover", handleMouseOver);
		}

		return () => {
			document.removeEventListener("mouseover", handleMouseOver);
		};
	}, [isEnabled]);

	const toggleScreenReader = () => {
		setIsEnabled(!isEnabled);
		if (isEnabled) {
			// Stop any ongoing speech when disabling
			speechSynthesis.cancel();
		}
	};

	return { isEnabled, toggleScreenReader };
};
