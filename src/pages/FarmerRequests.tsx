
import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { SidebarFarmer } from "@/components/farmer/SidebarFarmer";
import { useNavigate } from "react-router-dom";

const REQUESTS = [
  {
    id: "REQ-2024-001",
    product: "Organic Tomatoes",
    qty: 100,
    location: "Mumbai",
    deadline: "2024-01-15",
    distanceKm: 5,
    notes: "Need fresh, ripe tomatoes for restaurant use. Prefer locally grown produce."
  },
  {
    id: "REQ-2024-002",
    product: "Premium Rice",
    qty: 500,
    location: "Thane",
    deadline: "2024-01-18",
    distanceKm: 8,
    notes: ""
  },
  {
    id: "REQ-2024-003",
    product: "Fresh Carrots",
    qty: 200,
    location: "Pune",
    deadline: "2024-01-20",
    distanceKm: 12,
    notes: ""
  },
];

export default function FarmerRequests() {
  const [tab, setTab] = useState<"nearby" | "accepted">("nearby");
  const navigate = useNavigate();

  const shown = tab === "nearby" ? REQUESTS : [];

  return (
    <div className="flex min-h-screen bg-green-100">
      <SidebarFarmer />
      <main className="flex-1 p-0">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow px-8 py-3">
          <div className="flex items-center">
            <button className="text-2xl mr-4 lg:hidden">&#9776;</button>
            <span className="font-semibold text-xl text-[#267043]">Farm Requests</span>
          </div>
          <button className="relative">
            <span className="sr-only">Notifications</span>
            {/* Bell icon from lucide */}
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="absolute -top-1 -right-2 w-2 h-2 bg-green-500 rounded-full"></span>
          </button>
        </header>
        {/* Tabs */}
        <div className="bg-gradient-to-br from-[#C6F8C5] to-[#D2F7D3] py-6 px-8 min-h-[calc(100vh-64px)]">
          <div className="flex mb-6 space-x-3">
            <button
              className={`px-5 py-2 rounded-full text-sm font-medium focus:outline-none
                ${tab === "nearby" ? "bg-green-600 text-white shadow" : "bg-white text-green-600 border border-green-400"}`}
              onClick={() => setTab("nearby")}
              data-testid="tab-nearby"
            >
              Nearby Requests
            </button>
            <button
              className={`px-5 py-2 rounded-full text-sm font-medium focus:outline-none
                ${tab === "accepted" ? "bg-green-600 text-white shadow" : "bg-white text-green-600 border border-green-400"}`}
              onClick={() => setTab("accepted")}
              data-testid="tab-accepted"
            >
              My Accepted Requests
            </button>
          </div>
          <div className="space-y-6">
            {shown.length ? (
              shown.map(req => (
                <div key={req.id} className="bg-white rounded-lg shadow p-5 flex items-center justify-between border border-green-200 hover:shadow-lg transition">
                  <div>
                    <h2 className="font-bold text-lg text-[#1A6133] mb-1">{req.product}</h2>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      {req.qty} kg
                    </div>
                    <div className="flex items-center text-gray-500 mb-1">
                      <MapPin className="w-4 h-4 mr-1" /> {req.location}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3M16 7V3M4 11h16M5 19h14M10 15h4"/>
                      </svg>
                      <span>
                        Deadline: {new Date(req.deadline).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="mb-2 bg-green-50 px-3 py-1 text-green-800 rounded-full text-xs font-semibold shadow-sm">{req.distanceKm} km</span>
                    <button
                      className="bg-green-600 hover:bg-green-700 transition text-white rounded-lg px-7 py-2 font-bold text-sm shadow mt-auto"
                      onClick={() => navigate(`/farmer/requests/${req.id}`)}
                    >
                      Accept Request
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-12">No requests in this tab.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
