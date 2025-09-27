"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import ExternalLinkModal from "./ExternalLinkModal";

interface ExtendedLinkProps {
	href: string;
	children: ReactNode;
	className?: string;
	target?: string;
	rel?: string;
	[key: string]: any;
}

export default function ExtendedLink({ href, children, className, target, rel, ...props }: ExtendedLinkProps) {
	const [showModal, setShowModal] = useState(false);
	const [pendingUrl, setPendingUrl] = useState("");

	// Check if URL is external
	const isExternal = (url: string): boolean => {
		if (typeof window === "undefined") return false;

		try {
			const urlObj = new URL(url, window.location.origin);
			return urlObj.origin !== window.location.origin;
		} catch {
			return false;
		}
	};

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		// If it's an external link, show modal
		if (isExternal(href)) {
			e.preventDefault();
			setPendingUrl(href);
			setShowModal(true);
		}
		// For internal links, let default behavior happen
	};

	const handleConfirm = () => {
		setShowModal(false);
		window.open(pendingUrl, "_blank", "noopener,noreferrer");
	};

	const handleCancel = () => {
		setShowModal(false);
		setPendingUrl("");
	};

	return (
		<>
			<Link
				href={href}
				className={className}
				target={target}
				rel={rel}
				onClick={handleClick}
				{...props}
			>
				{children}
			</Link>

			<ExternalLinkModal
				isOpen={showModal}
				onClose={handleCancel}
				onConfirm={handleConfirm}
				url={pendingUrl}
			/>
		</>
	);
}
