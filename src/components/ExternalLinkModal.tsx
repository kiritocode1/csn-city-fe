"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/language-context";
import { AlertTriangle, ExternalLink } from "lucide-react";

interface ExternalLinkModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	url: string;
}

export default function ExternalLinkModal({ isOpen, onClose, onConfirm, url }: ExternalLinkModalProps) {
	const { t } = useLanguage();

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}
		>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<div className="flex items-center gap-2">
						<AlertTriangle className="h-5 w-5 text-amber-500" />
						<DialogTitle>{t("externalLink.title")}</DialogTitle>
					</div>
					<DialogDescription>{t("externalLink.message")}</DialogDescription>
				</DialogHeader>

				<div className="space-y-3">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<ExternalLink className="h-4 w-4" />
						<span className="font-mono break-all">{url}</span>
					</div>
					<div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-md border border-amber-200 dark:border-amber-800">
						<span className="text-sm text-amber-800 dark:text-amber-200">
							<strong>{t("externalLink.disclaimer.title")}:</strong> {t("externalLink.disclaimer.text")}
						</span>
					</div>
				</div>
				<DialogFooter className="gap-2">
					<Button
						variant="outline"
						onClick={onClose}
					>
						{t("externalLink.cancel")}
					</Button>
					<Button
						onClick={onConfirm}
						className="gap-2"
					>
						<ExternalLink className="h-4 w-4" />
						{t("externalLink.continue")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
