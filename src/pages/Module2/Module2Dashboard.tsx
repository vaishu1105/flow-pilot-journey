
import React from "react";
import { SidebarModule2 } from "@/components/module2/SidebarModule2";

export default function Module2Dashboard() {
  // Example summary stats for the dashboard;
  // Replace with real data based on your requirements
  const stats = [
    { label: "Total Orders", value: 124, color: "bg-blue-100 text-blue-800" },
    { label: "Active Clients", value: 32, color: "bg-green-100 text-green-800" },
    { label: "Revenue", value: "₹88,000", color: "bg-purple-100 text-purple-800" },
  ];
  return (
    <div className="flex min-h-screen bg-[#F8F8FD]">
      <SidebarModule2 />
      <main className="flex-1 p-8">
        {/* Dashboard header */}
        <h1 className="text-2xl font-bold text-[#6E59A5] mb-8 font-sans">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {stats.map(s => (
            <div key={s.label} className={`rounded-lg p-5 shadow-sm ${s.color}`}>
              <div className="text-lg font-bold">{s.value}</div>
              <div className="text-xs font-medium mt-1 opacity-70">{s.label}</div>
            </div>
          ))}
        </div>
        {/* Visual area for quick analytics, placeholder for now */}
        <div className="rounded-xl bg-white p-7 shadow flex justify-center items-center min-h-[300px] text-gray-400 text-lg">
          <span>Analytics graph here…</span>
        </div>
      </main>
    </div>
  );
}
