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
import DOMPurify from "dompurify";
// import { saveAs } from "file-saver";

const Tenant = () => {
  const params = useParams();
  const id = params?.id;
  const [isloading, setisloading] = useState(false);
  const [isform, setisform] = useState(false);
  const [records, setrecords] = useState([]);
  const [deleteid, setdeleteid] = useState("");

  const [docfull, setdocfull] = useState(null);

  const [limit, setlimit] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [open, setOpen] = useState(false); //delete modal state

  const [viewdetail, setViewDetail] = useState(false); //view entire message modal

  //filter form states
  const [tenantName, setTenantName] = useState("");
  const [tenantMobNo, setTenantMobNo] = useState("");
  const [tenantIdentityProofNo, setTenantIdentityProofNo] = useState("");

  const [fullName, setFullName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [rentPropertyPincode, setRentPropertyPincode] = useState("");

  const [stations, setStations] = useState([]);

  const [psId, setPsId] = useState(id);
  const [tenantInfoStatistics, setTenantInfoStatistics] = useState(0);

  const [reg_id, setReg_id] = useState("");

  const [filter, setFilter] = useState(false);

  // Fetch statistics
  const fetchTenantInfoStatistics = async () => {
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
        const stationStats = data.statistics.tenantInfo.byPoliceStation.find(
          stat => stat.psId == stationId || stat.policeStation === psId.name
        );
        setTenantInfoStatistics(stationStats ? stationStats.count : 0);
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const resethandler = () => {
    setTenantName("");
    setTenantMobNo("");
    setTenantIdentityProofNo("");
    setFullName("");
    setContactNo("");
    setRentPropertyPincode("");
    setReg_id("");
    setFilter(false);
    fetchrecordsNew(1);
  };

  const searchHandler = () => {
    setFilter(true);
    fetchSearch(1);
  };

  const viewdetailHandler = () => {
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
    fetchStations();
    fetchTenantInfoStatistics();
  }, []);

  const fetchrecordsNew = async (page) => {
    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-tenant-list?limit=${limit}&page=${page}&psId=${psId}`,
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

  const fetchSearch = async (page) => {
    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-tenant-by-filter?limit=${limit}&page=${page}&fullName=${DOMPurify.sanitize(fullName)}&contactNo=${DOMPurify.sanitize(contactNo)}&psId=${DOMPurify.sanitize(psId)}&rentPropertyPincode=${DOMPurify.sanitize(rentPropertyPincode)}&tenantName=${DOMPurify.sanitize(tenantName)}&tenantIdentityProofNo=${DOMPurify.sanitize(tenantIdentityProofNo)}&tenantMobNo=${DOMPurify.sanitize(tenantMobNo)}&reg_id=${DOMPurify.sanitize(reg_id)}`,
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-tenant?Id=${id}`,
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

  const fetchStations = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-stations`,
        {
          method: "GET",
        }
      );

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
    if (filter) {
      fetchSearch(currentPage);
    } else {
      fetchrecordsNew(currentPage);
    }
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
                  Tenant Info Records
                </h1>

                {/* filter records */}
                <div className="my-5">
                  <div className="flex flex-row space-x-5">
                    <div className="flex flex-col my-1 space-y-1 mb-5 w-1/3">
                      <label
                        htmlFor="titleInMarathi"
                        className="mb-1 text-base text-gray-800"
                      >
                        Tenant Name
                      </label>
                      <input
                        type="text"
                        id="titleInMarathi"
                        name="titleInMarathi"
                        className="text-base border border-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={tenantName}
                        onChange={(e) => setTenantName(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col my-1 space-y-1 mb-5 w-1/3">
                      <label
                        htmlFor="titleInMarathi"
                        className="mb-1 text-base text-gray-800"
                      >
                        Tenant Mobile No
                      </label>
                      <input
                        type="text"
                        id="titleInMarathi"
                        name="titleInMarathi"
                        className="text-base border border-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={tenantMobNo}
                        onChange={(e) => setTenantMobNo(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col my-1 space-y-1 mb-5 w-1/3">
                      <label
                        htmlFor="titleInMarathi"
                        className="mb-1 text-base text-gray-800"
                      >
                        Tenant Identity Proof No
                      </label>
                      <input
                        type="text"
                        id="titleInMarathi"
                        name="titleInMarathi"
                        className="text-base border border-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={tenantIdentityProofNo}
                        onChange={(e) =>
                          setTenantIdentityProofNo(e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="flex flex-row space-x-5">
                    <div className="flex flex-col my-1 space-y-1 mb-5 w-1/3">
                      <label
                        htmlFor="titleInMarathi"
                        className="mb-1 text-base text-gray-800"
                      >
                        Property Owner Name
                      </label>
                      <input
                        type="text"
                        id="titleInMarathi"
                        name="titleInMarathi"
                        className="text-base border border-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col my-1 space-y-1 mb-5 w-1/3">
                      <label
                        htmlFor="titleInMarathi"
                        className="mb-1 text-base text-gray-800"
                      >
                        Owner Mobile No
                      </label>
                      <input
                        type="text"
                        id="titleInMarathi"
                        name="titleInMarathi"
                        className="text-base border border-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={contactNo}
                        onChange={(e) => setContactNo(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col my-1 space-y-1 mb-5 w-1/3">
                      <label
                        htmlFor="titleInMarathi"
                        className="mb-1 text-base text-gray-800"
                      >
                        Property Pincode
                      </label>
                      <input
                        type="text"
                        id="titleInMarathi"
                        name="titleInMarathi"
                        className="text-base border border-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={rentPropertyPincode}
                        onChange={(e) => setRentPropertyPincode(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-5">
                    <div className="flex flex-col my-1 space-y-1 mb-5 ">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        Police Station
                      </label>
                      <select
                        id="locationSelect"
                        name="location"
                        value={psId}
                        onChange={(e) => setPsId(e.target.value)}
                        disabled={true}
                        className="text-base border border-black px-3 py-2  outline-none focus:border-purple-700"
                      >
                        <option value="">Select Police Station</option>
                        {stations.map((record) => {
                          const { name, _id } = record;

                          return (
                            <option key={_id} value={_id}>
                              {name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="flex flex-col my-1 space-y-1 mb-5 ">
                      <label
                        htmlFor="titleInMarathi"
                        className="mb-1 text-base text-gray-800"
                      >
                        Register Id
                      </label>
                      <input
                        type="text"
                        id="titleInMarathi"
                        name="titleInMarathi"
                        className="text-base border border-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={reg_id}
                        onChange={(e) => setReg_id(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-end mx-3 space-x-3">
                    <button
                      onClick={resethandler}
                      className="bg-blue-600 text-white py-2 w-40 px-4 rounded-md"
                    >
                      Reset
                    </button>
                    <button
                      onClick={searchHandler}
                      className="bg-blue-600 text-white py-2 w-40 px-4 rounded-md"
                    >
                      Search
                    </button>
                  </div>
                </div>

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
                        <th className="p-2 w-3/12 border-r">Full Name</th>
                        <th className="p-2 w-3/12 border-r">Police Station</th>
                        <th className="p-2 w-2/12 border-r">Mobile No.</th>
                        <th className="p-2 w-1/12 border-r text-xs">
                          Full Details
                        </th>
                        <th className="p-2 w-2/12 border-r">Date</th>
                      </tr>
                    </thead>

                                          <tbody>
                        {records.map((record, index) => {
                          const { psId, tenantName, tenantMobNo, createdAt, _id } =
                            record;
                          const date = createdAt.substring(0, 10);

                          return (
                            <tr
                              className="border flex flex-row justify-between"
                              key={_id}
                            >
                              <td className="p-2 w-1/12 border-r font-bold text-center">
                                {tenantInfoStatistics - (index + (currentPage - 1) * limit)}
                              </td>
                              <td className="p-2 w-3/12 border-r">{tenantName}</td>
                              <td className="p-2 w-3/12 border-r">{psId.name}</td>
                              <td className="p-2 w-2/12 border-r">{tenantMobNo}</td>

                              <td className="p-2 w-1/12 border-r">
                                <button
                                  className="bg-blue-600 text-white p-3 rounded"
                                  onClick={() => {
                                    setdocfull(record);
                                    viewdetailHandler();
                                  }}
                                >
                                  <AiFillEye />
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
                  <div className="px-5 pt-5 w-[750px]" id="contentToPrint">
                    <div className="w-full py-2 bg-blue-600 text-white text-center">
                      Property Owner fields
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Register Id :</div>
                      {docfull && <div>{docfull.reg_id}</div>}
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Full Name :</div>
                      {docfull && <div>{docfull.fullName}</div>}
                    </div>

                    <div className="pt-5">
                      <div className="font-bold text-lg">Ownner Photo :</div>
                      {docfull && (
                        <img
                          src={docfull.ownerPhoto}
                          alt=""
                          className="w-32 h-32 object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Contact No :</div>
                      {docfull && <div>{docfull.contactNo}</div>}
                    </div>
                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Police Station :</div>
                      {docfull && <div>{docfull.psId.name}</div>}
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Email Id :</div>
                      {docfull && <div>{docfull.email}</div>}
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Address :</div>
                      {docfull && <div>{docfull.address}</div>}
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">City :</div>
                      {docfull && <div>{docfull.city}</div>}
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">City :</div>
                      {docfull && <div>{docfull.city}</div>}
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">State :</div>
                      {docfull && <div>{docfull.state}</div>}
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Pincode :</div>
                      {docfull && <div>{docfull.pinCode}</div>}
                    </div>

                    <div className="w-full py-2 bg-blue-600 text-white text-center mt-5">
                      Rented Property Details
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Property Address:</div>
                      <div>
                        {docfull && <div>{docfull.rentPropertyAddress}</div>}
                      </div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">City:</div>
                      <div>
                        {docfull && <div>{docfull.rentPropertyCity}</div>}
                      </div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">State:</div>
                      <div>
                        {docfull && <div>{docfull.rentPropertyState}</div>}
                      </div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Pincode:</div>
                      <div>
                        {docfull && <div>{docfull.rentPropertyPincode}</div>}
                      </div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">
                        Agreement Start Date:
                      </div>
                      <div>
                        {docfull && <div>{docfull.agreementStartDate}</div>}
                      </div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">
                        Agreement End Date:
                      </div>
                      <div>
                        {docfull && <div>{docfull.agreementEndDate}</div>}
                      </div>
                    </div>

                    <div className="w-full py-2 bg-blue-600 text-white text-center mt-5">
                      Tenant Info
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Tenant Name:</div>
                      <div>{docfull && <div>{docfull.tenantName}</div>}</div>
                    </div>

                    <div className=" pt-5">
                      <div className="font-bold text-lg">Tenant Photo:</div>
                      <div>
                        {docfull && (
                          <img
                            src={docfull.tenantPhoto}
                            alt=""
                            className="w-32 h-32 object-cover"
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">
                        Permanent Address:
                      </div>
                      <div>
                        {docfull && <div>{docfull.tenantPermanentAddress}</div>}
                      </div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">City:</div>
                      <div>{docfull && <div>{docfull.tenantCity}</div>}</div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">State:</div>
                      <div>{docfull && <div>{docfull.tenantState}</div>}</div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Pincode:</div>
                      <div>{docfull && <div>{docfull.tenantPincode}</div>}</div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Identity Proof:</div>
                      <div>
                        {docfull && <div>{docfull.tenantIdentityProof}</div>}
                      </div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">
                        Identity Proof Number:
                      </div>
                      <div>
                        {docfull && <div>{docfull.tenantIdentityProofNo}</div>}
                      </div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">
                        Identity Proof Document:
                      </div>
                      <div>
                        {docfull && (
                          <Link
                            href={docfull.tenantIdentityProofDoc}
                            target="_blank"
                          >
                            <button className="bg-yellow-600 text-white p-3 rounded mr-5">
                              <BiSolidDownload />
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Number of Male:</div>
                      <div>{docfull && <div>{docfull.numberOfMale}</div>}</div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Number of Female:</div>
                      <div>
                        {docfull && <div>{docfull.numberOfFemale}</div>}
                      </div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">
                        Number of Children:
                      </div>
                      <div>{docfull && <div>{docfull.numberOfChild}</div>}</div>
                    </div>

                    <div className="w-full py-2 bg-blue-600 text-white text-center mt-5">
                      Tenant Work Place Info
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Mobile Number:</div>
                      <div>{docfull && <div>{docfull.tenantMobNo}</div>}</div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Email:</div>
                      <div>{docfull && <div>{docfull.tenantEmail}</div>}</div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Occupation:</div>
                      <div>
                        {docfull && <div>{docfull.tenantOccupation}</div>}
                      </div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Place of Work:</div>
                      <div>
                        {docfull && <div>{docfull.tenantPlaceOfWork}</div>}
                      </div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Work City:</div>
                      <div>
                        {docfull && <div>{docfull.tenantPlaceOfWorkCity}</div>}
                      </div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Work State:</div>
                      <div>
                        {docfull && <div>{docfull.tenantPlaceOfWorkState}</div>}
                      </div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Work Pincode:</div>
                      <div>
                        {docfull && (
                          <div>{docfull.tenantPlaceOfWorkPincode}</div>
                        )}
                      </div>
                    </div>

                    <div className="w-full py-2 bg-blue-600 text-white text-center mt-5">
                      Persons Known Tenant Info
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Known Person 1:</div>
                      <div>{docfull && <div>{docfull.knownPerson1}</div>}</div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Known Person 2:</div>
                      <div>{docfull && <div>{docfull.knownPerson2}</div>}</div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">
                        Known Person 1 Contact:
                      </div>
                      <div>
                        {docfull && <div>{docfull.knownPerson1Contact}</div>}
                      </div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">
                        Known Person 2 Contact:
                      </div>
                      <div>
                        {docfull && <div>{docfull.knownPerson2Contact}</div>}
                      </div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Agent Name:</div>
                      <div>{docfull && <div>{docfull.agentName}</div>}</div>
                    </div>

                    <div className="flex flex-row space-x-5 items-center pt-5">
                      <div className="font-bold text-lg">Agent Details:</div>
                      <div>{docfull && <div>{docfull.agentDetails}</div>}</div>
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

export default Tenant;

