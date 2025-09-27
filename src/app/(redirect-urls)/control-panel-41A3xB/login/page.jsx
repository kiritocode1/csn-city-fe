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
import HmacSHA256 from "crypto-js/hmac-sha256";
import { FiRefreshCw } from "react-icons/fi";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  // const [captchaVerified, setCaptchaVerified] = useState(true);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [CryptoJS, setCryptoJS] = useState(null);

  const [svg, setSvg] = useState(null);
  const [text, settext] = useState("");

  const [captchaInput, setcapchaInput] = useState("");

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpCaptchaToken, setOtpCaptchaToken] = useState(null);

  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    // Dynamically import CryptoJS
    import("crypto-js").then((CryptoJSModule) => {
      setCryptoJS(CryptoJSModule);
    });
  }, []);

  const loginhandler = async () => {
    if (!CryptoJS) {
      console.error("CryptoJS not loaded yet");
      return;
    }

    setIsLoading(true);
    let salt;

    //get salt value
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gen-code`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (data.success === true) {
        salt = data.salt;
      }
    } catch (error) {
      notifyWarn();
      setIsLoading(false);
      return;
    }

    const hashedPassword1 = CryptoJS.SHA256(password, salt).toString(
      CryptoJS.enc.Hex
    );

    const hashedPassword2 = CryptoJS.SHA256(hashedPassword1 + salt).toString(
      CryptoJS.enc.Hex
    );

    const requestBody = {
      email: email,
      password: hashedPassword2,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-salt-value": salt,
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (data.success === true) {
        // setShowOtpInput(true);
        setIsLoading(false);
        verifyOtp();
        // toast.success("Please check your email for OTP");
      } else {
        notifyWarnMessage(data.message);
        // refreshCaptcha();
        setIsLoading(false);
      }
    } catch (error) {
      // refreshCaptcha();
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    // if (!otpCaptchaToken) {
    //   notifyWarnMessage("Please complete the reCAPTCHA");
    //   return;
    // }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            // otp: otp,
            // captchaToken: otpCaptchaToken,
            deviceInfo: {
              userAgent: window.navigator.userAgent,
              platform: window.navigator.platform,
              language: window.navigator.language,
              ipAddress: window.navigator.ipAddress,
            }
          }),
        }
      );

      const data = await response.json();

      if (data.success === true) {
        if (data.sessionExpired) {
          notifyWarnMessage("You have been logged out from other devices");
        }
        Cookies.set("token", data.token, {
          expires: 1 / 96,  // 15 minutes
          path: "/control-panel-41A3xB",
          secure: true,
          sameSite: "Strict"
        });
        if (data.psId) {
          Cookies.set("psId", data.psId, {
            expires: 30,
            path: "/control-panel-41A3xB",
            secure: true,
            sameSite: "Strict",
          });
        }
        if (data.role === "user") {
          console.log("user login", data.token);
          router.push("/control-panel-41A3xB/police-station");
        }
        if (data.role === "admin") {
          router.push("/control-panel-41A3xB/dashboard");
        }
        // router.push("/control-panel-41A3xB/dashboard");
        // router.push("/control-panel-41A3xB/dashboard");
      } else {
        notifyWarnMessage("Invalid OTP");
        setIsLoading(false);
      }
    } catch (error) {
      notifyWarnMessage("Error verifying OTP");
      setIsLoading(false);
    }
  };

  const buttonHandler = () => {
    if (!email || !password || !captchaToken) {
      notifyWarnfields();
      return;
    }
    if (captchaToken) {
      loginhandler();
    } else {
      notifycaptcha();
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

  //   useEffect(() => {
  //     // Check if the user has a valid token
  //     const token = Cookies.get("token");
  //     if (token) {
  //       router.push("/control-panel-41A3xB/dashboard");
  //     }
  //   }, []);

  const sanitizeEmail = (input) => {
    if (typeof input !== "string") return "";
    return input
      .trim()
      .replace(/[^a-zA-Z0-9@._-]/g, "") // Allow letters, numbers, @, dot, dash, underscore
      .slice(0, 430); // Limit to 50 chars
  };

  const sanitizePassword = (input) => {
    if (typeof input !== "string") return "";
    return input
      .replace(/</g, "")  // Remove <
      .replace(/>/g, "")  // Remove >
      .replace(/&/g, "")  // Remove &
      .replace(/"/g, "")  // Remove "
      .replace(/'/g, "")  // Remove '
      .slice(0, 50);      // Limit to 50 chars
  };

  const resendOtp = async () => {
    if (!email) {
      notifyWarnMessage("Email is required to resend OTP");
      return;
    }

    setIsResending(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/resend-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("OTP has been resent to your email");
      } else {
        notifyWarnMessage(data.message);
      }
    } catch (error) {
      notifyWarnMessage("Error resending OTP");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <main className="">
        <AdminN />
        <ToastContainer autoClose={2000} />

        <div className="mt-20">
          <div className="max-w-sm mx-auto mt-40">
            {!showOtpInput ? (
              <>
                <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                  <label htmlFor="email" className="mb-1 text-base  text-gray-800">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="text-base  border-2 border-purple-300 px-3 py-2 rounded-md outline-none focus:border-purple-700"
                    placeholder="email"
                    maxLength={50}
                    value={email}
                    onChange={(e) => {
                      const sanitizedInput = sanitizeEmail(e.target.value);
                      setemail(sanitizedInput);
                    }}
                    autoComplete="off"
                  />
                </div>

                <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                  <label htmlFor="pass" className="mb-1 text-base  text-gray-800 ">
                    Password
                  </label>
                  <input
                    type="password"
                    id="pass"
                    className="text-base  border-2 border-purple-300 px-3 py-2 rounded-md outline-none focus:border-purple-700"
                    placeholder="password"
                    maxLength={50}
                    value={password}
                    onChange={(e) => {
                      const sanitizedInput = sanitizePassword(e.target.value);
                      setpassword(sanitizedInput);
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
                      const inputText = e.target.value.slice(0, 50);
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
                    {!isLoading && <span>Login</span>}
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

                <div className="mx-3 mt-5">
                  <Link href={"/control-panel-41A3xB/forgot-password"} className="text-blue-400">
                    Forget Password ?
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
                <label htmlFor="otp" className="mb-1 text-base text-gray-800">
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  className="text-base border-2 border-purple-300 px-3 py-2 rounded-md outline-none focus:border-purple-700"
                  placeholder="Enter OTP sent to your email"
                  value={otp}
                  maxLength={6}
                  onChange={(e) => setOtp(e.target.value)}
                  autoComplete="off"
                />
                <div className="py-5 my-5 flex justify-center">
                  <ReCaptcha onVerify={setOtpCaptchaToken} />
                </div>
                <button
                  onClick={verifyOtp}
                  className="bg-blue-600 text-white text-lg px-3 py-2 rounded hover:bg-blue-700 flex justify-center items-center mt-4"
                >
                  {!isLoading && <span>Verify OTP</span>}
                  {isLoading && (
                    <Oval
                      height={30}
                      width={30}
                      color="#ffffff"
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#ffffff"
                      strokeWidth={10}
                      strokeWidthSecondary={10}
                    />
                  )}
                </button>
                <button
                  onClick={resendOtp}
                  className="bg-gray-600 text-white text-lg px-3 py-2 rounded hover:bg-gray-700 flex justify-center items-center mt-4"
                  disabled={isResending}
                >
                  {isResending ? (
                    <Oval
                      height={20}
                      width={20}
                      color="#ffffff"
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#ffffff"
                      strokeWidth={10}
                      strokeWidthSecondary={10}
                    />
                  ) : (
                    <span>Resend OTP</span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;