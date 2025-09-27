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
import { IoMdLink } from "react-icons/io";
import Link from "next/link";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import Cookies from "js-cookie";
import DOMPurify from "dompurify";

const Division = () => {
  const [name, setname] = useState("");
  const [name_in_marathi, setname_in_marathi] = useState("");
  const [acp_name, setacp_name] = useState("");
  const [acp_name_in_marathi, setacpname_in_marathi] = useState("");
  const [acp_contact, setacp_contact] = useState("");
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

  const [open2, setOpen2] = useState(false);
  const [nameF, setnameF] = useState("");
  const [name_in_marathiF, setname_in_marathiF] = useState("");
  const [acp_nameF, setacp_nameF] = useState("");
  const [acp_name_in_marathiF, setacpname_in_marathiF] = useState("");
  const [acp_contactF, setacp_contactF] = useState("");
  const [sr_noF, setSr_noF] = useState("");
  const [idF, setidF] = useState("");
  const [updateLoading, setupdateLoading] = useState(false);

  const onOpenModal2 = (
    name,
    name_in_marathi,
    acp_name,
    acp_name_in_marathi,
    acp_contact,
    sr_no,
    _id
  ) => {
    setnameF(DOMPurify.sanitize(name));
    setname_in_marathiF(DOMPurify.sanitize(name_in_marathi));
    setacp_nameF(DOMPurify.sanitize(acp_name));
    setacpname_in_marathiF(DOMPurify.sanitize(acp_name_in_marathi));
    setacp_contactF(DOMPurify.sanitize(acp_contact));
    setSr_noF(DOMPurify.sanitize(sr_no));
    setidF(DOMPurify.sanitize(_id));
    setOpen2(true);
  };
  const onCloseModal2 = () => {
    //   setdeleteid("");
    setOpen2(false);
  };

  useEffect(() => {
    fetchrecords();
  }, []);

  const resethandler = () => {
    setname("");
    setname_in_marathi("");
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-division`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (data) {
        // console.log(data);
        setrecords(data.divisions);
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-division?Id=${id}`,
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
    if (!name || !name_in_marathi) {
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

    const bodydata = {
      name: name,
      name_in_marathi: name_in_marathi,
      acp_name: acp_name,
      acp_name_in_marathi: acp_name_in_marathi,
      acp_contact: acp_contact,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add-division`,
        {
          method: "POST",
          body: JSON.stringify(bodydata),
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

  const updatehandler = async (e) => {
    if (!nameF || !name_in_marathiF) {
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
      "Content-Type": "application/json",
    };

    const bodydata = {
      name: nameF,
      name_in_marathi: name_in_marathiF,
      sr_no: sr_noF,
      acp_name: acp_nameF,
      acp_name_in_marathi: acp_name_in_marathiF,
      acp_contact: acp_contactF,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-division?Id=${idF}`,
        {
          method: "PATCH",
          body: JSON.stringify(bodydata),
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
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700"
                      placeholder=""
                      value={name_in_marathi}
                      onChange={(e) => setname_in_marathi(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="title"
                      className="mb-1 text-base text-gray-800"
                    >
                      ACP Name
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700"
                      placeholder=""
                      value={acp_name}
                      onChange={(e) => setacp_name(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="title"
                      className="mb-1 text-base text-gray-800"
                    >
                      ACP Name in Marathi
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700"
                      placeholder=""
                      value={acp_name_in_marathi}
                      onChange={(e) => setacpname_in_marathi(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="title"
                      className="mb-1 text-base text-gray-800"
                    >
                      ACP Contact
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700"
                      placeholder=""
                      value={acp_contact}
                      onChange={(e) => setacp_contact(e.target.value)}
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
                <h1 className="font-semibold text-xl mt-10">
                  Division Records
                </h1>

                <div className="overflow-x-auto max-w-full">
                  <table className="w-full min-w-[800px] mx-auto mt-5 text-left">
                    <tr className="border flex flex-row justify-between bg-gray-100">
                      <th className="p-2 w-1/12 border-r">Delete</th>
                      <th className="p-2 w-1/12 border-r">Edit</th>
                      <th className="p-2 w-5/12 border-r">Division Name</th>
                      <th className="p-2 w-5/12 border-r">
                        Division Name in Marathi
                      </th>
                    </tr>

                    {records.map((record) => {
                      const {
                        name,
                        name_in_marathi,
                        acp_name,
                        acp_name_in_marathi,
                        acp_contact,
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
                                  name,
                                  name_in_marathi,
                                  acp_name,
                                  acp_name_in_marathi,
                                  acp_contact,
                                  sr_no,
                                  _id
                                )
                              }
                            >
                              <AiFillEdit />
                            </button>
                          </td>
                          <td className="p-2 w-5/12 border-r">{name}</td>
                          <td className="p-2 w-5/12 border-r">
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
                  <div className="pt-10 px-5 w-[500px]">
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
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700"
                        placeholder=""
                        value={nameF}
                        onChange={(e) => setnameF(e.target.value)}
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
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700"
                        placeholder=""
                        value={name_in_marathiF}
                        onChange={(e) => setname_in_marathiF(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        ACP Name
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700"
                        placeholder=""
                        value={acp_nameF}
                        onChange={(e) => setacp_nameF(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        ACP Name in Marathi
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700"
                        placeholder=""
                        value={acp_name_in_marathiF}
                        onChange={(e) => setacpname_in_marathiF(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        ACP Contact
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700"
                        placeholder=""
                        value={acp_contactF}
                        onChange={(e) => setacp_contactF(e.target.value)}
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
                        type="number"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700"
                        placeholder=""
                        value={sr_noF}
                        onChange={(e) => setSr_noF(e.target.value)}
                      />
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

export default Division;
