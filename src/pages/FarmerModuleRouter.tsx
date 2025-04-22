
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import FarmerRequests from "./FarmerRequests";
import FarmerRequestDetails from "./FarmerRequestDetails";

// Module entry with its own routing
export default function FarmerModuleRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="requests" replace />} />
      <Route path="requests" element={<FarmerRequests />} />
      <Route path="requests/:id" element={<FarmerRequestDetails />} />
    </Routes>
  );
}
