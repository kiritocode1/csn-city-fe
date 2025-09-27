"use client";

import { Phone, X } from "lucide-react";
import { motion } from "motion/react";
import * as React from "react";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";

const drawerVariants = {
	hidden: {
		x: "100%",
		opacity: 0,
		rotateY: 5,
		transition: {
			type: "spring" as const,
			stiffness: 300,
			damping: 30,
		},
	},
	visible: {
		x: 0,
		opacity: 1,
		rotateY: 0,
		transition: {
			type: "spring" as const,
			stiffness: 300,
			damping: 30,
			mass: 0.8,
			staggerChildren: 0.07,
			delayChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: {
		x: 20,
		opacity: 0,
		transition: {
			type: "spring" as const,
			stiffness: 300,
			damping: 30,
		},
	},
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			type: "spring" as const,
			stiffness: 300,
			damping: 30,
			mass: 0.8,
		},
	},
};

const emergencyContacts = [
	{ name: "SOS Dial", numbers: [ "112"], isEmergency: true },
	{ name: "Main Control", numbers: ["0240-2240500", "9226514013"] },
	{ name: "Damini Patak", numbers: ["1091", "0240-2240500"] },
	{ name: "Traffic Helpline", numbers: ["8454999999"] },
	{ name: "Child Care", numbers: ["1098"] },
	{ name: "Elder Helpline", numbers: ["1090"] },
	{ name: "Women Helpline", numbers: ["1091"] },
	{ name: "Cyber Crime", numbers: ["1930", "0240-2326514"] },
	{ name: "Narcotics", numbers: ["0240-2240500", "9529019061"] },
];

const EmergencyContactsDrawer = () => {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<div className="fixed bottom-28 right-8 z-50">
			<Drawer
				direction="right"
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<DrawerTrigger asChild>
					<div className="group">
						<Button
							aria-label="Emergency Contacts"
							className="flex items-center justify-center gap-3 rounded-full w-16 group-hover:w-60 h-16 bg-white hover:bg-gray-50 text-black shadow-lg transition-all duration-300 overflow-hidden pr-4 pl-0 group-hover:pl-6 border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
						>
							<Phone className="w-20 h-20 scale-[1.4] shrink-0 translate-x-1 hover:translate-x-0 dark:text-white text-black " />
							<div className="overflow-hidden max-w-0 group-hover:max-w-[156px] transition-all duration-300">
								<span className="block text-black dark:text-white text-base font-medium whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
									Emergency Contacts
								</span>
							</div>
						</Button>
					</div>
				</DrawerTrigger>
				<DrawerContent className="h-full w-[600px] max-w-[80vw] ml-auto p-5 rounded-l-2xl shadow-xl">
					<motion.div
						variants={drawerVariants}
						initial="hidden"
						animate="visible"
						className="h-full flex flex-col"
					>
						{/* Header */}
						<motion.div variants={itemVariants}>
							<DrawerHeader className="px-0 pb-3">
								<div className="flex items-center justify-between">
									<DrawerTitle className="text-lg font-semibold text-black dark:text-white">Emergency Contacts</DrawerTitle>
									<div className="flex items-center gap-2">
										<DrawerClose asChild>
											<Button
												variant="ghost"
												size="sm"
												className="h-8 w-8 p-0"
											>
												<X className="w-4 h-4" />
											</Button>
										</DrawerClose>
									</div>
								</div>
							</DrawerHeader>
						</motion.div>

						{/* Emergency Contacts */}
						<motion.div
							variants={itemVariants}
							className="flex-1"
						>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
								{emergencyContacts.map((contact, index) => (
									<motion.div
										key={index}
										variants={itemVariants}
										transition={{ delay: index * 0.03 }}
										className={`p-3 rounded-lg border ${
											contact.isEmergency ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800" : "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-600"
										}`}
									>
										<div className="flex items-center justify-between mb-1.5">
											<h3 className={`font-semibold text-sm ${contact.isEmergency ? "text-red-700 dark:text-red-300" : "text-gray-900 dark:text-white"}`}>{contact.name}</h3>
											{contact.isEmergency && (
												<span className="px-1.5 py-0.5 text-[10px] font-bold text-red-700 bg-red-200 rounded-full dark:bg-red-800 dark:text-red-200">EMERGENCY</span>
											)}
										</div>
										<div className="flex flex-wrap gap-1.5">
											{contact.numbers.map((number, numIndex) => (
												<a
													key={numIndex}
													href={`tel:${number}`}
													className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
												>
													<Phone className="w-3 h-3" />
													<span className="font-mono">{number}</span>
												</a>
											))}
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>

						{/* Footer */}
						<motion.div
							variants={itemVariants}
							className="mt-3 text-center"
						>
							<span className="text-xs text-gray-500 dark:text-gray-400">Chhatrapati Sambhajinagar City Police</span>
						</motion.div>
					</motion.div>
				</DrawerContent>
			</Drawer>
		</div>
	);
};

export default EmergencyContactsDrawer;
