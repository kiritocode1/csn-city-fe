"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Mic, MicOff, Send, Star, ThumbsUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

// Using 'any' for SpeechRecognition to avoid global type conflicts

const FeedbackPage = () => {
	// Form state
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [subject, setSubject] = useState("");
	const [feedbackType, setFeedbackType] = useState("service");
	const [rating, setRating] = useState("5");
	const [message, setMessage] = useState("");
	const [submitting, setSubmitting] = useState(false);

	// Voice input (message field)
	const [speechSupported, setSpeechSupported] = useState(false);
	const [isListening, setIsListening] = useState(false);
	const [recognition, setRecognition] = useState<any>(null);
	const messageRef = useRef<HTMLTextAreaElement>(null);
	const feedbackTypes = [
		{
			value: "service",
			label: "Police Services",
			description: "Feedback about police services, response time, and overall service quality in Chhatrapati Sambhaji Nagar",
		},
		{
			value: "officer",
			label: "Officer Performance",
			description: "Feedback about individual police officers, their behavior, and professionalism",
		},
		{
			value: "facility",
			label: "Police Station Facilities",
			description: "Feedback about police station infrastructure, cleanliness, and facilities",
		},
		{
			value: "website",
			label: "Website & Digital Services",
			description: "Feedback about the police website, online services, and digital platforms",
		},
	];

	const ratingOptions = [
		{ value: "5", label: "Excellent" },
		{ value: "4", label: "Good" },
		{ value: "3", label: "Average" },
		{ value: "2", label: "Poor" },
		{ value: "1", label: "Very Poor" },
	];

	// Initialize speech recognition
	useEffect(() => {
		if (typeof window === "undefined") return;
		const isSecure = window.isSecureContext || window.location.protocol === "https:" || window.location.hostname === "localhost";
		const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
		if (!isSecure || !SR) {
			setSpeechSupported(false);
			return;
		}
		try {
			const rec: any = new SR();
			rec.continuous = false;
			rec.interimResults = false;
			rec.maxAlternatives = 1;
			rec.onstart = () => setIsListening(true);
			rec.onend = () => setIsListening(false);
			rec.onresult = (ev: any) => {
				let transcript = "";
				for (let i = ev.resultIndex; i < ev.results.length; i++) {
					transcript += ev.results[i][0].transcript;
				}
				if (transcript.trim()) {
					setMessage((prev) => {
						const next = prev + (prev && !prev.endsWith(" ") ? " " : "") + transcript;
						return next.slice(0, 2000);
					});
					messageRef.current?.focus();
				}
			};
			setRecognition(rec);
			setSpeechSupported(true);
		} catch {
			setSpeechSupported(false);
		}
	}, []);

	const toggleSpeech = () => {
		if (!recognition) return;
		try {
			if (isListening) {
				recognition.stop();
			} else {
				recognition.start();
			}
		} catch {
			setIsListening(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!message.trim()) return;
		setSubmitting(true);
		try {
			const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
			if (!backendUrl) throw new Error("Backend URL missing");
			// Backend requires: { category?, message }
			const res = await fetch(`${backendUrl}/api/add-feedback`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					category: feedbackType || undefined,
					message,
					// Optional metadata (not required by backend schema but useful server-side if later extended)
					name: name || undefined,
					email: email || undefined,
					phone: phone || undefined,
					subject: subject || undefined,
					rating: rating || undefined,
				}),
			});
			if (!res.ok) throw new Error("Submit failed");
			setName("");
			setEmail("");
			setPhone("");
			setSubject("");
			setMessage("");
			setFeedbackType("service");
			setRating("5");
			alert("Feedback submitted. Thank you!");
		} catch {
			alert("Could not submit feedback. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Feedback</h1>
					<p className="text-muted-foreground text-lg">Share your feedback about police services in Chhatrapati Sambhaji Nagar. Your input helps us improve and serve you better.</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<MessageSquare className="h-6 w-6" />
							Feedback Form
						</CardTitle>
						<CardDescription>Please share your honest feedback about our services. All fields are optional except for the message.</CardDescription>
					</CardHeader>
					<CardContent>
						<form
							className="space-y-6"
							onSubmit={handleSubmit}
						>
							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<Label htmlFor="name">Name (Optional)</Label>
									<Input
										id="name"
										placeholder="Enter your name"
										className="mt-1 bg-black/5 dark:bg-white/5 rounded-xl border-0"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div>
									<Label htmlFor="email">Email (Optional)</Label>
									<Input
										id="email"
										type="email"
										placeholder="Enter your email address"
										className="mt-1 bg-black/5 dark:bg-white/5 rounded-xl border-0"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
							</div>

							<div>
								<Label htmlFor="phone">Phone (Optional)</Label>
								<Input
									id="phone"
									placeholder="Enter your phone number"
									className="mt-1 bg-black/5 dark:bg-white/5 rounded-xl border-0"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
								/>
							</div>

							<div>
								<Label>Feedback Type</Label>
								<RadioGroup
									className="mt-2"
									value={feedbackType}
									onValueChange={setFeedbackType}
								>
									{feedbackTypes.map((type) => (
										<div
											key={type.value}
											className="flex items-start space-x-2"
										>
											<RadioGroupItem
												value={type.value}
												id={type.value}
											/>
											<Label
												htmlFor={type.value}
												className="flex-1"
											>
												<div className="font-medium">{type.label}</div>
												<div className="text-sm text-muted-foreground">{type.description}</div>
											</Label>
										</div>
									))}
								</RadioGroup>
							</div>

							<div>
								<Label>Overall Rating</Label>
								<RadioGroup
									className="mt-2"
									value={rating}
									onValueChange={setRating}
								>
									{ratingOptions.map((rating) => (
										<div
											key={rating.value}
											className="flex items-center space-x-2"
										>
											<RadioGroupItem
												value={rating.value}
												id={`rating-${rating.value}`}
											/>
											<Label
												htmlFor={`rating-${rating.value}`}
												className="flex items-center gap-2"
											>
												<Star className="h-4 w-4 fill-yellow-400" />
												{rating.label}
											</Label>
										</div>
									))}
								</RadioGroup>
							</div>

							<div>
								<Label htmlFor="subject">Subject (Optional)</Label>
								<Input
									id="subject"
									placeholder="Brief description of your feedback"
									className="mt-1 bg-black/5 dark:bg-white/5 rounded-xl border-0"
									value={subject}
									onChange={(e) => setSubject(e.target.value)}
								/>
							</div>

							<div>
								<Label htmlFor="message">Your Feedback *</Label>
								<div className="relative">
									<Textarea
										id="message"
										ref={messageRef}
										placeholder={isListening ? "" : "Please share your detailed feedback… or use voice"}
										className="mt-1 bg-black/5 dark:bg.white/5 dark:bg-white/5 rounded-2xl pl-4 pr-12 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
										rows={5}
										value={message}
										onChange={(e) => setMessage(e.target.value)}
									/>
									{speechSupported && (
										<button
											type="button"
											onClick={toggleSpeech}
											className={`absolute top-1/2 -translate-y-1/2 right-2 rounded-xl py-1 px-2 transition ${
												isListening
													? "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
													: "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black/70 dark:text-white/70"
											}`}
											title={isListening ? "Stop recording" : "Start voice input"}
										>
											{isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
										</button>
									)}
								</div>
							</div>

							<Button
								className="w-full"
								size="lg"
								type="submit"
								disabled={submitting || !message.trim()}
							>
								<Send className="h-4 w-4 mr-2" />
								{submitting ? "Submitting…" : "Submit Feedback"}
							</Button>
						</form>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<ThumbsUp className="h-6 w-6" />
							Thank You for Your Feedback
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-center space-y-4">
							<p className="text-lg">Your feedback is valuable to us and helps us improve our services. We appreciate you taking the time to share your thoughts.</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button variant="outline">
									<MessageSquare className="h-4 w-4 mr-2" />
									Contact Us
								</Button>
								<Button variant="outline">
									<Star className="h-4 w-4 mr-2" />
									Rate Our Services
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default FeedbackPage;
