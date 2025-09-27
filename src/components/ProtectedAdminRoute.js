// components/ProtectedAdminRoute.js
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedAdminRoute = ({ children }) => {
  const [isloading, setisloading] = useState(true);
  const router = useRouter();

  const submitenquiry = async (token) => {
    const body = {
      token: token,
      deviceInfo: {
        userAgent: window.navigator.userAgent,
        platform: window.navigator.platform,
        language: window.navigator.language
      }
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/verify-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (data.verified === false || data.sessionExpired === true) {
        if (data.sessionExpired) {
          toast.warn("Your session has expired due to login from another device", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        Cookies.remove("token", { path: "/control-panel-41A3xB" });
        router.push("/control-panel-41A3xB/login");
        return false;
      } else {
        setisloading(false);
        return true;
      }
    } catch (error) {
      router.push("/control-panel-41A3xB/login");
      return false;
    }
  };

  useEffect(() => {
    // Check if the user has a valid token
    const token = Cookies.get("token");

    if (!token) {
      router.push("/control-panel-41A3xB/login");
      return;
    }

    // Initial verification
    submitenquiry(token);

    // Set up periodic verification every 30 seconds
    const intervalId = setInterval(async () => {
      const currentToken = Cookies.get("token");
      if (!currentToken) {
        clearInterval(intervalId);
        return;
      }
      
      const isValid = await submitenquiry(currentToken);
      if (!isValid) {
        clearInterval(intervalId);
      }
    }, 3000); // Check every 3 seconds

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <ToastContainer autoClose={2000} />
      {isloading ? (
        <div className="flex justify-center items-center h-screen">
          <Oval
            color="#CA8A04"
            secondaryColor="#CA8A04"
            height={50}
            width={50}
          />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default ProtectedAdminRoute;
