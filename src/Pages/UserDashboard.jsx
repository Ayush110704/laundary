import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCircle2,
  Package,
  MapPin,
  Settings,
  LogOut,
  Shirt,
  ClipboardList,
  Truck,
  ChevronRight,
  Search,
  Filter,
  Plus,
  Star,
  Clock3,
  CheckCircle2,
  Circle,
} from "lucide-react";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [orderFilter, setOrderFilter] = useState("All");

  const stats = [
    {
      title: "Total Orders",
      value: "48",
      sub: "+12.5% from last month",
      icon: ClipboardList,
      gradient: "from-teal-500 to-cyan-500",
      glow: "shadow-teal-200/60",
    },
    {
      title: "Active Orders",
      value: "02",
      sub: "Next delivery: Tomorrow, 2PM",
      icon: Truck,
      gradient: "from-blue-500 to-indigo-500",
      glow: "shadow-blue-200/60",
    },
    {
      title: "Loyalty Points",
      value: "2,450",
      sub: "50 credits till next reward",
      icon: Star,
      gradient: "from-violet-500 to-fuchsia-500",
      glow: "shadow-violet-200/60",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-8394-02",
      title: "2 Shirts • 1 Trouser • Premium Wash",
      status: "In Progress",
      eta: "Today, 5:00 PM",
      price: "₹420",
    },
    {
      id: "ORD-8393-01",
      title: "Bedsheet • Blanket • Deep Clean",
      status: "Delivered",
      eta: "Delivered Mar 20",
      price: "₹650",
    },
    {
      id: "ORD-8396-04",
      title: "3 T-Shirts • Wash & Fold",
      status: "Pending",
      eta: "Pickup Tomorrow",
      price: "₹280",
    },
  ];

  const orders = [
    {
      id: "ORD-8393-01",
      category: "Premium Laundry",
      placedAt: "Placed on 14 Apr 2026 at 01:24 PM",
      status: "Delivered",
      deliveryDate: "14 Apr 2026",
      timeSlot: "10:00 AM to 12:00 PM",
      total: 530,
      subtotal: 410,
      deliveryCharge: 120,
      address: "123, Sample Address, Andheri East, Mumbai - 400069",
      items: [
        { name: "Fresh Shirt (2 pcs)", qty: 2, price: 180, service: "Steam + Fold" },
        { name: "Trouser Premium Wash", qty: 1, price: 230, service: "Premium Wash" },
      ],
      progress: 4,
    },
    {
      id: "ORD-8394-02",
      category: "Dry Cleaning",
      placedAt: "Placed on 18 Apr 2026 at 10:10 AM",
      status: "Processing",
      deliveryDate: "19 Apr 2026",
      timeSlot: "03:00 PM to 06:00 PM",
      total: 350,
      subtotal: 300,
      deliveryCharge: 50,
      address: "B-24, Civil Lines, Nagpur - 440001",
      items: [
        { name: "Blazer Dry Clean", qty: 1, price: 220, service: "Dry Cleaning" },
        { name: "Formal Shirt", qty: 2, price: 80, service: "Ironing + Finish" },
      ],
      progress: 2,
    },
    {
      id: "ORD-8395-03",
      category: "Wash & Fold",
      placedAt: "Placed on 19 Apr 2026 at 08:15 PM",
      status: "Cancelled",
      deliveryDate: "Cancelled",
      timeSlot: "-",
      total: 0,
      subtotal: 0,
      deliveryCharge: 0,
      address: "Home Address, Pune - 411014",
      items: [{ name: "Daily Wear Bundle", qty: 1, price: 0, service: "Wash & Fold" }],
      progress: 0,
    },
    {
      id: "ORD-8396-04",
      category: "Express Ironing",
      placedAt: "Placed on 20 Apr 2026 at 09:30 AM",
      status: "Pending",
      deliveryDate: "21 Apr 2026",
      timeSlot: "11:00 AM to 01:00 PM",
      total: 260,
      subtotal: 220,
      deliveryCharge: 40,
      address: "IT Park Road, Nagpur - 440022",
      items: [
        { name: "Office Shirt", qty: 3, price: 120, service: "Express Ironing" },
        { name: "Trousers", qty: 2, price: 100, service: "Pressing" },
      ],
      progress: 1,
    },
  ];

  // Global state to target standard workflow order item tracking
  const [selectedOrderId, setSelectedOrderId] = useState(orders[1].id); // Defaults to active Processing order

  const selectedOrder = useMemo(() => {
    return orders.find((o) => o.id === selectedOrderId) || orders[0];
  }, [selectedOrderId]);

  const filteredOrders = useMemo(() => {
    if (orderFilter === "All") return orders;
    return orders.filter(
      (order) => order.status.toLowerCase() === orderFilter.toLowerCase()
    );
  }, [orderFilter]);

  const navItems = [
    { key: "profile", label: "Profile", icon: UserCircle2 },
    { key: "orders", label: "My Orders", icon: Package },
    { key: "services", label: "Services", icon: Shirt },
    { key: "tracking", label: "Tracking", icon: Truck },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  const statusStyles = {
    Delivered: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200",
    Processing: "bg-blue-50 text-blue-600 ring-1 ring-blue-200",
    "In Progress": "bg-sky-50 text-sky-600 ring-1 ring-sky-200",
    Pending: "bg-amber-50 text-amber-600 ring-1 ring-amber-200",
    Cancelled: "bg-rose-50 text-rose-600 ring-1 ring-rose-200",
  };

  const getStatusClass = (status) =>
    statusStyles[status] || "bg-slate-100 text-slate-600 ring-1 ring-slate-200";

  const cardBase =
    "rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.06)]";
  const softCard =
    "rounded-2xl border border-slate-200/60 bg-gradient-to-b from-white to-slate-50 shadow-sm";

  const triggerTrackingView = (orderId) => {
    setSelectedOrderId(orderId);
    setActiveTab("tracking");
  };

  const renderProfile = () => (
    <motion.div
      key="profile"
      className="flex flex-col gap-6"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className={`${cardBase} flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between`}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative grid h-20 w-20 place-items-center rounded-[24px] bg-gradient-to-br from-teal-500 to-blue-600 text-white font-extrabold text-2xl shadow-lg shadow-blue-200/40">
            AJ
            <span className="absolute bottom-2 right-2 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Alex Johnson
            </h2>
            
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-2xl bg-gradient-to-r from-teal-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200/40"
          >
            Schedule New Pickup
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              className={`${cardBase} relative overflow-hidden p-5`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-slate-200/20 blur-2xl" />
              <div className="flex items-start gap-4">
                <div
                  className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg ${item.glow}`}
                >
                  <Icon size={24} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-500">{item.title}</p>
                  <h3 className="mt-1 text-3xl font-bold text-slate-800">
                    {item.value}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-emerald-600">
                    {item.sub}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 2xl:grid-cols-[1.55fr_0.95fr]">
        <motion.div
          className={`${cardBase} p-5`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">Recent Activity</h3>
            <button
              onClick={() => setActiveTab("orders")}
              className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600 transition hover:bg-blue-100"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <motion.div
                key={order.id}
                whileHover={{ x: 4 }}
                onClick={() => triggerTrackingView(order.id)}
                className={`${softCard} flex cursor-pointer gap-4 p-4 transition hover:shadow-md`}
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                  <Package size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="font-semibold text-slate-800">{order.id}</h4>
                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">{order.title}</p>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                    <span className="text-blue-500 font-medium hover:underline">Track Live Order →</span>
                    <strong className="text-slate-800">{order.price}</strong>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col gap-5">
          <motion.div
            className={`${cardBase} p-5`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">Addresses</h3>
              <button className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
                <Plus size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div className={`${softCard} flex gap-4 p-4`}>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Home (Default)</h4>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    123 Professional Way, Sector 402, Pune, MH 10001
                  </p>
                </div>
              </div>

              <div className={`${softCard} flex gap-4 p-4`}>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Office</h4>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    81 Financial Plaza, Lower Parel, Mumbai, MH 10004
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  const renderOrders = () => (
    <motion.div
      key="orders"
      className="flex flex-col gap-6"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.35 }}
    >
      <div
        className={`${cardBase} flex flex-col gap-5 p-6 xl:flex-row xl:items-center xl:justify-between`}
      >
        <div>
          <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            My Orders
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-500 sm:text-base">
            Track, manage and review all your laundry orders
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
          <div className="flex h-12 w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 sm:min-w-[280px]">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search order ID..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none"
            />
          </div>

          <button className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 font-semibold text-slate-700 transition hover:bg-slate-50">
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {["All", "Processing", "Delivered", "Pending", "Cancelled"].map(
          (item) => (
            <button
              key={item}
              className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                orderFilter === item
                  ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg shadow-blue-200/30"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
              onClick={() => setOrderFilter(item)}
            >
              {item}
            </button>
          )
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[360px_1fr]">
        <motion.div
          className={`${cardBase} h-fit p-5 xl:sticky xl:top-[110px]`}
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">Order List</h3>
            <span className="text-sm text-slate-500">
              {filteredOrders.length} orders
            </span>
          </div>

          <div className="max-h-[720px] space-y-4 overflow-y-auto pr-1">
            {filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedOrderId(order.id)}
                className={`cursor-pointer rounded-2xl border p-4 transition ${
                  selectedOrderId === order.id
                    ? "border-blue-200 bg-gradient-to-b from-white to-blue-50 shadow-md"
                    : "border-slate-200/70 bg-gradient-to-b from-white to-slate-50 hover:shadow-sm"
                }`}
              >
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-800">{order.id}</h4>
                    <p className="text-sm text-slate-500">{order.category}</p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>{order.placedAt}</span>
                  <strong className="text-slate-800">₹{order.total}</strong>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* DETAILED SPECIFIC ACTION CARD */}
        <motion.div
          key={selectedOrder.id}
          className="flex flex-col gap-5"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className={`${cardBase} p-5`}>
            <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Active Selected Order
                </p>
                <h2 className="text-2xl font-bold text-slate-800">
                  {selectedOrder.id}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  {selectedOrder.placedAt}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`w-fit rounded-full px-4 py-2 text-sm font-bold ${getStatusClass(
                    selectedOrder.status
                  )}`}
                >
                  {selectedOrder.status}
                </span>

                {selectedOrder.status !== "Cancelled" && (
                  <button
                    onClick={() => setActiveTab("tracking")}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 px-4 py-2 text-sm font-bold text-white shadow-md transition hover:opacity-90"
                  >
                    <Truck size={16} />
                    Track Live Progress
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 border-b border-slate-100 pb-5 mb-5">
              <div className={`${softCard} flex items-center gap-4 p-4`}>
                <div className="text-blue-600">
                  <Clock3 size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Delivery Date</p>
                  <h4 className="font-semibold text-slate-800">
                    {selectedOrder.deliveryDate}
                  </h4>
                </div>
              </div>

              <div className={`${softCard} flex items-center gap-4 p-4`}>
                <div className="text-blue-600">
                  <Truck size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Time Slot</p>
                  <h4 className="font-semibold text-slate-800">
                    {selectedOrder.timeSlot}
                  </h4>
                </div>
              </div>
            </div>

            {/* ITEM DETAILS IN LIST FOR FULL CLARITY */}
            <div>
              <h3 className="font-bold text-slate-800 text-lg mb-3">Itemized Breakdown</h3>
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm">
                    <div>
                      <p className="font-semibold text-slate-800">{item.name} <span className="text-slate-400 font-normal">x{item.qty}</span></p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.service}</p>
                    </div>
                    <span className="font-bold text-slate-700">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderTracking = () => {
    // Dynamic generation based on selected state structure array object
    const trackingSteps = [
      { id: 1, name: "Order Confirmed", desc: "We have received and approved your request", fallbackDate: "14 Apr, 11:00 AM" },
      { id: 2, name: "Pickup Completed", desc: "Rider has picked up clothes from your address", fallbackDate: "14 Apr, 03:30 PM" },
      { id: 3, name: "Processing & Clean", desc: "Clothes are undergoing deep steam cleaning cycles", fallbackDate: "In Process" },
      { id: 4, name: "Dispatched / Delivered", desc: "Cleaned garments returned directly back to you", fallbackDate: "Completed Cycle" },
    ];

    // Map order string status values seamlessly into integers (1 to 4)
    let currentStepProgress = 1;
    if (selectedOrder.status === "Pending") currentStepProgress = 1;
    if (selectedOrder.status === "Processing" || selectedOrder.status === "In Progress") currentStepProgress = 3;
    if (selectedOrder.status === "Delivered") currentStepProgress = 5; // All 4 steps ticked green

    return (
      <motion.div
        key="tracking"
        className="flex flex-col gap-6"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
      >
        <div className={`${cardBase} p-6`}>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl font-bold text-slate-800">Working Order Tracker</h2>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${getStatusClass(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-500 mt-1">
                Showing live status metrics for code branch: <span className="text-blue-600 font-semibold">{selectedOrder.id}</span>
              </p>
            </div>
            
            <button 
              onClick={() => setActiveTab("orders")}
              className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 hover:bg-blue-100/60 transition"
            >
              Switch Targeted Order
            </button>
          </div>

          {selectedOrder.status === "Cancelled" ? (
            <div className="p-8 text-center bg-rose-50 rounded-2xl border border-rose-100 text-rose-600 font-semibold">
              This order ({selectedOrder.id}) was cancelled. Tracking milestone updates are disabled.
            </div>
          ) : (
            <div className="relative flex flex-col gap-8 pl-6 before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-[2px] before:bg-slate-200">
              {trackingSteps.map((step) => {
                const isCompleted = step.id < currentStepProgress;
                const isActive = step.id === currentStepProgress;

                return (
                  <div key={step.id} className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="absolute -left-[23px] grid place-items-center bg-white rounded-full p-0.5 z-10">
                      {isCompleted ? (
                        <CheckCircle2 size={18} className="text-emerald-500 fill-emerald-50" />
                      ) : isActive ? (
                        <motion.div 
                          animate={{ scale: [1, 1.15, 1] }} 
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <CheckCircle2 size={18} className="text-blue-600 fill-blue-50" />
                        </motion.div>
                      ) : (
                        <Circle size={18} className="text-slate-300 bg-white" />
                      )}
                    </div>

                    <div className="pl-4">
                      <h4 className={`font-bold text-base ${isActive ? "text-blue-600" : isCompleted ? "text-slate-800" : "text-slate-400"}`}>
                        {step.name}
                      </h4>
                      <p className={`text-sm mt-0.5 ${isActive ? "text-slate-600" : "text-slate-400"}`}>{step.desc}</p>
                    </div>

                    <div className="pl-4 sm:pl-0 sm:text-right">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${isActive ? "bg-blue-50 text-blue-600" : isCompleted ? "bg-slate-100 text-slate-500" : "bg-slate-50 text-slate-400"}`}>
                        {isActive ? "Active Now" : isCompleted ? "Completed" : "Awaiting Step"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 font-sans text-slate-600 antialiased selection:bg-blue-500 selection:text-white flex flex-col">
      <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] flex-1">
        {/* SIDEBAR */}
        <aside className="border-b border-slate-200/70 bg-white p-5 xl:border-b-0 xl:border-r">
          <div className="flex h-full flex-col justify-between gap-6">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.key;

                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left font-semibold transition ${
                      active
                        ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg shadow-blue-200/30"
                        : "text-slate-700 hover:bg-blue-50/60"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                    <ChevronRight
                      size={16}
                      className={`ml-auto transition ${
                        active ? "text-white/90" : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            
            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-bold text-rose-500 transition hover:bg-rose-50 mt-auto">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </aside>

        {/* MAIN DISPLAY SCENE */}
        <main className="p-4 sm:p-6 max-w-[1600px] w-full mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === "profile" && renderProfile()}
            {activeTab === "orders" && renderOrders()}
            {activeTab === "tracking" && renderTracking()}

            {activeTab === "services" && (
              <motion.div
                key="services"
                className={`${cardBase} p-6`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
              >
                <h2 className="text-2xl font-bold text-slate-800">Services</h2>
                <p className="mt-3 max-w-2xl leading-7 text-slate-500">
                  Explore our detailed premium wash, dry cleaning, and ironing packages optimized for your fabrics.
                </p>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                key="settings"
                className={`${cardBase} p-6`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
              >
                <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
                <p className="mt-3 max-w-2xl leading-7 text-slate-500">
                  Manage your personal details, default addresses, configurations, and notification updates.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;