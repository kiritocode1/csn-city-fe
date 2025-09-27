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
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";

const Users = () => {
  const router = useRouter();
  const [CryptoJS, setCryptoJS] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [mobile_no, setMobile_no] = useState("");
  const [isloading, setisloading] = useState(false);
  const [isform, setisform] = useState(false);
  const [records, setrecords] = useState([]);
  const [deleteid, setdeleteid] = useState("");
  const [role, setRole] = useState("");
  const [psId, setPsId] = useState("");
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

  const [open2, setOpen2] = useState(false);
  const [emailF, setEmailF] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordF, setPasswordF] = useState("");
  const [passwordErrF, setPasswordErrF] = useState(false);
  const [mobile_noF, setMobile_noF] = useState("");
  const [psIdF, setPsIdF] = useState(null);
  const [idF, setidF] = useState("");
  const [updateLoading, setupdateLoading] = useState(false);
  const onOpenModal2 = (email, password, mobile_no, _id) => {
    setEmailF(DOMPurify.sanitize(email));
    setPasswordF("");
    setMobile_noF(DOMPurify.sanitize(mobile_no));
    setidF(_id);
    setOpen2(true);
  };
  const onCloseModal2 = () => {
    //   setdeleteid("");
    setOpen2(false);
  };

  useEffect(() => {
    fetchrecords();
    fetchGroups();
  }, []);

  useEffect(() => {
    // Dynamically import CryptoJS
    import("crypto-js").then((CryptoJSModule) => {
      setCryptoJS(CryptoJSModule);
    });
  }, []);

  const logoutHandler = () => {
    Cookies.remove("token", { path: "/admin" });

    router.push("/control-panel-41A3xB/login");
  };

  const resethandler = () => {
    setEmail("");
    setPassword("");
    setMobile_no("");
  };

  const cancelhandler = () => {
    setisform(false);
    setEmail("");
    setPassword("");
    setMobile_no("");
  };

  const passwordComplexity = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
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

  const notifyWarnPass = () => {
    toast.warn("Oops Password Do not Match!", {
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

  const notifyWarnMessage = (message) => {
    toast.warn(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      // theme: "dark",
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

  const fetchGroups = async () => {
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

  const fetchrecords = async () => {
    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-admin-users`,
        {
          method: "GET",
          headers: headers,
        }
      );

      const data = await response.json();

      if (data) {
        // console.log(data);
        setrecords(data.Users);
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-user?Id=${id}`,
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
    if (!CryptoJS) {
      console.error("CryptoJS not loaded yet");
      return;
    }

    if (!email || !password) {
      notifyvalid();
      return;
    }

    if (!passwordComplexity(password)) {
      setPasswordErr(true);
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

    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

    const bodydata = {
      email: email,
      password: hashedPassword,
      role: role,
    };

    if (psId) {
      bodydata.psId = psId;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin-signup`,
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
        setEmail("");
        setPassword("");
        setMobile_no("");
        setPasswordErr(false);
        setisform(true);
      } else {
        notifyWarn();
        setPasswordErr(false);
        setisloading(false);
        setisform(true);
      }
    } catch (error) {
      notifyWarn();
      setPasswordErr(false);
      setisloading(false);
      setisform(true);
    }
  };

  const updatehandler = async (e) => {
    if (!CryptoJS) {
      console.error("CryptoJS not loaded yet");
      return;
    }

    if (!passwordF) {
      notifyvalid();
      return;
    }

    if (!passwordComplexity(passwordF)) {
      setPasswordErrF(true);
      return;
    }

    e.preventDefault();
    setupdateLoading(true);

    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const hashedPassword = CryptoJS.SHA256(passwordF).toString(CryptoJS.enc.Hex);
    const hashedPasswordOld = CryptoJS.SHA256(oldPassword).toString(CryptoJS.enc.Hex);

    const bodydata = {
      oldPassword: hashedPasswordOld,
      newPassword: hashedPassword,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-user?Id=${idF}`,
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
        setOldPassword("");
        setOpen2(false);
        setPasswordErrF(false);
        logoutHandler();
      } else {
        notifyWarnMessage(data.message);
        setOldPassword("");
        setPasswordF("");
        setPasswordErrF(false);
        setupdateLoading(false);
        // setOpen2(false);
      }
    } catch (error) {
      notifyWarn();
      setOldPassword("");
      setPasswordErrF(false);
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

            <div className="w-1/5"></div>

            <div className="w-4/5 mt-20 mx-5 bg-white shadow p-5">
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
                      * Email
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700"
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
                      * Password
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700"
                      placeholder=""
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="title"
                      className="mb-1 text-base text-gray-800"
                    >
                      * Role
                    </label>
                    <select
                      id="locationSelect"
                      name="location"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                    >
                      <option value="">Select Role</option>
                      <option value="user">Police Station User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="title"
                      className="mb-1 text-base text-gray-800"
                    >
                      Police Station
                    </label>
                    <select
                      id="locationSelect"
                      name="location"
                      value={psId}
                      onChange={(e) => setPsId(e.target.value)}
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
                <h1 className="font-semibold text-xl mt-10">User Records</h1>

                <table className="w-full mx-auto mt-5 text-left">
                  <tr className="border flex flex-row justify-between bg-gray-100">
                    <th className="p-2 w-1/12 border-r">Delete</th>
                    <th className="p-2 w-1/12 border-r">Edit</th>
                    <th className="p-2 w-3/12 border-r">Email</th>
                    <th className="p-2 w-2/12 border-r">Password</th>
                    <th className="p-2 w-3/12 border-r">Police Station</th>
                    <th className="p-2 w-2/12 border-r">User Role</th>
                  </tr>

                  {records?.map((record) => {
                    const { email, password, psId, role, _id } = record;

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
                            onClick={() => {
                              let temp = "";
                              if (psId) {
                                temp = psId._id;
                              }
                              onOpenModal2(email, password, temp, role, _id);
                            }}
                          >
                            <AiFillEdit />
                          </button>
                        </td>
                        <td className="p-2 w-3/12 border-r">{email}</td>
                        <td className="p-2 w-2/12 border-r overflow-clip">
                          {password}
                        </td>
                        <td className="p-2 w-3/12 border-r">
                          {psId && <span>{psId.name}</span>}
                        </td>
                        <td className="p-2 w-2/12 border-r">{role}</td>
                      </tr>
                    );
                  })}
                </table>
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
                        * Email
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700"
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
                        * New Password
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700"
                        placeholder=""
                        value={passwordF}
                        onChange={(e) => setPasswordF(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        Police Station
                      </label>
                      <select
                        id="locationSelect"
                        name="location"
                        value={psIdF}
                        onChange={(e) => setPsIdF(e.target.value)}
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

export default Users;
