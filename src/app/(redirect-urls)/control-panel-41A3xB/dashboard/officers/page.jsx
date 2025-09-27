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

const Officer = () => {
  const [psId, setpsId] = useState(null);
  const [name, setName] = useState("");
  const [name_in_marathi, setName_in_marathi] = useState("");
  const [date_of_joining, setDate_of_joining] = useState("");
  const [post, setPost] = useState("");
  const [post_in_marathi, setPost_in_marathi] = useState("");
  const [contact_no, setContact_no] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setmobile] = useState("");
  const [sr_no, setSr_no] = useState("");

  const [file, setfile] = useState(null);
  const [fileErr, setfileErr] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [isform, setisform] = useState(false);
  const [records, setrecords] = useState([]);
  const [deleteid, setdeleteid] = useState("");

  const [stations, setStations] = useState([]);

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

  const [psIdF, setpsIdF] = useState(null);
  const [nameF, setNameF] = useState("");
  const [name_in_marathiF, setName_in_marathiF] = useState("");
  const [date_of_joiningF, setDate_of_joiningF] = useState("");
  const [postF, setPostF] = useState("");
  const [post_in_marathiF, setPost_in_marathiF] = useState("");
  const [contact_noF, setContact_noF] = useState("");
  const [emailF, setEmailF] = useState("");
  const [mobileF, setmobileF] = useState("");
  const [sr_noF, setSr_noF] = useState("");

  const [officer_photo, setofficer_photo] = useState("");

  const [open2, setOpen2] = useState(false);
  const [idF, setidF] = useState("");
  const [fileF, setfileF] = useState(null);
  const [fileErrF, setfileErrF] = useState(false);
  const [updateLoading, setupdateLoading] = useState(false);

  useEffect(() => {
    fetchStations();
  }, []);

  const onOpenModal2 = (
    psId,
    name,
    name_in_marathi,
    date_of_joining,
    post,
    post_in_marathi,
    contact_no,
    email,
    officer_photo,
    mobile,
    sr_no,
    _id
  ) => {
    setpsIdF(DOMPurify.sanitize(psId));
    setNameF(DOMPurify.sanitize(name));
    setName_in_marathiF(DOMPurify.sanitize(name_in_marathi));
    setDate_of_joiningF(DOMPurify.sanitize(date_of_joining));
    setPostF(DOMPurify.sanitize(post));
    setPost_in_marathiF(DOMPurify.sanitize(post_in_marathi));
    setContact_noF(DOMPurify.sanitize(contact_no));
    setEmailF(DOMPurify.sanitize(email));

    setofficer_photo(DOMPurify.sanitize(officer_photo));
    setmobileF(DOMPurify.sanitize(mobile));
    setSr_noF(DOMPurify.sanitize(sr_no));

    setidF(DOMPurify.sanitize(_id));
    setOpen2(true);
  };
  const onCloseModal2 = () => {
    setdeleteid("");
    setOpen2(false);
  };

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

  const resethandler = () => {
    setpsId("");
    setName("");
    setName_in_marathi("");
    setDate_of_joining("");
    setPost("");
    setPost_in_marathi("");
    setContact_no("");
    setEmail("");
    setmobile("");
    setSr_no("");
    setfile(null);
  };

  const cancelhandler = () => {
    setisform(false);
    setpsId("");
    setName("");
    setName_in_marathi("");
    setDate_of_joining("");
    setPost("");
    setPost_in_marathi("");
    setContact_no("");
    setEmail("");
    setmobile("");
    setSr_no("");
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/officers-admin`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (data) {
        // console.log(data);

        setrecords(data.Officers);
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

  const deleterecord = async (id) => {
    onCloseModal();
    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-officer?Id=${id}`,
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
    if (!name || !name_in_marathi || !psId) {
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
    formData.append("psId", DOMPurify.sanitize(psId));
    formData.append("name", DOMPurify.sanitize(name));
    formData.append("name_in_marathi", DOMPurify.sanitize(name_in_marathi));
    if (date_of_joining) {
      formData.append("date_of_joining", DOMPurify.sanitize(date_of_joining));
    }

    formData.append("post", DOMPurify.sanitize(post));
    formData.append("post_in_marathi", DOMPurify.sanitize(post_in_marathi));

    if (contact_no) {
      formData.append("contact_no", DOMPurify.sanitize(contact_no));
    }

    if (mobile) {
      formData.append("mobile", DOMPurify.sanitize(mobile));
    }

    if (email) {
      formData.append("email", DOMPurify.sanitize(email));
    }

    if (sr_no) {
      formData.append("sr_no", DOMPurify.sanitize(sr_no));
    }

    if (file) {
      formData.append("officer_photo", file);
    }try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add-officer`,
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
    if (!nameF || !name_in_marathiF || !psIdF) {
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

    formData.append("psId", DOMPurify.sanitize(psIdF));

    formData.append("name", DOMPurify.sanitize(nameF));
    formData.append("name_in_marathi", DOMPurify.sanitize(name_in_marathiF));
    if (date_of_joiningF) {
      formData.append("date_of_joining", DOMPurify.sanitize(date_of_joiningF));
    }

    formData.append("post", DOMPurify.sanitize(postF));
    formData.append("post_in_marathi", DOMPurify.sanitize(post_in_marathiF));

    if (contact_noF) {
      formData.append("contact_no", DOMPurify.sanitize(contact_noF));
    }
    if (mobileF) {
      formData.append("mobile", DOMPurify.sanitize(mobileF));
    }

    if (emailF) {
      formData.append("email", DOMPurify.sanitize(emailF));
    }

    if (sr_noF) {
      formData.append("sr_no", DOMPurify.sanitize(sr_noF));
    }

    if (fileF) {
      formData.append("officer_photo", fileF);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-officer?Id=${idF}`,
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
        setfileF(null);
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
                          <option key={_id} value={_id}>
                            {name}
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
                      * Name
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                      placeholder=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="title"
                      className="mb-1 text-base text-gray-800"
                    >
                      * Name in Marathi
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                      placeholder=""
                      value={name_in_marathi}
                      onChange={(e) => setName_in_marathi(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="title"
                      className="mb-1 text-base text-gray-800"
                    >
                      Joining Date
                    </label>
                    <input
                      type="date"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-60"
                      placeholder=""
                      value={date_of_joining}
                      onChange={(e) => setDate_of_joining(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="title"
                      className="mb-1 text-base text-gray-800"
                    >
                      Post
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                      placeholder=""
                      value={post}
                      onChange={(e) => setPost(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="title"
                      className="mb-1 text-base text-gray-800"
                    >
                      Post In Marathi
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                      placeholder=""
                      value={post_in_marathi}
                      onChange={(e) => setPost_in_marathi(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="title"
                      className="mb-1 text-base text-gray-800"
                    >
                      Telephone No
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                      placeholder=""
                      value={contact_no}
                      onChange={(e) => setContact_no(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="title"
                      className="mb-1 text-base text-gray-800"
                    >
                      Mobile No
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                      placeholder=""
                      value={mobile}
                      onChange={(e) => setmobile(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="title"
                      className="mb-1 text-base text-gray-800"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                      placeholder=""
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="title"
                      className="mb-1 text-base text-gray-800"
                    >
                      SR No
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700"
                      placeholder=""
                      value={sr_no}
                      onChange={(e) => setSr_no(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-3 space-y-1 mb-5">
                    <label
                      htmlFor="file"
                      className="mb-1 text-base text-gray-800"
                    >
                      Officer Photo
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="image"
                      accept=".png, .jpg, .jpeg, .webp"
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
                  Police Station Officers
                </h1>
                <div className="overflow-x-auto max-w-full">
                  <table className="w-full min-w-[800px] mx-auto mt-5 text-left">
                    <tr className="border flex flex-row justify-between bg-gray-100">
                      <th className="p-2 w-1/12 border-r">Delete</th>
                      <th className="p-2 w-1/12 border-r">Edit</th>
                      <th className="p-2 w-5/12 border-r">Officer Name</th>
                      <th className="p-2 w-5/12 border-r">
                        Officer Name in Marathi
                      </th>
                    </tr>

                    {records.map((record) => {
                      const {
                        psId,
                        name,
                        name_in_marathi,
                        date_of_joining,
                        post,
                        post_in_marathi,
                        contact_no,
                        email,
                        officer_photo,
                        mobile,
                        sr_no,
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
                                  psId?._id || "",
                                  name,
                                  name_in_marathi,
                                  date_of_joining,
                                  post,
                                  post_in_marathi,
                                  contact_no,
                                  email,
                                  officer_photo,
                                  mobile,
                                  sr_no,
                                  _id
                                )
                              }
                            >
                              <AiFillEdit />
                            </button>
                          </td>
                          <td className="p-1 w-5/12 border-r">{name}</td>

                          <td className="p-1 w-5/12 border-r">
                            {name_in_marathi}
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
                            <option key={_id} value={_id}>
                              {name}
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
                        * Name
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={nameF}
                        onChange={(e) => setNameF(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        * Name in Marathi
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={name_in_marathiF}
                        onChange={(e) => setName_in_marathiF(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        Joining Date
                      </label>
                      <input
                        type="date"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-60"
                        placeholder=""
                        value={date_of_joiningF}
                        onChange={(e) => setDate_of_joiningF(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        Post
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={postF}
                        onChange={(e) => setPostF(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        Post In Marathi
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={post_in_marathiF}
                        onChange={(e) => setPost_in_marathiF(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        Telephone no
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={contact_noF}
                        onChange={(e) => setContact_noF(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        Mobile No
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={mobileF}
                        onChange={(e) => setmobileF(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={emailF}
                        onChange={(e) => setEmailF(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        SR No
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700"
                        placeholder=""
                        value={sr_noF}
                        onChange={(e) => setSr_noF(e.target.value)}
                      />
                    </div>

                    <div className="mx-3 my-5">
                      <label
                        htmlFor="file"
                        className="mb-5 text-base text-gray-800"
                      >
                        Current Officer Photo
                      </label>
                      <div className="mt-5">
                        <img
                          src={officer_photo}
                          alt=""
                          className="h-48 w-auto"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="file"
                        className="mb-1 text-base text-gray-800"
                      >
                        New Photo (Optional)
                      </label>
                      <input
                        type="file"
                        id="file"
                        name="pdf"
                        accept=".png, .jpg, .jpeg"
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

export default Officer;
