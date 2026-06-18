import React from 'react';
import { motion } from 'framer-motion';
import manImg from '../assets/hero.webp';
// Import feature icons
import supportIcon from '../assets/customersupport.webp';
import deliveryIcon from '../assets/fastdelivery.webp';
import ecoIcon from '../assets/freshandechofriendly.webp';

function HomePage() {
  // Animation variants for characters
  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Animation for underline
  const underlineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        delay: 0.5,
        ease: "easeInOut"
      }
    }
  };

  // Text for "Near You"
  const nearYouText = "Near You".split("");

  // Feature items with image icons
  const features = [
    { icon: supportIcon, title: 'Customer Support', alt: 'Customer Support' },
    { icon: deliveryIcon, title: 'Super Fast Delivery', alt: 'Super Fast Delivery' },
    { icon: ecoIcon, title: 'Fresh & Eco-Friendly', alt: 'Fresh & Eco-Friendly' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 flex items-center py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Brand Name with Authenura */}
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight"
            >
              <span className="text-blue-600">Laundry</span>
              <span className="block"> Premium Laundry &amp; Dry Cleaning Services</span>
            </motion.h1>
            
            {/* Authenura Badge/Text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-2 inline-block"
            >
              <span className="text-sm sm:text-base md:text-lg font-semibold text-blue-600 bg-white/50 px-4 py-1 rounded-full backdrop-blur-sm">
                ✦ Authenura
              </span>
            </motion.div>
            
            {/* Animated "Near You" with Framer Motion */}
            <div className="mt-4">
              <div className="flex flex-wrap justify-center lg:justify-start gap-0">
                {nearYouText.map((char, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={charVariants}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 inline-block"
                    style={{ 
                      marginRight: char === ' ' ? '0.25rem' : '0',
                      display: 'inline-block'
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </div>
              
              {/* Animated Underline */}
              <div className="flex justify-center lg:justify-start mt-2">
                <svg
                  width="200"
                  height="30"
                  viewBox="0 0 500 150"
                  preserveAspectRatio="none"
                  className="w-48 sm:w-56 md:w-64"
                >
                  <motion.path
                    d="M7.7,145.6C109,125,299.9,116.2,401,121.3C42.1,2.2,87.6,11.8,87.3,25.7"
                    stroke="#3B82F6"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    initial="hidden"
                    animate="visible"
                    variants={underlineVariants}
                  />
                </svg>
              </div>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-base sm:text-lg text-gray-600 mt-4"
            >
              Trusted care for every garment — pickup, clean &amp; deliver.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md transition duration-200 text-center"
              >
                Schedule Your Pickup
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-full shadow-md transition duration-200 text-center"
              >
                See Our Pricing
              </motion.a>
            </motion.div>

            {/* Features Section - Border and Radius on Hover */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="flex flex-col items-center justify-center p-4 transition-all duration-300 cursor-pointer group relative"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110">
                    <img 
                      src={feature.icon} 
                      alt={feature.alt} 
                      loading="lazy"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xs font-semibold text-gray-700 text-center leading-tight">
                    {feature.title}
                  </h3>

                  {/* Border and Radius - Appears on Hover */}
                  <div className="absolute inset-0 rounded-xl border-2 border-sky-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <img 
              src={manImg} 
              alt="Laundry Service" 
              className="w-full max-w-sm md:max-w-md lg:max-w-lg object-contain h-[400px]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;