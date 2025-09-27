import Image from "next/image";
import { ReactElement } from "react";

type NationalEmblemProps = {
	className?: string;
	alt?: string;
};

const NationalEmblem = ({ className, alt = "Indian National Emblem , Satyameva Jayate" }: NationalEmblemProps): ReactElement => {
	return (
		<div
			className={className}
			suppressHydrationWarning
		>
			<Image
				src="/national-emblem/light.webp"
				alt={alt}
				width={160}
				height={256}
				className="block dark:hidden w-full h-full"
				loading="lazy"
				quality={50}
				priority={false}
				sizes="160px"
				suppressHydrationWarning
			/>
			<Image
				src="/national-emblem/dark.webp"
				alt={alt}
				width={160}
				height={256}
				className="hidden dark:block w-full h-full"
				loading="lazy"
				quality={50}
				priority={false}
				sizes="160px"
				suppressHydrationWarning
			/>
		</div>
	);
};

export default NationalEmblem;
