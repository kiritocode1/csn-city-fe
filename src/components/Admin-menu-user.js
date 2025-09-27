import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const AdminM = (props) => {
  const router = useRouter();
  const [psId, setPsId] = useState("");

  useEffect(() => {
    // Check if the user has a valid token
    const token = Cookies.get("psId");

    setPsId(token);

    if (!token) {
      router.push("/control-panel-41A3xB/login");
    }
  }, []);
  return (
    <div className="w-1/5 bg-gray-300 hidden lg:flex flex-col space-y-5 h-screen fixed py-20 pl-5 overflow-y-scroll">
      <div>
        <Link
          href={`/control-panel-41A3xB/police-station/police-station/${psId}`}
          className="hover:text-yellow-500"
        >
          Police Station
        </Link>
      </div>
      <div>
        <Link
          href={`/control-panel-41A3xB/police-station/officers/${psId}`}
          className="hover:text-yellow-500"
        >
          Police Station Officer
        </Link>
      </div>
      <div>
        <Link
          href={`/control-panel-41A3xB/police-station/accident-compensation/${psId}`}
          className="hover:text-yellow-500"
        >
          Accident Compensation
        </Link>
      </div>
      <div>
        <Link
          href={`/control-panel-41A3xB/police-station/online-complaint/${psId}`}
          className="hover:text-yellow-500"
        >
          Online Complaint
        </Link>
      </div>
      <div>
        <Link
          href={`/control-panel-41A3xB/police-station/lost-found/${psId}`}
          className="hover:text-yellow-500"
        >
          Lost and Found
        </Link>
      </div>
      <div>
        <Link
          href={`/control-panel-41A3xB/police-station/feedback/${psId}`}
          className="hover:text-yellow-500"
        >
          Feedback / Confidential info
        </Link>
      </div>
      <div>
        <Link
          href={`/control-panel-41A3xB/police-station/tenant-info/${psId}`}
          className="hover:text-yellow-500"
        >
          Tenant Info
        </Link>
      </div>
      
      <div>
        <Link
          href={`/control-panel-41A3xB/police-station/industry-complaint/${psId}`}
          className="hover:text-yellow-500"
        >
          Industry Complaint
        </Link>
      </div>
    </div>
  );
};

export default AdminM;
