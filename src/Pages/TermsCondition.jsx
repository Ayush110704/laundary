import React, { useState } from "react";
import UserLayout from './UserLayout'; // ADD THIS IMPORT

import {
  FaShieldAlt,
  FaChevronDown,
  FaCheckCircle,
  FaFileDownload,
  FaLeaf,
} from "react-icons/fa";

import {
  FiEdit3,
  FiFileText,
  FiDollarSign,
  FiShield,
} from "react-icons/fi";

const TermsCondition = () => {

  const [open, setOpen] = useState(1);

  const terms = [
    {
      id: 1,
      icon: <FiEdit3 />,
      title: "Agreement to Terms",
      content:
        "By accessing or using Athenura professional cleaning services, you agree to be bound by these Terms and Conditions. These terms constitute a legally binding agreement between you and Athenura regarding your use of our platform and services.",
    },
    {
      id: 2,
      icon: <FiFileText />,
      title: "Service Provision",
      content:
        "We provide laundry, dry cleaning, ironing, pickup and delivery services. Service availability may vary depending on location and operational requirements.",
    },
    {
      id: 3,
      icon: <FiDollarSign />,
      title: "Pricing & Payments",
      content:
        "All prices are displayed before order confirmation. Payments must be completed before order processing. Additional charges may apply for special garment handling.",
    },
    {
      id: 4,
      icon: <FiShield />,
      title: "Liability & Insurance",
      content:
        "We take reasonable care of all garments. However, Athenura shall not be liable for damage caused by pre-existing garment defects or inaccurate care instructions.",
    },
    {
      id: 5,
      icon: <FaLeaf />,
      title: "Eco-Wash Commitment",
      content:
        "We use eco-friendly detergents and sustainable cleaning methods whenever possible.",
    },
  ];

  return (
    <UserLayout> {/* WRAPPED WITH UserLayout */}
      <div className="w-full">
        <div className="min-h-screen bg-gradient-to-br from-[#f8fbff] via-[#eef4ff] to-[#dbeafe] relative overflow-hidden py-10 md:py-16">

          {/* Blur */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* ================= HEADER ================= */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 rounded-full bg-blue-100 text-[#0f3d7a] text-[11px] md:text-xs font-bold tracking-widest mt-10">
                <FaShieldAlt />
                LEGAL INFORMATION
              </div>
              <h1 className="mt-6 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-[#0f3d7a] via-[#2563eb] to-[#38bdf8] bg-clip-text text-transparent">
                Terms & Conditions
              </h1>
              <p className="mt-4 text-gray-500 text-sm md:text-lg">
                Last Updated: October 24, 2024
              </p>
            </div>

            {/* ================= ACCORDION START ================= */}
            <div className="mt-10 md:mt-14 space-y-4">
              {terms.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white/90 backdrop-blur-md border border-blue-100 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpen(open === item.id ? null : item.id)
                    }
                    className="w-full flex justify-between items-start md:items-center gap-4 px-4 md:px-6 py-5"
                  >
                    {/* Left */}
                    <div className="flex items-start gap-4 text-left">
                      <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0f3d7a] text-lg shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-semibold text-[#0f3d7a]">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Arrow */}
                    <FaChevronDown
                      className={`text-[#0f3d7a] transition-transform duration-300 mt-1 md:mt-0
                      ${open === item.id ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Content */}
                  <div
                    className={`transition-all duration-500 overflow-hidden
                    ${open === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="px-4 md:px-6 pb-6 text-sm md:text-base text-gray-600 leading-7 md:leading-8">
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= ACKNOWLEDGEMENT ================= */}
            <div className="mt-12 md:mt-16">
              <div className="bg-white/90 backdrop-blur-md border border-blue-100 rounded-3xl shadow-xl p-6 md:p-10 text-center">
                {/* Icon */}
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center shadow-lg">
                  <FaShieldAlt className="text-4xl md:text-5xl text-[#0f3d7a]" />
                </div>

                {/* Heading */}
                <h2 className="mt-6 text-2xl md:text-4xl font-bold text-[#0f3d7a]">
                  Acknowledgment
                </h2>

                {/* Paragraph */}
                <p className="mt-5 text-sm md:text-base text-gray-600 leading-7 md:leading-8 max-w-3xl mx-auto">
                  By clicking the button below, you confirm that you have
                  read, understood and agreed to the Athenura Terms &
                  Conditions and Privacy Policy.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#0f3d7a] via-[#2563eb] to-[#38bdf8] text-white font-semibold hover:scale-105 transition duration-300"
                  >
                    <FaCheckCircle />
                    Accept Terms
                  </button>
                  <button
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-blue-200 bg-white text-[#0f3d7a] font-semibold hover:bg-blue-50 hover:border-blue-500 transition duration-300"
                  >
                    <FaFileDownload />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default TermsCondition;