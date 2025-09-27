"use client";

import { useLanguage } from "@/contexts/language-context";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Section() {
	const container = useRef<HTMLDivElement>(null);
	const { t } = useLanguage();
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start end", "end start"],
	});
	const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

	return (
		<div
			ref={container}
			className="relative flex items-center justify-center h-[40vh] xl:h-[50vh] overflow-hidden"
			style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
		>
			<div className="relative z-10 p-20 mix-blend-difference text-white w-full h-full flex flex-col justify-between">
				<div className="text-center">
					<p className="text-[5vw] uppercase mix-blend-difference font-bold">{t("picture.title")}</p>
				</div>
			</div>
			<div className="fixed top-[-10vh] left-0 h-[110vh] w-full">
				<motion.div
					style={{ y }}
					className="relative w-full h-full"
				>
					<Image
						src="/csm-snapshots/1.webp"
						fill
						alt="Chhatrapati Shambhajinagar cityscape"
						style={{ objectFit: "cover" }}
						quality={75}
						priority={false}
						sizes="100vw"
					/>
				</motion.div>
			</div>
		</div>
	);
}
