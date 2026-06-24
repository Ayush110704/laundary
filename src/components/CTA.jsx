import { ArrowRight, Phone, ShieldCheck,} from "lucide-react";
import { motion } from "framer-motion";

const CTA =( { type, headingtop, headingbottom,subHeading,})=> {
  return (
    <section className="w-full flex justify-center py-16 p-5 md:p-0 mb-10">

      <motion.div
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative md:w-7xl h-auto md:h-[350px] overflow-hidden rounded-3xl "
      >

        {/* Background */}

        <div className="absolute inset-0 bg-linear-to-r from-blue-950 via-blue-900 to-blue-700" />

        {/* Animated circles */}

        <motion.div
          animate={{  y: [0, -12, 0], }}
          transition={{duration: 6, repeat: Infinity,ease: "easeInOut", }}
          className="absolute -left-24 bottom-[-80px] h-72 w-72 rounded-full bg-white/5"
        />

        <motion.div
          animate={{ y: [0, 12, 0], }}
          transition={{duration: 7,repeat: Infinity,ease: "easeInOut", }}
          className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/5"
        />

        {/* Content */}

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 md:px-12 text-center ">

          {/* Badge */}

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            animate={{y: [0, -4, 0],}}
            className="mb-5 mt-4 flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-[10px] md:text-xs font-semibold uppercase tracking-[2px] md:tracking-[3px] text-blue-100"
          >

            <ShieldCheck size={16} />
            Premium {type} Services
          </motion.div>

          {/* Heading */}

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3,}}
            className="max-w-5xl  text-2xl md:text-5xl font-bold leading-tight text-white"
          >
      {headingtop}
            

            <span className="block">
              {headingbottom}
            </span>
          </motion.h2>

          {/* Subtitle */}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, }}
            className="mt-5 max-w-3xl text-sm md:text-lg  leading-tight md:leading-relaxed text-blue-100"
          >         
           {subHeading}         
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, }}
            className="mt-8 md:flex items-center gap-5  mb-5"
          >

            {/* Primary */}

            <motion.button
              whileHover={{y: -5, scale: 1.03, }} 
                whileTap={{ scale: 0.97,}}
              className="group flex items-center gap-3 rounded-2xl bg-white  px-3 md:px-8  py-3 md:py-4 text-md md:text-lg font-semibold text-blue-900 shadow-xl"
            >
              Book Free Pickup

              <motion.div
                animate={{ x: [0, 4, 0],  }}
                transition={{ duration: 1.5,  repeat: Infinity, }}
              >

                <ArrowRight size={20} />
              </motion.div>
            </motion.button>

            {/* Secondary */}
            <motion.button
              whileHover={{  y: -5, scale: 1.03,}}
              whileTap={{ scale: 0.97, }}
              className="flex items-center gap-3 rounded-2xl border mt-4 md:mt-0 border-white/20 bg-white/10  px-9 md:px-8  py-3 md:py-4 mb-4 md:mb-0  text-md md:text-lg font-semibold text-white backdrop-blur-md"
            >
              <Phone size={20} className="hidden md:flex"/>
              Contact Us 
              <Phone size={15} className="md:hidden flex" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default CTA ;