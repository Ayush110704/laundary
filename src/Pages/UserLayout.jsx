import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaCrown,
  FaRoute,
  FaFileContract,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";

const UserLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [newOrdersCount, setNewOrdersCount] = useState(3);

  // --- NAVIGATION CONFIGURATION ---
  const NAVIGATION_ITEMS = [
    {
      id: "profile",
      name: "Profile",
      description: "Account identity and security keys",
      icon: <FaUser />,
      path: "/user/profile",
    },
    {
      id: "orders",
      name: "My Orders",
      description: "Live tracking and transaction history",
      icon: <FaBoxOpen />,
      path: "/user/orders",
    },
    {
      id: "address",
      name: "Saved Address",
      description: "Geographic routing points",
      icon: <FaMapMarkerAlt />,
      path: "/user/address",
    },
    {
      id: "subscription",
      name: "Subscription",
      description: "Tier variables and access caps",
      icon: <FaCrown />,
      path: "/user/subscription",
    },
    {
      id: "tracking",
      name: "Progress Tracking",
      description: "Real-time pipeline telemetry",
      icon: <FaRoute />,
      path: "/user/tracking",
    },
    {
      id: "terms",
      name: "Terms & Conditions",
      description: "Legal framework parameters",
      icon: <FaFileContract />,
      path: "/user/terms",
    },
  ];

  const activeItem = NAVIGATION_ITEMS.find((item) => item.path === location.pathname) || NAVIGATION_ITEMS[0];

  const handleNavigation = (path, id) => {
    navigate(path);
    setMobileMenuOpen(false);
    if (id === "orders") {
      setNewOrdersCount(0);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Navbar is now rendered by App.jsx */}
      {/* So we just need the main content with sidebar */}
      
      <div className="flex flex-1 pt-20 font-sans antialiased text-slate-900 select-none">
        {/* MOBILE INTERFACE HEADER */}
        <div className="lg:hidden w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 flex items-center justify-between fixed top-20 left-0 right-0 z-40 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-base shadow-sm shadow-indigo-600/20">
              L
            </div>
            <span className="font-black tracking-tight text-slate-900 text-lg">LuxeClean</span>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="p-2.5 text-slate-600 bg-slate-50 border border-slate-200/60 rounded-xl hover:bg-slate-100 active:scale-95 transition-all"
          >
            <FaBars className="text-base" />
          </button>
        </div>

        {/* MOBILE INTERFACE DRAWER LAYER */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-950/30 backdrop-blur-xs z-50 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                className="fixed top-0 bottom-0 left-0 w-80 bg-white z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden"
              >
                <div className="space-y-8">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-sm">
                        L
                      </div>
                      <span className="font-black tracking-tight text-slate-900">Workspace</span>
                    </div>
                    <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl">
                      <FaTimes className="text-base" />
                    </button>
                  </div>
                  <nav className="space-y-1.5">
                    {NAVIGATION_ITEMS.map((item) => {
                      const isSelected = isActive(item.path);
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavigation(item.path, item.id)}
                          className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${
                            isSelected ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15" : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <span className={isSelected ? "text-white" : "text-slate-400"}>{item.icon}</span>
                            {item.name}
                          </div>
                          {item.id === "orders" && newOrdersCount > 0 && (
                            <span className="w-5 h-5 bg-rose-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                              {newOrdersCount}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => { setMobileMenuOpen(false); setShowLogoutModal(true); }}
                    className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-rose-600 hover:bg-rose-50 transition-all font-bold text-sm"
                  >
                    <FaSignOutAlt /> Terminate Session
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* DESKTOP SIDEBAR PIPELINE */}
        <aside className="hidden lg:flex flex-col justify-between w-[290px] bg-white border-r border-slate-200/60 h-[calc(100vh-80px)] sticky top-20 shrink-0 z-30">
          <div className="p-6">
            <div className="flex items-center gap-3 px-2 mb-8">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-base shadow-sm shadow-indigo-600/20">
                L
              </div>
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                LuxeClean
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-3 block">
              Customer Workspace
            </span>
            <nav className="space-y-1">
              {NAVIGATION_ITEMS.map((item) => {
                const isSelected = isActive(item.path);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path, item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all relative group ${
                      isSelected ? "text-white" : "text-slate-600 hover:bg-slate-50/80 hover:text-slate-900"
                    }`}
                  >
                    {isSelected && (
                      <motion.div 
                        layoutId="activeDesktopNav"
                        className="absolute inset-0 bg-indigo-600 rounded-xl shadow-md shadow-indigo-600/10 z-0"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    
                    <div className="flex items-center gap-3.5 z-10">
                      <span className={`text-base transition-colors duration-200 ${isSelected ? "text-white" : "text-slate-400 group-hover:text-indigo-600"}`}>
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </div>

                    {item.id === "orders" && newOrdersCount > 0 && (
                      <span className={`z-10 w-5 h-5 font-bold text-[10px] rounded-full flex items-center justify-center transition-colors shadow-xs ${
                        isSelected ? "bg-white text-indigo-600" : "bg-rose-500 text-white animate-pulse"
                      }`}>
                        {newOrdersCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <button 
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all font-bold text-sm group"
            >
              <FaSignOutAlt className="text-slate-400 transition-colors group-hover:text-rose-500" /> Logout
            </button>
          </div>
        </aside>

        {/* DYNAMIC COMPONENT CANVAS OVERVIEW WITH OUTLET */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-6xl w-full mx-auto overflow-hidden flex flex-col gap-4">
          {/* Breadcrumb Module */}
          <div className="text-[11px] font-bold text-slate-400 flex items-center gap-2 px-1">
            <span className="hover:text-slate-600 cursor-pointer transition">Workspace</span>
            <FaChevronRight className="text-[8px]" />
            <span className="text-indigo-600 capitalize">{activeItem?.name}</span>
          </div>

          {/* Clean White Workspace Canvas */}
          <div className="flex-1 min-h-[520px] lg:min-h-[calc(100vh-210px)] bg-white border border-slate-200/70 rounded-2xl shadow-xs p-6 sm:p-10 flex flex-col relative overflow-hidden group/canvas">
            {/* Subtle Modern Decorative Grid Background Layer */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="w-full h-full flex-1 flex flex-col z-10"
              >
                {/* OUTLET - This renders the child route components */}
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Footer is now rendered by App.jsx */}
      {/* So we don't need Footer here */}

      {/* CONFIRMATION LOGOUT MODAL MODULE */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
              onClick={() => setShowLogoutModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}
              className="bg-white rounded-2xl max-w-sm w-full p-6 relative z-10 shadow-xl border border-slate-100"
            >
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Confirm Sign Out</h3>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Are you sure you want to terminate your current cleaning dashboard session?
              </p>
              <div className="flex items-center justify-end gap-3 mt-6">
                <button 
                  onClick={() => setShowLogoutModal(false)} 
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleLogout} 
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition shadow-xs"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserLayout;