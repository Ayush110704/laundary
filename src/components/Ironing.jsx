import React from 'react'
import { motion } from 'framer-motion'
import { MoveRight } from 'lucide-react'
import I from '../assets/Ironing.png'
import HeroBackground from '../assets/Iron-Service/HeroBackground.png'
import HeroVector from '../assets/Iron-Service/HeroVector.png'
import CTA from './CTA'

const Ironing = () => {
  return (
    <>
      <div>
        {/* hero section */}
        <section className='w-full min-h-screen bg-linear-to-b from-blue-400 via-white to to-blue-300 grid grid-cols-2 pt-25'
        style={{
                      height: "100vh",
                      backgroundImage: `url(${HeroBackground})`,
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
              <h1 className="text-6xl mt-5 font-bold text-blue-950">
                Expert Ironing
              </h1>
              <h2 className='text-5xl font-bold text-blue-950 mt-2'>Service Near You</h2>

              <p className="text-gray-700 text-md mt-10 font-semibold">Trusted care for every garment — pickup, clean & deliver.</p>

              <button className="group mt-8 md:mt-10 py-3 md:py-5 px-6 md:px-8 rounded-xl bg-blue-900 text-white font-semibold text-base md:text-xl">
                <span className="flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
                  Book this Service
                  <MoveRight className="h-5 w-5 mt-1 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </div>

          </div>
          <img
            src={HeroVector}
            className="h-full"
          />

        </section>

          <CTA 
                type='Ironing'
                headingtop='Perfectly Pressed,'
                headingbottom='Ready To Wear'
                subHeading='Enjoy crisp, wrinkle-free clothes professionally ironed and neatly prepared for every occasion.'
                 />

      </div>
    </>
  )
}

export default Ironing