"use client";

import React, { useState, useEffect } from "react";
import AdminN from "@/components/Admin-nav";
import AdminM from "@/components/Admin-menu";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BiSolidDownload } from "react-icons/bi";
import { IoMdLink } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import Cookies from "js-cookie";
import DOMPurify from "dompurify";

const Headline = () => {
  const [title, setTitle] = useState("");
  const [title_in_marathi, setTitle_in_marathi] = useState("");
  const [value, setValue] = useState("");
  const [file_type, setFile_type] = useState("text");
  const [file, setfile] = useState(null);
  const [fileErr, setfileErr] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [isform, setisform] = useState(false);
  const [records, setrecords] = useState([]);
  const [deleteid, setdeleteid] = useState("");

  const [open, setOpen] = useState(false);

  const onOpenModal = (id) => {
    setdeleteid(id);
    setOpen(true);
  };
  const onCloseModal = () => {
    setdeleteid("");
    setOpen(false);
  };

  useEffect(() => {
    fetchrecords();
  }, []);

  const handleFileChange = (e) => {
    setfileErr(false);
    const file = e.target.files[0];

    // setfile(file);

    if (file) {
      // Check if the selected file size is within the limit (5MB)
      if (file.size <= 5 * 1024 * 1024) {
        setfile(file);
      } else {
        setfileErr(true);
        e.target.value = ""; // Clear the input field
        setfile(null);
      }
    }
  };

  const resethandler = () => {
    setTitle("");
    setTitle_in_marathi("");
    setValue("");
    setfile(null);
  };

  const cancelhandler = () => {
    setisform(false);
    setTitle("");
    setTitle_in_marathi("");
    setValue("");
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-headline-all`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (data.records) {
        setrecords(data.records);
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-headline-record?id=${id}`,
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

  const submithandler = async () => {
    if (
      !title ||
      !title_in_marathi ||
      (file_type === "pdf" && !file) ||
      (file_type === "link" && !value)
    ) {
      notifyvalid();

      return;
    }

    setisloading(true);
    setisform(false);
    // e.preventDefault();

    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    formData.append("title", DOMPurify.sanitize(title));
    formData.append("title_in_marathi", DOMPurify.sanitize(title_in_marathi));
    formData.append("file_type", "pdf");
    formData.append("pdf", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add-headline-with-file`,
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
        setTitle("");
        setTitle_in_marathi("");
        setValue("");
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

  const submithandler2 = async () => {
    if (
      !title ||
      !title_in_marathi ||
      (file_type === "pdf" && !file) ||
      (file_type === "link" && !value)
    ) {
      notifyvalid();

      return;
    }

    setisloading(true);
    setisform(false);
    // e.preventDefault();

    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const bodydata = {
      title: DOMPurify.sanitize(title),
      title_in_marathi: DOMPurify.sanitize(title_in_marathi),
      file_type: file_type,
    };

    if (file_type === "link") {
      bodydata.value = value;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add-headline-with-text`,
        {
          method: "POST",
          body: JSON.stringify(bodydata),
          headers: headers,
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.success) {
        fetchrecords();
        setisloading(false);
        notifySuccess();
        setTitle("");
        setTitle_in_marathi("");
        setValue("");
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

  const submitfinal = () => {
    if (file_type === "pdf") {
      submithandler();
    } else {
      submithandler2();
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
                      * Headline Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                      placeholder=""
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="title"
                      className="mb-1 text-base text-gray-800"
                    >
                      * Headline Title in Marathi
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                      placeholder=""
                      value={title_in_marathi}
                      onChange={(e) => setTitle_in_marathi(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="date"
                      className="mb-1 text-base text-gray-800"
                    >
                      * type
                    </label>
                    <select
                      id="locationSelect"
                      name="location"
                      value={file_type}
                      onChange={(e) => setFile_type(e.target.value)}
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-40"
                    >
                      <option value="">Select</option>
                      <option value="text">Text</option>
                      <option value="link">Link</option>
                      <option value="pdf">PDF</option>
                    </select>
                  </div>

                  {file_type === "link" && (
                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        * External link
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </div>
                  )}

                  {file_type === "pdf" && (
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
                  )}

                  <div>
                    <button
                      onClick={submitfinal}
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
                  Headlines Records
                </h1>
                <div className="overflow-x-auto max-w-full">
                  <table className="w-full min-w-[800px] mx-auto mt-5 text-left">
                    <tr className="border flex flex-row justify-between bg-gray-100">
                      <th className="p-2 w-1/12 border-r">Delete</th>
                      <th className="p-2 w-5/12 border-r">Title</th>
                      <th className="p-2 w-5/12 border-r">Title in Marathi</th>
                      <th className="p-2 w-1/12 border-r">Value</th>
                    </tr>

                    {records.map((record) => {
                      const { title, title_in_marathi, value, file_type, _id } =
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
                          <td className="p-1 w-5/12 border-r">{title}</td>
                          <td className="p-1 w-5/12 border-r">
                            {title_in_marathi}
                          </td>
                          <td className="p-1 w-1/12 border-r">
                            {file_type === "pdf" && (
                              <Link href={value} target="_blank">
                                <button className="bg-yellow-600 text-white p-3 rounded">
                                  <BiSolidDownload />
                                </button>
                              </Link>
                            )}
                            {file_type === "link" && (
                              <Link href={value} target="_blank">
                                <button className="bg-yellow-600 text-white p-3 rounded">
                                  <IoMdLink />
                                </button>
                              </Link>
                            )}
                            {file_type === "text" && <div>{value}</div>}
                          </td>
                        </tr>
                      );
                    })}
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
              </div>
            </div>
          </div>
        </main>
      </>
    </ProtectedAdminRoute>
  );
};

export default Headline;
