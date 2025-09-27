"use client";

import React, { useEffect, useState } from "react";
import AdminN from "@/components/Admin-login-nav";
import AdminM from "@/components/Admin-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
// import ReCAPTCHA from "react-google-recaptcha";
import ReCaptcha from "@/components/ReCaptcha";
import { Oval } from "react-loader-spinner";
import dynamic from "next/dynamic";

const CryptoJS = dynamic(() => import("crypto-js"), { ssr: false });

import { FiRefreshCw } from "react-icons/fi";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
  const router = useRouter();

  const [f1, setf1] = useState(true);
  const [f2, setf2] = useState(false);
  const [f3, setf3] = useState(false);

  const [mobile_no, setMobile_no] = useState("");
  const [otp, setotp] = useState("");
  const [otpinput, setotpinput] = useState("");

  const [password, setpassword] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");

  const [passwordErr, setPasswordErr] = useState(false);

  // const [captchaVerified, setCaptchaVerified] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [svg, setSvg] = useState(null);
  const [text, settext] = useState("");

  // const [captchaInput, setcapchaInput] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  const passwordComplexity = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const loginhandler = async () => {
    setIsLoading(true);

    const requestBody = {
      mobile_no: mobile_no,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify the content type as JSON
          },
          body: JSON.stringify(requestBody),
        }
      );

      //   setMobile_no("");

      const data = await response.json();

      if (data.success === true) {
        setotp(data.otp);
        setf1(false);
        setf2(true);
        setIsLoading(false);
      } else {
        notifyWarnMessage(data.message);
        // refreshCaptcha();
        setIsLoading(false);
      }
    } catch (error) {
      // notifyWarn();
      // refreshCaptcha();
      setIsLoading(false);
    }
  };

  const buttonHandler = () => {
    if (!mobile_no || !captchaToken) {
      notifyWarnfields();
      return;
    }
    if (captchaToken) {
      loginhandler();
    } else {
      notifycaptcha();
    }
  };

  const otpSubmitHandler = () => {
    if (!otpinput) {
      notifyWarnfields();
      return;
    }

    const randomtext = "gold414@124&45";
    const hashedotp = CryptoJS.HmacSHA256(otpinput, randomtext).toString(
      CryptoJS.enc.Hex
    );

    if (hashedotp === otp) {
      setf1(false);
      setf2(false);
      setf3(true);
    } else {
      notifyWarnMessage("Oops Wrong OTP!");
    }
  };

  const ResetPasswordHandler = async () => {
    setIsLoading(true);
    setPasswordErr(false);

    if (password !== Confirmpassword) {
      notifyWarnMessage("Oops Password do not Match!");
      setIsLoading(false);
      return;
    }

    if (!passwordComplexity(password)) {
      setPasswordErr(true);
      setIsLoading(false);
      return;
    }

    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

    const requestBody = {
      newPassword: hashedPassword,
      mobile_no: mobile_no,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-password-with-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify the content type as JSON
          },
          body: JSON.stringify(requestBody),
        }
      );

      //   setMobile_no("");

      const data = await response.json();

      if (data.success === true) {
        notifySuccess();
        router.push("/control-panel-41A3xB/login");
      } else {
        notifyWarnMessage(data.message);
        // refreshCaptcha();
        setIsLoading(false);
      }
    } catch (error) {
      // notifyWarn();
      // refreshCaptcha();
      setIsLoading(false);
    }
  };

  const notifyWarn = () => {
    toast.warn("Email or Password is wrong!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifyWarnMessage = (m) => {
    toast.warn(m, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifyWarnfields = () => {
    toast.warn("Please enter fields", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifycaptcha = () => {
    toast.error("wrong captcha !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  };

  const notifySuccess = () => {
    toast.success("Password Reset successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  };

  // const fetchCaptcha = async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/captcha`,
  //       {
  //         method: "GET",
  //       }
  //     );

  //     const data = await response.json();

  //     if (data.captcha) {
  //       setSvg(data.captcha.svg);
  //       settext(data.captcha.text);
  //     } else {
  //       //   notifyWarn();
  //     }
  //   } catch (error) {
  //     // notifyWarn();
  //   }
  // };

  // useEffect(() => {
  //   fetchCaptcha();
  // }, []);

  // const refreshCaptcha = () => {
  //   fetchCaptcha();
  // };

  return (
    <>
      <main className="">
        <AdminN />
        <ToastContainer autoClose={2000} />

        <div className="mt-20">
          {f1 && (
            <div className="max-w-sm mx-auto mt-40">
              <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                <label
                  htmlFor="email"
                  className="mb-1 text-base  text-gray-800"
                >
                  Enter Mobile no associated with your account
                </label>
                <input
                  type="text"
                  id="email"
                  className="text-base  border-2 border-purple-300 px-3 py-2 rounded-md outline-none focus:border-purple-700"
                  placeholder=""
                  value={mobile_no}
                  onChange={(e) => {
                    const inputText = e.target.value.slice(0, 10);
                    setMobile_no(inputText);
                  }}
                  autoComplete="off"
                />
              </div>

              {/* <div className="mt-5 mx-3">
                <div className="flex flex-row items-center space-x-5">
                  <div dangerouslySetInnerHTML={{ __html: svg }} />
                  <div
                    className="w-8 h-8 text-center justify-center flex items-center border"
                    onClick={refreshCaptcha}
                  >
                    <FiRefreshCw className="font-bold text-xl text-blue-600" />
                  </div>
                </div>

                <input
                  type="text"
                  id=""
                  required={true}
                  value={captchaInput}
                  onChange={(e) => {
                    const inputText = e.target.value.slice(0, 6);
                    setcapchaInput(inputText);
                  }}
                  placeholder="Enter Capcha Code"
                  className="text-base mt-2  border-2 border-purple-300 px-3 py-2 rounded-md outline-none focus:border-purple-700"
                />
              </div> */}

              <div className="flex flex-col mx-3 mt space-y-1 mt-5">
                {/* reCAPTCHA Component */}
                <div className="py-5 my-5 flex justify-center">
                  <ReCaptcha onVerify={setCaptchaToken} />
                </div>
                <button
                  onClick={buttonHandler}
                  className="bg-blue-600 text-white text-lg px-3 py-2 rounded hover:bg-blue-700 flex justify-center items-center"
                >
                  {!isLoading && <span>Submit</span>}
                  {isLoading && (
                    <Oval
                      height={30}
                      width={30}
                      color="#ffffff"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#ffffff"
                      strokeWidth={10}
                      strokeWidthSecondary={10}
                    />
                  )}
                </button>
              </div>
            </div>
          )}

          {f2 && (
            <div className="max-w-sm mx-auto mt-40">
              <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                <label
                  htmlFor="email"
                  className="mb-1 text-base  text-gray-800"
                >
                  Enter OTP sent on your mobile no
                </label>
                <input
                  type="text"
                  id="email"
                  className="text-base  border-2 border-purple-300 px-3 py-2 rounded-md outline-none focus:border-purple-700"
                  placeholder=""
                  value={otpinput}
                  onChange={(e) => {
                    const inputText = e.target.value.slice(0, 10);
                    setotpinput(inputText);
                  }}
                  autoComplete="off"
                />
              </div>

              <div className="flex flex-col mx-3 mt space-y-1 mt-5">
                <button
                  onClick={otpSubmitHandler}
                  className="bg-blue-600 text-white text-lg px-3 py-2 rounded hover:bg-blue-700 flex justify-center items-center"
                >
                  {!isLoading && <span>Submit</span>}
                  {isLoading && (
                    <Oval
                      height={30}
                      width={30}
                      color="#ffffff"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#ffffff"
                      strokeWidth={10}
                      strokeWidthSecondary={10}
                    />
                  )}
                </button>
              </div>
            </div>
          )}

          {f3 && (
            <div className="max-w-sm mx-auto mt-40">
              <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                <label htmlFor="pass" className="mb-1 text-base  text-gray-800">
                  Enter New Password
                </label>
                <input
                  type="password"
                  id="pass"
                  className="text-base  border-2 border-purple-300 px-3 py-2 rounded-md outline-none focus:border-purple-700"
                  placeholder=""
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  autoComplete="off"
                />
              </div>

              <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                <label htmlFor="pass" className="mb-1 text-base  text-gray-800">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="pass"
                  className="text-base  border-2 border-purple-300 px-3 py-2 rounded-md outline-none focus:border-purple-700"
                  placeholder=""
                  value={Confirmpassword}
                  onChange={(e) => {
                    setConfirmpassword(e.target.value);
                  }}
                  autoComplete="off"
                />
              </div>

              {passwordErr && (
                <div className="px-3 pb-2">
                  <p className="text-red-500">Password Must Contain :</p>
                  <ul className="text-xs">
                    <li>Minimum length: 8 characters</li>
                    <li>At least one uppercase letter (A-Z)</li>
                    <li>At least one lowercase letter (a-z)</li>
                    <li>At least one digit (0-9)</li>
                    <li>At least one special character (e.g., !@#$%^&*)</li>
                  </ul>
                </div>
              )}

              <div className="flex flex-col mx-3 mt space-y-1 mt-5">
                <button
                  onClick={ResetPasswordHandler}
                  className="bg-blue-600 text-white text-lg px-3 py-2 rounded hover:bg-blue-700 flex justify-center items-center"
                >
                  {!isLoading && <span>Submit</span>}
                  {isLoading && (
                    <Oval
                      height={30}
                      width={30}
                      color="#ffffff"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#ffffff"
                      strokeWidth={10}
                      strokeWidthSecondary={10}
                    />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
