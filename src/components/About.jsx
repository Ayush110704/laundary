import aboutImg1 from "../assets/AboutLoundryimage.png";
import aboutImg2 from "../assets/AboutsectionTWO.png";
import { motion } from "framer-motion";

function About() {
  return (
    <section className="bg-[#D9EEFF] py-24">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#D9EEFF] via-white to-[#EAF4FF] py-28">

        {/* Background Blur */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center bg-white px-5 py-2 rounded-full text-[#2563EB] font-semibold shadow-lg mb-6">
                ✦ About Us
              </span>

              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                <span className="text-slate-900">About</span>{" "}
                <span className="text-blue-600">Laundrywala</span>
              </h1>

              <div className="w-40 h-1.5 bg-blue-600 rounded-full mt-6 mb-8"></div>

              <p className="text-slate-600 text-xl leading-relaxed mb-6">
                India's trusted laundry and dry-cleaning platform offering premium garment care.
              </p>

              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Advanced cleaning technology, eco-friendly detergents and expert fabric care.
              </p>

              <div className="flex gap-4 flex-wrap">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition duration-300 shadow-xl">
                  Schedule Pickup
                </button>

                <button className="bg-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition">
                  Learn More
                </button>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
              <img
                src={aboutImg1}
                alt="Laundrywala"
                className="w-full max-w-xl lg:max-w-2xl object-cover rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:scale-[1.02] transition-all duration-500"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* WHO WE ARE SECTION */}
      <section className="relative py-28 bg-white overflow-hidden">

        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-4 rounded-[40px] shadow-2xl">
                <img
                  src={aboutImg2}
                  alt="Laundrywala Team"
                  className="w-full h-[550px] object-cover rounded-[30px]"
                />
              </div>
            </motion.div>

            {/* CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-600 font-semibold mb-6">
                ✦ Who We Are
              </span>

              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-8">
                Redefining Laundry <span className="text-blue-600">Care in India</span>
              </h2>

              <p className="text-lg text-slate-600 mb-6">
                Laundrywala is India's trusted laundry and dry-cleaning platform.
              </p>

              <p className="text-lg text-slate-600 mb-10">
                We ensure eco-friendly and premium garment care for every fabric.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">

                {[
                  ["Doorstep Service", "Pickup and delivery at your convenience."],
                  ["Eco-Friendly", "Safe detergents and sustainable processes."],
                  ["Premium Care", "Expert treatment for every fabric type."],
                  ["Fast Delivery", "Quick turnaround without compromising quality."]
                ].map(([title, desc], i) => (
                  <div
                    key={i}
                    className="bg-[#EFF6FF] border border-[#BFDBFE] p-5 rounded-2xl shadow-sm hover:shadow-lg hover:bg-[#DBEAFE] transition duration-300"
                  >
                    <h4 className="font-bold text-xl mb-2 text-[#2563EB]">
                      {title}
                    </h4>
                    <p className="text-slate-600">{desc}</p>
                  </div>
                ))}

              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </section>
  );
}

export default About;