import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaBoxOpen,
  FaTruck,
  FaMapMarkerAlt,
  FaUserCircle,
  FaBell,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaChevronDown,
  FaCircle,
  FaUser
} from "react-icons/fa";
import Navbar from "../components/Navbar"; 

const UserLayout = ({ children, currentView, onViewChange, userProfile, alerts }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Layout navigation item configuration with custom active tracking badges
  const navigationMenus = [
    { name: "Dashboard", icon: <FaHome />, id: "dashboard", badge: { type: "dot", value: true, color: "bg-emerald-500" } },
    { name: "My Orders", icon: <FaBoxOpen />, id: "orders", badge: { type: "count", value: "14", color: "bg-slate-100 text-slate-700" } },
    { name: "Live Tracking", icon: <FaTruck />, id: "tracking", badge: { type: "count", value: "3 Active", color: "bg-indigo-50 text-indigo-700 font-extrabold text-[9px] animate-pulse border border-indigo-100" } },
    { name: "Manage Addresses", icon: <FaMapMarkerAlt />, id: "address", badge: null },
    { name: "My Profile", icon: <FaUserCircle />, id: "profile", badge: null },
  ];

  const renderBadge = (badge) => {
    if (!badge) return null;
    if (badge.type === "dot") {
      return <span className={`w-2 h-2 rounded-full ${badge.color}`} />;
    }
    return (
      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${badge.color}`}>
        {badge.value}
      </span>
    );
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans antialiased text-slate-900 flex flex-col">
      
      {/* GLOBAL FIXED NAVBAR */}
      <div className="w-full fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200/80 shadow-sm">
        <Navbar />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row pt-[72px] relative min-h-screen">
        
        {/* MOBILE LAYOUT SUB-HEADER BAR */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-[72px] z-40 shadow-sm w-full">
          <span className="font-bold text-xs tracking-wider text-slate-400 uppercase">Workspace Menu</span>
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-slate-600 bg-slate-50 border rounded-xl hover:bg-slate-100 transition"
          >
            <FaBars className="text-sm" />
          </button>
        </div>

        {/* MOBILE DRAWERS */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-950/30 backdrop-blur-sm z-50 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                className="fixed top-0 bottom-0 left-0 w-72 bg-white z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <span className="font-extrabold text-base text-slate-900 tracking-tight">Main Navigation</span>
                    <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
                      <FaTimes className="text-base" />
                    </button>
                  </div>
                  <nav className="space-y-2">
                    {navigationMenus.map((item) => {
                      const isSelected = currentView === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            onViewChange(item.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${
                            isSelected ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10" : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            {item.icon} {item.name}
                          </div>
                          {renderBadge(item.badge)}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:flex flex-col justify-between w-[270px] bg-white border-r border-slate-200/80 min-h-[calc(100vh-72px)] sticky top-[72px] shrink-0 select-none z-30">
          <div className="p-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4 block">Navigation</span>
            <nav className="space-y-2">
              {navigationMenus.map((item) => {
                const isSelected = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-bold text-sm transition-all group ${
                      isSelected ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10" : "text-slate-600 hover:bg-slate-50/80 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className={`text-base ${isSelected ? "text-white" : "text-slate-400 group-hover:text-indigo-600 transition-colors"}`}>{item.icon}</span>
                      {item.name}
                    </div>
                    {renderBadge(item.badge)}
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="p-4 border-t border-slate-100">
            <button className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all font-bold text-sm">
              <FaSignOutAlt className="text-base text-slate-400" /> Sign Out Session
            </button>
          </div>
        </aside>

        {/* CONTENT UTILITY ROUTER CONTAINER */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc]">
          <div className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200/80 sticky top-[72px] z-20">
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight capitalize">
                {currentView === 'orders' ? 'Order Management Matrix' : `${currentView} View`}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              
              {/* NOTIFICATION CENTER */}
              <div className="relative">
                <button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/60 hover:bg-slate-100/80 transition flex items-center justify-center text-slate-600 focus:outline-none"
                >
                  <FaBell className="text-xs" />
                  {alerts.length > 0 && <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-indigo-600 ring-2 ring-white" />}
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-96 bg-white border border-slate-200/80 shadow-xl rounded-2xl py-1 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/60">
                        <span className="text-xs font-black text-slate-800">System Telemetry Log</span>
                        <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{alerts.length} Pending</span>
                      </div>
                      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                        {alerts.map((msg) => (
                          <div key={msg.id} className="p-3.5 hover:bg-slate-50/80 transition-colors flex gap-3 items-start">
                            <FaCircle className="text-indigo-600 text-[6px] mt-1.5 shrink-0" />
                            <div>
                              <p className="text-xs font-bold text-slate-700 leading-relaxed">{msg.text}</p>
                              <span className="text-[10px] text-slate-400 font-medium block mt-1">{msg.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* PROFILE DROPDOWN */}
              <div className="relative pl-3 border-l border-slate-200">
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-50 transition text-left focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">
                    <FaUser />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs font-black text-slate-800 leading-none">{userProfile.name}</p>
                    <p className="text-[9px] font-bold text-indigo-600 uppercase tracking-wider mt-0.5">{userProfile.tier}</p>
                  </div>
                  <FaChevronDown className="text-slate-400 text-[10px] ml-1" />
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 shadow-xl rounded-xl py-1 z-50"
                    >
                      <button onClick={() => { onViewChange("profile"); setProfileDropdownOpen(false); }} className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center gap-2">
                        <FaUserCircle className="text-slate-400" /> Account Settings
                      </button>
                      <div className="border-t border-slate-100 my-1" />
                      <button className="w-full text-left px-4 py-2.5 text-xs font-black text-rose-600 hover:bg-rose-50 transition flex items-center gap-2">
                        <FaSignOutAlt className="text-rose-400" /> End Session
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* MAIN CANVAS WRAPPER - Added pt-8 / space-y-8 to safely move contents slightly down */}
          <main className="px-4 md:px-8 pt-8 pb-12 max-w-7xl w-full mx-auto flex-1 space-y-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;