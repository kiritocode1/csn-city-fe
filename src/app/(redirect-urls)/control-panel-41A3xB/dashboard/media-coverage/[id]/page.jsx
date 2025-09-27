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
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";

const Album = () => {
  const router = useRouter();

  const { id } = router.query;

  const [title, settitle] = useState("");
  const [titleInMarathi, settitleInMarathi] = useState("");

  const [file, setfile] = useState(null);
  const [fileErr, setfileErr] = useState(false);
  const [filesBulk, setfileBulk] = useState(null);
  const [fileErrBulk, setfileErrBulk] = useState(false);
  const [maxErr, setMaxErr] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [isform, setisform] = useState(false);
  const [bulkform, setbulkform] = useState(false);
  const [images, setImages] = useState([]);
  const [deleteid, setdeleteid] = useState("");
  const [albumtitle, setalbumtitle] = useState("");

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

  const [titleF, settitleF] = useState("");
  const [titleInMarathiF, settitleInMarathiF] = useState("");
  const [editid, seteditid] = useState("");
  const [updateLoading, setupdateLoading] = useState(false);

  const onOpenModal2 = (id, description, descriptionInMarathi) => {
    seteditid(id);
    settitleF(DOMPurify.sanitize(description));
    settitleInMarathiF(DOMPurify.sanitize(descriptionInMarathi));

    setOpen2(true);
  };
  const onCloseModal2 = () => {
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

  const handleFileChangeBulk = (e) => {
    setfileErrBulk(false);
    setMaxErr(false);
    const files = e.target.files;
    if (files.length > 10) {
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

  useEffect(() => {
    fetchAlbums();
  }, []);

  const resethandler = () => {
    settitle("");
    settitleInMarathi("");
  };

  const cancelhandler = () => {
    setisform(false);
    setbulkform(false);
    settitle("");
    settitleInMarathi("");
  };

  const fetchAlbums = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-images-by-album?albumId=${id}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (data.success === true) {
        setImages(data.images);
        setalbumtitle(data.title);
      } else {
        notifyWarn();
      }
    } catch (error) {
      notifyWarn();
    }
  };

  const notifySuccess = () => {
    toast.success("new image added successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  };

  const notifyBulkSuccess = () => {
    toast.success("Images Uploaded successfully!", {
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

  const notifydelete = () => {
    toast.success("Photo Deleted successfully!", {
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

  const notifyUpdate = () => {
    toast.success("Description Updated successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  };

  const submitBulkHandler = async (e) => {
    if (!filesBulk) {
      notifyvalid();

      return;
    }

    setisloading(true);
    setbulkform(false);
    e.preventDefault();
    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();

    formData.append("albumId", DOMPurify.sanitize(id));
    // formData.append("images", filesBulk);
    for (let i = 0; i < filesBulk.length; i++) {
      formData.append("images", filesBulk[i]);
    }

    // console.log(filesBulk);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload-bulk`,
        {
          method: "POST",
          body: formData,
          headers: headers,
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchAlbums();
        setisloading(false);
        notifyBulkSuccess();
        setfileBulk(null);
        setbulkform(false);
      } else {
        notifyWarn();
        setisloading(false);
        setbulkform(false);
      }
    } catch (error) {
      notifyWarn();
      setisloading(false);
      setbulkform(false);
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
    formData.append("description", DOMPurify.sanitize(title));
    formData.append("descriptionInMarathi", DOMPurify.sanitize(titleInMarathi));
    formData.append("albumId", id);
    formData.append("image", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add-image`,
        {
          method: "POST",
          body: formData,
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
        setfile(null);
        setisform(false);
      } else {
        notifyWarn();
        setisloading(false);
        setisform(false);
      }
    } catch (error) {
      notifyWarn();
      setisloading(false);
      setisform(false);
    }
  };

  const deleteImage = async (id) => {
    onCloseModal();
    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-image?id=${id}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );

      const data = await response.json();

      if (data.success === true) {
        notifydelete();
        fetchAlbums();
      } else {
        notifyWarn();
      }
    } catch (error) {
      notifyWarn();
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
      description: DOMPurify.sanitize(titleF),
      descriptionInMarathi: DOMPurify.sanitize(titleInMarathiF),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-image?imageId=${editid}`,
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
        seteditid("");
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
                  onClick={() => {
                    setisform(true);
                    setbulkform(false);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  Add Image to Album
                </button>
                <button
                  onClick={() => {
                    setbulkform(true);
                    setisform(false);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  Bulk Image Upload
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
                      * Description
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
                      * Description in Marathi
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
                      htmlFor="file"
                      className="mb-1 text-base text-gray-800"
                    >
                      * File
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

              {bulkform && (
                <div className="mt-5">
                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="files"
                      className="mb-1 text-base text-gray-800"
                    >
                      * Files (Maximum 10 files)
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
                        Maximum 10 files allowed.
                      </p>
                    )}
                  </div>

                  <div>
                    <button
                      onClick={submitBulkHandler}
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
                <h1 className="font-semibold text-xl mt-10">{albumtitle}</h1>

                <div className="container max-w-5xl mx-auto mt-5 mb-20 py-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-5 lg:px-0 justify-items-center">
                    {images.map((item) => {
                      const {
                        _id,
                        description,
                        descriptionInMarathi,
                        imagelink,
                      } = item;

                      return (
                        <div
                          key={_id}
                          className="bg-white rounded-lg shadow-lg max-w-sm "
                        >
                          <div className="relative aspect-w-3 aspect-h-4">
                            <Image
                              src={imagelink}
                              alt={description}
                              width={400}
                              height={300}
                              quality={80}
                              className="rounded-t-lg h-60 object-cover"
                            />

                            <button
                              className="bg-red-600 text-white p-3 rounded absolute top-0 left-0"
                              //   onClick={() => deleterecord(_id)}
                              onClick={() => onOpenModal(_id)}
                            >
                              <RiDeleteBin2Line />
                            </button>
                            <button
                              onClick={() =>
                                onOpenModal2(
                                  _id,
                                  description,
                                  descriptionInMarathi
                                )
                              }
                              className="bg-yellow-600 text-white p-3 absolute rounded top-0 right-0"
                            >
                              <AiFillEdit />
                            </button>
                          </div>
                          <div className="p-4">
                            <p className="text-gray-600">{description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Modal open={open} onClose={onCloseModal} center>
                    <div className="px-5 pt-5">
                      <p>Are you sure to delete the Photo ?</p>

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
                            onClick={() => deleteImage(deleteid)}
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
                          Description
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
                          Description in Marathi
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
                          Update Description
                        </button>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    </ProtectedAdminRoute>
  );
};

export default Album;
