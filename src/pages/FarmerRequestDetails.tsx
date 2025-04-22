
import React from "react";
import { SidebarFarmer } from "@/components/farmer/SidebarFarmer";
import { ArrowLeft, MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const REQUESTS = [
  {
    id: "REQ-2024-001",
    product: "Organic Tomatoes",
    qty: 100,
    location: "Mumbai",
    deadline: "2024-01-25",
    buyerName: "Sarah Kumar",
    buyerRating: 4.8,
    buyerOrders: 100,
    postedAgo: "5 min ago",
    notes: "Need fresh, ripe tomatoes for restaurant use. Prefer locally grown produce. Quality is our top priority as these will be used in our signature dishes. Looking for consistent supply if quality meets our standards.",
  }
];

export default function FarmerRequestDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const req = REQUESTS.find(r => r.id === id) || REQUESTS[0];

  return (
    <div className="flex min-h-screen bg-green-100">
      <SidebarFarmer />
      <main className="flex-1 p-0">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow px-8 py-3">
          <button
            className="flex items-center text-green-700 hover:text-green-900 text-sm"
            onClick={() => navigate("/farmer/requests")}
          >
            <ArrowLeft className="mr-2" /> Back to Requests
          </button>
          <span className="text-gray-400 text-xs">{req.postedAgo ? `•  Posted ${req.postedAgo}` : ""}</span>
        </header>
        <div className="bg-gradient-to-br from-[#C6F8C5] to-[#D2F7D3] p-8 min-h-[calc(100vh-64px)]">
          <section className="bg-white rounded-lg shadow p-8 max-w-3xl mx-auto">
            <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
              <h2 className="font-bold text-2xl text-[#1A6133] mb-2 md:mb-0">Request Details</h2>
              {/* Empty for spacing / could add status or more info here */}
            </div>
            {/* Main details row */}
            <div className="grid md:grid-cols-2 gap-x-8 mb-8">
              <div>
                <div className="mb-4 flex flex-col gap-0.5 text-gray-700 text-sm">
                  <div><span className="font-medium">Product: </span>{req.product}</div>
                  <div><span className="font-medium">Quantity: </span>{req.qty} kg</div>
                  <div><span className="font-medium">Request ID: </span>#{req.id}</div>
                  <div><span className="font-medium">Delivery Deadline: </span>{new Date(req.deadline).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</div>
                </div>
                <div className="mt-6">
                  <div className="font-medium text-gray-800 mb-2">Buyer Details</div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center font-semibold text-green-900 mr-3">
                      <span>{req.buyerName.split(' ').map(part=>part[0]).join('')}</span>
                    </div>
                    <div>
                      <div className="text-gray-800 font-semibold">{req.buyerName}</div>
                      <div className="flex items-center text-xs text-gray-500 gap-2 mt-0.5">
                        <span>★ {req.buyerRating}</span> 
                        <span>• {req.buyerOrders}+ orders</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Deadline and location */}
              <div>
                <div className="font-medium text-gray-800 mb-2">Delivery Location</div>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-5 h-5 mr-2" /> {req.location}
                </div>
                <div className="h-32 rounded-md bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 text-sm">Map View</div>
              </div>
            </div>
            {/* Notes */}
            <div className="mb-4">
              <div className="font-medium text-gray-800 mb-1">Additional Notes</div>
              <div className="bg-gray-50 text-gray-700 rounded-md p-4 text-sm">{req.notes}</div>
            </div>
            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button className="flex-1 bg-green-600 hover:bg-green-700 transition text-white rounded-md px-8 py-3 font-bold text-base shadow">
                Accept Request
              </button>
              <button className="flex-1 bg-white border border-green-300 text-green-700 hover:bg-green-50 rounded-md px-8 py-3 font-bold text-base shadow focus:outline-none">
                Ignore Request
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
