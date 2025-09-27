"use client";

import React, { useState, useEffect } from "react";
import AdminN from "@/components/Admin-nav";
import AdminM from "@/components/Admin-menu";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import Cookies from "js-cookie";
import DOMPurify from "dompurify";

const Initiatives = () => {
  const [title, setTitle] = useState("");
  const [title_in_marathi, setTitle_in_marathi] = useState("");
  const [date, setDate] = useState("");
  const [about, setAbout] = useState("");
  const [about_in_marathi, setAbout_in_marathi] = useState("");

  const [filesBulk, setfileBulk] = useState(null);
  const [fileErrBulk, setfileErrBulk] = useState(false);
  const [maxErr, setMaxErr] = useState(false);

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

  //edit form states

  const [titleF, setTitleF] = useState("");
  const [title_in_marathiF, setTitle_in_marathiF] = useState("");
  const [dateF, setDateF] = useState("");
  const [aboutF, setAboutF] = useState("");
  const [about_in_marathiF, setAbout_in_marathiF] = useState("");

  const [photo, setphoto] = useState("");

  const [open2, setOpen2] = useState(false);
  const [idF, setidF] = useState("");
  const [filesBulkF, setfileBulkF] = useState(null);
  const [fileErrBulkF, setfileErrBulkF] = useState(false);
  const [maxErrF, setMaxErrF] = useState(false);
  const [updateLoading, setupdateLoading] = useState(false);

  const onOpenModal2 = (
    title,
    title_in_marathi,
    date,
    about,
    about_in_marathi,
    photo,
    _id
  ) => {
    setTitleF(DOMPurify.sanitize(title));
    setTitle_in_marathiF(DOMPurify.sanitize(title_in_marathi));
    setDateF(DOMPurify.sanitize(date));
    setAboutF(DOMPurify.sanitize(about));
    setAbout_in_marathiF(DOMPurify.sanitize(about_in_marathi));
    setphoto(photo);

    setidF(_id);
    setOpen2(true);
  };
  const onCloseModal2 = () => {
    setdeleteid("");
    setOpen2(false);
  };

  const handleFileChangeBulk = (e) => {
    setfileErrBulk(false);
    setMaxErr(false);
    const files = e.target.files;
    if (files.length > 5) {
      setMaxErr(true);
      return;
    }

    if (files) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];

        if (file.size <= 5 * 1024 * 1024) {
        } else {
          setfileErrBulk(true);
          e.target.value = "";
          setfileBulk(null);
          return;
        }
      }
      setfileBulk(files);
    }
  };

  const handleFileChangeBulkF = (e) => {
    setfileErrBulkF(false);
    setMaxErrF(false);
    const files = e.target.files;
    if (files.length > 5) {
      setMaxErrF(true);
      return;
    }

    if (files) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];

        if (file.size <= 5 * 1024 * 1024) {
        } else {
          setfileErrBulkF(true);
          e.target.value = "";
          setfileBulkF(null);
          return;
        }
      }
      setfileBulkF(files);
    }
  };

  useEffect(() => {
    fetchrecords();
  }, []);

  const resethandler = () => {
    setTitle("");
    setTitle_in_marathi("");
    setDate("");
    setAbout("");
    setAbout_in_marathi("");

    setfileBulk(null);
  };

  const cancelhandler = () => {
    setisform(false);
    setTitle("");
    setTitle_in_marathi("");
    setDate("");
    setAbout("");
    setAbout_in_marathi("");
    setfileBulk(null);
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-all-wellfare?tag=initiative`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (data) {
        // console.log(data);

        setrecords(data.Data);
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-wellfare-data?Id=${id}`,
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
    if (!title || !title_in_marathi) {
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
    formData.append("title_in_marathi", DOMPurify.sanitize(title_in_marathi));
    formData.append("tag", "initiative");

    if (about) {
      formData.append("about", DOMPurify.sanitize(about));
    }
    if (about_in_marathi) {
      formData.append("about_in_marathi", DOMPurify.sanitize(about_in_marathi));
    }
    if (date) {
      formData.append("date", DOMPurify.sanitize(date));
    }

    for (let i = 0; i < filesBulk.length; i++) {
      formData.append("images", filesBulk[i]);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add-wellfare-data`,
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
        setDate("");
        setAbout("");
        setAbout_in_marathi("");

        setfileBulk(null);
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
    if (!titleF || !title_in_marathiF) {
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

    if (aboutF) {
      formData.append("about", DOMPurify.sanitize(aboutF));
    }
    if (about_in_marathiF) {
      formData.append("about_in_marathi", DOMPurify.sanitize(about_in_marathiF));
    }
    if (dateF) {
      formData.append("date", DOMPurify.sanitize(dateF));
    }
    if (filesBulkF) {
      for (let i = 0; i < filesBulkF.length; i++) {
        formData.append("images", filesBulkF[i]);
      }
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-wellfare-data?Id=${idF}`,
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
        setfileBulkF(null);
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
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-40"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-x-4 mt-5">
                    <label htmlFor="title" className="text-base text-gray-800">
                      About
                    </label>
                    <textarea
                      className="text-base border border-black px-3 py-2  outline-none focus:border-purple-700 rounded-md mt-5 whitespace-pre-wrap"
                      id=""
                      name=""
                      rows="10"
                      cols="50"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-x-4 mt-5">
                    <label htmlFor="title" className="text-base text-gray-800">
                      About in Marathi
                    </label>
                    <textarea
                      className="text-base border border-black px-3 py-2  outline-none focus:border-purple-700 rounded-md mt-5 whitespace-pre-wrap"
                      id=""
                      name=""
                      rows="10"
                      cols="50"
                      value={about_in_marathi}
                      onChange={(e) => setAbout_in_marathi(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="files"
                      className="mb-1 text-base text-gray-800"
                    >
                      * Photos (Maximum 5 photos)
                    </label>
                    <input
                      type="file"
                      id="files"
                      name="image"
                      accept=".png, .jpg, .jpeg, .webp"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-60"
                      placeholder="Enter title"
                      onChange={(e) => handleFileChangeBulk(e)}
                      multiple
                    />
                    {fileErrBulk && (
                      <p className="text-red-600 text-sm">
                        File size exceeds the limit (5MB). Please choose a
                        smaller file
                      </p>
                    )}
                    {maxErr && (
                      <p className="text-red-600 text-sm">
                        Maximum 5 files allowed.
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
                <h1 className="font-semibold text-xl mt-10">Initiatives</h1>

                <div className="overflow-x-auto max-w-full">
                  <table className="w-full min-w-[800px] mx-auto mt-5 text-left">
                    <tr className="border flex flex-row justify-between bg-gray-100">
                      <th className="p-2 w-1/12 border-r">Delete</th>
                      <th className="p-2 w-1/12 border-r">Edit</th>
                      <th className="p-2 w-5/12 border-r">Title</th>
                      <th className="p-2 w-5/12 border-r">Title in Marathi</th>
                    </tr>

                    {records.map((record) => {
                      const {
                        title,
                        title_in_marathi,
                        date,
                        about,
                        about_in_marathi,
                        photo,
                        _id,
                      } = record;
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
                                  date,
                                  about,
                                  about_in_marathi,
                                  photo,
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
                  <div className="pt-10 px-5 w-[700px]">
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
                        value={titleF}
                        onChange={(e) => setTitleF(e.target.value)}
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
                        value={title_in_marathiF}
                        onChange={(e) => setTitle_in_marathiF(e.target.value)}
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
                        onChange={(e) => setDateF(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-x-4 mt-5">
                      <label
                        htmlFor="title"
                        className="text-base text-gray-800"
                      >
                        About
                      </label>
                      <textarea
                        className="text-base border border-black px-3 py-2  outline-none focus:border-purple-700 rounded-md mt-5 whitespace-pre-wrap"
                        id=""
                        name=""
                        rows="10"
                        cols="50"
                        value={aboutF}
                        onChange={(e) => setAboutF(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-x-4 mt-5">
                      <label
                        htmlFor="title"
                        className="text-base text-gray-800"
                      >
                        About in Marathi
                      </label>
                      <textarea
                        className="text-base border border-black px-3 py-2  outline-none focus:border-purple-700 rounded-md mt-5 whitespace-pre-wrap"
                        id=""
                        name=""
                        rows="10"
                        cols="50"
                        value={about_in_marathiF}
                        onChange={(e) => setAbout_in_marathiF(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5 mt-5">
                      <label
                        htmlFor="files"
                        className="mb-1 text-base text-gray-800"
                      >
                        * Photos (Maximum 5 photos)
                      </label>
                      <input
                        type="file"
                        id="files"
                        name="image"
                        accept=".png, .jpg, .jpeg, .webp"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-60"
                        placeholder="Enter title"
                        onChange={(e) => handleFileChangeBulkF(e)}
                        multiple
                      />
                      {fileErrBulkF && (
                        <p className="text-red-600 text-sm">
                          File size exceeds the limit (5MB). Please choose a
                          smaller file
                        </p>
                      )}
                      {maxErrF && (
                        <p className="text-red-600 text-sm">
                          Maximum 5 files allowed.
                        </p>
                      )}
                    </div>

                    <div className="mx-3 my-5">
                      <label
                        htmlFor="file"
                        className="mb-5 text-base text-gray-800"
                      >
                        Current Photo(s)
                      </label>
                      <div className="mt-5">
                        {photo &&
                          photo.map((photoUrl, index) => (
                            <img
                              key={index}
                              src={photoUrl}
                              alt={`Photo ${index + 1}`}
                              className="h-48 w-auto mb-3"
                            />
                          ))}
                      </div>
                    </div>

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

export default Initiatives;
