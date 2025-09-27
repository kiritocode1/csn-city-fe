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
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import Cookies from "js-cookie";
import DOMPurify from "dompurify";

const DGPMessege = () => {
  const [updateLoading, setupdateLoading] = useState(false);

  const [name, setname] = useState("");
  const [name_in_marathi, setName_in_marathi] = useState("");
  const [post, setPost] = useState("");
  const [post_in_marathi, setPost_in_marathi] = useState("");
  const [message, setmessage] = useState("");
  const [message_in_marathi, setmessage_in_marathi] = useState("");
  const [photo, setphoto] = useState("");
  const [file, setfile] = useState(null);
  const [fileErr, setfileErr] = useState(false);

  const [idtemp, setidtemp] = useState("");

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
    toast.success("Data Updated successfully!", {
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-sp-message?tag=sp`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (data) {
        setidtemp(DOMPurify.sanitize(data.data._id));
        setname(DOMPurify.sanitize(data.data.name));
        setName_in_marathi(DOMPurify.sanitize(data.data.name_in_marathi));
        setPost(DOMPurify.sanitize(data.data.post));
        setPost_in_marathi(DOMPurify.sanitize(data.data.post_in_marathi));
        setphoto(DOMPurify.sanitize(data.data.photo));
        setmessage(DOMPurify.sanitize(data.data.message));
        setmessage_in_marathi(DOMPurify.sanitize(data.data.message_in_marathi));
      } else {
        notifyWarn();
      }
    } catch (error) {
      notifyWarn();
    }
  };

  const submithandler = async (e) => {
    if (
      !name ||
      !name_in_marathi ||
      !message ||
      !message_in_marathi ||
      !post ||
      !post_in_marathi
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
    formData.append("name", DOMPurify.sanitize(name));
    formData.append("name_in_marathi", DOMPurify.sanitize(name_in_marathi));
    formData.append("post", DOMPurify.sanitize(post));
    formData.append("post_in_marathi", DOMPurify.sanitize(post_in_marathi));
    formData.append("message", DOMPurify.sanitize(message));
    formData.append("message_in_marathi", DOMPurify.sanitize(message_in_marathi));
    if (file) {
      formData.append("image", file);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-sp-message?Id=${idtemp}`,
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
        notifySuccess();
        setname("");
        setName_in_marathi("");
        setPost("");
        setPost_in_marathi("");
        setmessage("");
        setmessage_in_marathi("");
        setfile(null);
      } else {
        notifyWarn();
        setupdateLoading(false);
      }
    } catch (error) {
      notifyWarn();
      setupdateLoading(false);
    }
  };

  const submitfinal = () => {
    if (file) {
      submithandler();
    } else {
      updatehandler();
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
                <h1 className="font-semibold text-xl mt-10 mb-5">SP Message</h1>

                <div>
                  <div className="flex flex-col mx-3 my-1 space-x-4 mt-5">
                    <label htmlFor="title" className="text-base text-gray-800">
                      * Name
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700"
                      placeholder=""
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-x-4 mt-5">
                    <label htmlFor="title" className="text-base text-gray-800">
                      * Name in Marathi
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700"
                      placeholder=""
                      value={name_in_marathi}
                      onChange={(e) => setName_in_marathi(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-x-4 mt-5">
                    <label htmlFor="title" className="text-base text-gray-800">
                      * Post
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700"
                      placeholder=""
                      value={post}
                      onChange={(e) => setPost(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-x-4 mt-5">
                    <label htmlFor="title" className="text-base text-gray-800">
                      * Post in Marathi
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700"
                      placeholder=""
                      value={post_in_marathi}
                      onChange={(e) => setPost_in_marathi(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-x-4 mt-5">
                    <label htmlFor="title" className="text-base text-gray-800">
                      * Message
                    </label>
                    <textarea
                      className="text-base border border-black px-3 py-2  outline-none focus:border-purple-700 rounded-md mt-5 whitespace-pre-wrap"
                      id=""
                      name=""
                      rows="10"
                      cols="50"
                      value={message}
                      onChange={(e) => setmessage(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-x-4 mt-5">
                    <label htmlFor="title" className="text-base text-gray-800">
                      * Message in Marathi
                    </label>
                    <textarea
                      className="text-base border border-black px-3 py-2  outline-none focus:border-purple-700 rounded-md mt-5 whitespace-pre-wrap"
                      id=""
                      name=""
                      rows="10"
                      cols="50"
                      value={message_in_marathi}
                      onChange={(e) => setmessage_in_marathi(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="flex flex-row space-x-5 my-5 mx-3">
                    <div>Existing SP Photo</div>
                    <img src={photo} alt="principal photo" className="w-40" />
                  </div>

                  <div className="flex flex-col mx-3 mt-10 space-y-1 mb-5">
                    <label
                      htmlFor="file"
                      className="mb-1 text-base text-gray-800"
                    >
                      New SP Photo
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="pdf"
                      accept=".png, .jpg, .jpeg"
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

                  <button
                    onClick={submithandler}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mt-5 flex flex-row space-x-5"
                  >
                    Update
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
            </div>
          </div>
        </main>
      </>
    </ProtectedAdminRoute>
  );
};

export default DGPMessege;
