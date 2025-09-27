"use client";

import AdminM from "@/components/Admin-menu";
import AdminN from "@/components/Admin-nav";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { BiSolidDownload } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { saveAs } from "file-saver";

const IndustryComplaint = () => {
	const [isloading, setisloading] = useState(false);
	const [isform, setisform] = useState(false);
	const [records, setrecords] = useState([]);
	const [deleteid, setdeleteid] = useState("");

	const [psId, setPsId] = useState("");
	const [fullName, setfullName] = useState("");
	const [contactNo, setContactNo] = useState("");
	const [email, setEmail] = useState("");
	const [street, setStreet] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [country, setCountry] = useState("");
	const [pinCode, setpinCode] = useState("");
	const [subject, setSubject] = useState("");
	const [complaint, setComplaint] = useState("");
	const [files, setFiles] = useState([]);

	const [limit, setlimit] = useState(10);

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const [open, setOpen] = useState(false); //delete modal state

	const [viewdetail, setViewDetail] = useState(false); //view entire message modal

	const viewdetailHandler = (psId, fullName, contactNo, email, street, address, city, country, pinCode, subject, complaint, files) => {
		setPsId(psId);
		setfullName(fullName);
		setContactNo(contactNo);
		setEmail(email);
		setStreet(street);
		setAddress(address);
		setCity(city);
		setCountry(country);
		setpinCode(pinCode);
		setSubject(subject);
		setComplaint(complaint);
		setFiles(files);

		setViewDetail(true);
	};

	const onOpenModal = (id) => {
		setdeleteid(id);
		setOpen(true);
	};
	const onCloseModal = () => {
		setdeleteid("");
		setOpen(false);
	};

	useEffect(() => {
		fetchrecordsNew();
	}, []);

	const fetchrecordsNew = async (page) => {
		const token = Cookies.get("token");
		const headers = {
			Authorization: `Bearer ${token}`,
		};
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-industry-complaint-list?limit=${limit}&page=${page}`, {
				method: "GET",
				headers: headers,
			});

			const data = await response.json();

			if (data.success === true) {
				setrecords(data.data);
				setTotalPages(data.total_pages);
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
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-industry-complaint?Id=${id}`, {
				method: "DELETE",
				headers: headers,
			});

			const data = await response.json();

			if (data.success === true) {
				notifydelete();
				fetchrecordsNew(1);
			} else {
				notifyWarn();
			}
		} catch (error) {
			notifyWarn();
		}
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
		setCurrentPage(1); // Reset currentPage to 1 when limit changes
	}, [limit]);

	useEffect(() => {
		fetchrecordsNew(currentPage);
	}, [limit, currentPage]);

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
							<div className="mb-52 w-full bg-white">
								<h1 className="font-semibold text-xl mt-20">Industry Complaint Records</h1>

								<div className="flex flex-row justify-between py-0 mt-5">
									<div className="flex flex-row space-x-1">
										<div>Show</div>
										<select
											id="locationSelect"
											name="location"
											value={limit}
											onChange={(e) => setlimit(e.target.value)}
											className="text-sm border px-1 py-1 h-7 rounded-md shadow-md  outline-none"
										>
											<option value="10">10</option>
											<option value="25">25</option>
											<option value="50">50</option>
											<option value="100">100</option>
										</select>
										<div>entries</div>
									</div>
								</div>

								<div className="overflow-x-auto max-w-full">
									<table className="w-full min-w-[800px] mx-auto mt-5 text-left">
										<tr className="border flex flex-row justify-between bg-gray-100">
											<th className="p-2 w-1/12 border-r">Delete</th>
											<th className="p-2 w-3/12 border-r">Full Name</th>
											<th className="p-2 w-3/12 border-r">Police Station</th>
											<th className="p-2 w-2/12 border-r">Mobile No.</th>

											<th className="p-2 w-1/12 border-r text-xs">Full Details</th>
											<th className="p-2 w-2/12 border-r">Date</th>
										</tr>

										{records.map((record) => {
											const { psId, fullName, contactNo, email, street, address, city, country, pinCode, subject, complaint, files, createdAt, _id } = record;
											const date = createdAt.substring(0, 10);

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
													<td className="p-2 w-3/12 border-r">{fullName}</td>
													<td className="p-2 w-3/12 border-r">{psId.name}</td>
													<td className="p-2 w-2/12 border-r">{contactNo}</td>

													<td className="p-2 w-1/12 border-r">
														<button
															className="bg-blue-600 text-white p-3 rounded"
															onClick={() => viewdetailHandler(psId, fullName, contactNo, email, street, address, city, country, pinCode, subject, complaint, files)}
														>
															<AiFillEye />
														</button>
													</td>

													<td className="p-2 w-2/12 border-r">{date}</td>
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
									open={viewdetail}
									onClose={() => setViewDetail(false)}
									center
								>
									<div className="px-5 pt-5 w-[750px]">
										<div className="flex flex-row space-x-5 items-center pt-5">
											<div className="font-bold text-lg">Full Name :</div>
											<div>{fullName}</div>
										</div>
										<div className="flex flex-row space-x-5 items-center pt-5">
											<div className="font-bold text-lg">Contact No :</div>
											<div>{contactNo}</div>
										</div>

										<div className="flex flex-row space-x-5 items-center pt-5">
											<div className="font-bold text-lg">Email Id :</div>
											<div>{email}</div>
										</div>

										<div className="flex flex-row space-x-5 items-center pt-5">
											<div className="font-bold text-lg">Street :</div>
											<div>{street}</div>
										</div>

										<div className="flex flex-row space-x-5 items-center pt-5">
											<div className="font-bold text-lg">Address :</div>
											<div>{address}</div>
										</div>

										<div className="flex flex-row space-x-5 items-center pt-5">
											<div className="font-bold text-lg">City :</div>
											<div>{city}</div>
										</div>

										<div className="flex flex-row space-x-5 items-center pt-5">
											<div className="font-bold text-lg">Country :</div>
											<div>{country}</div>
										</div>

										<div className="flex flex-row space-x-5 items-center pt-5">
											<div className="font-bold text-lg">Pincode :</div>
											<div>{pinCode}</div>
										</div>

										<div className="flex flex-row space-x-5 items-center pt-5">
											<div className="font-bold text-lg">Police Station :</div>
											<div>{psId.name}</div>
										</div>

										<div className="flex flex-row space-x-5 items-center pt-5">
											<div className="font-bold text-lg">Subject :</div>
											<div>{subject}</div>
										</div>

										<div className="flex flex-col space-y-5 pt-5">
											<div className="font-bold text-lg">Complaint :</div>
											<div className="whitespace-pre-wrap">{complaint}</div>
										</div>

										<div className="flex flex-col space-y-5 pt-5">
											<div className="font-bold text-lg">Files Attached :</div>
											<div>
												{files.map((file) => {
													return (
														<Link
															href={file}
															target="_blank"
															key={file}
														>
															<button className="bg-yellow-600 text-white p-3 rounded mr-5">
																<BiSolidDownload />
															</button>
														</Link>
													);
												})}
											</div>
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

export default IndustryComplaint;
