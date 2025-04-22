
import React from "react";
import { SidebarModule2 } from "@/components/module2/SidebarModule2";
import { useNavigate } from "react-router-dom";

const DATA = [
  { id: "M2-01", product: "Purple Brinjal", qty: 200, status: "Pending", date: "2024-04-05" },
  { id: "M2-02", product: "Yellow Corn", qty: 1000, status: "Shipped", date: "2024-04-03" },
];

export default function Module2List() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-[#F8F8FD]">
      <SidebarModule2 />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-[#6E59A5] mb-8 font-sans">Orders List</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg bg-white shadow">
            <thead>
              <tr className="bg-[#E5DEFF]">
                <th className="px-3 py-2 text-left text-xs font-bold text-[#6E59A5]">Order ID</th>
                <th className="px-3 py-2 text-left text-xs font-bold text-[#6E59A5]">Product</th>
                <th className="px-3 py-2 text-left text-xs font-bold text-[#6E59A5]">Qty(kg)</th>
                <th className="px-3 py-2 text-left text-xs font-bold text-[#6E59A5]">Status</th>
                <th className="px-3 py-2 text-left text-xs font-bold text-[#6E59A5]">Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {DATA.map(row => (
                <tr key={row.id} className="border-b hover:bg-purple-50">
                  <td className="px-3 py-2">{row.id}</td>
                  <td className="px-3 py-2">{row.product}</td>
                  <td className="px-3 py-2">{row.qty}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold
                      ${row.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">{row.date}</td>
                  <td className="px-3 py-2">
                    <button
                      className="text-violet-700 hover:underline text-sm font-medium"
                      onClick={() => navigate(`/module2/details/${row.id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
