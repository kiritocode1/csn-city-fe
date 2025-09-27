"use client";

import React, { useState, useEffect } from "react";
import AdminN from "@/components/Admin-nav";
import AdminM from "@/components/Admin-menu";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BiSolidDownload } from "react-icons/bi";
import { AiFillEdit, AiFillFileAdd } from "react-icons/ai";

import Link from "next/link";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import Cookies from "js-cookie";
import axios from "axios";
import Image from "next/image";
import DOMPurify from "dompurify";

const Gallery = () => {
  const [title, settitle] = useState("");
  const [titleInMarathi, settitleInMarathi] = useState("");
  const [isloading, setisloading] = useState(false);
  const [isform, setisform] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [deleteid, setdeleteid] = useState("");

  const [open, setOpen] = useState(false);

  const [open2, setOpen2] = useState(false);

  const [open2id, setopen2id] = useState("");

  const [titleF, settitleF] = useState("");
  const [titleInMarathiF, settitleInMarathiF] = useState("");
  const [updateLoading, setupdateLoading] = useState(false);

  const onOpenModal = (title, titleInMarathi, _id) => {
    setdeleteid(_id);
    settitleF(DOMPurify.sanitize(title));
    settitleInMarathiF(DOMPurify.sanitize(titleInMarathi));
    setOpen(true);
  };
  const onCloseModal = () => {
    setdeleteid("");
    setOpen(false);
  };

  const onOpenModal2 = (_id) => {
    setopen2id(_id);

    setOpen2(true);
  };
  const onCloseModal2 = () => {
    setopen2id("");
    setOpen2(false);
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const resethandler = () => {
    settitle("");
    settitleInMarathi("");
  };

  const cancelhandler = () => {
    setisform(false);
    settitle("");
    settitleInMarathi("");
  };

  const fetchAlbums = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-all-albums?tag=gallery`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      setAlbums(data);
    } catch (error) {
      notifyWarn();
    }
  };

  const notifySuccess = () => {
    toast.success("new Album created successfully!", {
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
    toast.success("Album Updated successfully!", {
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
    toast.success("Album Deleted successfully!", {
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

  const submithandler = async (e) => {
    if (!title || !titleInMarathi) {
      notifyvalid();

      return;
    }

    setisloading(true);
    setisform(false);
    e.preventDefault();

    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const bodytemp = {
      title: title,
      titleInMarathi: titleInMarathi,
      tag: "gallery",
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add-album`,
        {
          method: "POST",
          body: JSON.stringify(bodytemp),
          headers: headers,
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchAlbums();
        setisloading(false);
        notifySuccess();
        settitle("");
        settitleInMarathi("");
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

    setupdateLoading(true);
    e.preventDefault();

    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const bodytemp = {
      title: titleF,
      titleInMarathi: titleInMarathiF,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-album?albumId=${deleteid}`,
        {
          method: "POST",
          body: JSON.stringify(bodytemp),
          headers: headers,
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchAlbums();
        setupdateLoading(false);
        setOpen(false);
        notifyUpdate();
        settitleF("");
        settitleInMarathiF("");
      } else {
        notifyWarn();
        setupdateLoading(false);
      }
    } catch (error) {
      notifyWarn();
      setupdateLoading(false);
    }
  };

  const deleteAlbum = async (id) => {
    onCloseModal();
    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-album?Id=${id}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );

      const data = await response.json();

      if (data.success === true) {
        notifydelete();
        fetchAlbums();
        onCloseModal2();
      } else {
        notifyWarn();
      }
    } catch (error) {
      notifyWarn();
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
                  Add Album
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
                <h1 className="font-semibold text-xl mt-10">Gallery Albums</h1>

                <div className="overflow-x-auto max-w-full">
                  <table className="w-full min-w-[800px] mx-auto mt-5 text-left">
                    <tr className="border flex flex-row justify-between bg-gray-100">
                      <th className="p-2 w-1/12 border-r">Delete</th>
                      <th className="p-2 w-1/12 border-r">Edit Album</th>
                      <th className="p-2 w-5/12 border-r">Title</th>
                      <th className="p-2 w-4/12 border-r">Title in Marathi</th>

                      <th className="p-2 w-1/12 border-r">Add images</th>
                    </tr>

                    {albums.map((record) => {
                      const { title, titleInMarathi, _id } = record;
                      return (
                        <tr
                          className="border flex flex-row justify-between"
                          key={_id}
                        >
                          <td className="p-1 w-1/12 border-r">
                            <button
                              className="bg-red-600 text-white p-3 rounded"
                              //   onClick={() => deleterecord(_id)}
                              onClick={() => onOpenModal2(_id)}
                            >
                              <RiDeleteBin2Line />
                            </button>
                          </td>
                          <td className="p-1 w-1/12 border-r">
                            <button
                              onClick={() =>
                                onOpenModal(title, titleInMarathi, _id)
                              }
                              className="bg-yellow-600 text-white p-3 rounded"
                            >
                              <AiFillEdit />
                            </button>
                          </td>

                          <td className="p-1 w-5/12 border-r">{title}</td>
                          <td className="p-1 w-4/12 border-r">
                            {titleInMarathi}
                          </td>

                          <td className="p-1 w-1/12 border-r">
                            <Link href={`/control-panel-41A3xB/dashboard/gallery/${_id}`}>
                              <button className="bg-yellow-600 text-white p-3 rounded">
                                <AiFillFileAdd />
                              </button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>

                <Modal open={open2} onClose={onCloseModal2} center>
                  <div className="px-5 pt-5">
                    <p>
                      Are you sure to delete the record ? This will result in
                      deletion of all photos inside album
                    </p>

                    <div className="flex flex-row justify-between mt-5">
                      <div>
                        <button
                          className="px-3 py-1 bg-white border rounded"
                          onClick={onCloseModal2}
                        >
                          Cancel
                        </button>
                      </div>
                      <div>
                        <button
                          className="px-3 py-1 bg-red-600 font-semibold text-white border rounded"
                          onClick={() => deleteAlbum(open2id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </Modal>

                <Modal open={open} onClose={onCloseModal} center>
                  <div className="pt-10 px-5 w-[500px]">
                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        Title
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
                        Title in Marathi
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

                    <div>
                      <button
                        onClick={updatehandler}
                        className="bg-blue-500 flex justify-center items-center  text-white px-3 py-1 rounded-md hover:bg-blue-600"
                      >
                        Update Album
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

export default Gallery;
