"use client";

import AdminM from "@/components/Admin-menu-user";
import AdminN from "@/components/Admin-nav-user";
import ProtectedAdminRoute from "@/components/ProtectedUserRoutes";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
	const router = useRouter();
	const [psId, setPsId] = useState("");

	useEffect(() => {
		// Check if the user has a valid token
		const token = Cookies.get("psId");

		setPsId(token);

		if (!token) {
			router.push("/control-panel-41A3xB/login");
		}
	}, []);
	return (
		<ProtectedAdminRoute>
			<>
				<main className="">
					<AdminN />

					<div className="flex flex-row">
						<AdminM psId={psId} />
						<div className="w-1/5"></div>

						<div className="w-4/5 p-10">
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-20 gap-16">
								<Link
									href={`/control-panel-41A3xB/police-station/police-station/${psId}`}
									className="hover:scale-105  transition ease-in-out duration-300"
								>
									<div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
										<div className="font-semibold text-lg">Police Station</div>
									</div>
								</Link>

								<Link
									href={`/control-panel-41A3xB/police-station/officers/${psId}`}
									className="hover:scale-105  transition ease-in-out duration-300"
								>
									<div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
										<div className="font-semibold text-lg">Police Station Officer</div>
									</div>
								</Link>

								<Link
									href={`/control-panel-41A3xB/police-station/accident-compensation/${psId}`}
									className="hover:scale-105  transition ease-in-out duration-300"
								>
									<div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
										<div className="font-semibold text-lg">Accident Compensation</div>
									</div>
								</Link>
								<Link
									href={`/control-panel-41A3xB/police-station/online-complaint/${psId}`}
									className="hover:scale-105  transition ease-in-out duration-300"
								>
									<div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
										<div className="font-semibold text-lg">Online Complaint</div>
									</div>
								</Link>
								<Link
									href={`/control-panel-41A3xB/police-station/lost-found/${psId}`}
									className="hover:scale-105  transition ease-in-out duration-300"
								>
									<div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
										<div className="font-semibold text-lg">Lost and Found</div>
									</div>
								</Link>
								<Link
									href={`/control-panel-41A3xB/police-station/feedback/${psId}`}
									className="hover:scale-105  transition ease-in-out duration-300"
								>
									<div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
										<div className="font-semibold text-lg">Feedback / Confidential info</div>
									</div>
								</Link>
								<Link
									href={`/control-panel-41A3xB/police-station/tenant-info/${psId}`}
									className="hover:scale-105  transition ease-in-out duration-300"
								>
									<div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
										<div className="font-semibold text-lg">Tenant Info</div>
									</div>
								</Link>

								<Link
									href={`/control-panel-41A3xB/police-station/industry-complaint/${psId}`}
									className="hover:scale-105  transition ease-in-out duration-300"
								>
									<div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
										<div className="font-semibold text-lg">Industry Complaint</div>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</main>
			</>
		</ProtectedAdminRoute>
	);
};

export default Dashboard;
