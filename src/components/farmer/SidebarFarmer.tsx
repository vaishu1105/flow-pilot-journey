
import { NavLink } from "react-router-dom";
import { List, MapPin, Bell, LayoutDashboard } from "lucide-react";
import React from "react";

const navItems = [
  { icon: <LayoutDashboard />, label: "Dashboard" },
  { icon: <List />, label: "Disease Detection" },
  { icon: <List />, label: "Market & Sales" },
  { icon: <List />, label: "Supply Chain" },
  { icon: <List />, label: "Expert Connect" },
  { icon: <List />, label: "Farm Requests", active: true, path: "/farmer/requests" },
  { icon: <List />, label: "Investments & Loans" },
];

export const SidebarFarmer: React.FC = () => (
  <aside className="bg-[#1F9A46] flex flex-col w-[260px] min-h-screen py-5 px-4">
    {/* Logo */}
    <div className="flex items-center mb-8">
      <img src="/lovable-uploads/eb6b4fa4-f69a-4a8d-afcd-b0e640898b1e.png" alt="logo" className="w-9 h-9 rounded-md bg-white" />
      <span className="ml-3 text-white font-bold text-2xl">AgriTech</span>
    </div>
    {/* User */}
    <div className="bg-[#2BA04A]/50 rounded-lg py-4 px-3 flex flex-col mb-10 text-white">
      <span className="text-sm opacity-70">Welcome back,</span>
      <span className="text-lg font-semibold">John Doe</span>
    </div>
    {/* Nav */}
    <nav className="flex-1">
      <ul className="space-y-2">
        {navItems.map((item, idx) => (
          <li key={idx}>
            {item.path ? (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg text-white transition 
                  ${isActive || item.active ? "bg-[#178C3A]/80 font-semibold shadow" : "hover:bg-[#178C3A]/60"}`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </NavLink>
            ) : (
              <span className="flex items-center px-3 py-2 rounded-lg text-white opacity-70">
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
    {/* Footer */}
    <div className="mt-10 text-xs text-green-100/80">
      <span className="inline-block w-2 h-2 rounded-full bg-green-300 mr-2"></span>
      Online
      <div className="mt-2 text-green-100/80">John Doe<br /><span className="opacity-60 text-xs">Farmer</span></div>
    </div>
  </aside>
);
