import React from "react";
import laundryContact from "../assets/laundryContact.png";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import hero from "../assets/hero.webp";

function Contact() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Banner - Desktop */}
      <div className="relative hidden md:block">
        <img
          src={laundryContact}
          alt="Contact"
          className="w-full h-auto block"
        />

        <div className="absolute inset-0 bg-black/20"></div>

        <div className="absolute inset-0 flex items-center">
          <div className="ml-8 md:ml-20 max-w-lg">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              We're Here To Help You
            </h1>

            <p className="mt-4 text-base md:text-xl text-white/90 leading-relaxed">
              Whether you have a question about our eco-friendly processes, need
              help with an order, or just want to say hello, our team is ready
              to assist you with clinical precision.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Banner */}
      <div className="md:hidden relative overflow-hidden h-[300px]">
        {/* Background Image */}
        <img
          src={hero}
          alt="Laundry"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f3d7a]/90 to-[#2563eb]/80"></div>

        {/* Content */}
        <div className="relative z-10 px-6 py-12 h-full flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white">
            Contact Us
          </h1>

          <p className="mt-4 text-white/90 text-base leading-relaxed max-w-xs">
            Questions about pickup, delivery or laundry care?
            Our team is ready to help.
          </p>

          <button className="mt-6 bg-white text-[#0f3d7a] px-6 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300 w-fit">
            Get In Touch
          </button>
        </div>
      </div>

      {/* Contact Section */}
      <section className="bg-[#f7f9fc] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
            {/* Left Form */}
            <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <h2 className="text-3xl font-bold text-[#0f3d7a]">
                Send a Message
              </h2>

              <p className="text-gray-500 text-sm mt-2 mb-8">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold tracking-wider text-[#0f3d7a] mb-2">
                    FIRST NAME
                  </label>

                  <input
                    type="text"
                    placeholder="Jane"
                    className="w-full h-12 px-4 border border-slate-200 rounded-xl outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold tracking-wider text-[#0f3d7a] mb-2">
                    LAST NAME
                  </label>

                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full h-12 px-4 border border-slate-200 rounded-xl outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-[11px] font-bold tracking-wider text-[#0f3d7a] mb-2">
                  EMAIL ADDRESS
                </label>

                <input
                  type="email"
                  placeholder="jane@example.com"
                  className="w-full h-12 px-4 border border-slate-200 rounded-xl outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="mt-5">
                <label className="block text-[11px] font-bold tracking-wider text-[#0f3d7a] mb-2">
                  INQUIRY TYPE
                </label>

                <select className="w-full h-12 px-4 border border-slate-200 rounded-xl outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                  <option>Order Support</option>
                  <option>Pickup Request</option>
                  <option>Dry Cleaning</option>
                  <option>General Query</option>
                </select>
              </div>

              <div className="mt-5">
                <label className="block text-[11px] font-bold tracking-wider text-[#0f3d7a] mb-2">
                  MESSAGE
                </label>

                <textarea
                  rows="6"
                  placeholder="How can we help you today?"
                  className="w-full p-4 border border-slate-200 rounded-xl outline-none resize-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                ></textarea>
              </div>

              <button className="w-full h-12 mt-6 rounded-xl text-white font-semibold bg-gradient-to-r from-[#0f3d7a] to-[#2563eb] hover:from-[#2563eb] hover:to-[#0f3d7a] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                Send Message →
              </button>
            </div>

            {/* Right Side */}
            <div className="space-y-5">
              {/* Direct Contact */}
              <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-[#0f3d7a]">
                  Direct Contact
                </h3>

                <div className="flex gap-4 mt-6">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <FaPhoneAlt className="text-blue-600 text-sm" />
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-gray-500">PHONE</p>
                    <p className="text-sm font-medium">+91 98765 43210</p>
                    <small className="text-gray-500">Mon-Fri, 8am - 8pm</small>
                  </div>
                </div>

                <hr className="my-5 border-slate-200" />

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <FaEnvelope className="text-blue-600 text-sm" />
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-gray-500">EMAIL</p>
                    <p className="text-sm font-medium">support@athenura.com</p>
                    <small className="text-gray-500">
                      Average response time: 2 hours
                    </small>
                  </div>
                </div>
              </div>

              {/* Headquarters */}
              <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-[#0f3d7a]">
                  Headquarters
                </h3>

                <div className="flex gap-4 mt-6">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-blue-600 text-sm" />
                  </div>

                  <div className="text-sm text-gray-700">
                    RDC Raj Nagar <br />
                    Ghaziabad 
                    Uttar Pradesh
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-lg">
                  <iframe
                    title="map"
                    src="https://www.google.com/maps?q=Mumbai&output=embed"
                    className="w-full h-48 rounded-xl mt-5 border-0"
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;