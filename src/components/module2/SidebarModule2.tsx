
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/module2/dashboard" },
  { label: "Orders", path: "/module2/list" },
];

export const SidebarModule2: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <aside className="bg-[#6E59A5] flex flex-col w-[240px] min-h-screen py-7 px-5">
      {/* Logo */}
      <div className="flex items-center mb-10 select-none">
        <div className="bg-[#D6BCFA] w-10 h-10 rounded-lg flex items-center justify-center font-bold text-[#6E59A5] text-xl">M2</div>
        <span className="ml-3 text-white font-bold text-2xl">Module 2</span>
      </div>
      {/* Nav */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.path}>
              <button
                className={`
                  flex items-center w-full px-3 py-2 rounded-lg text-white transition-all font-semibold
                  ${location.pathname.startsWith(item.path)
                    ? "bg-white/20 shadow border border-white/20"
                    : "hover:bg-white/10 opacity-80"}
                `}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {/* User/footer */}
      <div className="mt-12 text-white/80 text-xs">
        <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2"></span>
        Online
        <div className="mt-2">Module2 User<br /><span className="opacity-70">Admin</span></div>
      </div>
    </aside>
  );
}
