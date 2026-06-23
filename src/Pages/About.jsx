import React from "react";
import {
  FaLeaf,
  FaClock,
  FaShieldAlt,
  FaCheckCircle,
  FaStar,
  FaBullseye,
  FaEye,
  FaGem,
} from "react-icons/fa";
import { motion } from "framer-motion";

import heroImg from "../assets/1stimg.png";
import storyImg from "../assets/3rdimg.png";
import whoWeAreImg from "../assets/WhoWeWere.png";
import team1 from "../assets/Footimg1.png";
import team2 from "../assets/Footimg2.png";
import team3 from "../assets/Footimg3.png";
import team4 from "../assets/Footimg4.png";

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

const whoWeAreCards = [
  {
    icon: <FaBullseye className="text-white text-lg" />,
    title: "Our Mission",
    desc: "To deliver premium laundry care with clinical hygiene, seamless pickup and delivery, and a customer experience built on trust, precision, and consistency.",
    color: "bg-[#0B4EA2]",
  },
  {
    icon: <FaGem className="text-white text-lg" />,
    title: "Our Focus",
    desc: "We focus on fabric-safe cleaning, eco-conscious processes, and dependable service that saves time while keeping every garment fresh, soft, and expertly maintained.",
    color: "bg-[#00A6A6]",
  },
  {
    icon: <FaEye className="text-white text-lg" />,
    title: "Our Vision Ahead",
    desc: "To become the most trusted modern laundry brand by combining smart technology, sustainable care, and a premium experience in every city we serve.",
    color: "bg-[#0B4EA2]",
  },
];

const teamMembers = [
  { img: team1, name: "Sarah Chen", role: "Operations Director" },
  { img: team2, name: "Marcus Miller", role: "Master Textile Specialist" },
  { img: team3, name: "Elena Rodriguez", role: "Customer Success Lead" },
  { img: team4, name: "David Park", role: "Logistics Coordinator" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
};

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

        <div className="absolute inset-0 bg-gradient-to-r from-[#0b4ea2]/35 via-[#0b4ea2]/10 to-black/30" />

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
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[#0B4EA2] font-semibold uppercase tracking-[0.18em] text-sm mb-4">
                Our Story
              </p>

              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0C3C88] leading-tight mb-8">
                Born from a passion for perfection.
              </h2>

              <p className="text-gray-700 leading-8 text-lg mb-6">
                Founded in 2024, Athenura started with a simple observation:
                the modern professional deserves more than just “clean” laundry.
                They deserve precision. We combined high-tech logistics with
                artisanal garment care to create a seamless experience for those
                who value convenience, hygiene, and quality in every detail.
              </p>

              <p className="text-gray-700 leading-8 text-lg">
                Today, we continue to raise the standard of laundry care with
                dependable service, fabric-specific expertise, and a commitment
                to making premium garment care effortless for every household.
              </p>
            </motion.div>

            <motion.div
              className="flex justify-center lg:justify-end"
              variants={fadeUp}
              initial="hidden"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl max-w-[560px]">
                <img
                  src={storyImg}
                  alt="Our Story"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="relative bg-gradient-to-br from-[#EEF4FB] via-white to-[#F7FBFF] py-20 md:py-24 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-52 h-52 bg-[#0B4EA2]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#00A6A6]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[#0B4EA2] font-semibold uppercase tracking-[0.18em] text-sm mb-4">
                Who We Are
              </p>

              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0C3C88] leading-tight mb-6">
                More than a laundry service — a promise of care.
              </h2>

              <p className="text-gray-700 leading-8 text-lg mb-10 max-w-2xl">
                At Athenura, we are a modern garment-care brand built on trust,
                precision, and convenience. We don’t just wash clothes — we
                preserve fabrics, protect quality, and simplify daily life for
                our customers. From doorstep pickup to careful cleaning and
                professional finishing, every step is designed to give your
                garments premium care while giving you more time for what truly
                matters.
              </p>

              <div className="grid md:grid-cols-3 gap-5">
                {whoWeAreCards.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white border border-[#E4EAF2] rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: index * 0.12 }}
                    whileHover={{ y: -6 }}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center shadow-md mb-5`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#0B4EA2] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-7 text-[15px]">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              variants={fadeUp}
              initial="hidden"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="relative rounded-[30px] overflow-hidden shadow-2xl border border-white/60">
                <img
                  src={whoWeAreImg}
                  alt="Who We Are"
                  className="w-full h-[650px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B4EA2]/20 via-transparent to-transparent" />
              </div>
            </motion.div>
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
              <motion.div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.12 }}
                whileHover={{ y: -6 }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
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
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3"
              variants={fadeUp}
              initial="hidden"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="px-4 py-2 rounded-full bg-[#F3F7FF] text-[#0B4EA2] font-semibold text-sm flex items-center gap-2">
                <FaCheckCircle />
                ISO Certified
              </div>
              <div className="px-4 py-2 rounded-full bg-[#F3F7FF] text-[#0B4EA2] font-semibold text-sm flex items-center gap-2">
                <FaStar />
                5-Star Care
              </div>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;
