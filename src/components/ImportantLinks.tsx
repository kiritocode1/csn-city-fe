"use client";

import { useLanguage } from "@/contexts/language-context";
import ExtendedLink from "./ExtendedLink";

interface LinkItem {
	href: string;
	label: string;
	ariaLabel: string;
}

const ImportantLinks = () => {
	const { t } = useLanguage();

	const links: LinkItem[] = [
		{
			href: "https://www.mahapolice.gov.in/dgps-of-maharashtra/",
			label: t("links.dgp"),
			ariaLabel: t("links.dgp.aria"),
		},
		{
			href: "http://www.mahaprisons.gov.in/Site/Home/Index.aspx",
			label: t("links.prisons"),
			ariaLabel: t("links.prisons.aria"),
		},
		{
			href: "https://stateexcise.maharashtra.gov.in",
			label: t("links.excise"),
			ariaLabel: t("links.excise.aria"),
		},
		{
			href: "https://exciseservices.mahaonline.gov.in",
			label: t("links.exciseOnline"),
			ariaLabel: t("links.exciseOnline.aria"),
		},
		{
			href: "https://aaplesarkar.mahaonline.gov.in",
			label: t("links.aapleSarkar"),
			ariaLabel: t("links.aapleSarkar.aria"),
		},
		{
			href: "https://www.mahapolice.gov.in",
			label: t("links.maharashtraPolice"),
			ariaLabel: t("links.maharashtraPolice.aria"),
		},
		{
			href: "https://mumbaipolice.gov.in",
			label: t("links.mumbaiPolice"),
			ariaLabel: t("links.mumbaiPolice.aria"),
		},
		{
			href: "https://mahammb.maharashtra.gov.in",
			label: t("links.maritimeBoard"),
			ariaLabel: t("links.maritimeBoard.aria"),
		},
		{
			href: "https://transport.maharashtra.gov.in",
			label: t("links.mvd"),
			ariaLabel: t("links.mvd.aria"),
		},
		{
			href: "https://maharashtra.gov.in/1150/Acts-Rules",
			label: t("links.actsRules"),
			ariaLabel: t("links.actsRules.aria"),
		},
		{
			href: "https://gr.maharashtra.gov.in/1145/Government-Resolutions",
			label: t("links.governmentResolutions"),
			ariaLabel: t("links.governmentResolutions.aria"),
		},
		{
			href: "https://acbmaharashtra.gov.in/",
			label: t("links.acb"),
			ariaLabel: t("links.acb.aria"),
		},
		{
			href: "http://www.svpnpa.gov.in/",
			label: t("links.svpnpa"),
			ariaLabel: t("links.svpnpa.aria"),
		},
		{
			href: "https://cbi.gov.in/",
			label: t("links.cbi"),
			ariaLabel: t("links.cbi.aria"),
		},
		{
			href: "http://cprpune.org/",
			label: t("links.cpr"),
			ariaLabel: t("links.cpr.aria"),
		},
		{
			href: "http://mahacid.com/",
			label: t("links.cid"),
			ariaLabel: t("links.cid.aria"),
		},
		{
			href: "http://mahasecurity.gov.in/",
			label: t("links.securityForce"),
			ariaLabel: t("links.securityForce.aria"),
		},
		{
			href: "https://trafficpolicemumbai.maharashtra.gov.in/",
			label: t("links.trafficPolice"),
			ariaLabel: t("links.trafficPolice.aria"),
		},
		{
			href: "https://bombayhighcourt.nic.in/",
			label: t("links.bombayHighCourt"),
			ariaLabel: t("links.bombayHighCourt.aria"),
		},
		{
			href: "https://main.sci.gov.in/",
			label: t("links.supremeCourt"),
			ariaLabel: t("links.supremeCourt.aria"),
		},
		{
			href: "https://njdg.ecourts.gov.in/njdgnew/",
			label: t("links.njdg"),
			ariaLabel: t("links.njdg.aria"),
		},
		{
			href: "https://home.maharashtra.gov.in/en/media-corner/",
			label: t("links.mediaCorner"),
			ariaLabel: t("links.mediaCorner.aria"),
		},
		{
			href: "https://eprisons.nic.in",
			label: t("links.ePrison"),
			ariaLabel: t("links.ePrison.aria"),
		},
		{
			href: "https://eprosecution.gov.in",
			label: t("links.eProsecution"),
			ariaLabel: t("links.eProsecution.aria"),
		},
	];

	// Split links into 3 groups
	const linksPerRow = Math.ceil(links.length / 3);
	const row1 = links.slice(0, linksPerRow);
	const row2 = links.slice(linksPerRow, linksPerRow * 2);
	const row3 = links.slice(linksPerRow * 2);

	const renderLinkRow = (linkGroup: LinkItem[], rowIndex: number) => (
		<div
			key={rowIndex}
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-content-center "
		>
			{linkGroup.map((link, index) => (
				<ExtendedLink
					key={index}
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={link.ariaLabel}
					className="px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors "
				>
					<div className="text-sm font-medium text-gray-700 dark:text-gray-300 text-start">{link.label}</div>
				</ExtendedLink>
			))}
		</div>
	);

	return (
		<div className="important-links">
			<div className="text-center mb-8">
				<h3 className="text-3xl font-bold text-foreground mb-2">{t("links.title")}</h3>
				<p className="text-muted-foreground">{t("links.description")}</p>
			</div>
			<div className="space-y-4">
				{renderLinkRow(row1, 1)}
				{renderLinkRow(row2, 2)}
				{renderLinkRow(row3, 3)}
			</div>
		</div>
	);
};

export default ImportantLinks;
