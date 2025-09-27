"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface Card {
	id: number;
	title: string;
	image: string;
	content: string;
	author?: {
		name: string;
		role: string;
		image: string;
	};
}

const cityCards: Card[] = [
	{
		id: 1,
		title: "Historic Forts",
		image: "/gallery/1.webp",
		content: "Explore the magnificent forts that tell the story of Chhatrapati Sambhaji Nagar's rich heritage and architectural marvels.",
	},
	{
		id: 2,
		title: "Cityscape Views",
		image: "/gallery/2.webp",
		content: "Witness the beautiful cityscape of Chhatrapati Sambhaji Nagar with its modern infrastructure and traditional charm.",
	},
	{
		id: 3,
		title: "Landmarks",
		image: "/gallery/3.webp",
		content: "Discover the iconic landmarks that define the cultural and historical significance of our city.",
	},
	{
		id: 4,
		title: "Natural Beauty",
		image: "/gallery/4.webp",
		content: "Experience the natural beauty and serene landscapes that surround Chhatrapati Sambhaji Nagar.",
	},
];

const smoothEasing = [0.4, 0.0, 0.2, 1] as const;

export interface ExpandableCardsProps {
	cards?: Card[];
	selectedCard?: number | null;
	onSelect?: (id: number | null) => void;
	className?: string;
	cardClassName?: string;
}

export default function ExpandableCards({ cards = cityCards, selectedCard: controlledSelected, onSelect, className = "", cardClassName = "" }: ExpandableCardsProps) {
	const [internalSelected, setInternalSelected] = useState<number | null>(null);
	const scrollRef = useRef<HTMLDivElement>(null);

	const selectedCard = controlledSelected !== undefined ? controlledSelected : internalSelected;

	useEffect(() => {
		if (scrollRef.current) {
			const scrollWidth = scrollRef.current.scrollWidth;
			const clientWidth = scrollRef.current.clientWidth;
			scrollRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
		}
	}, []);

	const handleCardClick = (id: number) => {
		if (selectedCard === id) {
			if (onSelect) onSelect(null);
			else setInternalSelected(null);
		} else {
			if (onSelect) onSelect(id);
			else setInternalSelected(id);
			// Center the clicked card in view
			const cardElement = document.querySelector(`[data-card-id="${id}"]`);
			if (cardElement) {
				cardElement.scrollIntoView({
					behavior: "smooth",
					block: "nearest",
					inline: "center",
				});
			}
		}
	};

	return (
		<div className={`flex w-full flex-col gap-4 overflow-scroll p-4 ${className}`}>
			<div
				ref={scrollRef}
				className="scrollbar-hide mx-auto flex overflow-x-auto pt-4 pb-8"
				style={{
					scrollSnapType: "x mandatory",
					scrollPaddingLeft: "20%",
				}}
			>
				{cards.map((card) => (
					<motion.div
						key={card.id}
						layout
						data-card-id={card.id}
						className={`bg-background relative mr-4 h-[300px] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border shadow-lg ${cardClassName}`}
						style={{
							scrollSnapAlign: "start",
						}}
						animate={{
							width: selectedCard === card.id ? "500px" : "200px",
						}}
						transition={{
							duration: 0.5,
							ease: smoothEasing,
						}}
						onClick={() => handleCardClick(card.id)}
					>
						<div className="relative h-full w-[200px]">
							<Image
								src={card.image || "/placeholder.svg"}
								alt={card.title}
								width={200}
								height={300}
								className="h-full w-full object-cover"
								quality={75}
								priority={false}
								sizes="(max-width: 768px) 200px, 200px"
							/>
							<div className="absolute inset-0 bg-black/20" />
							<div className="absolute inset-0 flex flex-col justify-center p-6 text-white">
								<h2 className="text-2xl font-bold">{card.title}</h2>
							</div>
						</div>
						<AnimatePresence mode="popLayout">
							{selectedCard === card.id && (
								<motion.div
									initial={{ width: 0, opacity: 0, filter: "blur(5px)" }}
									animate={{ width: "300px", opacity: 1, filter: "blur(0px)" }}
									exit={{ width: 0, opacity: 0, filter: "blur(5px)" }}
									transition={{
										duration: 0.5,
										ease: smoothEasing,
										opacity: { duration: 0.3, delay: 0.2 },
									}}
									className="bg-background absolute top-0 right-0 h-full"
								>
									<motion.div
										className="flex h-full flex-col justify-start p-8"
										initial={{ opacity: 0, x: 20, filter: "blur(5px)" }}
										animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
										exit={{ opacity: 0, x: 20, filter: "blur(5px)" }}
										transition={{ delay: 0.4, duration: 0.3 }}
									>
										<h3 className="text-foreground text-xl font-bold mb-4">{card.title}</h3>
										<p className="text-muted-foreground text-sm leading-relaxed">{card.content}</p>
									</motion.div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				))}
			</div>
		</div>
	);
}
