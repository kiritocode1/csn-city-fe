"use client";

import React, { useState, useEffect } from "react";
import AdminN from "@/components/Admin-nav";
import AdminM from "@/components/Admin-menu";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BiSolidDownload } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import Cookies from "js-cookie";
import DOMPurify from "dompurify";

const DCP = () => {
	const [psId, setpsId] = useState("");
	const [first_date, setFirst_date] = useState("");
	const [second_date, setSecond_date] = useState("");

	const [isloading, setisloading] = useState(false);
	const [isform, setisform] = useState(false);
	const [records, setrecords] = useState([]);
	const [deleteid, setdeleteid] = useState("");

	const [stations, setStations] = useState([]);

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const [open, setOpen] = useState(false);

	const onOpenModal = (id) => {
		setdeleteid(id);
		setOpen(true);
	};
	const onCloseModal = () => {
		setdeleteid("");
		setOpen(false);
	};

	//edit form states
	const [open2, setOpen2] = useState(false);
	const [psIdF, setpsIdF] = useState("");
	const [first_dateF, setFirst_dateF] = useState("");
	const [second_dateF, setSecond_dateF] = useState("");

	const [idF, setidF] = useState("");
	const [updateLoading, setupdateLoading] = useState(false);

	const onOpenModal2 = (psId, first_date, second_date, _id) => {
		setpsIdF(DOMPurify.sanitize(psId));
		setFirst_dateF(DOMPurify.sanitize(first_date));
		setSecond_dateF(DOMPurify.sanitize(second_date));
		setidF(DOMPurify.sanitize(_id));
		setOpen2(true);
	};
	const onCloseModal2 = () => {
		setOpen2(false);
	};

	useEffect(() => {
		fetchrecords(1);
		fetchStations();
	}, []);

	const handlePrevious = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	useEffect(() => {
		fetchrecords(currentPage);
	}, [currentPage]);

	const resethandler = () => {
		// setyear("");
	};

	const cancelhandler = () => {
		setisform(false);
		// setyear("");
	};

	const notifySuccess = () => {
		toast.success("new record created successfully!", {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
		});
	};

	const notifyUpdate = () => {
		toast.success("Record Updated successfully!", {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
		});
	};

	const notifyWarn = () => {
		toast.warn("oops something went wrong!", {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});
	};

	const notifydelete = () => {
		toast.success("Record Deleted successfully!", {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});
	};

	const notifyvalid = () => {
		toast.warn("Fields are required!", {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});
	};

	const fetchrecords = async (page) => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-all-entry?page=${page}`, {
				method: "GET",
			});

			const data = await response.json();

			if (data) {
				// console.log(data.results);
				setrecords(data.entries);
				setTotalPages(data.totalPages);
			} else {
				notifyWarn();
			}
		} catch (error) {
			notifyWarn();
		}
	};

	const fetchStations = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-stations`, {
				method: "GET",
			});

			const data = await response.json();

			if (data) {
				setStations(data.stations);
			} else {
				notifyWarn();
			}
		} catch (error) {
			notifyWarn();
		}
	};

	const deleterecord = async (id) => {
		onCloseModal();
		const token = Cookies.get("token");
		const headers = {
			Authorization: `Bearer ${token}`,
		};
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-entry?id=${id}`, {
				method: "DELETE",
				headers: headers,
			});

			const data = await response.json();

			if (data.success === true) {
				notifydelete();
				fetchrecords(currentPage);
			} else {
				notifyWarn();
			}
		} catch (error) {
			notifyWarn();
		}
	};

	const submithandler = async (e) => {
		if (!psId || !first_date) {
			notifyvalid();

			return;
		}

		setisloading(true);
		setisform(false);
		e.preventDefault();

		const token = Cookies.get("token");
		const headers = {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		};

		const bodydata = {
			psId: psId,
			first_date: first_date,
			second_date: second_date,
		};

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add-entry`, {
				method: "POST",
				body: JSON.stringify(bodydata),
				headers: headers,
			});

			const data = await response.json();

			//   console.log(data);

			if (data.success) {
				fetchrecords(currentPage);

				setisloading(false);
				notifySuccess();
				setpsId("");
				setFirst_date("");
				setSecond_date("");
				setisform(true);
			} else {
				notifyWarn();
				setisloading(false);
				setisform(true);
			}
		} catch (error) {
			notifyWarn();
			setisloading(false);
			setisform(true);
		}
	};

	const updatehandler = async (e) => {
		if (!psIdF || !first_dateF) {
			notifyvalid();

			return;
		}

		//   setisloading(true);
		//   setisform(false);
		e.preventDefault();

		setupdateLoading(true);

		const token = Cookies.get("token");
		const headers = {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		};

		const bodydata = {
			psId: psIdF,
			first_date: first_dateF,
			second_date: second_dateF,
		};

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-entry?id=${idF}`, {
				method: "POST",
				body: JSON.stringify(bodydata),
				headers: headers,
			});

			const data = await response.json();

			if (data.success) {
				fetchrecords(currentPage);
				setupdateLoading(false);
				notifyUpdate();
				setOpen2(false);
			} else {
				notifyWarn();
				setupdateLoading(false);
				setOpen2(false);
			}
		} catch (error) {
			notifyWarn();
			setupdateLoading(false);
			setOpen2(false);
		}
	};

	return (
		<ProtectedAdminRoute>
			<>
				<main className="bg-gray-100">
					<AdminN />
					<ToastContainer autoClose={2000} />

					<div className="flex flex-row">
						<AdminM />

						<div className="hidden lg:block w-1/5"></div>

						<div className="w-full lg:w-4/5 mt-20 mx-5 bg-white shadow p-5">
							<div className="flex flex-row space-x-2 border-b pb-5">
								<button
									onClick={() => setisform(true)}
									className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
								>
									Add Record
								</button>

								<button
									onClick={cancelhandler}
									className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
								>
									Cancel
								</button>
							</div>

							{isform && (
								<div className="mt-5">
									<div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
										<label
											htmlFor="title"
											className="mb-1 text-base text-gray-800"
										>
											* Police Station
										</label>
										<select
											id="locationSelect"
											name="location"
											value={psId}
											onChange={(e) => setpsId(e.target.value)}
											className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
										>
											<option value="">Select Police Station</option>
											{stations.map((record) => {
												const { name, _id } = record;

												return (
													<option
														key={_id}
														value={_id}
													>
														{name}
													</option>
												);
											})}
										</select>
									</div>

									<div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
										<label
											htmlFor="date"
											className="mb-1 text-base text-gray-800"
										>
											* First Date
										</label>
										<input
											type="date"
											id="date"
											name="date"
											className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-40"
											value={first_date}
											onChange={(e) => setFirst_date(e.target.value)}
										/>
									</div>

									<div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
										<label
											htmlFor="date"
											className="mb-1 text-base text-gray-800"
										>
											Second Date
										</label>
										<input
											type="date"
											id="date"
											name="date"
											className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-40"
											value={second_date}
											onChange={(e) => setSecond_date(e.target.value)}
										/>
									</div>

									<div>
										<button
											onClick={submithandler}
											className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
										>
											Submit
										</button>
									</div>
								</div>
							)}

							{isloading && (
								<div className="flex justify-center items-center h-80">
									<Oval
										height={80}
										width={80}
										color="#3B82F6"
										wrapperStyle={{}}
										wrapperClass=""
										visible={true}
										ariaLabel="oval-loading"
										secondaryColor="#b5d1ff"
										strokeWidth={3}
										strokeWidthSecondary={3}
									/>
								</div>
							)}

							<div className="mb-52 w-full bg-white">
								<h1 className="font-semibold text-xl mt-10">DCP Visits</h1>

								<div className="overflow-x-auto max-w-full">
									<table className="w-full min-w-[800px] mx-auto mt-5 text-left">
										<tr className="border flex flex-row justify-between bg-gray-100">
											<th className="p-2 w-1/12 border-r">Delete</th>
											<th className="p-2 w-1/12 border-r">Edit</th>

											<th className="p-2 w-6/12 border-r">Police Station</th>
											<th className="p-2 w-2/12 border-r">First Date</th>
											<th className="p-2 w-2/12 border-r">Second Date</th>
										</tr>

										{records.map((record) => {
											const { psId, first_date, second_date, _id } = record;
											return (
												<tr
													className="border flex flex-row justify-between"
													key={_id}
												>
													<td className="p-1 w-1/12 border-r">
														<button
															className="bg-red-600 text-white p-3 rounded"
															//   onClick={() => deleterecord(_id)}
															onClick={() => onOpenModal(_id)}
														>
															<RiDeleteBin2Line />
														</button>
													</td>
													<td className="p-1 w-1/12 border-r">
														<button
															className="bg-yellow-600 text-white p-3 rounded"
															//   onClick={() => deleterecord(_id)}
															onClick={() => onOpenModal2(psId._id, first_date, second_date, _id)}
														>
															<AiFillEdit />
														</button>
													</td>

													<td className="p-2 w-6/12 border-r">{psId.name}</td>
													<td className="p-2 w-2/12 border-r">{first_date}</td>
													<td className="p-2 w-2/12 border-r">{second_date}</td>
												</tr>
											);
										})}
									</table>
								</div>

								<div className="mt-5">
									<button
										onClick={handlePrevious}
										disabled={currentPage === 1}
										className="mr-2 border rounded-md p-2 py-1 bg-gray-100 shadow-md"
									>
										Previous
									</button>
									<button
										onClick={handleNext}
										disabled={currentPage === totalPages}
										className="ml-2 border rounded-md p-2 py-1 bg-gray-100 shadow-md"
									>
										Next
									</button>
								</div>

								<Modal
									open={open}
									onClose={onCloseModal}
									center
								>
									<div className="px-5 pt-5">
										<p>Are you sure to delete the record ?</p>

										<div className="flex flex-row justify-between mt-5">
											<div>
												<button
													className="px-3 py-1 bg-white border rounded"
													onClick={onCloseModal}
												>
													Cancel
												</button>
											</div>
											<div>
												<button
													className="px-3 py-1 bg-red-600 font-semibold text-white border rounded"
													onClick={() => deleterecord(deleteid)}
												>
													Delete
												</button>
											</div>
										</div>
									</div>
								</Modal>

								<Modal
									open={open2}
									onClose={onCloseModal2}
									center
								>
									<div className="pt-10 px-5 w-[500px]">
										<div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
											<label
												htmlFor="title"
												className="mb-1 text-base text-gray-800"
											>
												* Police Station
											</label>
											<select
												id="locationSelect"
												name="location"
												value={psIdF}
												onChange={(e) => setpsIdF(e.target.value)}
												className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
											>
												<option value="">Select Police Station</option>
												{stations.map((record) => {
													const { name, _id } = record;

													return (
														<option
															key={_id}
															value={_id}
														>
															{name}
														</option>
													);
												})}
											</select>
										</div>

										<div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
											<label
												htmlFor="date"
												className="mb-1 text-base text-gray-800"
											>
												* First Date
											</label>
											<input
												type="date"
												id="date"
												name="date"
												className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-40"
												value={first_dateF}
												onChange={(e) => setFirst_dateF(e.target.value)}
											/>
										</div>

										<div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
											<label
												htmlFor="date"
												className="mb-1 text-base text-gray-800"
											>
												Second Date
											</label>
											<input
												type="date"
												id="date"
												name="date"
												className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-40"
												value={second_dateF}
												onChange={(e) => setSecond_dateF(e.target.value)}
											/>
										</div>

										<div>
											<button
												onClick={updatehandler}
												className="bg-blue-500 flex justify-center items-center  text-white px-3 py-1 rounded-md hover:bg-blue-600"
											>
												Update Record
												{updateLoading && (
													<div className="ml-2">
														<Oval
															height={25}
															width={25}
															color="#ffffff"
															wrapperStyle={{}}
															wrapperClass=""
															visible={true}
															ariaLabel="oval-loading"
															secondaryColor="#b5d1ff"
															strokeWidth={5}
															strokeWidthSecondary={5}
														/>
													</div>
												)}
											</button>
										</div>
									</div>
								</Modal>
							</div>
						</div>
					</div>
				</main>
			</>
		</ProtectedAdminRoute>
	);
};

export default DCP;
