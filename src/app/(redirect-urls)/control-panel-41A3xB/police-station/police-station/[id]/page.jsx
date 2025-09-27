"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import AdminN from "@/components/Admin-nav-user";
import AdminM from "@/components/Admin-menu-user";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ProtectedAdminRoute from "@/components/ProtectedUserRoutes";
import Cookies from "js-cookie";
import DOMPurify from "dompurify";

const Station = () => {
  const params = useParams();
  const id = params?.id;
  const [name, setname] = useState("");
  const [name_in_marathi, setname_in_marathi] = useState("");
  const [address, setAddress] = useState("");
  const [address_in_marathi, setAddress_in_marathi] = useState("");

  const [maplink, setMaplink] = useState("");

  const [email, setEmail] = useState("");
  const [contact_no, setContact_no] = useState("");
  const [contact_no2, setContact_no2] = useState("");
  const [contact_no3, setContact_no3] = useState("");
  const [division, setDivision] = useState("");
  const [zone, setZone] = useState("");

  const [file, setfile] = useState(null);
  const [fileErr, setfileErr] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [isform, setisform] = useState(false);
  const [records, setrecords] = useState([]);
  const [deleteid, setdeleteid] = useState("");

  const [divisionsList, setDivisionsList] = useState([]);
  const [zonesList, setZonesList] = useState([]);

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

  const [nameF, setnameF] = useState("");
  const [name_in_marathiF, setname_in_marathiF] = useState("");
  const [addressF, setAddressF] = useState("");
  const [address_in_marathiF, setAddress_in_marathiF] = useState("");

  const [maplinkF, setMaplinkF] = useState("");
  const [emailF, setEmailF] = useState("");
  const [contact_noF, setContact_noF] = useState("");
  const [contact_no2F, setContact_no2F] = useState("");
  const [contact_no3F, setContact_no3F] = useState("");
  const [divisionF, setDivisionF] = useState("");
  const [zoneF, setZoneF] = useState("");

  const [group_photo, setgroup_photo] = useState("");

  const [open2, setOpen2] = useState(false);
  const [idF, setidF] = useState("");
  const [fileF, setfileF] = useState(null);
  const [fileErrF, setfileErrF] = useState(false);
  const [updateLoading, setupdateLoading] = useState(false);

  const onOpenModal2 = (
    name,
    name_in_marathi,
    address,
    address_in_marathi,
    maplink,
    email,
    contact_no,
    contact_no2,
    contact_no3,
    divisionId,
    zoneId,
    photo,
    _id
  ) => {
    setnameF(DOMPurify.sanitize(name));
    setname_in_marathiF(DOMPurify.sanitize(name_in_marathi));
    setAddressF(DOMPurify.sanitize(address));
    setAddress_in_marathiF(DOMPurify.sanitize(address_in_marathi));
    setMaplinkF(DOMPurify.sanitize(maplink));
    setEmailF(DOMPurify.sanitize(email));
    setContact_noF(DOMPurify.sanitize(contact_no));
    setContact_no2F(DOMPurify.sanitize(contact_no2));
    setContact_no3F(DOMPurify.sanitize(contact_no3));
    setDivisionF(DOMPurify.sanitize(divisionId));
    setZoneF(DOMPurify.sanitize(zoneId));
    setgroup_photo(DOMPurify.sanitize(photo));
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
    fetchDivisions();
    fetchZones();
  }, []);

  const resethandler = () => {
    setname("");
    setname_in_marathi("");
    setAddress("");
    setAddress_in_marathi("");
    setMaplink("");
    setEmail("");
    setContact_no("");
    setContact_no2("");
    setContact_no3("");
    setDivision("");
    setZone("");
    setfile(null);
  };

  const cancelhandler = () => {
    setisform(false);
    setname("");
    setname_in_marathi("");
    setAddress("");
    setAddress_in_marathi("");
    setMaplink("");
    setEmail("");
    setContact_no("");
    setContact_no2("");
    setContact_no3("");
    setDivision("");
    setZone("");
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-user-station?Id=${id}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (data) {
        // console.log(data);

        setrecords(data.stations);
      } else {
        notifyWarn();
      }
    } catch (error) {
      notifyWarn();
    }
  };

  const fetchDivisions = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-division`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (data) {
        setDivisionsList(data.divisions);
      } else {
        notifyWarn();
      }
    } catch (error) {
      notifyWarn();
    }
  };

  const fetchZones = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-zone`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (data) {
        setZonesList(data.zones);
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-station?Id=${id}`,
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
    if (!name || !name_in_marathi || !file) {
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
    formData.append("name", DOMPurify.sanitize(name));
    formData.append("name_in_marathi", DOMPurify.sanitize(name_in_marathi));
    if (address) {
      formData.append("address", DOMPurify.sanitize(address));
    }
    if (address_in_marathi) {
      formData.append("address_in_marathi", DOMPurify.sanitize(address_in_marathi));
    }

    if (maplink) {
      formData.append("maplink", DOMPurify.sanitize(maplink));
    }
    if (email) {
      formData.append("email", DOMPurify.sanitize(email));
    }
    if (contact_no) {
      formData.append("contact_no", DOMPurify.sanitize(contact_no));
    }
    if (contact_no2) {
      formData.append("contact_no2", DOMPurify.sanitize(contact_no2));
    }
    if (contact_no3) {
      formData.append("contact_no3", DOMPurify.sanitize(contact_no3));
    }
    if (division) {
      formData.append("division", DOMPurify.sanitize(division));
    }
    if (zone) {
      formData.append("zone", DOMPurify.sanitize(zone));
    }

    if (file) {
      formData.append("photo", file);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add-station`,
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
    if (!nameF || !name_in_marathiF) {
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
    formData.append("name", DOMPurify.sanitize(nameF));
    formData.append("name_in_marathi", DOMPurify.sanitize(name_in_marathiF));
    if (addressF) {
      formData.append("address", DOMPurify.sanitize(addressF));
    }
    if (address_in_marathiF) {
      formData.append("address_in_marathi", DOMPurify.sanitize(address_in_marathiF));
    }

    if (maplinkF) {
      formData.append("maplink", DOMPurify.sanitize(maplinkF));
    }

    if (emailF) {
      formData.append("email", DOMPurify.sanitize(emailF));
    }
    formData.append("contact_no", DOMPurify.sanitize(contact_noF));
    formData.append("contact_no2", DOMPurify.sanitize(contact_no2F));
    formData.append("contact_no3", DOMPurify.sanitize(contact_no3F));
    if (divisionF) {
      formData.append("division", DOMPurify.sanitize(divisionF));
    }
    if (zoneF) {
      formData.append("zone", DOMPurify.sanitize(zoneF));
    }

    if (fileF) {
      formData.append("photo", fileF);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-station?Id=${idF}`,
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
              <div className="mb-52 w-full bg-white">
                <h1 className="font-semibold text-xl mt-10">Police Station</h1>

                <div className="overflow-x-auto max-w-full">
                  <table className="w-full min-w-[800px] mx-auto mt-5 text-left">
                    <tr className="border flex flex-row justify-between bg-gray-100">
                      <th className="p-2 w-2/12 border-r">Edit</th>
                      <th className="p-2 w-5/12 border-r">
                        Police Station Name
                      </th>
                      <th className="p-2 w-5/12 border-r">Name in Marathi</th>
                    </tr>

                    {records.map((record) => {
                      const {
                        name,
                        name_in_marathi,
                        address,
                        address_in_marathi,
                        maplink,
                        email,
                        contact_no,
                        contact_no2,
                        contact_no3,
                        division,
                        zone,
                        photo,
                        _id,
                      } = record;

                      return (
                        <tr
                          className="border flex flex-row justify-between"
                          key={_id}
                        >
                          <td className="p-1 w-2/12 border-r">
                            <button
                              className="bg-yellow-600 text-white p-3 rounded"
                              //   onClick={() => deleterecord(_id)}
                              onClick={() => {
                                const divisionId = division ? division._id : "";
                                onOpenModal2(
                                  name,
                                  name_in_marathi,
                                  address,
                                  address_in_marathi,
                                  maplink,
                                  email,
                                  contact_no,
                                  contact_no2,
                                  contact_no3,
                                  divisionId,
                                  zone,
                                  photo,
                                  _id
                                );
                              }}
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

                <Modal open={open2} onClose={onCloseModal2} center>
                  <div className="pt-10 px-5 w-[700px]">
                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        * Division
                      </label>
                      <select
                        id="locationSelect"
                        name="location"
                        value={divisionF}
                        onChange={(e) => setDivisionF(e.target.value)}
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                      >
                        <option value="">Select Police Station Division</option>
                        {divisionsList.map((record) => {
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
                        * Zone
                      </label>
                      <select
                        id="locationSelect"
                        name="location"
                        value={zoneF}
                        onChange={(e) => setZoneF(e.target.value)}
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                      >
                        <option value="">Select Zone</option>
                        {zonesList.map((record) => {
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
                        * Police Station Name
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
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
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
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
                        Address
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={addressF}
                        onChange={(e) => setAddressF(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        Address in Marathi
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={address_in_marathiF}
                        onChange={(e) => setAddress_in_marathiF(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        Google Map Link
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={maplinkF}
                        onChange={(e) => setMaplinkF(e.target.value)}
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
                        Contact No 1
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
                        Contact No 2
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={contact_no2F}
                        onChange={(e) => setContact_no2F(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="title"
                        className="mb-1 text-base text-gray-800"
                      >
                        Contact No 3
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                        placeholder=""
                        value={contact_no3F}
                        onChange={(e) => setContact_no3F(e.target.value)}
                      />
                    </div>

                    <div className="mx-3 my-5">
                      <label
                        htmlFor="file"
                        className="mb-5 text-base text-gray-800"
                      >
                        Current Police Station Photo
                      </label>
                      <div className="mt-5">
                        <img src={group_photo} alt="" className="h-48 w-auto" />
                      </div>
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="file"
                        className="mb-1 text-base text-gray-800"
                      >
                        New Police Station Image (Optional)
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

export default Station;

