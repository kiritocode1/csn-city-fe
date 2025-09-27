"use client";

import React, { useEffect, useState } from "react";
import AdminN from "@/components/Admin-nav";
import AdminM from "@/components/Admin-menu";
import Link from "next/link";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [chatbotStats, setChatbotStats] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    total: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [animatedTotal, setAnimatedTotal] = useState(0);

  // Counter animation for total visits
  useEffect(() => {
    if (!isLoading && chatbotStats.total > 0) {
      const duration = 2000; // 2 seconds
      const increment = chatbotStats.total / (duration / 16); // 60fps
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= chatbotStats.total) {
          setAnimatedTotal(chatbotStats.total);
          clearInterval(timer);
        } else {
          setAnimatedTotal(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [chatbotStats.total, isLoading]);

  useEffect(() => {
    const fetchChatbotStats = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chatbot-visitor/statistics`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setChatbotStats(data.statistics);
        }
      } catch (error) {
        console.error('Error fetching chatbot statistics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatbotStats();
  }, []);

  return (
    <ProtectedAdminRoute>
      <main className="">
          <AdminN />

          <div className="flex flex-row">
            <AdminM />
            <div className="hidden lg:block w-1/5"></div>

            <div className="w-full lg:w-4/5 p-10">
              {/* Chatbot Statistics Section */}
              <div className="mb-8 mt-20">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">🤖 Chatbot Analytics</h2>
                    <p className="text-gray-600 mt-1">Track visitor engagement with our AI chatbot service</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Last updated: {new Date().toLocaleTimeString()}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-blue-600 text-sm font-semibold uppercase tracking-wide">Today</div>
                        <div className="text-3xl font-bold text-blue-800 mt-2">
                          {isLoading ? (
                            <div className="animate-pulse bg-blue-200 h-8 w-16 rounded"></div>
                          ) : (
                            chatbotStats.daily.toLocaleString()
                          )}
                        </div>
                        <div className="text-blue-600 text-xs mt-1">New Chatbot Visits</div>
                      </div>
                      <div className="text-blue-500 text-3xl">📅</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-green-600 text-sm font-semibold uppercase tracking-wide">This Week</div>
                        <div className="text-3xl font-bold text-green-800 mt-2">
                          {isLoading ? (
                            <div className="animate-pulse bg-green-200 h-8 w-16 rounded"></div>
                          ) : (
                            chatbotStats.weekly.toLocaleString()
                          )}
                        </div>
                        <div className="text-green-600 text-xs mt-1">Weekly Visits</div>
                      </div>
                      <div className="text-green-500 text-3xl">📊</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-purple-600 text-sm font-semibold uppercase tracking-wide">This Month</div>
                        <div className="text-3xl font-bold text-purple-800 mt-2">
                          {isLoading ? (
                            <div className="animate-pulse bg-purple-200 h-8 w-16 rounded"></div>
                          ) : (
                            chatbotStats.monthly.toLocaleString()
                          )}
                        </div>
                        <div className="text-purple-600 text-xs mt-1">Monthly Visits</div>
                      </div>
                      <div className="text-purple-500 text-3xl">📈</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-orange-600 text-sm font-semibold uppercase tracking-wide">Total Visits</div>
                        <div className="text-3xl font-bold text-orange-800 mt-2">
                          {isLoading ? (
                            <div className="animate-pulse bg-orange-200 h-8 w-20 rounded"></div>
                          ) : (
                            <span className="font-mono">{animatedTotal.toLocaleString()}</span>
                          )}
                        </div>
                        <div className="text-orange-600 text-xs mt-1">All Time Engagement</div>
                      </div>
                      <div className="text-orange-500 text-3xl">🏆</div>
                    </div>
                    {/* Highlight badge for total visits */}
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      HOT 🔥
                    </div>
                  </div>
                </div>

                {/* Additional Stats Row */}
                {/* {!isLoading && chatbotStats.baseCount && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                    <div className="text-sm text-gray-600">
                      📊 <strong>Analytics Breakdown:</strong> 
                      <span className="ml-2">Base Count: {chatbotStats.baseCount?.toLocaleString()}</span>
                      <span className="ml-4">New Tracked Visits: {chatbotStats.newVisits?.toLocaleString()}</span>
                    </div>
                  </div>
                )} */}
              </div>

              {/* Existing Dashboard Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-20 gap-16">
                <Link
                  href={"/control-panel-41A3xB/dashboard/police-station"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Police Stations</div>
                  </div>
                </Link>

                <Link
                  href={"/control-panel-41A3xB/dashboard/officers"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">
                      Police Station Officers
                    </div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/acp"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Divisional ACPs</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/sp-message"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">CP Message</div>
                  </div>
                </Link>

                <Link
                  href={"/control-panel-41A3xB/dashboard/headline"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Headlines</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/useful-web"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Useful Website</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/imp-contact"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">
                      Important Contacts
                    </div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/recruitment"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Recruitment</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/result"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Result</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/good-work"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Good Work</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/rti"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">RTI</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/rts"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">RTS</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/tender"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Tender</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/circular"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Circular</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/press"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Press Release</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/atrocity-cases"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Atrocity Cases</div>
                  </div>
                </Link>

                <Link
                  href={"/control-panel-41A3xB/dashboard/crime-statistics"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">
                      Crime Statistics
                    </div>
                  </div>
                </Link>

                <Link
                  href={"/control-panel-41A3xB/dashboard/info-for-police"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">
                      Information For Police Officers
                    </div>
                  </div>
                </Link>

                <Link
                  href={"/control-panel-41A3xB/dashboard/mob-voilence"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Mob Voilence</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/gradiation-list"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Gradiation List</div>
                  </div>
                </Link>

                <Link
                  href={"/control-panel-41A3xB/dashboard/license-info"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">License Info</div>
                  </div>
                </Link>

                <Link
                  href={"/control-panel-41A3xB/dashboard/traffic-notification"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">
                      Traffic Notifications
                    </div>
                  </div>
                </Link>

                <Link
                  href={"/control-panel-41A3xB/dashboard/preventive-order"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">
                      Preventive Order
                    </div>
                  </div>
                </Link>

                <Link
                  href={"/control-panel-41A3xB/dashboard/gallery"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Gallery</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/home-slider"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Home Slider</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/users"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Users</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/senior-officers"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Senior Officers</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/former-cp"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Former CPs</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/citizen-alertwall"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">
                      Citizen Alertwall
                    </div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/cyber-alertwall"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Cyber Alertwall</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/safety-tips"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Safety Tips</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/special-unit"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Special Unit</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/special-unit-officers"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">
                      Special Unit Officers
                    </div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/division"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Division</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/zone"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Zone</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/region"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Region</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/year"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Year</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/dcp-visit"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">DCP Visit</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/wellfare-activities"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">
                      Wellfare Activities
                    </div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/initiatives"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Initiatives</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/accident-compensation"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">
                      Accident Compensation
                    </div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/media-coverage"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Media Coverage</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/online-complaint"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">
                      Online Complaint
                    </div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/feedback"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">
                      Feedback/Inform Us
                    </div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/lost-found"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Lost and Found</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/tenant-info"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Tenant Info</div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/industry-complaint"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">
                      Industry Complaint
                    </div>
                  </div>
                </Link>
                <Link
                  href={"/control-panel-41A3xB/dashboard/medal-winner"}
                  className="hover:scale-105  transition ease-in-out duration-300"
                >
                  <div className=" border bg-yellow-100 hover:bg-yellow-200 p-5 rounded flex flex-col justify-center items-center space-y-1">
                    <div className="font-semibold text-lg">Medal Winner</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>
    </ProtectedAdminRoute>
  );
};

export default Dashboard;
