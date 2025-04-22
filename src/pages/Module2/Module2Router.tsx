
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Module2Dashboard from "./Module2Dashboard";
import Module2Details from "./Module2Details";
import Module2List from "./Module2List";

// Main entry for the module, with routes.
export default function Module2Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Module2Dashboard />} />
      <Route path="list" element={<Module2List />} />
      <Route path="details/:id" element={<Module2Details />} />
    </Routes>
  );
}
