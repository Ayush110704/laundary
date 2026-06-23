// import React from "react";
import React, { useState } from "react";
 import { subscriptionHistory } from "../Data/LaundaryData";
 import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import { FaHistory } from "react-icons/fa";

import {
  FaCheck,
  FaCrown,
  FaGem,
  FaStar,
  
} from "react-icons/fa";

function Subscription() {

   
const [selectedInvoice, setSelectedInvoice] = useState(null);

    const downloadInvoice = () => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("ATHENURA INVOICE", 20, 20);

  doc.setFontSize(12);
  doc.text("Invoice ID: INV-2026-001", 20, 40);
  doc.text("Customer: Zainav", 20, 50);
  doc.text("Plan: Premium Laundry Plan", 20, 60);
  doc.text("Amount Paid: ₹799", 20, 70);
  doc.text("Payment Date: 01 June 2026", 20, 80);

  doc.save("Athenura-Invoice.pdf");
};


 const [showInvoice, setShowInvoice] = useState(false);

  const plans = [
    {
      name: "Basic",
      price: "₹299",
      icon: <FaStar />,
      features: [
        "10 Clothes / Month",
        "Free Pickup",
        "Standard Delivery",
        "Email Support",
      ],
    },
    {
      name: "Premium",
      price: "₹699",
      icon: <FaCrown />,
      popular: true,
      features: [
        "30 Clothes / Month",
        "Priority Pickup",
        "Express Delivery",
        "24/7 Support",
      ],
    },
    {
      name: "Elite",
      price: "₹1299",
      icon: <FaGem />,
      features: [
        "Unlimited Clothes",
        "VIP Pickup",
        "Same Day Delivery",
        "Dedicated Manager",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fbff] p-6">

  <div className="text-center mb-10 mt-16">
    <h1 className="text-5xl font-bold text-gray-800">
      Choose Your{" "}
      <span className="text-red-500">
        Subscription Plan
      </span>
    </h1>

    <p className="text-gray-500 mt-3">
      Enjoy hassle-free laundry services with exclusive discounts and premium garment care.
    </p>
  </div>

  <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

    {/* Monthly */}
    <div className="bg-white rounded-3xl shadow-xl p-6 hover:-translate-y-3 transition-all duration-500">
      <h3 className="text-xl font-semibold text-gray-700">
        Monthly
      </h3>

      <p className="text-gray-400 text-sm mt-1">
        1 Month
      </p>

      <div className="mt-5">
        <span className="text-4xl font-bold text-[#0f3d7a]">
          ₹299
        </span>
      </div>

      <p className="text-green-500 font-semibold mt-2">
        40% OFF
      </p>

      <ul className="mt-6 space-y-3 text-sm">
        <li>✅ 15 Clothes / Month</li>
        <li>✅ Free Pickup & Delivery</li>
        <li>✅ Wash & Fold Service</li>
        <li>✅ 48-Hour Delivery</li>
        <li>✅ Basic Support</li>
      </ul>

      <button className="w-full mt-8 py-3 rounded-xl border border-[#0f3d7a] text-[#0f3d7a] font-semibold hover:bg-[#0f3d7a] hover:text-white transition">
        Subscribe Now
      </button>
    </div>

    {/* Quarterly */}
    <div className="bg-white rounded-3xl shadow-2xl p-6 relative border-2 border-[#2563eb] hover:-translate-y-3 transition-all duration-500">

      <span className="absolute top-4 right-4 bg-[#2563eb] text-white text-xs px-3 py-1 rounded-full">
        MOST POPULAR
      </span>

      <h3 className="text-xl font-semibold text-gray-700">
        Quarterly
      </h3>

      <p className="text-gray-400 text-sm mt-1">
        3 Months
      </p>

      <div className="mt-5">
        <span className="text-4xl font-bold text-[#0f3d7a]">
          ₹799
        </span>
      </div>

      <p className="text-green-500 font-semibold mt-2">
        Save ₹150
      </p>

      <ul className="mt-6 space-y-3 text-sm">
        <li>✅ 50 Clothes / 3 Months</li>
        <li>✅ Priority Pickup</li>
        <li>✅ Wash, Fold & Iron</li>
        <li>✅ Express Delivery</li>
        <li>✅ Premium Support</li>
      </ul>

      <button className="w-full mt-8 py-3 rounded-xl bg-gradient-to-r from-[#0f3d7a] to-[#2563eb] text-white font-semibold hover:scale-105 transition">
        Subscribe Now
      </button>
    </div>

    {/* Half Yearly */}
    <div className="bg-white rounded-3xl shadow-xl p-6 hover:-translate-y-3 transition-all duration-500">
      <h3 className="text-xl font-semibold text-gray-700">
        Half Yearly
      </h3>

      <p className="text-gray-400 text-sm mt-1">
        6 Months
      </p>

      <div className="mt-5">
        <span className="text-4xl font-bold text-[#0f3d7a]">
          ₹1499
        </span>
      </div>

      <p className="text-green-500 font-semibold mt-2">
        Save ₹400
      </p>

      <ul className="mt-6 space-y-3 text-sm">
        <li>✅ 120 Clothes</li>
        <li>✅ Dry Cleaning Included</li>
        <li>✅ Priority Delivery</li>
        <li>✅ Free Alterations</li>
        <li>✅ Dedicated Support</li>
      </ul>

      <button className="w-full mt-8 py-3 rounded-xl border border-[#0f3d7a] text-[#0f3d7a] font-semibold hover:bg-[#0f3d7a] hover:text-white transition">
        Subscribe Now
      </button>
    </div>

    {/* Yearly */}
    <div className="bg-white rounded-3xl shadow-xl p-6 hover:-translate-y-3 transition-all duration-500">
      <h3 className="text-xl font-semibold text-gray-700">
        Yearly
      </h3>

      <p className="text-gray-400 text-sm mt-1">
        12 Months
      </p>

      <div className="mt-5">
        <span className="text-4xl font-bold text-[#0f3d7a]">
          ₹2799
        </span>
      </div>

      <p className="text-green-500 font-semibold mt-2">
        Save ₹1200
      </p>

      <ul className="mt-6 space-y-3 text-sm">
        <li>✅ Unlimited Laundry</li>
        <li>✅ Free Pickup & Delivery</li>
        <li>✅ Steam Ironing Included</li>
        <li>✅ Same Day Service</li>
        <li>✅ Dedicated Manager</li>
      </ul>

      <button className="w-full mt-8 py-3 rounded-xl border border-[#0f3d7a] text-[#0f3d7a] font-semibold hover:bg-[#0f3d7a] hover:text-white transition">
        Subscribe Now
      </button>

    </div>
    </div>

<motion.div
     initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(37,99,235,0.12)] border border-blue-100 p-8 mt-12"
>
  <h2 className="flex items-center gap-3 text-3xl font-bold text-[#0f3d7a] mb-8">
    <FaHistory />
    Subscription History
  </h2>

  <div className="overflow-x-auto rounded-2xl">
    <table className="w-full">

      <thead className="bg-gradient-to-r from-[#0f3d7a] to-[#2563eb] text-white">
        <tr>
          <th className="px-6 py-4 text-left">Plan</th>
          <th className="px-6 py-4 text-left">Duration</th>
          <th className="px-6 py-4 text-left">Amount</th>
          <th className="px-6 py-4 text-left">Start Date</th>
          <th className="px-6 py-4 text-left">Expiry Date</th>
          <th className="px-6 py-4 text-left">Status</th>
          <th className="px-6 py-4 text-left">Action</th>
        </tr>
      </thead>

      <tbody>
        {subscriptionHistory.map((item) => (
          <tr
            key={item.id}
            className="border-b hover:bg-blue-50 transition-all duration-300"
          >
            <td className="px-6 py-5 font-medium text-[#0f3d7a]">
              {item.plan}
            </td>

            <td className="px-6 py-5">
              {item.duration}
            </td>

            <td className="px-6 py-5 font-semibold">
              {item.amount}
            </td>

            <td className="px-6 py-5">
              {item.startDate}
            </td>

            <td className="px-6 py-5">
              {item.expiryDate}
            </td>

            <td className="px-6 py-5">
              <span
                className={`px-4 py-2 rounded-full text-xs font-semibold ${
                  item.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.status}
              </span>
            </td>

            <td className="px-6 py-5">
              <button
                onClick={() => {
                  setSelectedInvoice(item);
                  setShowInvoice(true);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0f3d7a] to-[#2563eb] text-white text-sm font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Invoice
              </button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  </div>
</motion.div>



<AnimatePresence>
  {showInvoice && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
      >

        {/* Header */}
        <div className="bg-gradient-to-r from-[#0f3d7a] to-[#2563eb] p-6 text-white">
          <h2 className="text-3xl font-bold">
            Invoice
          </h2>

          <p className="text-blue-100 mt-1">
            Athenura Laundry Services
          </p>
        </div>

        {/* Body */}
       <div className="p-8">

  <div className="flex justify-between items-center mb-6">
    <span className="font-semibold text-gray-500">
      Invoice ID
    </span>

    <span className="font-bold text-[#0f3d7a]">
      {selectedInvoice?.invoiceId}
    </span>
  </div>

  <div className="space-y-4">

    <div className="flex justify-between">
      <span className="text-gray-500">
        Customer
      </span>

      <span className="font-semibold">
        Zainav
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-500">
        Plan
      </span>

      <span className="font-semibold">
        {selectedInvoice?.plan}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-500">
        Amount Paid
      </span>

      <span className="font-bold text-green-600">
        {selectedInvoice?.amount}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-500">
        Payment Date
      </span>

      <span>
        {selectedInvoice?.startDate}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-500">
        Expiry Date
      </span>

      <span>
        {selectedInvoice?.expiryDate}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-500">
        Status
      </span>

      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
          selectedInvoice?.status === "Active"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-600"
        }`}
      >
        {selectedInvoice?.status}
      </span>
    </div>

  </div>

  <div className="mt-8 bg-blue-50 rounded-2xl p-4">

    {selectedInvoice?.status === "Active" ? (
      <p className="text-green-700 font-medium">
         Your subscription is active and all premium laundry services are available.
      </p>
    ) : (
      <p className="text-red-600 font-medium">
         This subscription has expired. Renew your plan to continue enjoying premium benefits.
      </p>
    )}

  </div>

  <div className="flex gap-4 mt-8">

    <button
      onClick={downloadInvoice}
      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#0f3d7a] to-[#2563eb] text-white font-semibold hover:scale-105 transition-all duration-300"
    >
      Download PDF
    </button>

    <button
      onClick={() => setShowInvoice(false)}
      className="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition-all duration-300"
    >
      Close
    </button>

  </div>

</div>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
</div>


  );
}

export default Subscription;