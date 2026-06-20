import React from "react";
import {
  FaLeaf,
  FaClock,
  FaShieldAlt,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";

import heroImg from "../assets/1stimg.png";
import storyImg from "../assets/3rdimg.png";
import team1 from "../assets/FirstImg.png";
import team2 from "../assets/2ndimg.png";
import team3 from "../assets/3rdimg.png";
import team4 from "../assets/Lastimg.png";

const values = [
  {
    icon: <FaShieldAlt className="text-[#0B4EA2] text-xl" />,
    title: "Clinical Hygiene",
    desc: "Our facilities operate at industry-grade standards, ensuring every fiber is sanitized and fresh.",
  },
  {
    icon: <FaLeaf className="text-[#00A6A6] text-xl" />,
    title: "Eco-First Care",
    desc: "We use 100% biodegradable detergents and water-recycling technologies to minimize our footprint.",
  },
  {
    icon: <FaClock className="text-[#0B4EA2] text-xl" />,
    title: "Zero Friction",
    desc: "Time is your most valuable asset. We optimize every step to ensure your laundry is a background task.",
  },
];

const teamMembers = [
  {
    img: team1,
    name: "Sarah Chen",
    role: "Operations Director",
  },
  {
    img: team2,
    name: "Marcus Miller",
    role: "Master Textile Specialist",
  },
  {
    img: team3,
    name: "Elena Rodriguez",
    role: "Customer Success Lead",
  },
  {
    img: team4,
    name: "David Park",
    role: "Logistics Coordinator",
  },
];

const About = () => {
  return (
    <section className="bg-white text-gray-900">
      {/* HERO SECTION */}
      <section className="relative w-full h-[85vh] min-h-[620px] overflow-hidden">
        <img
          src={heroImg}
          alt="Laundry Hero"
          className="w-full h-full object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b4ea2]/35 via-[#0b4ea2]/10 to-black/30"></div>

        {/* hero content */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-center max-w-4xl text-white">
            <h2 className="text-5xl md:text-7xl font-serif font-semibold mb-4 tracking-wide">
              Athenura
            </h2>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">
              Redefining Cleanliness
            </h1>
            <p className="text-base md:text-2xl leading-8 text-white/95 max-w-3xl mx-auto">
              Where clinical precision meets personal care. Discover the mastery
              of the nation’s most trusted garment care service.
            </p>
          </div>
        </div>

        {/* stats card */}
        <div className="absolute right-8 bottom-10 md:right-16 md:bottom-16 bg-white rounded-2xl shadow-2xl p-6 w-[230px]">
          <h3 className="text-4xl font-extrabold text-[#0B4EA2] mb-2">1M+</h3>
          <p className="text-gray-700 leading-7 text-[15px]">
            Garments trusted with expert care since 2024.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="bg-[#F4F5F8] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* left */}
            <div>
              <p className="text-[#0B4EA2] font-semibold uppercase tracking-[0.18em] text-sm mb-4">
                Our Story
              </p>

              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0C3C88] leading-tight mb-8">
                Born from a passion for perfection.
              </h2>

              <p className="text-gray-700 leading-8 text-lg mb-6">
                Founded in 2024, Athenura started with a simple observation:
                the modern professional deserves more than just “clean”
                laundry. They deserve precision. Their belief banked on every
                single day. We combined high-tech logistics with artisanal
                genius to create a seamless experience for those who take pride
                in the little things.
              </p>

              <p className="text-gray-700 leading-8 text-lg">
                Today, we operate across 12 cities, maintaining the same
                rigorous standards of clinical hygiene and environmental
                responsibility that we started with in our first micro-hub.
              </p>
            </div>

            {/* right image */}
            <div className="flex justify-center lg:justify-end">
              <div className="rounded-2xl overflow-hidden shadow-xl max-w-[560px]">
                <img
                  src={storyImg}
                  alt="Our Story"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-[#EEF2F7] py-20 md:py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-[#0B4EA2] font-semibold uppercase tracking-[0.18em] text-sm mb-3">
              Core Values
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Built on Trust and Efficiency
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition"
              >
                <div className="w-14 h-14 rounded-xl bg-[#EDF4FF] flex items-center justify-center mb-6">
                  {item.icon}
                </div>

                <h3
                  className={`text-2xl font-bold mb-4 ${
                    item.title === "Eco-First Care"
                      ? "text-[#00A6A6]"
                      : "text-[#0B4EA2]"
                  }`}
                >
                  {item.title}
                </h3>

                <p className="text-gray-700 text-lg leading-8">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <div>
              <p className="text-[#0B4EA2] font-semibold uppercase tracking-[0.18em] text-sm mb-3">
                Our Team
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Meet the Freshness Experts
              </h2>
              <p className="text-gray-700 text-lg leading-8 max-w-2xl">
                Our staff undergoes 120+ hours of expert care training before
                touching a single customer garment.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 rounded-full bg-[#F3F7FF] text-[#0B4EA2] font-semibold text-sm flex items-center gap-2">
                <FaCheckCircle />
                ISO Certified
              </div>
              <div className="px-4 py-2 rounded-full bg-[#F3F7FF] text-[#0B4EA2] font-semibold text-sm flex items-center gap-2">
                <FaStar />
                5-Star Care
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="rounded-2xl overflow-hidden shadow-sm">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-[340px] object-cover grayscale group-hover:grayscale-0 transition duration-500"
                  />
                </div>

                <h3 className="text-2xl font-bold text-[#0B4EA2] mt-5">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-lg mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;