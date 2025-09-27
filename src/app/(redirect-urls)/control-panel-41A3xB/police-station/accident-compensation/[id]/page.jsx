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
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ProtectedAdminRoute from "@/components/ProtectedUserRoutes";
import Cookies from "js-cookie";
import DOMPurify from "dompurify";

const Accident = () => {
  const params = useParams();
  const id = params?.id;
  const [cr_no, setCr_no] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [psId, setPsId] = useState(id);
  const [accidentCompensationStatistics, setAccidentCompensationStatistics] = useState(0);

  const [f1, setf1] = useState(null);
  const [f1Err, setf1Err] = useState(false);
  const [f2, setf2] = useState(null);
  const [f2Err, setf2Err] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [isform, setisform] = useState(false);
  const [records, setrecords] = useState([]);
  const [deleteid, setdeleteid] = useState("");

  const [stations, setStations] = useState([]);
  const [years, setYears] = useState([]);

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

  const [cr_noF, setCr_noF] = useState("");
  const [yearF, setYearF] = useState("");
  const [dateF, setDateF] = useState("");
  const [psIdF, setPsIdF] = useState("");

  const [comm_aa, setComm_aa] = useState("");

  const [fir_file, setFir_file] = useState("");

  const [open2, setOpen2] = useState(false);
  const [idF, setidF] = useState("");
  const [f1F, setf1F] = useState(null);
  const [f1ErrF, setf1ErrF] = useState(false);
  const [f2F, setf2F] = useState(null);
  const [f2ErrF, setf2ErrF] = useState(false);
  const [updateLoading, setupdateLoading] = useState(false);

  const onOpenModal2 = (cr_no, year, date, psId, comm_aa, fir_file, _id) => {
    setCr_noF(DOMPurify.sanitize(cr_no));
    setYearF(DOMPurify.sanitize(year));
    setDateF(DOMPurify.sanitize(date));
    setPsIdF(DOMPurify.sanitize(psId));

    setComm_aa(DOMPurify.sanitize(comm_aa));
    setFir_file(DOMPurify.sanitize(fir_file));
    setidF(DOMPurify.sanitize(_id));

    setOpen2(true);
  };
  const onCloseModal2 = () => {
    setdeleteid("");
    setOpen2(false);
  };

  const handlef1Change = (e) => {
    setf1Err(false);
    const file = e.target.files[0];

    // setfile(file);

    if (file) {
      // Check if the selected file size is within the limit (5MB)
      if (file.size <= 5 * 1024 * 1024) {
        setf1(file);
      } else {
        setf1Err(true);
        e.target.value = ""; // Clear the input field
        setf1(null);
      }
    }
  };

  const handlef1ChangeF = (e) => {
    setf1ErrF(false);
    const file = e.target.files[0];

    // setfile(file);

    if (file) {
      // Check if the selected file size is within the limit (5MB)
      if (file.size <= 5 * 1024 * 1024) {
        setf1F(file);
      } else {
        setf1ErrF(true);
        e.target.value = ""; // Clear the input field
        setf1F(null);
      }
    }
  };

  const handlef2Change = (e) => {
    setf2Err(false);
    const file = e.target.files[0];

    // setfile(file);

    if (file) {
      // Check if the selected file size is within the limit (5MB)
      if (file.size <= 5 * 1024 * 1024) {
        setf2(file);
      } else {
        setf2Err(true);
        e.target.value = ""; // Clear the input field
        setf2(null);
      }
    }
  };

  const handlef2ChangeF = (e) => {
    setf2ErrF(false);
    const file = e.target.files[0];

    // setfile(file);

    if (file) {
      // Check if the selected file size is within the limit (5MB)
      if (file.size <= 5 * 1024 * 1024) {
        setf2F(file);
      } else {
        setf2ErrF(true);
        e.target.value = ""; // Clear the input field
        setf2F(null);
      }
    }
  };

  useEffect(() => {
    fetchrecords();
    fetchStations();
    fetchYears();
    fetchAccidentCompensationStatistics();
  }, []);

  // Fetch statistics
  const fetchAccidentCompensationStatistics = async () => {
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
        const stationStats = data.statistics.accidentCompensation.byPoliceStation.find(
          stat => stat.psId == stationId || stat.policeStation === psId.name
        );
        setAccidentCompensationStatistics(stationStats ? stationStats.count : 0);
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const resethandler = () => {
    setCr_no("");
    setDate("");
    // setPsId("");
    setYear("");
    setf1(null);
    setf2(null);
  };

  const cancelhandler = () => {
    setisform(false);
    resethandler();
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

  const fetchrecords = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-ac-by-user?Id=${id}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (data && data.success) {
        // console.log(data);

        setrecords(data.data);
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

  const fetchYears = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-year`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (data) {
        setYears(data.years);
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-accident-compensation?Id=${id}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );

      const data = await response.json();

      if (data.success === true) {
        notifydelete();
        fetchrecords();
      } else {
        notifyWarn();
      }
    } catch (error) {
      notifyWarn();
    }
  };

  const submithandler = async (e) => {
    if (!cr_no || !year || !date || !psId) {
      notifyvalid();
      return;
    }

    setisloading(true);
    setisform(false);
    e.preventDefault();

    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();

    formData.append("cr_no", DOMPurify.sanitize(cr_no));
    formData.append("date", DOMPurify.sanitize(date));
    formData.append("year", DOMPurify.sanitize(year));
    formData.append("psId", DOMPurify.sanitize(psId));
    if (f1) {
      formData.append("f1", f1);
    }
    if (f2) {
      formData.append("f2", f2);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add-accident-compensation`,
        {
          method: "POST",
          body: formData,
          headers: headers,
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchrecords();
        setisloading(false);
        notifySuccess();
        resethandler();
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

  const updateHandler = async (e) => {
    if (!cr_noF || !yearF || !dateF || !psIdF) {
      notifyvalid();

      return;
    }

    setupdateLoading(true);
    // e.preventDefault();

    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    formData.append("cr_no", DOMPurify.sanitize(cr_noF));
    formData.append("date", DOMPurify.sanitize(dateF));
    formData.append("year", DOMPurify.sanitize(yearF));
    formData.append("psId", DOMPurify.sanitize(psIdF));
    if (f1F) {
      formData.append("f1", f1F);
    }
    if (f2F) {
      formData.append("f2", f2F);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-accident-compensation?Id=${idF}`,
        {
          method: "PATCH",
          body: formData,
          headers: headers,
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchrecords();
        setupdateLoading(false);
        notifyUpdate();
        setOpen2(false);
      } else {
        notifyWarn();
        setupdateLoading(false);
      }
    } catch (error) {
      notifyWarn();
      setupdateLoading(false);
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
                  onClick={resethandler}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  Reset
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
                      * Cr No
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                      placeholder=""
                      value={cr_no}
                      onChange={(e) => setCr_no(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="title"
                      className="mb-1 text-base text-gray-800"
                    >
                      * Year
                    </label>
                    <select
                      id="locationSelect"
                      name="location"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-40"
                    >
                      <option value="">Select Year</option>
                      {years.map((record) => {
                        const { year, _id } = record;

                        return (
                          <option key={_id} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="title"
                      className="mb-1 text-base text-gray-800"
                    >
                      * Date
                    </label>
                    <input
                      type="date"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-40"
                      placeholder=""
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

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
                      onChange={(e) => setPsId(e.target.value)}
                      disabled={true}
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
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

                  <div className="flex flex-col mx-3 my-3 space-y-1 mb-5">
                    <label
                      htmlFor="file"
                      className="mb-1 text-base text-gray-800"
                    >
                      Comm AA File
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="image"
                      accept=".pdf"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-60"
                      placeholder="Enter title"
                      onChange={(e) => handlef1Change(e)}
                    />
                    {f1Err && (
                      <p className="text-red-600 text-sm">
                        File size exceeds the limit (5MB). Please choose a
                        smaller file
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col mx-3 my-3 space-y-1 mb-5">
                    <label
                      htmlFor="file"
                      className="mb-1 text-base text-gray-800"
                    >
                      FIR file
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="image"
                      accept=".pdf"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-60"
                      placeholder="Enter title"
                      onChange={(e) => handlef2Change(e)}
                    />
                    {f2Err && (
                      <p className="text-red-600 text-sm">
                        File size exceeds the limit (5MB). Please choose a
                        smaller file
                      </p>
                    )}
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

              <div className="mb-52 w-full bg-white overflow-x-auto">
                <h1 className="font-semibold text-xl mt-10">
                  Accident Compensation Records
                </h1>

                <div className="overflow-x-auto max-w-full">
                  <table className="w-full min-w-[800px] overflow-x-auto mx-auto mt-5 text-left">
                    <thead>
                      <tr className="border flex flex-row justify-between bg-gray-100">
                        <th className="p-2 w-1/12 border-r">No.</th>
                        <th className="p-2 w-1/12 border-r">Edit</th>
                        <th className="p-2 w-2/12 border-r">Cr No</th>
                        <th className="p-2 w-1/12 border-r">Year</th>
                        <th className="p-2 w-2/12 border-r">Date</th>
                        <th className="p-2 w-3/12 border-r">Police Station</th>
                        <th className="p-2 w-1/12 border-r">Comm AA</th>
                        <th className="p-2 w-1/12 border-r">FIR file</th>
                      </tr>
                    </thead>

                    <tbody>
                      {records.map((record, index) => {
                        const {
                          cr_no,
                          year,
                          date,
                          psId,
                          comm_aa,
                          fir_file,
                          _id,
                        } = record;
                        return (
                          <tr
                            className="border flex flex-row justify-between"
                            key={_id}
                          >
                            <td className="p-2 w-1/12 border-r font-bold text-center">
                              {accidentCompensationStatistics - index}
                            </td>
                            <td className="p-1 w-1/12 border-r">
                              <button
                                className="bg-yellow-600 text-white p-3 rounded"
                                //   onClick={() => deleterecord(_id)}
                                onClick={() =>
                                  onOpenModal2(
                                    cr_no,
                                    year,
                                    date,
                                    psId._id,
                                    comm_aa,
                                    fir_file,
                                    _id
                                  )
                                }
                              >
                                <AiFillEdit />
                              </button>
                            </td>
                            <td className="p-1 w-2/12 border-r">{cr_no}</td>
                            <td className="p-1 w-1/12 border-r">{year}</td>

                            <td className="p-1 w-2/12 border-r">{date}</td>

                            <td className="p-1 w-3/12 border-r">{psId.name}</td>
                            <td className="p-1 w-1/12 border-r">
                              {comm_aa && (
                                <Link href={comm_aa} target="_blank">
                                  <button className="bg-yellow-600 text-white p-3 rounded">
                                    <BiSolidDownload />
                                  </button>
                                </Link>
                              )}
                            </td>
                            <td className="p-1 w-1/12 border-r">
                              {fir_file && (
                                <Link href={fir_file} target="_blank">
                                  <button className="bg-yellow-600 text-white p-3 rounded">
                                    <BiSolidDownload />
                                  </button>
                                </Link>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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
                <Modal open={open2} onClose={onCloseModal2} center>
                  <div className="pt-10 px-5 w-[700px]">
                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        * Cr No
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={cr_noF}
                        onChange={(e) => setCr_noF(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        * Year
                      </label>
                      <select
                        id="locationSelect"
                        name="location"
                        value={yearF}
                        onChange={(e) => setYearF(e.target.value)}
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-40"
                      >
                        <option value="">Select Year</option>
                        {years.map((record) => {
                          const { year, _id } = record;

                          return (
                            <option key={_id} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        * Date
                      </label>
                      <input
                        type="date"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-40"
                        placeholder=""
                        value={dateF}
                        onChange={(e) => setDateF(e.target.value)}
                      />
                    </div>

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
                        onChange={(e) => setPsIdF(e.target.value)}
                        disabled={true}
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
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

                    <div className="flex flex-col mx-3 my-3 space-y-1 mb-5">
                      <label
                        htmlFor="file"
                        className="mb-1 text-base text-gray-800"
                      >
                        Comm AA (optional)
                      </label>
                      <input
                        type="file"
                        id="file"
                        name="image"
                        accept=".pdf"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-60"
                        placeholder="Enter title"
                        onChange={(e) => handlef1ChangeF(e)}
                      />
                      {f1ErrF && (
                        <p className="text-red-600 text-sm">
                          File size exceeds the limit (5MB). Please choose a
                          smaller file
                        </p>
                      )}
                    </div>

                    {comm_aa && (
                      <div className="my-5 mx-3">
                        <div>Current Comm AA File</div>
                        <div className="">
                          <Link href={comm_aa} target="_blank">
                            <button className="bg-yellow-600 text-white p-3 rounded">
                              <BiSolidDownload />
                            </button>
                          </Link>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col mx-3 my-3 space-y-1 mb-5">
                      <label
                        htmlFor="file"
                        className="mb-1 text-base text-gray-800"
                      >
                        New FIR file (optional)
                      </label>
                      <input
                        type="file"
                        id="file"
                        name="image"
                        accept=".pdf"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-60"
                        placeholder="Enter title"
                        onChange={(e) => handlef2ChangeF(e)}
                      />
                      {f2ErrF && (
                        <p className="text-red-600 text-sm">
                          File size exceeds the limit (5MB). Please choose a
                          smaller file or Please select a .pdf file
                        </p>
                      )}
                    </div>

                    {fir_file && (
                      <div className="my-5 mx-3">
                        <div>Current Fir File</div>
                        <div className="">
                          <Link href={fir_file} target="_blank">
                            <button className="bg-yellow-600 text-white p-3 rounded">
                              <BiSolidDownload />
                            </button>
                          </Link>
                        </div>
                      </div>
                    )}

                    <div>
                      <button
                        onClick={updateHandler}
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

export default Accident;

