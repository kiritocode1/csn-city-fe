import { PortalMarquee } from "@/components/PortalMarquee";

export default function PortalsDemoPage() {
	return (
		<div className="min-h-screen bg-background p-8">
			<div className="max-w-6xl mx-auto space-y-8">
				<div className="text-center space-y-4">
					<h1 className="text-4xl font-bold">Portal Marquee Demo</h1>
					<p className="text-muted-foreground">Demonstration of the police portals marquee component</p>
				</div>

				{/* Normal Speed */}
				<PortalMarquee speed="normal" />

				{/* Slow Speed */}
				<PortalMarquee speed="slow" />

				{/* Fast Speed */}
				<PortalMarquee speed="fast" />
			</div>
		</div>
	);
}
