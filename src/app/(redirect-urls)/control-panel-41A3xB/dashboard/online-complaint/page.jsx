"use client";

import React, { useState, useEffect } from "react";
import AdminN from "@/components/Admin-nav";
import AdminM from "@/components/Admin-menu";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BiSolidDownload } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import Link from "next/link";
import "react-responsive-modal/styles.css";
import { FiEdit } from "react-icons/fi";
import { Modal } from "react-responsive-modal";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import Cookies from "js-cookie";
// import { saveAs } from "file-saver";

const Complaint = () => {
  const [isloading, setisloading] = useState(false);
  const [isform, setisform] = useState(false);
  const [records, setrecords] = useState([]);
  const [deleteid, setdeleteid] = useState("");
  const [onlineComplaintStatistics, setOnlineComplaintStatistics] = useState(0);

  const [psId, setPsId] = useState("");
  const [reg_id, setRegId] = useState("");
  const [fullName, setfullName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setpinCode] = useState("");
    const [currentRecordId, setCurrentRecordId] = useState("");
  
  const [complaint, setComplaint] = useState("");
  const [files, setFiles] = useState([]);

  const [limit, setlimit] = useState(10);

   const [actionTaken, setActionTaken] = useState("");
    const [remark, setRemark] = useState("");
      const [editModalOpen, setEditModalOpen] = useState(false);
    
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [open, setOpen] = useState(false); //delete modal state

  const [viewdetail, setViewDetail] = useState(false); //view entire message modal

  const viewdetailHandler = (
    psId,
    reg_id,
    fullName,
    contactNo,
    email,
    street,
    address,
    city,
    country,
    pinCode,
    complaint,
    files
  ) => {
    setPsId(psId);
    setRegId(reg_id);
    setfullName(fullName);
    setContactNo(contactNo);
    setEmail(email);
    setStreet(street);
    setAddress(address);
    setCity(city);
    setCountry(country);
    setpinCode(pinCode);
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

  // Fetch statistics
  const fetchOnlineComplaintStatistics = async () => {
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
        setOnlineComplaintStatistics(data.statistics.onlineComplaints.total);
        console.log("data.statistics.onlineComplaints.total", data.statistics.onlineComplaints.total);
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  useEffect(() => {
    fetchrecordsNew();
    fetchOnlineComplaintStatistics();
  }, []);

  const fetchrecordsNew = async (page) => {
    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-complaint-list?limit=${limit}&page=${page}`,
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-complaint?Id=${id}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );

      const data = await response.json();

      if (data.success === true) {
        notifydelete();
        fetchrecordsNew(1);
        fetchOnlineComplaintStatistics(); // Refresh statistics after deletion
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

  const handleEditClick = (record) => {
    setCurrentRecordId(record._id);
    setActionTaken(record.actionTaken || "");
    setRemark(record.remark || "");
    setEditModalOpen(true);
  };

  const updateComplaintAction = async () => {
      if (!actionTaken) {
        notifyWarn("Please select an action");
        return;
      }
  
      const token = Cookies.get("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
  
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-complaint-action`,
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
              complaintId: currentRecordId,
              actionTaken,
              remark,
            }),
          }
        );
  
        const data = await response.json();
  
        if (data.success === true) {
          notifySuccess("Complaint action updated successfully!");
          setEditModalOpen(false);
          fetchrecordsNew(currentPage);
          fetchOnlineComplaintStatistics(); // Refresh statistics after update
        } else {
          notifyWarn(data.message || "Failed to update complaint action");
        }
      } catch (error) {
        notifyWarn("An error occurred while updating the complaint");
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
              <div className="mb-52 w-full bg-white">
                <h1 className="font-semibold text-xl mt-20">
                  Online Complaint Records
                </h1>

                <div className="flex flex-row justify-between py-0 mt-5">
                  <div className="flex flex-row space-x-1">
                    <div>Show</div>
                    <select
                      value={limit}
                      onChange={(e) => setlimit(e.target.value)}
                      className="text-sm border px-1 py-1 h-7 rounded-md shadow-md outline-none"
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
                        <th className="p-2 w-1/12 border-r">Delete</th>
                        <th className="p-2 w-1/12 border-r">No.</th>
                        <th className="p-2 w-2/12 border-r">Register No.</th>
                        <th className="p-2 w-2/12 border-r">Full Name</th>
                        <th className="p-2 w-2/12 border-r">Police Station</th>
                        <th className="p-2 w-2/12 border-r">Mobile No.</th>
                        <th className="p-2 w-1/12 border-r text-xs">
                          Full Details
                        </th>
                        <th className="p-2 w-1/12 border-r">Status</th>
                        <th className="p-2 w-1/12 border-r">Edit</th>
                        <th className="p-2 w-2/12 border-r">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((record, index) => {
                        const {
                          psId,
                          reg_id,
                          fullName,
                          contactNo,
                          email,
                          street,
                          address,
                          city,
                          country,
                          pinCode,
                          complaint,
                          files,
                          createdAt,
                          _id,
                          actionTaken,
                          remark,
                        } = record;
                        const date = createdAt.substring(0, 10);

                        return (
                          <tr
                            className="border flex flex-row justify-between"
                            key={_id}
                          >
                            <td className="p-1 w-1/12 border-r">
                              <button
                                className="bg-red-600 text-white p-3 rounded"
                                onClick={() => onOpenModal(_id)}
                              >
                                <RiDeleteBin2Line />
                              </button>
                            </td>
                            <td className="p-2 w-1/12 border-r font-bold text-center">
                              {onlineComplaintStatistics - (index)}
                            </td>
                            <td className="p-2 w-2/12 border-r">{reg_id}</td>
                            <td className="p-2 w-2/12 border-r">{fullName}</td>
                            <td className="p-2 w-2/12 border-r">{psId.name}</td>
                            <td className="p-2 w-2/12 border-r">{contactNo}</td>
                            <td className="p-2 w-1/12 border-r">
                              <button
                                className="bg-blue-600 text-white p-3 rounded"
                                onClick={() =>
                                  viewdetailHandler(
                                    psId,
                                    reg_id,
                                    fullName,
                                    contactNo,
                                    email,
                                    street,
                                    address,
                                    city,
                                    country,
                                    pinCode,
                                    complaint,
                                    files
                                  )
                                }
                              >
                                <AiFillEye />
                              </button>
                            </td>
                            <td className="p-2 w-1/12 border-r">
                              {actionTaken || "Pending"}
                            </td>
                            <td className="p-2 w-1/12 border-r">
                              <button
                                className="bg-green-600 text-white p-3 rounded"
                                onClick={() => handleEditClick(record)}
                              >
                                <FiEdit />
                              </button>
                            </td>
                            <td className="p-2 w-2/12 border-r">{date}</td>
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

                {/* Delete Confirmation Modal */}
                <Modal open={open} onClose={onCloseModal} center>
                  <div className="px-5 pt-5">
                    <p>Are you sure to delete the record?</p>
                    <div className="flex flex-row justify-between mt-5">
                      <button
                        className="px-3 py-1 bg-white border rounded"
                        onClick={onCloseModal}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-3 py-1 bg-red-600 font-semibold text-white border rounded"
                        onClick={() => deleterecord(deleteid)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </Modal>

                {/* Edit Action/Remark Modal */}
                <Modal
                  open={editModalOpen}
                  onClose={() => setEditModalOpen(false)}
                  center
                >
                  <div className="px-5 pt-5 w-[500px]">
                    <h2 className="text-xl font-bold mb-5">Update Complaint Status</h2>
                    <div className="flex flex-col space-y-5">
                      <div>
                        <label className="font-bold text-lg">Action Taken:</label>
                        <select
                          value={actionTaken}
                          onChange={(e) => setActionTaken(e.target.value)}
                          className="border p-2 rounded w-full mt-1"
                        >
                          <option value="">Select Action</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-bold text-lg">Remark:</label>
                        <textarea
                          value={remark}
                          onChange={(e) => setRemark(e.target.value)}
                          className="border p-2 rounded w-full mt-1"
                          rows="4"
                          placeholder="Enter your remarks here..."
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-5 space-x-3">
                      <button
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={() => setEditModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={updateComplaintAction}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </Modal>

                {/* View Details Modal */}
                <Modal
                  open={viewdetail}
                  onClose={() => setViewDetail(false)}
                  center
                >
                  <div className="px-5 pt-5 w-[750px]">
                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Register No:</div>
                      <div>{reg_id}</div>
                    </div>
                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Full Name:</div>
                      <div>{fullName}</div>
                    </div>
                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Contact No:</div>
                      <div>{contactNo}</div>
                    </div>
                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Email Id:</div>
                      <div>{email}</div>
                    </div>
                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Street:</div>
                      <div>{street}</div>
                    </div>
                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Address:</div>
                      <div>{address}</div>
                    </div>
                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">City:</div>
                      <div>{city}</div>
                    </div>
                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Country:</div>
                      <div>{country}</div>
                    </div>
                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Pincode:</div>
                      <div>{pinCode}</div>
                    </div>
                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Police Station:</div>
                      <div>{psId?.name}</div>
                    </div>
                    <div className="flex flex-col space-y-5 pt-5">
                      <div className="font-bold text-lg">Complaint:</div>
                      <div className="whitespace-pre-wrap">{complaint}</div>
                    </div>
                    <div className="flex flex-col space-y-5 pt-5">
                      <div className="font-bold text-lg">Files Attached:</div>
                      <div>
                        {files?.map((file, index) => (
                          <Link href={file} target="_blank" key={index}>
                            <button className="bg-yellow-600 text-white p-3 rounded mr-5">
                              <BiSolidDownload />
                            </button>
                          </Link>
                        ))}
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

export default Complaint;