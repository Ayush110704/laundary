
import React, { useState } from "react";
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

function TermsCondition() {
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
    <div className="min-h-screen bg-gradient-to-br from-[#f8fbff] via-[#eef4ff] to-[#dbeafe] py-16 px-4 relative overflow-hidden">

      {/* Background Blur Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100 text-[#0f3d7a] text-xs font-bold tracking-widest mt-6">
            <FaShieldAlt />
            LEGAL INFORMATION
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#0f3d7a] via-[#2563eb] to-[#38bdf8] bg-clip-text text-transparent">
            Terms & Conditions
          </h1>

          <p className="mt-4 text-gray-500 text-lg">
            Last Updated: October 24, 2024
          </p>

        </div>

        {/* Terms Cards */}
        <div className="mt-14 space-y-5">

          {terms.map((item) => (
            <div
              key={item.id}
              className="group bg-white/90 backdrop-blur-md border border-blue-100 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
            >

              <button
                onClick={() =>
                  setOpen(open === item.id ? null : item.id)
                }
                className="w-full flex justify-between items-center px-6 py-5"
              >

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0f3d7a] text-lg group-hover:bg-blue-100 transition-all duration-300">
                    {item.icon}
                  </div>

                  <span className="font-semibold text-[#0f3d7a] text-lg">
                    {item.title}
                  </span>

                </div>

                <FaChevronDown
                  className={`text-[#0f3d7a] transition-transform duration-300 ${
                    open === item.id ? "rotate-180" : ""
                  }`}
                />

              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  open === item.id
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >

                <div className="px-6 pb-6 text-gray-600 leading-8">
                  {item.content}
                </div>

              </div>

            </div>
          ))}

        </div>

        {/* Acknowledgment Card */}
        <div className="mt-16 bg-white/90 backdrop-blur-md border border-blue-100 rounded-3xl p-8 md:p-12 shadow-lg text-center hover:shadow-2xl transition-all duration-500">

          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-500">

            <FaShieldAlt className="text-5xl text-[#0f3d7a]" />

          </div>

          <h2 className="mt-6 text-3xl md:text-4xl font-bold text-[#0f3d7a]">
            Acknowledgment
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-8">
            By clicking the button below, you confirm that you have
            read, understood and agreed to the Athenura Terms of
            Service and Privacy Policy.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

            <button className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#0f3d7a] via-[#2563eb] to-[#38bdf8] text-white font-semibold hover:scale-105 hover:shadow-2xl transition-all duration-500">

              <FaCheckCircle />
              Accept Terms

            </button>

            <button className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl border border-blue-200 bg-white font-semibold hover:bg-blue-50 hover:border-blue-500 hover:scale-105 transition-all duration-500">

              <FaFileDownload />
              Download PDF

            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default TermsCondition;

