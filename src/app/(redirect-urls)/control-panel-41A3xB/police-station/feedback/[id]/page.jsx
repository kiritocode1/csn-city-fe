"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import AdminN from "@/components/Admin-nav-user";
import AdminM from "@/components/Admin-menu-user";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BiSolidDownload } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import Link from "next/link";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ProtectedAdminRoute from "@/components/ProtectedUserRoutes";
import Cookies from "js-cookie";
// import { saveAs } from "file-saver";

const Feedback = () => {
  const params = useParams();
  const id = params?.id;
  const [isloading, setisloading] = useState(false);
  const [isform, setisform] = useState(false);
  const [records, setrecords] = useState([]);
  const [deleteid, setdeleteid] = useState("");
  const [feedbackStatistics, setFeedbackStatistics] = useState(0);

  const [category, setCategory] = useState("");
  const [psId, setPsId] = useState(id);
  const [fullName, setFullName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const [limit, setlimit] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [open, setOpen] = useState(false); //delete modal state

  const [viewdetail, setViewDetail] = useState(false); //view entire message modal

  // Fetch statistics
  const fetchFeedbackStatistics = async () => {
    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/general/statistics`,
        {
          method: "GET",
          headers: headers,
        }
      );

      const data = await response.json();

      if (data) {
        // Find the count for this specific police station
        const stationId = psId._id || psId;
        const stationStats = data.statistics.feedback.byPoliceStation.find(
          stat => stat.psId === stationId || stat.policeStation === psId.name
        );
        setFeedbackStatistics(stationStats ? stationStats.count : 0);
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const viewdetailHandler = (
    category,
    psId,
    fullName,
    contactNo,
    email,
    subject,
    address,
    description
  ) => {
    setCategory(category);
    setPsId(psId);
    setFullName(fullName);
    setContactNo(contactNo);
    setEmail(email);
    setSubject(subject);
    setAddress(address);
    setDescription(description);
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
    fetchFeedbackStatistics(); // Fetch statistics on mount
  }, []);

  const fetchrecordsNew = async (page) => {
    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-feedback-list?limit=${limit}&page=${page}&psId=${psId}`,
        {
          method: "GET",
          headers: headers,
        }
      );

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-feedback?Id=${id}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );

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
                <h1 className="font-semibold text-xl mt-20">
                  Feedback and Confidential Information Records
                </h1>

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
                    <thead>
                      <tr className="border flex flex-row justify-between bg-gray-100">
                        <th className="p-2 w-1/12 border-r">No.</th>
                        <th className="p-2 w-2/12 border-r">Full Name</th>
                        <th className="p-2 w-2/12 border-r">Police Station</th>
                        <th className="p-2 w-2/12 border-r">Mobile No.</th>
                        <th className="p-2 w-1/12 border-r text-xs">
                          Full Details
                        </th>
                        <th className="p-2 w-2/12 border-r">Date</th>
                        <th className="p-2 w-2/12 border-r">Category</th>
                      </tr>
                    </thead>

                    <tbody>
                      {records.map((record, index) => {
                        const {
                          category,
                          psId,
                          fullName,
                          contactNo,
                          email,
                          subject,
                          address,
                          description,
                          createdAt,
                          _id,
                        } = record;
                        const date = createdAt.substring(0, 10);

                        return (
                          <tr
                            className="border flex flex-row justify-between"
                            key={_id}
                          >
                            <td className="p-2 w-1/12 border-r font-bold text-center">
                              {feedbackStatistics - (index + (currentPage - 1) * limit)}
                            </td>
                            <td className="p-2 w-2/12 border-r">{fullName}</td>
                            <td className="p-2 w-2/12 border-r">{psId.name}</td>
                            <td className="p-2 w-2/12 border-r">{contactNo}</td>
                            <td className="p-2 w-1/12 border-r">
                              <button
                                className="bg-blue-600 text-white p-3 rounded"
                                onClick={() =>
                                  viewdetailHandler(
                                    category,
                                    psId,
                                    fullName,
                                    contactNo,
                                    email,
                                    subject,
                                    address,
                                    description
                                  )
                                }
                              >
                                <AiFillEye />
                              </button>
                            </td>

                            <td className="p-2 w-2/12 border-r">{date}</td>
                            <td className="p-2 w-2/12 border-r">{category}</td>
                          </tr>
                        );
                      })}
                    </tbody>
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
                <Modal open={open} onClose={onCloseModal} center>
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
                      <div className="font-bold text-lg">Category :</div>
                      <div>{category}</div>
                    </div>
                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Police Station :</div>
                      <div>{psId.name}</div>
                    </div>
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
                      <div className="font-bold text-lg">Subject :</div>
                      <div>{subject}</div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Address :</div>
                      <div>{address}</div>
                    </div>

                    <div className="flex flex-col space-y-5 pt-5">
                      <div className="font-bold text-lg">Description :</div>
                      <div className="whitespace-pre-wrap">{description}</div>
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

export default Feedback;

