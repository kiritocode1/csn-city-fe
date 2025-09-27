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

const InputField = ({ label, id, value, onChange }) => (
  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
    <label htmlFor={id} className="mb-1 text-base text-gray-800">
      {label}
    </label>
    <input
      type="text"
      id={id}
      name={id}
      className="text-base border-b border-b-black px-3 py-2 outline-none focus:border-purple-700 w-full"
      placeholder=""
      value={value}
      onChange={onChange}
    />
  </div>
);

const Station = () => {
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
  const [region, setRegion] = useState("");

  const [si_court, setSiCourt] = useState("");
  const [si_court_in_marathi, setSiCourtInMarathi] = useState("");
  const [si_pi_crime, setSiPiCrime] = useState("");
  const [si_pi_crime_in_marathi, setSiPiCrimeInMarathi] = useState("");
  const [si_pi_crime_contact, setSiPiCrimeContact] = useState("");

  const [si_pi_admin, setSiPiAdmin] = useState("");
  const [si_pi_admin_in_marathi, setSiPiAdminInMarathi] = useState("");
  const [si_pi_admin_contact, setSiPiAdminContact] = useState("");

  const [si_number_of_beat, setSiNumberOfBeat] = useState("");
  const [si_area_sq_kms, setSiAreaSqKms] = useState("");
  const [si_population, setSiPopulation] = useState("");
  const [si_no_of_beat_marshalls, setSiNoOfBeatMarshalls] = useState("");

  const [si_bit_chowki, setSiBitChowki] = useState("");
  const [si_bit_chowki_in_marathi, setSiBitChowkiInMarathi] = useState("");

  const [file, setfile] = useState(null);
  const [fileErr, setfileErr] = useState(false);
  const [file2, setfile2] = useState(null);
  const [fileErr2, setfileErr2] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [isform, setisform] = useState(false);
  const [records, setrecords] = useState([]);
  const [deleteid, setdeleteid] = useState("");

  const [divisionsList, setDivisionsList] = useState([]);
  const [zonesList, setZonesList] = useState([]);
  const [regionsList, setRegionsList] = useState([]);

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
  const [regionF, setRegionF] = useState("");

  const [si_courtF, setSiCourtF] = useState("");
  const [si_court_in_marathiF, setSiCourtInMarathiF] = useState("");
  const [si_pi_crimeF, setSiPiCrimeF] = useState("");
  const [si_pi_crime_in_marathiF, setSiPiCrimeInMarathiF] = useState("");
  const [si_pi_crime_contactF, setSiPiCrimeContactF] = useState("");

  const [si_pi_adminF, setSiPiAdminF] = useState("");
  const [si_pi_admin_in_marathiF, setSiPiAdminInMarathiF] = useState("");
  const [si_pi_admin_contactF, setSiPiAdminContactF] = useState("");

  const [si_number_of_beatF, setSiNumberOfBeatF] = useState("");
  const [si_area_sq_kmsF, setSiAreaSqKmsF] = useState("");
  const [si_populationF, setSiPopulationF] = useState("");
  const [si_no_of_beat_marshallsF, setSiNoOfBeatMarshallsF] = useState("");

  const [si_bit_chowkiF, setSiBitChowkiF] = useState("");
  const [si_bit_chowki_in_marathiF, setSiBitChowkiInMarathiF] = useState("");

  const [group_photo, setgroup_photo] = useState("");
  const [map_photo, setmap_photo] = useState("");

  const [open2, setOpen2] = useState(false);
  const [idF, setidF] = useState("");
  const [fileF, setfileF] = useState(null);
  const [fileErrF, setfileErrF] = useState(false);
  const [file2F, setfile2F] = useState(null);
  const [fileErr2F, setfileErr2F] = useState(false);
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
    regionId,

    si_court,
    si_court_in_marathi,
    si_pi_crime,
    si_pi_crime_in_marathi,
    si_pi_crime_contact,

    si_pi_admin,
    si_pi_admin_in_marathi,
    si_pi_admin_contact,

    si_number_of_beat,
    si_area_sq_kms,
    si_population,
    si_no_of_beat_marshalls,

    si_bit_chowki,
    si_bit_chowki_in_marathi,

    photo,
    map_photo,
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
    setRegionF(DOMPurify.sanitize(regionId));

    setSiCourtF(DOMPurify.sanitize(si_court));
    setSiCourtInMarathiF(DOMPurify.sanitize(si_court_in_marathi));
    setSiPiCrimeF(DOMPurify.sanitize(si_pi_crime));
    setSiPiCrimeInMarathiF(DOMPurify.sanitize(si_pi_crime_in_marathi));
    setSiPiCrimeContactF(DOMPurify.sanitize(si_pi_crime_contact));

    setSiPiAdminF(DOMPurify.sanitize(si_pi_admin));
    setSiPiAdminInMarathiF(DOMPurify.sanitize(si_pi_admin_in_marathi));
    setSiPiAdminContactF(DOMPurify.sanitize(si_pi_admin_contact));

    setSiNumberOfBeatF(DOMPurify.sanitize(si_number_of_beat));
    setSiAreaSqKmsF(DOMPurify.sanitize(si_area_sq_kms));
    setSiPopulationF(DOMPurify.sanitize(si_population));
    setSiNoOfBeatMarshallsF(DOMPurify.sanitize(si_no_of_beat_marshalls));

    setSiBitChowkiF(DOMPurify.sanitize(si_bit_chowki));
    setSiBitChowkiInMarathiF(DOMPurify.sanitize(si_bit_chowki_in_marathi));

    setgroup_photo(photo);
    setmap_photo(map_photo);
    setidF(_id);
    setOpen2(true);
  };const onCloseModal2 = () => {
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

  const handleFileChange2 = (e) => {
    setfileErr2(false);
    const file = e.target.files[0];

    // setfile(file);

    if (file) {
      // Check if the selected file size is within the limit (5MB)
      if (file.size <= 5 * 1024 * 1024) {
        setfile2(file);
      } else {
        setfileErr2(true);
        e.target.value = ""; // Clear the input field
        setfile2(null);
      }
    }
  };

  const handleFileChange2F = (e) => {
    setfileErr2F(false);
    const file = e.target.files[0];

    // setfile(file);

    if (file) {
      // Check if the selected file size is within the limit (5MB)
      if (file.size <= 5 * 1024 * 1024) {
        setfile2F(file);
      } else {
        setfileErr2F(true);
        e.target.value = ""; // Clear the input field
        setfile2F(null);
      }
    }
  };

  useEffect(() => {
    fetchrecords();
    fetchDivisions();
    fetchZones();
    fetchRegions();
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
    setRegion("");
    setfile(null);
    setfile2(null);
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
    setRegion("");
    setfile(null);
    setfile2(null);
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stations-admin`,
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

  const fetchRegions = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-region`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (data) {
        setRegionsList(data.Regions);
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

    if (region) {
      formData.append("region", DOMPurify.sanitize(region));
    }

    if (si_court) {
      formData.append("si_court", DOMPurify.sanitize(si_court));
    }
    if (si_court_in_marathi) {
      formData.append("si_court_in_marathi", DOMPurify.sanitize(si_court_in_marathi));
    }
    if (si_pi_crime) {
      formData.append("si_pi_crime", DOMPurify.sanitize(si_pi_crime));
    }
    if (si_pi_crime_in_marathi) {
      formData.append("si_pi_crime_in_marathi", DOMPurify.sanitize(si_pi_crime_in_marathi));
    }
    if (si_pi_crime_contact) {
      formData.append("si_pi_crime_contact", DOMPurify.sanitize(si_pi_crime_contact));
    }

    if (si_pi_admin) {
      formData.append("si_pi_admin", DOMPurify.sanitize(si_pi_admin));
    }
    if (si_pi_admin_in_marathi) {
      formData.append("si_pi_admin_in_marathi", DOMPurify.sanitize(si_pi_admin_in_marathi));
    }
    if (si_pi_admin_contact) {
      formData.append("si_pi_admin_contact", DOMPurify.sanitize(si_pi_admin_contact));
    }

    if (si_number_of_beat) {
      formData.append("si_number_of_beat", DOMPurify.sanitize(si_number_of_beat));
    }
    if (si_area_sq_kms) {
      formData.append("si_area_sq_kms", DOMPurify.sanitize(si_area_sq_kms));
    }
    if (si_population) {
      formData.append("si_population", DOMPurify.sanitize(si_population));
    }
    if (si_no_of_beat_marshalls) {
      formData.append("si_no_of_beat_marshalls", DOMPurify.sanitize(si_no_of_beat_marshalls));
    }

    if (si_bit_chowki) {
      formData.append("si_bit_chowki", DOMPurify.sanitize(si_bit_chowki));
    }
    if (si_bit_chowki_in_marathi) {
      formData.append("si_bit_chowki_in_marathi", DOMPurify.sanitize(si_bit_chowki_in_marathi));
    }

    if (file) {
      formData.append("photo", file);
    }
    if (file2) {
      formData.append("map_photo", file2);
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
    if (contact_noF) {
      formData.append("contact_no", DOMPurify.sanitize(contact_noF));
    }
    if (contact_no2F) {
      formData.append("contact_no2", DOMPurify.sanitize(contact_no2F));
    }
    if (contact_no3F) {
      formData.append("contact_no3", DOMPurify.sanitize(contact_no3F));
    }
    if (divisionF) {
      formData.append("division", DOMPurify.sanitize(divisionF));
    }
    if (zoneF) {
      formData.append("zone", DOMPurify.sanitize(zoneF));
    }

    if (regionF) {
      formData.append("region", DOMPurify.sanitize(regionF));
    }

    if (si_courtF) {
      formData.append("si_court", DOMPurify.sanitize(si_courtF));
    }
    if (si_court_in_marathiF) {
      formData.append("si_court_in_marathi", DOMPurify.sanitize(si_court_in_marathiF));
    }
    if (si_pi_crimeF) {
      formData.append("si_pi_crime", DOMPurify.sanitize(si_pi_crimeF));
    }
    if (si_pi_crime_in_marathiF) {
      formData.append("si_pi_crime_in_marathi", DOMPurify.sanitize(si_pi_crime_in_marathiF));
    }
    if (si_pi_crime_contactF) {
      formData.append("si_pi_crime_contact", DOMPurify.sanitize(si_pi_crime_contactF));
    }

    if (si_pi_adminF) {
      formData.append("si_pi_admin", DOMPurify.sanitize(si_pi_adminF));
    }
    if (si_pi_admin_in_marathiF) {
      formData.append("si_pi_admin_in_marathi", DOMPurify.sanitize(si_pi_admin_in_marathiF));
    }
    if (si_pi_admin_contactF) {
      formData.append("si_pi_admin_contact", DOMPurify.sanitize(si_pi_admin_contactF));
    }

    if (si_number_of_beatF) {
      formData.append("si_number_of_beat", DOMPurify.sanitize(si_number_of_beatF));
    }
    if (si_area_sq_kmsF) {
      formData.append("si_area_sq_kms", DOMPurify.sanitize(si_area_sq_kmsF));
    }
    if (si_populationF) {
      formData.append("si_population", DOMPurify.sanitize(si_populationF));
    }
    if (si_no_of_beat_marshallsF) {
      formData.append("si_no_of_beat_marshalls", DOMPurify.sanitize(si_no_of_beat_marshallsF));
    }

    if (si_bit_chowkiF) {
      formData.append("si_bit_chowki", DOMPurify.sanitize(si_bit_chowkiF));
    }
    if (si_bit_chowki_in_marathiF) {
      formData.append("si_bit_chowki_in_marathi", DOMPurify.sanitize(si_bit_chowki_in_marathiF));
    }

    if (fileF) {
      formData.append("photo", fileF);
    }

    if (file2F) {
      formData.append("map_photo", file2F);
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
        setfile2F(null);
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
                      Division
                    </label>
                    <select
                      id="locationSelect"
                      name="location"
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
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
                      Zone
                    </label>
                    <select
                      id="locationSelect"
                      name="location"
                      value={zone}
                      onChange={(e) => setZone(e.target.value)}
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
                      Region
                    </label>
                    <select
                      id="locationSelect"
                      name="location"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                    >
                      <option value="">Select Region</option>
                      {regionsList.map((record) => {
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
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                    <label
                      htmlFor="title"
                      className="mb-1 text-base text-gray-800"
                    >
                      * Police Station Name in Marathi
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
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
                      Address
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                      placeholder=""
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
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
                      value={address_in_marathi}
                      onChange={(e) => setAddress_in_marathi(e.target.value)}
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
                      value={maplink}
                      onChange={(e) => setMaplink(e.target.value)}
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
                      Contact No 1
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
                      Contact No 2
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                      placeholder=""
                      value={contact_no2}
                      onChange={(e) => setContact_no2(e.target.value)}
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
                      value={contact_no3}
                      onChange={(e) => setContact_no3(e.target.value)}
                    />
                  </div>

                  <InputField
                    label="Court"
                    id="si_court"
                    value={si_court}
                    onChange={(e) => setSiCourt(e.target.value)}
                  />
                  <InputField
                    label="Court in Marathi"
                    id="si_court_in_marathi"
                    value={si_court_in_marathi}
                    onChange={(e) => setSiCourtInMarathi(e.target.value)}
                  />
                  <InputField
                    label="PI Crime"
                    id="si_pi_crime"
                    value={si_pi_crime}
                    onChange={(e) => setSiPiCrime(e.target.value)}
                  />
                  <InputField
                    label="PI Crime in Marathi"
                    id="si_pi_crime_in_marathi"
                    value={si_pi_crime_in_marathi}
                    onChange={(e) => setSiPiCrimeInMarathi(e.target.value)}
                  />
                  <InputField
                    label="PI Crime Contact"
                    id="si_pi_crime_contact"
                    value={si_pi_crime_contact}
                    onChange={(e) => setSiPiCrimeContact(e.target.value)}
                  />

                  <InputField
                    label="PI Admin"
                    id="si_pi_admin"
                    value={si_pi_admin}
                    onChange={(e) => setSiPiAdmin(e.target.value)}
                  />
                  <InputField
                    label="PI Admin in Marathi"
                    id="si_pi_admin_in_marathi"
                    value={si_pi_admin_in_marathi}
                    onChange={(e) => setSiPiAdminInMarathi(e.target.value)}
                  />
                  <InputField
                    label="PI Admin Contact"
                    id="si_pi_admin_contact"
                    value={si_pi_admin_contact}
                    onChange={(e) => setSiPiAdminContact(e.target.value)}
                  />

                  <InputField
                    label="Number of Beat"
                    id="si_number_of_beat"
                    value={si_number_of_beat}
                    onChange={(e) => setSiNumberOfBeat(e.target.value)}
                  />
                  <InputField
                    label="Area (Sq. Kms)"
                    id="si_area_sq_kms"
                    value={si_area_sq_kms}
                    onChange={(e) => setSiAreaSqKms(e.target.value)}
                  />
                  <InputField
                    label="Population"
                    id="si_population"
                    value={si_population}
                    onChange={(e) => setSiPopulation(e.target.value)}
                  />
                  <InputField
                    label="No. of Beat Marshalls"
                    id="si_no_of_beat_marshalls"
                    value={si_no_of_beat_marshalls}
                    onChange={(e) => setSiNoOfBeatMarshalls(e.target.value)}
                  />

                  <InputField
                    label="Bit Chowki"
                    id="si_bit_chowki"
                    value={si_bit_chowki}
                    onChange={(e) => setSiBitChowki(e.target.value)}
                  />
                  <InputField
                    label="Bit Chowki in Marathi"
                    id="si_bit_chowki_in_marathi"
                    value={si_bit_chowki_in_marathi}
                    onChange={(e) => setSiBitChowkiInMarathi(e.target.value)}
                  />

                  <div className="flex flex-col mx-3 my-3 space-y-1 mb-5">
                    <label
                      htmlFor="file"
                      className="mb-1 text-base text-gray-800"
                    >
                      * Police Station Photo
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

                  <div className="flex flex-col mx-3 my-3 space-y-1 mb-5">
                    <label
                      htmlFor="file"
                      className="mb-1 text-base text-gray-800"
                    >
                      Police Station Map Photo
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="image"
                      accept=".png, .jpg, .jpeg, .webp"
                      className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-60"
                      placeholder="Enter title"
                      onChange={(e) => handleFileChange2(e)}
                    />
                    {fileErr2 && (
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
                <h1 className="font-semibold text-xl mt-10">Police Stations</h1>

                <div className="overflow-x-auto max-w-full">
                  <table className="w-full min-w-[800px] mx-auto mt-5 text-left">
                    <tr className="border flex flex-row justify-between bg-gray-100">
                      <th className="p-2 w-1/12 border-r">Delete</th>
                      <th className="p-2 w-1/12 border-r">Edit</th>
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
                        region,

                        si_court,
                        si_court_in_marathi,
                        si_pi_crime,
                        si_pi_crime_in_marathi,
                        si_pi_crime_contact,

                        si_pi_admin,
                        si_pi_admin_in_marathi,
                        si_pi_admin_contact,

                        si_number_of_beat,
                        si_area_sq_kms,
                        si_population,
                        si_no_of_beat_marshalls,

                        si_bit_chowki,
                        si_bit_chowki_in_marathi,

                        photo,
                        map_photo,
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
                              onClick={() => {
                                const divisionId = division ? division._id : "";
                                const zoneId = zone ? zone._id : "";
                                const regionId = region ? region._id : "";
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
                                  zoneId,
                                  regionId,

                                  si_court,
                                  si_court_in_marathi,
                                  si_pi_crime,
                                  si_pi_crime_in_marathi,
                                  si_pi_crime_contact,

                                  si_pi_admin,
                                  si_pi_admin_in_marathi,
                                  si_pi_admin_contact,

                                  si_number_of_beat,
                                  si_area_sq_kms,
                                  si_population,
                                  si_no_of_beat_marshalls,

                                  si_bit_chowki,
                                  si_bit_chowki_in_marathi,

                                  photo,
                                  map_photo,
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
                        Region
                      </label>
                      <select
                        id="locationSelect"
                        name="location"
                        value={regionF}
                        onChange={(e) => setRegionF(e.target.value)}
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-full"
                      >
                        <option value="">Select Region</option>
                        {regionsList.map((record) => {
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

                    <InputField
                      label="Court"
                      id="si_court"
                      value={si_courtF}
                      onChange={(e) => setSiCourtF(e.target.value)}
                    />
                    <InputField
                      label="Court in Marathi"
                      id="si_court_in_marathi"
                      value={si_court_in_marathiF}
                      onChange={(e) => setSiCourtInMarathiF(e.target.value)}
                    />
                    <InputField
                      label="PI Crime"
                      id="si_pi_crime"
                      value={si_pi_crimeF}
                      onChange={(e) => setSiPiCrimeF(e.target.value)}
                    />
                    <InputField
                      label="PI Crime in Marathi"
                      id="si_pi_crime_in_marathi"
                      value={si_pi_crime_in_marathiF}
                      onChange={(e) => setSiPiCrimeInMarathiF(e.target.value)}
                    />
                    <InputField
                      label="PI Crime Contact"
                      id="si_pi_crime_contact"
                      value={si_pi_crime_contactF}
                      onChange={(e) => setSiPiCrimeContactF(e.target.value)}
                    />

                    <InputField
                      label="PI Admin"
                      id="si_pi_admin"
                      value={si_pi_adminF}
                      onChange={(e) => setSiPiAdminF(e.target.value)}
                    />
                    <InputField
                      label="PI Admin in Marathi"
                      id="si_pi_admin_in_marathi"
                      value={si_pi_admin_in_marathiF}
                      onChange={(e) => setSiPiAdminInMarathiF(e.target.value)}
                    />
                    <InputField
                      label="PI Admin Contact"
                      id="si_pi_admin_contact"
                      value={si_pi_admin_contactF}
                      onChange={(e) => setSiPiAdminContactF(e.target.value)}
                    />

                    <InputField
                      label="Number of Beat"
                      id="si_number_of_beat"
                      value={si_number_of_beatF}
                      onChange={(e) => setSiNumberOfBeatF(e.target.value)}
                    />
                    <InputField
                      label="Area (Sq. Kms)"
                      id="si_area_sq_kms"
                      value={si_area_sq_kmsF}
                      onChange={(e) => setSiAreaSqKmsF(e.target.value)}
                    />
                    <InputField
                      label="Population"
                      id="si_population"
                      value={si_populationF}
                      onChange={(e) => setSiPopulationF(e.target.value)}
                    />
                    <InputField
                      label="No. of Beat Marshalls"
                      id="si_no_of_beat_marshalls"
                      value={si_no_of_beat_marshallsF}
                      onChange={(e) => setSiNoOfBeatMarshallsF(e.target.value)}
                    />

                    <InputField
                      label="Bit Chowki"
                      id="si_bit_chowki"
                      value={si_bit_chowkiF}
                      onChange={(e) => setSiBitChowkiF(e.target.value)}
                    />
                    <InputField
                      label="Bit Chowki in Marathi"
                      id="si_bit_chowki_in_marathi"
                      value={si_bit_chowki_in_marathiF}
                      onChange={(e) => setSiBitChowkiInMarathiF(e.target.value)}
                    />

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

                    <div className="mx-3 my-5">
                      <label
                        htmlFor="file"
                        className="mb-5 text-base text-gray-800"
                      >
                        Current Police Station Map Photo
                      </label>
                      <div className="mt-5">
                        <img src={map_photo} alt="" className="h-48 w-auto" />
                      </div>
                    </div>

                    <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                      <label
                        htmlFor="file"
                        className="mb-1 text-base text-gray-800"
                      >
                        New Police Station Map Image (Optional)
                      </label>
                      <input
                        type="file"
                        id="file"
                        name="pdf"
                        accept=".png, .jpg, .jpeg"
                        className="text-base border-b border-b-black px-3 py-2  outline-none focus:border-purple-700 w-60"
                        placeholder="Enter title"
                        onChange={(e) => handleFileChange2F(e)}
                      />
                      {fileErr2F && (
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
