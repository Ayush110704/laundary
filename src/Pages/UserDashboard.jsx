import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Package,
  CreditCard,
  Settings,
  LogOut,
  Shirt,
  Truck,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");

  const [orders, setOrders] = useState([
    {
      id: "ORD-1001",
      customer: "Rahul Sharma",
      service: "Wash & Fold",
      progress: 1,
      status: "Pickup Pending",
    },
    {
      id: "ORD-1002",
      customer: "Priya Verma",
      service: "Dry Cleaning",
      progress: 2,
      status: "Processing",
    },
    {
      id: "ORD-1003",
      customer: "Aman Gupta",
      service: "Premium Laundry",
      progress: 3,
      status: "Cleaning",
    },
  ]);

  const [selectedOrderId, setSelectedOrderId] = useState("ORD-1001");

  const selectedOrder =
    orders.find((order) => order.id === selectedOrderId) || orders[0];

  const navItems = [
    { key: "overview", label: "Overview", icon: Home },
    { key: "orders", label: "My Orders", icon: Package },
    { key: "payments", label: "Payments", icon: CreditCard },
    { key: "services", label: "Services", icon: Shirt },
    { key: "tracking", label: "Tracking", icon: Truck },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  const steps = ["Pickup", "Processing", "Cleaning", "Delivery"];

  const statusFromProgress = (progress) => {
    switch (progress) {
      case 1:
        return "Pickup Pending";
      case 2:
        return "Processing";
      case 3:
        return "Cleaning";
      case 4:
        return "Out for Delivery";
      default:
        return "Pending";
    }
  };

  const updateOrderProgress = (direction) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== selectedOrderId) return order;

        let newProgress = order.progress;
        if (direction === "next" && order.progress < 4) newProgress += 1;
        if (direction === "prev" && order.progress > 1) newProgress -= 1;

        return {
          ...order,
          progress: newProgress,
          status: statusFromProgress(newProgress),
        };
      })
    );
  };

  const cardBase =
    "rounded-3xl border border-white/60 bg-white/85 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.08)]";

  const renderOrders = () => (
    <motion.div
      key="orders"
      className="flex flex-col gap-4 sm:gap-6"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.35 }}
    >
      {/* Header */}
      <div
        className={`${cardBase} flex flex-col gap-4 p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between`}
      >
        <div>
          <h2 className="text-xl font-bold text-slate-800 sm:text-2xl lg:text-3xl">
            Order Tracking Dashboard
          </h2>
          
        </div>

        <div className="w-full rounded-2xl bg-gradient-to-r from-teal-500 to-blue-600 px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-200/30 sm:w-auto">
          Live Status Panel
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-[320px_1fr]">
        {/* LEFT ORDER LIST */}
        <div className={`${cardBase} h-fit p-4 sm:p-5`}>
          <div className="mb-4 flex items-center justify-between sm:mb-5">
            <h3 className="text-lg font-bold text-slate-800 sm:text-xl">
              Orders
            </h3>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {orders.length} Active
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {orders.map((order) => {
              const active = selectedOrderId === order.id;
              return (
                <motion.div
                  key={order.id}
                  whileHover={{ y: -2 }}
                  onClick={() => setSelectedOrderId(order.id)}
                  className={`cursor-pointer rounded-2xl border p-4 transition ${
                    active
                      ? "border-blue-200 bg-gradient-to-r from-cyan-50 to-blue-50 shadow-md"
                      : "border-slate-200 bg-white hover:shadow-sm"
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-800">{order.id}</h4>
                      <p className="mt-1 text-sm text-slate-500">
                        {order.customer}
                      </p>
                      <p className="text-sm text-slate-500">{order.service}</p>
                    </div>

                    <div
                      className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                        active
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      Step {order.progress}/4
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                      <motion.div
                        initial={false}
                        animate={{ width: `${(order.progress / 4) * 100}%` }}
                        transition={{ duration: 0.4 }}
                        className="h-full rounded-full bg-gradient-to-r from-teal-500 to-blue-600"
                      />
                    </div>
                    <p className="mt-2 text-sm font-semibold text-slate-600">
                      {order.status}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT ORDER PROGRESS */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Selected Order Details */}
          <div className={`${cardBase} p-4 sm:p-6`}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
                  Selected Order
                </p>
                <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                  {selectedOrder.id}
                </h2>
                <p className="mt-2 text-sm text-slate-500 sm:text-base">
                  {selectedOrder.customer} • {selectedOrder.service}
                </p>
              </div>

              <div className="w-fit rounded-full bg-gradient-to-r from-teal-500 to-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-200/30">
                {selectedOrder.status}
              </div>
            </div>
          </div>

          {/* PROGRESS CARD */}
          <div className={`${cardBase} p-4 sm:p-6`}>
            <div className="mb-5 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-xl font-bold text-slate-800 sm:text-2xl">
                Order Progress
              </h3>
              <span className="text-sm text-slate-500">
                Live status timeline
              </span>
            </div>

            {/* Desktop / tablet */}
            <div className="hidden rounded-[28px] bg-slate-50 p-6 md:block md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-y-6 gap-x-2">
                {steps.map((step, index) => {
                  const stepNumber = index + 1;
                  const isActive = stepNumber <= selectedOrder.progress;
                  const isCurrent = stepNumber === selectedOrder.progress;

                  return (
                    <React.Fragment key={step}>
                      <div className="flex min-w-[90px] flex-col items-center text-center">
                        <motion.div
                          animate={{
                            scale: isCurrent ? [1, 1.08, 1] : 1,
                          }}
                          transition={{
                            duration: 1.6,
                            repeat: isCurrent ? Infinity : 0,
                          }}
                          className={`mb-3 grid h-14 w-14 place-items-center rounded-full text-lg font-bold ${
                            isActive
                              ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg shadow-cyan-200/60"
                              : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          {stepNumber}
                        </motion.div>

                        <p
                          className={`text-base font-semibold ${
                            isActive ? "text-slate-800" : "text-slate-500"
                          }`}
                        >
                          {step}
                        </p>
                      </div>

                      {index !== steps.length - 1 && (
                        <div className="hidden flex-1 md:block">
                          <div className="h-1.5 rounded-full bg-slate-200">
                            <motion.div
                              initial={false}
                              animate={{
                                width:
                                  selectedOrder.progress > stepNumber
                                    ? "100%"
                                    : "0%",
                              }}
                              transition={{ duration: 0.45 }}
                              className="h-full rounded-full bg-gradient-to-r from-teal-500 to-blue-600"
                            />
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Mobile progress */}
            <div className="space-y-3 md:hidden">
              {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber <= selectedOrder.progress;
                const isCurrent = stepNumber === selectedOrder.progress;

                return (
                  <div
                    key={step}
                    className={`rounded-2xl border p-4 ${
                      isActive
                        ? "border-cyan-200 bg-cyan-50/70"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{
                          scale: isCurrent ? [1, 1.08, 1] : 1,
                        }}
                        transition={{
                          duration: 1.6,
                          repeat: isCurrent ? Infinity : 0,
                        }}
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold ${
                          isActive
                            ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {stepNumber}
                      </motion.div>

                      <div className="min-w-0">
                        <p
                          className={`font-semibold ${
                            isActive ? "text-slate-800" : "text-slate-500"
                          }`}
                        >
                          {step}
                        </p>
                        <p className="text-xs text-slate-500">
                          {isCurrent
                            ? "Current step"
                            : isActive
                            ? "Completed"
                            : "Pending"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Controls */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2">
              <button
                onClick={() => updateOrderProgress("prev")}
                disabled={selectedOrder.progress === 1}
                className={`rounded-2xl px-5 py-3 font-bold transition ${
                  selectedOrder.progress === 1
                    ? "cursor-not-allowed bg-slate-200 text-slate-400"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                Previous Step
              </button>

              <button
                onClick={() => updateOrderProgress("next")}
                disabled={selectedOrder.progress === 4}
                className={`rounded-2xl px-5 py-3 font-bold text-white transition ${
                  selectedOrder.progress === 4
                    ? "cursor-not-allowed bg-slate-300"
                    : "bg-gradient-to-r from-teal-500 to-blue-600 shadow-lg shadow-blue-200/40 hover:opacity-95"
                }`}
              >
                Next Step
              </button>
            </div>
          </div>

          {/* Status card */}
          <div className={`${cardBase} p-4 sm:p-5`}>
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white sm:h-14 sm:w-14">
                <CheckCircle2 size={22} />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-slate-500">Current Status</p>
                <h3 className="text-xl font-bold text-slate-800 sm:text-2xl">
                  {selectedOrder.status}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Progress Step {selectedOrder.progress} of 4
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.10),transparent_24%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_26%),linear-gradient(180deg,#f8fbff_0%,#eef5fb_100%)] text-slate-800">
      <div className="mx-auto max-w-[1800px] px-0 pt-[84px] sm:pt-[88px]">
        <div className="grid min-h-[calc(100vh-84px)] grid-cols-1 gap-4 px-4 pb-6 sm:gap-6 sm:px-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          {/* SIDEBAR */}
          <aside className="xl:sticky xl:top-[104px] h-fit">
            <div className="rounded-[28px] border border-slate-200/70 bg-white/75 p-4 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-5">
              <div className="flex flex-col gap-5 sm:gap-6">
                <div>
                  <div className="mb-5 flex items-center gap-4 rounded-[24px] bg-gradient-to-br from-teal-500 to-blue-600 p-4 text-white shadow-xl shadow-blue-200/40 sm:mb-6">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20 text-lg font-extrabold sm:h-14 sm:w-14 sm:text-xl">
                      A
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-base font-bold sm:text-lg">Alex</h4>
                      <p className="truncate text-sm text-white/90">
                        alex@email.com
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 xl:grid-cols-1">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const active = activeTab === item.key;

                      return (
                        <button
                          key={item.key}
                          onClick={() => setActiveTab(item.key)}
                          className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-left font-semibold transition sm:py-4 ${
                            active
                              ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg shadow-blue-200/30"
                              : "bg-white text-slate-700 hover:bg-blue-50"
                          }`}
                        >
                          <Icon size={18} />
                          <span className="truncate text-sm sm:text-base">
                            {item.label}
                          </span>
                          <ChevronRight
                            size={16}
                            className={`ml-auto hidden sm:block transition ${
                              active
                                ? "text-white/90"
                                : "text-slate-400 group-hover:text-slate-600"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button className="flex items-center justify-center gap-3 rounded-2xl bg-white px-4 py-3 font-bold text-rose-500 shadow-sm ring-1 ring-slate-200 transition hover:bg-rose-50 sm:justify-start sm:py-4">
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <main className="min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === "orders" && renderOrders()}

              {activeTab !== "orders" && (
                <motion.div
                  key={activeTab}
                  className={`${cardBase} p-5 sm:p-6`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                >
                  <h2 className="text-xl font-bold text-slate-800 capitalize sm:text-2xl">
                    {activeTab}
                  </h2>
                  <p className="mt-3 text-sm text-slate-500 sm:text-base">
                    This section is currently empty. Use the Orders tab to test
                    the live order progress flow.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;