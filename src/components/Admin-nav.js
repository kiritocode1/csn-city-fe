import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AdminN = () => {
  const router = useRouter();

  //   const logoutHandler = () => {
  //     Cookies.remove("token", { path: "/control-panel-41A3xB" });

  //     router.push("/control-panel-41A3xB/login");
  //   };

  const logoutHandler = async () => {
    const token = Cookies.get("token"); // Get the token from cookies
    if (!token) {
      // If there's no token, you can log the user out and redirect
      router.push("/control-panel-41A3xB/login");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-logout`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ token }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Remove the token from cookies if logout is successful
        Cookies.remove("token", { path: "/control-panel-41A3xB" });

        // Redirect the user to the login page
        router.push("/control-panel-41A3xB/login");
      } else {
        console.error("Logout failed:", data.message);
        // Handle logout failure (e.g., show an error message to the user)
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Handle network or other errors
    }
  };

  useEffect(() => {
    // Setup inactivity logout
    let timeout;

    function resetTimer() {
      clearTimeout(timeout);
      timeout = setTimeout(logout, 5 * 60 * 1000); // 5 minutes
    }

    function logout() {
      Cookies.remove("token", { path: "/control-panel-41A3xB" });
      alert("You have been logged out due to inactivity.");
      router.push("/control-panel-41A3xB/login");
    }

    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
    document.onclick = resetTimer;
    document.onscroll = resetTimer;
    document.onkeydown = resetTimer;

    return () => {
      clearTimeout(timeout);
      window.onload = null;
      document.onmousemove = null;
      document.onkeypress = null;
      document.onclick = null;
      document.onscroll = null;
      document.onkeydown = null;
    };
  }, [router]);

  return (
    <nav className="flex flex-row bg-gray-200 items-center justify-between py-3 px-5  fixed top-0 w-full z-50">
      <div className=" text-lg flex items-center space-x-2">
        <img src="/logo-new.jpg" alt="" className="w-10" />
        <div>
          <Link href={"/control-panel-41A3xB/dashboard"}> Admin Dashboard</Link>
        </div>
      </div>

      <div className=" text-base flex items-center space-x-2">
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </nav>
  );
};

export default AdminN;