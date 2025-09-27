"use client";

import { useLanguage } from "@/contexts/language-context";

const LeadershipSectionHeader = () => {
	const { t } = useLanguage();
	return (
		<div className="text-center mb-8">
			<h2
				id="leadership-heading"
				className="text-3xl font-bold text-foreground mb-2"
			>
				{t("leadership.title")}
			</h2>
		</div>
	);
};

export default LeadershipSectionHeader;
