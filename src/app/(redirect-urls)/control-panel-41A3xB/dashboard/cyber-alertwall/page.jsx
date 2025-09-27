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

const Alertwall = () => {
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

  const [open2, setOpen2] = useState(false);
  const [titleF, setTitleF] = useState("");
  const [title_in_marathiF, setTitle_in_marathiF] = useState("");
  const [valueF, setValueF] = useState("");
  const [file_typeF, setFile_typeF] = useState("");
  const [idF, setidF] = useState("");
  const [fileF, setfileF] = useState(null);
  const [fileErrF, setfileErrF] = useState(false);
  const [updateLoading, setupdateLoading] = useState(false);

  const onOpenModal2 = (title, title_in_marathi, file_type, value, _id) => {
    setTitleF(DOMPurify.sanitize(title));
    setTitle_in_marathiF(DOMPurify.sanitize(title_in_marathi));
    setFile_typeF(DOMPurify.sanitize(file_type));
    setValueF(DOMPurify.sanitize(value));
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

    // setfile(file);

    if (file) {
      // Check if the selected file size is within the limit (5MB)
      if (file.size <= 5 * 1024 * 1024) {
        setfileF(file);
      } else {
        setfileErrF(true);
        e.target.value = ""; // Clear the input field
        setfileF(null);
      }
    }
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-alertwall-data?tag=cyber`,
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-alertwall-data?id=${id}`,
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
      ((file_type === "pdf" || file_type === "image") && !file) ||
      ((file_type === "link" || file_type === "youtube") && !value)
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
    formData.append("tag", "cyber");

    formData.append("file_type", DOMPurify.sanitize(file_type));
    if (file_type === "link" || file_type === "youtube") {
      formData.append("value", DOMPurify.sanitize(value));
    }
    if (file_type === "pdf" || file_type === "image") {
      formData.append("file", file);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add-alertwall-data`,
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

  const updatehandler = async () => {
    if (
      !titleF ||
      !title_in_marathiF ||
      ((file_typeF === "link" || file_typeF === "youtube") && !valueF)
    ) {
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
    formData.append("title", DOMPurify.sanitize(titleF));
    formData.append("title_in_marathi", DOMPurify.sanitize(title_in_marathiF));
    formData.append("file_type", DOMPurify.sanitize(file_typeF));
    if (file_typeF === "link" || file_typeF === "youtube") {
      formData.append("value", DOMPurify.sanitize(valueF));
    }
    if ((file_typeF === "pdf" || file_typeF === "image") && fileF) {
      formData.append("file", fileF);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-alertwall-data?id=${idF}`,
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

        setfileF(null);
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
                      * Title in Marathi
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
                      <option value="youtube">Youtube Video</option>
                      <option value="pdf">PDF</option>
                      <option value="image">Image</option>
                    </select>
                  </div>

                  {(file_type === "link" || file_type === "youtube") && (
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

                  {(file_type === "pdf" || file_type === "image") && (
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
                        accept={
                          file_type === "pdf"
                            ? ".pdf"
                            : ".png, .jpg, .jpeg, .webp"
                        }
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
                  Cyber Alertwall Records
                </h1>

                <div className="overflow-x-auto max-w-full">
                  <table className="w-full min-w-[800px] mx-auto mt-5 text-left">
                    <tr className="border flex flex-row justify-between bg-gray-100">
                      <th className="p-2 w-1/12 border-r">Delete</th>
                      <th className="p-2 w-1/12 border-r">Edit</th>
                      <th className="p-2 w-5/12 border-r">Title</th>
                      <th className="p-2 w-5/12 border-r">Title in Marathi</th>
                      <th className="p-2 w-1/12 border-r">Value</th>
                    </tr>

                    {records.map((record) => {
                      const { title, title_in_marathi, file_type, value, _id } =
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
                                  title_in_marathi,
                                  file_type,
                                  value,
                                  _id
                                )
                              }
                            >
                              <AiFillEdit />
                            </button>
                          </td>

                          <td className="p-1 w-5/12 border-r">{title}</td>
                          <td className="p-1 w-5/12 border-r">
                            {title_in_marathi}
                          </td>
                          <td className="p-1 w-1/12 border-r">
                            {(file_type === "pdf" || file_type === "image") && (
                              <Link href={value} target="_blank">
                                <button className="bg-yellow-600 text-white p-3 rounded">
                                  <BiSolidDownload />
                                </button>
                              </Link>
                            )}
                            {(file_type === "link" ||
                              file_type === "youtube") && (
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
                        onChange={(e) => setTitleF(e.target.value)}
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
                        value={title_in_marathiF}
                        onChange={(e) => setTitle_in_marathiF(e.target.value)}
                      />
                    </div>

                    {(file_typeF === "link" || file_typeF === "youtube") && (
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
                          value={valueF}
                          onChange={(e) => setValueF(e.target.value)}
                        />
                      </div>
                    )}

                    <div>
                      {(file_typeF === "pdf" || file_typeF === "image") && (
                        <div className="py-5">
                          <div className="ml-5">Old file</div>
                          <Link href={valueF} target="_blank">
                            <button className="bg-yellow-600 text-white p-3 ml-5 rounded">
                              <BiSolidDownload />
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>

                    {(file_typeF === "pdf" || file_typeF === "image") && (
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
                          accept={
                            file_typeF === "pdf"
                              ? ".pdf"
                              : ".png, .jpg, .jpeg, .webp"
                          }
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
                    )}

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

export default Alertwall;
