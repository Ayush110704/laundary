import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  Menu, 
  X, 
  Sparkles, 
  User, 
  HelpCircle, 
  ShieldCheck 
} from "lucide-react";

const UserLayout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock Notifications for matching UI
  const alerts = [
    { id: 1, text: "Your order ORD-8394-02 is now in progress.", time: "5m ago" },
    { id: 2, text: "Rider assigned for tomorrow's pickup.", time: "1h ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100/60 to-blue-50/30 font-sans antialiased text-slate-600">
      
      {/* 1. TOP NAVIGATION BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(15,23,42,0.03)]">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-4 sm:px-6">
          
          {/* Branding Logo */}
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 text-white shadow-md shadow-blue-200/50">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-800 sm:text-2xl">
                Laundro<span className="bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">Craft</span>
              </span>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 active:scale-95"
              >
                <Bell size={20} />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl ring-1 ring-black/5"
                  >
                    <h4 className="mb-3 font-bold text-slate-800">Recent Alerts</h4>
                    <div className="space-y-2">
                      {alerts.map((alert) => (
                        <div key={alert.id} className="rounded-xl bg-slate-50 p-3 text-xs border border-slate-100">
                          <p className="font-medium text-slate-700">{alert.text}</p>
                          <span className="mt-1 block font-semibold text-slate-400">{alert.time}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Profile Pill */}
            <div className="hidden items-center gap-2.5 rounded-2xl border border-slate-200 bg-white/80 p-1.5 pr-4 sm:flex">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 text-slate-600 font-bold text-sm">
                AJ
              </div>
              <span className="text-sm font-bold text-slate-700">Alex Johnson</span>
            </div>

            {/* Mobile Menu Trigger (Optional if sidebar collapses) */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 xl:hidden"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. DYNAMIC CONTENT INJECTOR */}
      {/* (Dashboard components are automatically matched here via children) */}
      <div className="relative min-h-screen">
        {children}
      </div>

      {/* 3. FOOTER COMPONENT */}
      <footer className="border-t border-slate-200/60 bg-white px-4 py-6">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs font-medium text-slate-400">
          <p>© 2026 LaundroCraft Technologies. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <a href="#help" className="flex items-center gap-1 hover:text-slate-600 transition">
              <HelpCircle size={14} /> Support & Help
            </a>
            <a href="#privacy" className="flex items-center gap-1 hover:text-slate-600 transition">
              <ShieldCheck size={14} /> Privacy Protocol
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default UserLayout;