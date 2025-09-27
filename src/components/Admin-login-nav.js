import React, { useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AdminN = () => {
  const router = useRouter();

  return (
    <nav
      className="flex flex-row bg-gray-200 items-center justify-between py-1
	 px-5  fixed top-0 w-full z-50"
    >
      <div className=" text-lg flex items-center space-x-2">
        <img src="/logo-new.jpg" alt="" className="w-10" />
        <div>
          <Link href={"/control-panel-41A3xB/login"}>Admin Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminN;
