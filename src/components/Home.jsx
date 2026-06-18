import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import manImg from '../assets/hero.webp';
// Import feature icons
import supportIcon from '../assets/customersupport.webp';
import deliveryIcon from '../assets/fastdelivery.webp';
import ecoIcon from '../assets/freshandechofriendly.webp';
// Import service background images
import laundryBg from '../assets/laundry.webp';
import dryCleanBg from '../assets/dryclean.webp';
import ironingBg from '../assets/ironing.webp';

// Animated Heading Component with scroll trigger - Same as Near You (word-by-word)
function AnimatedHeading({ isInView }) {
  const text = "Our Services";
  const words = text.split(" ");
  
  const wordVariants = {
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

  return (
    <div className="relative inline-block pb-6">
      {/* Text with word-by-word animation */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-wrap justify-center lg:justify-start gap-1"
      >
        {words.map((word, index) => {
          const isServices = word === "Services";
          return (
            <motion.span
              key={index}
              custom={index}
              variants={wordVariants}
              className={`text-3xl sm:text-4xl md:text-5xl font-bold inline-block ${
                isServices ? 'text-blue-600' : 'text-gray-800'
              }`}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.div>

      {/* Animated Underline - Same as Near You */}
      <svg
        viewBox="0 0 500 120"
        className="w-48 sm:w-56 md:w-64 lg:w-72 absolute -bottom-0 left-0"
        style={{ transform: 'translateY(10px)' }}
      >
        <motion.path
          d="M30 80 C120 60, 260 55, 450 75"
          fill="none"
          stroke="#2563EB"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={{
            pathLength: isInView ? 1 : 0,
            opacity: isInView ? 1 : 0,
          }}
          transition={{
            delay: 0.5,
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}

function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isNearYouInView, setIsNearYouInView] = useState(false);
  const [isServicesInView, setIsServicesInView] = useState(false);
  const [isHowItWorksInView, setIsHowItWorksInView] = useState(false);
  const [nearYouKey, setNearYouKey] = useState(0);
  const [servicesKey, setServicesKey] = useState(0);
  const [howItWorksKey, setHowItWorksKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const nearYouRef = useRef(null);
  const servicesRef = useRef(null);
  const howItWorksRef = useRef(null);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Services data with background images
  const allServices = [
    {
      title: 'Laundry',
      description: 'Enjoy fresh, clean, folded laundry – more time for what matters most.',
      bgImage: laundryBg
    },
    {
      title: 'Dry Cleaning',
      description: 'Refresh your garments with our expert dry cleaning – book now!',
      bgImage: dryCleanBg
    },
    {
      title: 'Ironing',
      description: 'Get wrinkle-free perfection – expert ironing that keeps you looking sharp!',
      bgImage: ironingBg
    },
    {
      title: 'Wash & Fold',
      description: 'Convenient wash and fold service – save time and enjoy fresh clothes.',
      bgImage: laundryBg
    },
    {
      title: 'Steam Cleaning',
      description: 'Gentle steam cleaning for delicate fabrics – safe and effective.',
      bgImage: dryCleanBg
    },
    {
      title: 'Alterations',
      description: 'Professional alterations and repairs – perfect fit guaranteed.',
      bgImage: ironingBg
    }
  ];

  // How It Works steps data
  const howItWorksSteps = [
    {
      step: 'STEP 1',
      title: 'Place your order through App, Website or Call'
    },
    {
      step: 'STEP 2',
      title: 'We pick your clothes in bag'
    },
    {
      step: 'STEP 3',
      title: 'We clean your clothes in Laundromat'
    },
    {
      step: 'STEP 4',
      title: 'Track your Order anytime, anywhere'
    },
    {
      step: 'STEP 5',
      title: 'We deliver fresh, clean, folded clothes'
    }
  ];

  const totalServices = allServices.length;

  // Get visible services based on screen size
  const getVisibleServices = () => {
    if (isMobile) {
      // Show single card on mobile
      return [allServices[currentIndex]];
    } else {
      // Show 3 cards on desktop
      const start = currentIndex;
      const end = start + 3;
      const visible = [];
      for (let i = start; i < end; i++) {
        visible.push(allServices[i % totalServices]);
      }
      return visible;
    }
  };

  const visibleServices = getVisibleServices();

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalServices);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalServices) % totalServices);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Intersection Observer for "Near You" section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsNearYouInView(true);
            setNearYouKey((prev) => prev + 1);
          } else {
            setIsNearYouInView(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    const currentRef = nearYouRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Intersection Observer for "Our Services" section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsServicesInView(true);
            setServicesKey((prev) => prev + 1);
          } else {
            setIsServicesInView(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    const currentRef = servicesRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Intersection Observer for "How It Works" section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHowItWorksInView(true);
            setHowItWorksKey((prev) => prev + 1);
          } else {
            setIsHowItWorksInView(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    const currentRef = howItWorksRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Normal slide variants for carousel
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    })
  };

  return (
    <>
      {/* Hero Section */}
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
              
              {/* Animated "Near You" with Framer Motion - Triggers on every scroll */}
              <div ref={nearYouRef} className="mt-4">
                <motion.div
                  key={nearYouKey}
                  initial="hidden"
                  animate={isNearYouInView ? "visible" : "hidden"}
                  className="flex flex-wrap justify-center lg:justify-start gap-0"
                >
                  {nearYouText.map((char, index) => (
                    <motion.span
                      key={index}
                      custom={index}
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
                </motion.div>
                
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
                      animate={isNearYouInView ? "visible" : "hidden"}
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

            {/* Right Image - Sticked to the end */}
            <div className="flex-1 flex justify-center lg:justify-end self-end lg:self-auto">
              <img 
                src={manImg} 
                alt="Laundry Service" 
                className="w-full max-w-sm md:max-w-md lg:max-w-lg object-contain h-[400px] lg:h-[500px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Services Section - Smooth Carousel */}
      <section ref={servicesRef} className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with Animated Heading - Triggers on every scroll */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-4">
            <AnimatedHeading isInView={isServicesInView} key={servicesKey} />
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={isServicesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-gray-600 max-w-xl px-6 text-left md:text-right pt-2"
            >
              Discover All That Laundrywala Has to Offer – Tailored Cleaning Services for Your Wardrobe.
            </motion.p>
          </div>

          {/* Carousel Container */}
          <div className="relative px-4 md:px-12">
            {/* Previous Button */}
            <motion.button
              onClick={goToPrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Services Grid - Desktop: 3 cards, Mobile: 1 card */}
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-6 overflow-hidden`}>
              <AnimatePresence mode="wait" custom={direction}>
                {visibleServices.map((service, index) => (
                  <motion.div
                    key={`${currentIndex}-${index}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    whileHover={{ 
                      y: -10,
                      scale: 1.03,
                      transition: { duration: 0.2 }
                    }}
                    className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-[420px]"
                    style={{
                      backgroundImage: `url(${service.bgImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/50 transition-all duration-300"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                      <div className="flex items-start gap-3">
                        {/* Vertical Yellow Line */}
                        <motion.div 
                          className="w-1 h-12 bg-yellow-400 rounded-full flex-shrink-0 mt-1"
                          initial={{ height: 0 }}
                          animate={{ height: 48 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        ></motion.div>
                        
                        <div>
                          {/* Service Title */}
                          <motion.h3 
                            className="text-xl font-bold text-white mb-1"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                          >
                            {service.title}
                          </motion.h3>
                          
                          {/* Service Description */}
                          <motion.p 
                            className="text-gray-200 text-xs leading-relaxed line-clamp-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                          >
                            {service.description}
                          </motion.p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Next Button */}
            <motion.button
              onClick={goToNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Dots Pagination */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-2 mt-8"
          >
            {Array.from({ length: totalServices }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? 'bg-blue-600 w-8 h-2.5'
                    : 'bg-gray-300 w-2.5 h-2.5 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl py-8 px-6 border border-sky-100"
          >
            <p className="text-lg sm:text-xl font-semibold text-gray-700">
              Trusted by Nearly <span className="text-blue-600 font-bold">4 Lakhs</span> Happy Customers – 
              <span className="block sm:inline"> Choose Us for Exceptional Care.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isHowItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-6 relative inline-block w-full"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              We Collect, Clean, and Deliver – Laundrywala <br/>Makes{" "}
              <span className="text-blue-600"> Life Easier!</span>
            </h2>
            
            {/* Animated Underline - Same as Our Services */}
            <div className="flex justify-center">
              <svg
                viewBox="0 0 500 120"
                className="w-48 sm:w-56 md:w-64 lg:w-80"
              >
                <motion.path
                  d="M30 80 C120 60, 260 55, 450 75"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{
                    pathLength: 0,
                    opacity: 0,
                  }}
                  animate={{
                    pathLength: isHowItWorksInView ? 1 : 0,
                    opacity: isHowItWorksInView ? 1 : 0,
                  }}
                  transition={{
                    delay: 0.5,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
              </svg>
            </div>
          </motion.div>

          {/* Paragraph from image */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHowItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-gray-600 text-base sm:text-lg max-w-4xl mx-auto mb-16 leading-relaxed"
          >
            At Laundrywala, we offer reliable laundry and dry cleaning services designed to make your life easier. 
            From careful garment handling to on-time delivery at your doorstep, we ensure your clothes are treated 
            with the utmost care and professionalism. Experience the convenience of premium cleaning services with 
            Laundrywala, where every detail is crafted around you.
          </motion.p>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isHowItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-center group"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                </div>

                {/* Step Label */}
                <div className="mt-4">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {step.step}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-sm md:text-base font-semibold text-gray-800 mt-2 leading-relaxed">
                  {step.title}
                </h3>

                {/* Decorative Line */}
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2">
                    <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom Decorative Line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isHowItWorksInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent rounded-full"
          ></motion.div>
        </div>
      </section>

      {/* Dark Navy Blue Line - Full Width */}
      <div className="w-full h-1 bg-[#1A1A4E]"></div>
    </>
  );
}

export default HomePage;