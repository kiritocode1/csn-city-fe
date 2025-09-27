"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, Keyboard, Mouse, Settings, Volume2 } from "lucide-react";

const ScreenReaderAccessPage = () => {
	const accessibilityFeatures = [
		{
			title: "Screen Reader Support",
			description: "Full compatibility with screen readers like NVDA, JAWS, and VoiceOver for visually impaired users",
			icon: <Eye className="h-6 w-6" />,
			status: "Available",
		},
		{
			title: "Voice Navigation",
			description: "Voice commands and audio feedback for hands-free navigation of the website",
			icon: <Volume2 className="h-6 w-6" />,
			status: "Available",
		},
		{
			title: "Keyboard Navigation",
			description: "Complete keyboard accessibility for all functions and features on the website",
			icon: <Keyboard className="h-6 w-6" />,
			status: "Available",
		},
		{
			title: "High Contrast Mode",
			description: "Enhanced contrast options for better visibility and readability",
			icon: <Settings className="h-6 w-6" />,
			status: "Available",
		},
	];

	const keyboardShortcuts = [
		{
			key: "Tab",
			action: "Navigate to next element",
		},
		{
			key: "Enter",
			action: "Activate selected element",
		},
		{
			key: "Escape",
			action: "Close dialog or menu",
		},
		{
			key: "Space",
			action: "Activate button or checkbox",
		},
		{
			key: "Ctrl + /",
			action: "Show accessibility help",
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Available":
				return "default";
			case "Coming Soon":
				return "secondary";
			default:
				return "outline";
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Screen Reader Access</h1>
					<p className="text-muted-foreground text-lg">
						Accessibility features and tools to ensure our website is accessible to all users, including those using screen readers and assistive technologies.
					</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center">Accessibility Features</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
							{accessibilityFeatures.map((feature, index) => (
								<Card
									key={index}
									className="hover:shadow-lg transition-shadow"
								>
									<CardHeader>
										<div className="flex items-center justify-between">
											<div className="p-2 bg-primary/10 rounded-lg">{feature.icon}</div>
											<Badge variant={getStatusColor(feature.status)}>{feature.status}</Badge>
										</div>
										<CardTitle className="text-lg">{feature.title}</CardTitle>
										<CardDescription className="text-sm">{feature.description}</CardDescription>
									</CardHeader>
								</Card>
							))}
						</div>
					</CardContent>
				</Card>

				<div className="grid lg:grid-cols-2 gap-8 mb-8">
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl flex items-center gap-2">
								<Keyboard className="h-6 w-6" />
								Keyboard Shortcuts
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{keyboardShortcuts.map((shortcut, index) => (
									<div
										key={index}
										className="flex items-center justify-between p-3 border rounded-lg"
									>
										<span className="font-medium">{shortcut.action}</span>
										<Badge
											variant="outline"
											className="font-mono"
										>
											{shortcut.key}
										</Badge>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-2xl flex items-center gap-2">
								<Settings className="h-6 w-6" />
								Accessibility Settings
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<span>Font Size</span>
									<div className="flex gap-2">
										<Button
											size="sm"
											variant="outline"
										>
											A-
										</Button>
										<Button
											size="sm"
											variant="outline"
										>
											A
										</Button>
										<Button
											size="sm"
											variant="outline"
										>
											A+
										</Button>
									</div>
								</div>
								<div className="flex items-center justify-between">
									<span>High Contrast</span>
									<Button
										size="sm"
										variant="outline"
									>
										Toggle
									</Button>
								</div>
								<div className="flex items-center justify-between">
									<span>Voice Navigation</span>
									<Button
										size="sm"
										variant="outline"
									>
										Enable
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center">Accessibility Resources</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-3 gap-6">
							<div className="text-center">
								<Download className="h-12 w-12 text-primary mx-auto mb-3" />
								<h3 className="font-semibold mb-2">User Guide</h3>
								<p className="text-sm text-muted-foreground mb-4">Comprehensive guide for using accessibility features on our website</p>
								<Button size="sm">
									<Download className="h-4 w-4 mr-2" />
									Download
								</Button>
							</div>
							<div className="text-center">
								<Volume2 className="h-12 w-12 text-primary mx-auto mb-3" />
								<h3 className="font-semibold mb-2">Audio Guide</h3>
								<p className="text-sm text-muted-foreground mb-4">Audio instructions for navigating the website with screen readers</p>
								<Button size="sm">
									<Volume2 className="h-4 w-4 mr-2" />
									Listen
								</Button>
							</div>
							<div className="text-center">
								<Mouse className="h-12 w-12 text-primary mx-auto mb-3" />
								<h3 className="font-semibold mb-2">Video Tutorial</h3>
								<p className="text-sm text-muted-foreground mb-4">Step-by-step video tutorial for accessibility features</p>
								<Button size="sm">
									<Mouse className="h-4 w-4 mr-2" />
									Watch
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl text-center">Need Help?</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-center space-y-4">
							<p className="text-lg">For accessibility support or to report issues, contact our accessibility team</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button>
									<Settings className="h-4 w-4 mr-2" />
									Get Support
								</Button>
								<Button variant="outline">
									<Download className="h-4 w-4 mr-2" />
									Send Feedback
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default ScreenReaderAccessPage;
