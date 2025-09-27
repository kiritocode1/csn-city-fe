"use client";

// import React, { useEffect, useState } from "react";
// // import AdminN from "@/components/Admin-nav";
// import AdminM from "@/components/Admin-menu";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import ReCAPTCHA from "react-google-recaptcha";
// import { Oval } from "react-loader-spinner";
// import CryptoJS from "crypto-js";

// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";

// const Login = () => {
//   const router = useRouter();
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [captchaVerified, setCaptchaVerified] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleRecaptchaChange = (value) => {
//     // 'value' will be null if reCAPTCHA is not verified or a string with the verification token.
//     if (value) {
//       // reCAPTCHA is verified, set the 'captchaVerified' state to true.
//       setCaptchaVerified(true);
//     } else {
//       // reCAPTCHA is not verified, set the 'captchaVerified' state to false.
//       setCaptchaVerified(false);
//     }
//   };

//   const loginhandler = async () => {
//     setIsLoading(true);
//     const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
//     const requestBody = {
//       email: email,
//       password: hashedPassword,
//     };

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin-signup`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json", // Specify the content type as JSON
//           },
//           body: JSON.stringify(requestBody),
//         }
//       );

//       setemail("");
//       setpassword("");

//       const data = await response.json();

//       if (data.success === true) {
//         console.log(data.token);
//         // document.cookie = `token=${token}`;
//         Cookies.set("token", data.token, { expires: 30 });
//         router.push("/control-panel-41A3xB/dashboard");
//       } else {
//         //   notifyWarn();
//         setIsLoading(false);
//       }
//     } catch (error) {
//       // notifyWarn();
//       setIsLoading(false);
//     }
//   };

//   const buttonHandler = () => {
//     if (!email || !password || !captchaVerified) {
//       notifyWarn();
//       return;
//     }

//     loginhandler();
//   };

//   const notifyWarn = () => {
//     toast.warn("fields are required!", {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });
//   };

//   return (
//     <>
//       <Head>
//         <title>login | Admin Dashboard </title>
//       </Head>

//       <main className="">
//         <AdminN />
//         <ToastContainer autoClose={2000} />

//         <div className="mt-20">
//           <div className="max-w-sm mx-auto mt-40">
//             <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
//               <label htmlFor="email" className="mb-1 text-base  text-gray-800">
//                 Email
//               </label>
//               <input
//                 type="text"
//                 id="email"
//                 className="text-base  border-2 border-purple-300 px-3 py-2 rounded-md outline-none focus:border-purple-700"
//                 placeholder="email"
//                 value={email}
//                 onChange={(e) => setemail(e.target.value)}
//               />
//             </div>

//             <div className="flex flex-col mx-3 my-1 space-y-1 mb-5">
//               <label htmlFor="pass" className="mb-1 text-base  text-gray-800">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="pass"
//                 className="text-base  border-2 border-purple-300 px-3 py-2 rounded-md outline-none focus:border-purple-700"
//                 placeholder="password"
//                 value={password}
//                 onChange={(e) => setpassword(e.target.value)}
//               />
//             </div>

//             <div className="flex justify-center items-center">
//               <ReCAPTCHA
//                 sitekey="6Ld6g1UoAAAAAP9GOwpIQlAuoG0JGyzclfo5hJ3C"
//                 onChange={handleRecaptchaChange}
//               />
//             </div>

//             <div className="flex flex-col mx-3 mt space-y-1 mt-5">
//               <button
//                 onClick={buttonHandler}
//                 className="bg-blue-600 text-white text-lg px-3 py-2 rounded hover:bg-blue-700 flex justify-center items-center"
//               >
//                 {!isLoading && <span>Login</span>}
//                 {isLoading && (
//                   <Oval
//                     height={30}
//                     width={30}
//                     color="#ffffff"
//                     wrapperStyle={{}}
//                     wrapperClass=""
//                     visible={true}
//                     ariaLabel="oval-loading"
//                     secondaryColor="#ffffff"
//                     strokeWidth={10}
//                     strokeWidthSecondary={10}
//                   />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default Login;

import React from "react";

const signup = () => {
  return <div>signup</div>;
};

export default signup;
