
import React from 'react'
import { motion } from 'framer-motion'
import { MoveRight } from 'lucide-react'
import Herobackground from '../assets/Laundry-Service/Herobackground.png'
import HeroVector from '../assets/Laundry-Service/HeroVector.png'
import LaundrySteps from '../assets/Laundry-Service/LaundrySteps.webp'
import Eco from '../assets/Laundry-Service/Eco.webp';
import Wool from '../assets/Laundry-Service/Wool.webp';
import Product from '../assets/Laundry-Service/Product.webp';
import washfold from '../assets/Laundry-Service/washfold.webp'
import washiron from '../assets/Laundry-Service/washiron.webp'
import baby from '../assets/Laundry-Service/baby.webp'
import Curtain from '../assets/Laundry-Service/Curtain.webp'
import winter from '../assets/Laundry-Service/winter.webp'
import woolen from '../assets/Laundry-Service/woolen.webp'
import FabSpecialist from '../assets/Laundry-Service/FabSpecialist.webp'
import HeroCTA from './CTA.jsx'


const features = [
  { id: 1, image: Eco, title: "Eco-Friendly Cleaning Machines ", desc: "Gentle on clothes, kind to the planet. " },
  { id: 2, image: Wool, title: " Certified Wool Care Technology", desc: "Special care for delicate fabrics. " },
  { id: 3, image: FabSpecialist, title: "Expert Fabric Specialists ", desc: "Experience you can trust. " },
  { id: 4, image: Product, title: "Sustainable Cleaning Solutions ", desc: "Clean clothes, cleaner future. " }
]

const services = [
  { id: 1, image: washfold, title: " Wash & Fold", desc: "Get freshly cleaned, neatly folded clothes ready to wear. Our premium wash & fold service ensures gentle care and long-lasting fabric quality. " },
  { id: 2, image: washiron, title: "Wash & Iron ", desc: "Enjoy crisp, wrinkle-free garments with professional steam ironing. Laundrywala ensures your clothes look brand new with expert finishing. " },
  { id: 3, image: woolen, title: " Woolen Laundry", desc: "Keep your woolens soft, fresh, and lint-free with our specialized wool care technology and eco-friendly detergents." },
  { id: 4, image: Curtain, title: "Curtain & Carpet Cleaning ", desc: "Premium dry-cleaning for silk, cotton, velvet, and chenille fabrics. Keep your interiors spotless and allergen-free with Laundrywala’s expert care. " },
  { id: 5, image: baby, title: "Baby Clothes & Toy Cleaning ", desc: "Safe, hygienic wash for babywear and soft toys using dermatologically tested detergents perfect for delicate fabrics and sensitive skin. " },
  { id: 6, image: winter, title: " Winter Wear Laundry", desc: "rofessional cleaning for sweaters, coats, jeans, and pyjamas gentle on fibers, tough on dirt, and designed for freshness that lasts." }
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: "easeOut", },
  },
};




const LaundryService = () => {
  return (
    <>
      <div>
        {/* hero section */}
        <section className='w-full min-h-screen bg-linear-to-b from-blue-400 via-white to to-blue-300 grid grid-cols-2 pt-25'
          style={{
            height: "100vh",
            backgroundImage: `url(${Herobackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className=" h-100 w-full flex justify-center items-center ">
            <div className='h-75 min-w-xl'>
              <motion.h3
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-block text-xs sm:text-sm md:text-base text-blue-600 py-2 px-4 rounded-full bg-gray-200 font-bold"
              >
                ✦ EXPERT CARE
              </motion.h3>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
              >

                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                  }}
                  className="text-4xl md:text-5xl lg:text-6xl mt-5 font-bold text-blue-950" >
                  Professional Laundry
                </motion.h1>

                <motion.h2
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                  }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-950 mt-2" >
                  Service Near You
                </motion.h2>

                <motion.p
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.8 }, },
                  }}
                  className="text-gray-700 text-md mt-8 md:mt-10 font-semibold" >
                  Trusted care for every garment — pickup, clean & deliver.
                </motion.p>

                <motion.button
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7 }, },
                  }}
                  whileHover={{ y: -3, scale: 1.03, }}
                  whileTap={{ scale: 0.97, }}
                  className="group mt-8 md:mt-10 py-3 md:py-5 px-6 md:px-8 rounded-xl bg-blue-900 text-white font-semibold text-base md:text-xl shadow-xl"  >
                  <span className="flex items-center gap-2">
                    Book this Service
                    <motion.div
                      animate={{ x: [0, 5, 0], }}
                      transition={{ duration: 1.5, repeat: Infinity, }} >
                      <MoveRight className="h-5 w-5 mt-1" />
                    </motion.div>
                  </span>
                </motion.button>
              </motion.div>
            </div>

          </div>
          <img
            src={HeroVector}
            className="h-full"
          />
        </section>

        {/* why Choose Us */}

        <div
          className="w-full min-h-screen bg-gradient-to-b from-blue-300 via-blue-100 to-blue-100 py-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold text-blue-950 text-center mb-16 px-4"
          >
            Your Clothes, Our Care
          </motion.h1>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-5 items-center">

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {features.map((item) => (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ duration: 0.25 }}
                  className="bg-gray-50 rounded-2xl p-5 text-center border border-blue-900 shadow-sm hover:shadow-2xl"
                >
                  <div className="flex justify-center">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      whileHover={{ y: -5, rotate: 3 }}
                      transition={{ duration: 0.25 }}
                      className="w-20 h-20"
                    />
                  </div>

                  <h2 className="font-bold mt-3 text-blue-950 text-xl">
                    {item.title}
                  </h2>

                  <p className="mt-3 text-sm text-gray-700">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="flex justify-center"
            >
              <motion.img
                src={LaundrySteps}
                alt="Laundry Process"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-[500px] h-auto"
              />
            </motion.div>

          </div>
        </div>

        {/* types of Service */}
        <section
          className="bg-linear-to-b from-blue-100 via-blue-300 to-white py-16 md:py-20"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-blue-950 px-4"
          >
            Types of Services We Offer
          </motion.h1>

          <div className="w-full flex justify-center mt-12 px-5">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="group bg-white border border-blue-400 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl"
                >
                  <div className="overflow-hidden h-56 sm:h-60 md:h-64">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-blue-950">
                      {service.title}
                    </h2>

                    <p className="mt-4 text-gray-700 text-sm md:text-base leading-7">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

          <HeroCTA 
                type='Laundry'
                headingtop='Laundry Made Simple &'
                headingbottom='Hassle Free'
                subHeading='Professional washing, folding and doorstep delivery for your everyday clothes.'
                 />

      </div>
    </>
  )
}

export default LaundryService