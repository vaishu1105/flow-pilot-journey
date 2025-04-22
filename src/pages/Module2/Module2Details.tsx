
import React from "react";
import { SidebarModule2 } from "@/components/module2/SidebarModule2";
import { useNavigate, useParams } from "react-router-dom";

const ORDERS = [
  { id: "M2-01", product: "Purple Brinjal", qty: 200, status: "Pending", date: "2024-04-05", details: "Fresh stock, local farmer." },
  { id: "M2-02", product: "Yellow Corn", qty: 1000, status: "Shipped", date: "2024-04-03", details: "Premium yellow corn delivered." },
];

export default function Module2Details() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const order = ORDERS.find(o => o.id === id) || ORDERS[0];
  return (
    <div className="flex min-h-screen bg-[#F8F8FD]">
      <SidebarModule2 />
      <main className="flex-1 p-8">
        <button
          className="mb-6 text-[#6E59A5] underline flex items-center gap-2 hover:opacity-70"
          onClick={() => navigate(-1)}
        >
          <span className="text-base">&#8592;</span> Back
        </button>
        <h1 className="text-2xl font-bold text-[#6E59A5] mb-8 font-sans">Order Details</h1>
        <div className="bg-white rounded-xl shadow p-7 max-w-lg">
          <div className="mb-6">
            <div className="font-bold text-[#6E59A5]">Order ID: <span className="font-normal text-black">{order.id}</span></div>
            <div className="mt-2">Product: <span className="font-semibold">{order.product}</span></div>
            <div className="mt-1">Quantity: <span className="font-semibold">{order.qty} kg</span></div>
            <div className="mt-1">Status: 
              <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold
                ${order.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                {order.status}
              </span>
            </div>
            <div className="mt-1">Placed on: <span className="font-semibold">{order.date}</span></div>
          </div>
          <div>
            <div className="font-bold text-[#6E59A5] mb-2">Details</div>
            <div className="text-gray-700 bg-purple-50 rounded p-4">{order.details}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
