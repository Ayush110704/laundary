import React from 'react'
import { ServicesData } from '../Data/LaundaryData.js'
import { useParams } from "react-router-dom"
import { motion } from 'framer-motion'
import HeroCTA from './CTA.jsx'
import { MoveRight } from 'lucide-react'
import Eco from '../assets/Laundry-Service/Eco.webp';
import Wool from '../assets/Laundry-Service/Wool.webp';
import Product from '../assets/Laundry-Service/Product.webp';
import FabSpecialist from '../assets/Laundry-Service/FabSpecialist.webp'

const ServicePage = () => {

  const { service } = useParams();
  const data = ServicesData[service];

  const { Hero, WhyUs, ServiceOffered, CTA, Servicetitle,ExpertService,ExpertTitle } = data;

  console.log(data);

  const features = [
    { id: 1, image: Eco, title: "Eco-Friendly Cleaning Machines ", desc: "Gentle on clothes, kind to the planet. " },
    { id: 2, image: Wool, title: " Certified Wool Care Technology", desc: "Special care for delicate fabrics. " },
    { id: 3, image: FabSpecialist, title: "Expert Fabric Specialists ", desc: "Experience you can trust. " },
    { id: 4, image: Product, title: "Sustainable Cleaning Solutions ", desc: "Clean clothes, cleaner future. " }
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




  return (
    <>
      <div>
        {/* hero section */}
        <section className='w-full min-h-screen  grid grid-cols-2 pt-25'
          style={{
            height: "100vh",
            backgroundImage: `url(${Hero.HeroBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="  w-full flex justify-center  ">
            <div className='h-75 min-w-xl '>
              <motion.h3
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-block text-xs sm:text-sm md:text-base text-blue-600 py-2 px-4 rounded-full bg-gray-200 font-bold"
              >
                {Hero.HeroBadge}
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
                  className="text-4xl md:text-5xl lg:text-6xl mt-5 font-bold text-blue-950 font-serif w-lg" >
                  {Hero.HeroTitle}
                </motion.h1>

                <motion.h2
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                  }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mt-5 font-serif" >
                  {Hero.HeroSub}
                </motion.h2>

                <motion.p
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.8 }, },
                  }}
                  className="text-gray-700 text-md mt-8 md:mt-10 font-semibold" >
                  {Hero.HeroPara}
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
            src={Hero.HeroVector}
            className="h-full"
          />
        </section>

        {/* types of Service */}

       {ServiceOffered.length >0 && (
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
            Types of {Servicetitle} Services We Offer
          </motion.h1>

          <div className="w-full flex justify-center mt-12 px-5">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {ServiceOffered.map((item) => (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="group bg-white border border-blue-400 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl"
                >
                  <div className="overflow-hidden h-56 sm:h-60 md:h-64">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-blue-950">
                      {item.title}
                    </h2>

                    <p className="mt-4 text-gray-700 text-sm md:text-base leading-7">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        )}







        {/* why Choose Us */}

        <div
          className="w-full min-h-screen bg-linear-to-b from-white via-blue-200 to-blue-100 py-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold text-blue-950 text-center mb-16 px-4"
          >
            {WhyUs.title}
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
                src={WhyUs.image}
                alt="Laundry Process"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-[500px] h-auto"
              />
            </motion.div>

          </div>
        </div>


        {/* Expert Service */}
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
           {ExpertTitle} 
          </motion.h1>

          <div className="w-full flex justify-center mt-12 px-5">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {ExpertService.map((item) => (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="group bg-white border border-blue-400 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl"
                >
                  <div className="overflow-hidden h-56 sm:h-60 md:h-48">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-blue-950">
                      {item.title}
                    </h2>

                    <p className="mt-4 text-gray-700 text-sm md:text-sm leading-7">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
           
            
          </div>
           <div className="w-full flex justify-center ">
           <motion.button
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7 }, },
                  }}
                  whileHover={{ y: -3, scale: 1.03, }}
                  whileTap={{ scale: 0.97, }}
                  className="group mt-8 md:mt-10 py-3 md:py-5 px-6 md:px-8 rounded-full bg-linear-to-r from-blue-900 via-blue-600 to-blue-400 text-white font-semibold text-base md:text-xl shadow-xl"  >
                  <span className="flex items-center gap-2">
                    Schedule Pickup
                    
                  </span>
                </motion.button>
                </div>
        </section>



        <HeroCTA
          type={CTA.type}
          headingtop={CTA.headingtop}
          headingbottom={CTA.headingbottom}
          subHeading={CTA.subHeading}
        />
      </div>
    </>
  )
}

export default ServicePage