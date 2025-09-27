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

const Record = () => {
  const [title, settitle] = useState("");
  const [titleInMarathi, settitleInMarathi] = useState("");
  const [date, setdate] = useState("");
  const [file, setfile] = useState(null);
  const [fileErr, setfileErr] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [isform, setisform] = useState(false);
  const [records, setrecords] = useState([]);
  const [deleteid, setdeleteid] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);

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
  const [titleF, settitleF] = useState("");
  const [titleInMarathiF, settitleInMarathiF] = useState("");
  const [dateF, setdateF] = useState("");
  const [pdflinkF, setpdflinkF] = useState("");
  const [idF, setidF] = useState("");
  const [fileF, setfileF] = useState(null);
  const [fileErrF, setfileErrF] = useState(false);
  const [updateLoading, setupdateLoading] = useState(false);

  const onOpenModal2 = (title, titleInMarathi, date, pdflink, _id) => {
    settitleF(DOMPurify.sanitize(title));
    settitleInMarathiF(DOMPurify.sanitize(titleInMarathi));
    setdateF(DOMPurify.sanitize(date));
    setpdflinkF(DOMPurify.sanitize(pdflink));
    setidF(DOMPurify.sanitize(_id));
    setOpen2(true);
  };
  const onCloseModal2 = () => {
    //   setdeleteid("");
    setOpen2(false);
  };

  const handleFileChangeF = (e) => {
    setfileErrF(false);
    const file = e.target.files[0];

    if (file) {
      // Check if the file is a PDF
      if (file.type === "application/pdf") {
        // Check if the selected file size is within the limit (5MB)
        if (file.size <= 5 * 1024 * 1024) {
          setfileF(file);
        } else {
          setfileErrF(true);
          e.target.value = ""; // Clear the input field
          setfileF(null);
          //   alert("File size exceeds 5MB limit.");
        }
      } else {
        e.target.value = ""; // Clear the input field
        setfileF(null);
        alert("Please select a PDF file.");
        return;
      }
    }
  };

  useEffect(() => {
    fetchrecords();
  }, [currentPage, limit]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFileChange = (e) => {
    setfileErr(false);
    const file = e.target.files[0];

    if (file) {
      // Check if the file is a PDF
      if (file.type === "application/pdf") {
        // Check if the selected file size is within the limit (5MB)
        if (file.size <= 5 * 1024 * 1024) {
          setfile(file);
        } else {
          setfileErr(true);
          e.target.value = ""; // Clear the input field
          setfile(null);
          //   alert("File size exceeds 5MB limit.");
        }
      } else {
        e.target.value = ""; // Clear the input field
        setfile(null);
        alert("Please select a PDF file.");
        return;
      }
    }
  };

  const resethandler = () => {
    setdate("");
    settitle("");
    settitleInMarathi("");
    setfile(null);
  };

  const cancelhandler = () => {
    setisform(false);
    setdate("");
    settitle("");

    settitleInMarathi("");
    setfile(null);
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/records-by-tag?tag=atrocity_cases&page=${currentPage}&limit=${limit}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (data.records) {
        // console.log(data);
        setrecords(data.records);
        setTotalPages(data.totalPages);
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-record?id=${id}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );

      const data = await response.json();

      if (data.success === true) {
        notifydelete();
        setCurrentPage(1);
        fetchrecords();
      } else {
        notifyWarn();
      }
    } catch (error) {
      notifyWarn();
    }
  };

  const submithandler = async (e) => {
    if (!title || !titleInMarathi || !file) {
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
    formData.append("title", DOMPurify.sanitize(title));
    formData.append("titleInMarathi", DOMPurify.sanitize(titleInMarathi));
    if (date) {
      formData.append("date", DOMPurify.sanitize(date));
    }

    formData.append("tag", "atrocity_cases");
    formData.append("pdf", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add-record`,
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
        settitle("");
        settitleInMarathi("");
        setdate("");
        setfile(null);
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
    if (!titleF || !titleInMarathiF) {
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
    };

    const formData = new FormData();
    formData.append("title", DOMPurify.sanitize(titleF));
    formData.append("titleInMarathi", DOMPurify.sanitize(titleInMarathiF));
    if (dateF) {
      formData.append("date", DOMPurify.sanitize(dateF));
    }

    if (fileF) {
      formData.append("pdf", fileF);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-record?recordId=${idF}`,
        {
          method: "POST",
          body: formData,
          headers: headers,
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchrecords();
        setupdateLoading(false);
        notifyUpdate();
        settitleF("");
        settitleInMarathiF("");
        setdateF("");
        setfile(null);
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
                      * Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                      placeholder="Enter title"
                      value={title}
                      onChange={(e) => settitle(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="titleInMarathi"
                      className="mb-1 text-base text-gray-800"
                    >
                      * Title in Marathi
                    </label>
                    <input
                      type="text"
                      id="titleInMarathi"
                      name="titleInMarathi"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                      placeholder="Enter title in Marathi"
                      value={titleInMarathi}
                      onChange={(e) => settitleInMarathi(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="date"
                      className="mb-1 text-base text-gray-800"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-40"
                      value={date}
                      onChange={(e) => setdate(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="file"
                      className="mb-1 text-base text-gray-800"
                    >
                      * File
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="pdf"
                      accept=".pdf"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-60"
                      placeholder="Enter title"
                      onChange={(e) => handleFileChange(e)}
                    />
                    {fileErr && (
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

              <div className="mb-52 w-full bg-white">
                <h1 className="font-semibold text-xl mt-10">
                  Atrocity Cases Records
                </h1>

                <div className="flex flex-row mt-5 space-x-1">
                  <div>Show</div>
                  <select
                    id="locationSelect"
                    name="location"
                    value={limit}
                    onChange={(e) => {
                      setLimit(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="text-sm border px-1 py-1 h-7 rounded-md shadow-md  outline-none"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  <div>entries</div>
                </div>

                <div className="overflow-x-auto max-w-full">
                  <table className="w-full min-w-[800px] mx-auto mt-5 text-left">
                    <tr className="border flex flex-row justify-between bg-gray-100">
                      <th className="p-2 w-1/12 border-r">Delete</th>
                      <th className="p-2 w-1/12 border-r">Edit</th>
                      <th className="p-2 w-4/12 border-r">Title</th>
                      <th className="p-2 w-3/12 border-r">Title in Marathi</th>
                      <th className="p-2 w-2/12 border-r">Date</th>
                      <th className="p-2 w-1/12 border-r">File</th>
                    </tr>

                    {records.map((record) => {
                      const { title, titleInMarathi, date, pdflink, _id } =
                        record;
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
                              onClick={() =>
                                onOpenModal2(
                                  title,
                                  titleInMarathi,
                                  date,
                                  pdflink,
                                  _id
                                )
                              }
                            >
                              <AiFillEdit />
                            </button>
                          </td>
                          <td className="p-1 w-4/12 border-r">{title}</td>
                          <td className="p-1 w-3/12 border-r">
                            {titleInMarathi}
                          </td>
                          <td className="p-1 w-2/12 border-r">{date}</td>
                          <td className="p-1 w-1/12 border-r">
                            <Link href={pdflink} target="_blank">
                              <button className="bg-yellow-600 text-white p-3 rounded">
                                <BiSolidDownload />
                              </button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>

                {records.length > 0 && (
                  <div className="mt-4 flex  gap-2 items-center mx-auto">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-gray-700">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
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
                  <div className="pt-10 px-5 w-[500px]">
                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        * Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder="Enter title"
                        value={titleF}
                        onChange={(e) => settitleF(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="titleInMarathi"
                        className="mb-1 text-base text-gray-800"
                      >
                        * Title in Marathi
                      </label>
                      <input
                        type="text"
                        id="titleInMarathi"
                        name="titleInMarathi"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder="Enter title in Marathi"
                        value={titleInMarathiF}
                        onChange={(e) => settitleInMarathiF(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="date"
                        className="mb-1 text-base text-gray-800"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-40"
                        value={dateF}
                        onChange={(e) => setdateF(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="file"
                        className="mb-1 text-base text-gray-800"
                      >
                        New File (Optional)
                      </label>
                      <input
                        type="file"
                        id="file"
                        name="pdf"
                        accept=".pdf"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-60"
                        placeholder="Enter title"
                        onChange={(e) => handleFileChangeF(e)}
                      />
                      {fileErrF && (
                        <p className="text-red-600 text-sm">
                          File size exceeds the limit (5MB). Please choose a
                          smaller file
                        </p>
                      )}
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

export default Record;
