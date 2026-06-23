import React, { useState } from "react";
import {
  FaHome,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaTshirt,
  FaClipboardList,
  FaTruck,
  FaCheckCircle,
  FaPlus,
} from "react-icons/fa";

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Overview");

  const menuItems = [
    { label: "Overview", icon: <FaHome /> },
    { label: "My Orders", icon: <FaBoxOpen /> },
    { label: "Services", icon: <FaTshirt /> },
    { label: "Addresses", icon: <FaMapMarkerAlt /> },
    { label: "Payments", icon: <FaCreditCard /> },
    { label: "Subscriptions", icon: <FaClipboardList /> },
    { label: "Tracking", icon: <FaTruck /> },
    { label: "Settings", icon: <FaCog /> },
  ];

  const stats = [
    { title: "Total Orders", value: "48", sub: "2 orders this month" },
    {
      title: "Active Bookings",
      value: "02",
      sub: "Next delivery: Tomorrow, 2PM",
    },
    {
      title: "Loyalty Points",
      value: "2,450",
      sub: "550 points until next reward",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-58290",
      service: "Shirts + Suits + Press",
      date: "Est. Mar 24, 5:00 PM",
      status: "Active",
    },
    {
      id: "ORD-58291",
      service: "Bedding & Linen + Deep Clean",
      date: "Delivered Mar 20",
      status: "Completed",
    },
  ];

  const addresses = [
    {
      title: "Home Default",
      address: "123 Professional Way, Ste 402\nAustin, Texas, TX 10004",
    },
    {
      title: "Office",
      address: "88 Financial Plaza\nLower Manhattan, NY 10004",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex font-sans">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-[260px] bg-white border-r border-slate-200 shadow-sm flex-col justify-between">
        <div>
          <div className="px-8 py-7 border-b border-slate-100">
            <h1 className="text-2xl font-extrabold tracking-wide text-[#0d4ea6]">
              ATHENURA.
            </h1>
            <p className="text-sm text-slate-500 mt-1">Laundry Dashboard</p>
          </div>

          <nav className="px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                active={activeMenu === item.label}
                onClick={() => setActiveMenu(item.label)}
              />
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-500 transition">
            <FaSignOutAlt />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">
        {/* Topbar */}
        <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 md:px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">
              {activeMenu}
            </h2>
            <p className="text-sm text-slate-500">
              Welcome back to your laundry account
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50">
              <FaBell className="text-slate-600" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-blue-600" />
            </button>

            <div className="flex items-center gap-6 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
              <div>
                <p className="text-xs text-slate-500">First Name</p>
                <p className="text-sm font-semibold text-slate-800">Alex</p>
              </div>

              <div className="w-px h-10 bg-slate-200" />

              <div>
                <p className="text-xs text-slate-500">Last Name</p>
                <p className="text-sm font-semibold text-slate-800">Johnson</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-5 md:p-8">
          {/* Welcome Card */}
          <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0d4ea6]">
                Welcome back, Alex
              </h3>
              <p className="text-slate-500 mt-1">
                Member since Jan 2026 • Professional Plan
              </p>
            </div>

            <button className="bg-[#0d4ea6] text-white hover:bg-[#0b438d] font-semibold px-6 py-4 rounded-2xl shadow-md transition w-full sm:w-fit">
              Schedule Pickup
            </button>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">
            {stats.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
              >
                <p className="text-sm text-slate-500 mb-3">{item.title}</p>
                <h4 className="text-3xl font-bold text-slate-800">
                  {item.value}
                </h4>
                <p className="text-sm text-slate-400 mt-2">{item.sub}</p>
              </div>
            ))}
          </section>

          {/* Main Grid */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
            {/* Left */}
            <div className="xl:col-span-2 space-y-6">
              {/* Recent Orders */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-bold text-slate-800">
                    Recent Orders
                  </h3>
                  <button className="text-[#0d4ea6] text-sm font-semibold hover:underline">
                    View All
                  </button>
                </div>

                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-sm transition"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0d4ea6] flex items-center justify-center">
                          <FaBoxOpen />
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-800">
                            Order #{order.id}
                          </h4>
                          <p className="text-slate-500 text-sm mt-1">
                            {order.service}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-4">
                        <p className="text-sm text-slate-500">{order.date}</p>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Order Progress */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-8">
                  Active Order Progress
                </h3>

                <div className="relative">
                  <div className="absolute top-5 left-0 right-0 h-1 bg-slate-200 rounded-full">
                    <div className="w-[58%] h-1 bg-[#0d4ea6] rounded-full" />
                  </div>

                  <div className="relative grid grid-cols-4 gap-4 text-center">
                    <ProgressStep
                      icon={<FaClipboardList />}
                      label="Picked Up"
                      active={true}
                    />
                    <ProgressStep
                      icon={<FaTshirt />}
                      label="Washing"
                      active={true}
                    />
                    <ProgressStep
                      icon={<FaTruck />}
                      label="Out for Delivery"
                    />
                    <ProgressStep
                      icon={<FaCheckCircle />}
                      label="Delivered"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-6">
              {/* Addresses */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-bold text-slate-800">
                    Addresses
                  </h3>
                  <button className="text-[#0d4ea6]">
                    <FaPlus />
                  </button>
                </div>

                <div className="space-y-4">
                  {addresses.map((item) => (
                    <div
                      key={item.title}
                      className="border border-slate-200 rounded-2xl p-4"
                    >
                      <div className="flex gap-3">
                        <div className="mt-1 text-[#0d4ea6]">
                          <FaMapMarkerAlt />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800">
                            {item.title}
                          </h4>
                          <p className="text-sm text-slate-500 whitespace-pre-line mt-1">
                            {item.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payments */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-bold text-slate-800">
                    Payments
                  </h3>
                  <button className="text-[#0d4ea6]">
                    <FaPlus />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaCreditCard className="text-slate-500" />
                      <div>
                        <p className="font-semibold text-slate-800">
                          •••• 4412
                        </p>
                        <p className="text-sm text-slate-500">
                          Visa ending in 4412
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-semibold bg-blue-50 text-[#0d4ea6] px-3 py-1 rounded-full">
                      Default
                    </span>
                  </div>

                  <div className="border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
                    <FaCreditCard className="text-slate-500" />
                    <div>
                      <p className="font-semibold text-slate-800">Apple Pay</p>
                      <p className="text-sm text-slate-500">
                        Connected wallet
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Settings removed */}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
        active
          ? "bg-[#0d4ea6] text-white shadow-md"
          : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

const ProgressStep = ({ icon, label, active = false }) => {
  return (
    <div className="flex flex-col items-center relative z-10">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${
          active
            ? "bg-[#0d4ea6] border-[#dbeafe] text-white"
            : "bg-white border-slate-200 text-slate-400"
        }`}
      >
        {icon}
      </div>

      <p
        className={`text-sm mt-3 font-medium ${
          active ? "text-slate-800" : "text-slate-400"
        }`}
      >
        {label}
      </p>
    </div>
  );
};

export default Dashboard;