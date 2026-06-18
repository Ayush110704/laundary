import React from 'react'
import heroVideo from '../assets/ServiceVideo.mp4'
import ServiceImageDesktop from '../assets/ServiceImage.png'
import ServiceImageMobile from '../assets/ServiceImageMobile.png'
import Ironing from '../assets/Ironing.webp'
import Warehouse from '../assets/Warehouse.png'
import { motion } from 'framer-motion'
import { CircleCheck, Star, Minus, MoveRight, Clock3, Leaf } from 'lucide-react';
import { useState } from 'react';

const Services = () => {

  const [hoveredId, setHoveredId] = useState(false);



  const price = [
    {
      id: 1, title: "Everyday Wear", price: "$6.50", includes: [
        { id: 1, type: "Shirts & Blouses" },
        { id: 2, type: "Trousers & Skirts" },
        { id: 3, type: "Standard Stain Removal" }]
    },
    {
      id: 2, title: "Suits & Outerwear", price: "$18.00", includes: [
        { id: 1, type: "2 Piece Suits" },
        { id: 2, type: "Heavy Winter Coats" },
        { id: 3, type: "Silk & Velvet Handling" }
      ]
    },
    {
      id: 3, title: "Beeding & Linens", price: "$24.00", includes: [
        { id: 1, type: "Comforters & Duvets" },
        { id: 2, type: "Curtains & Drapery" },
        { id: 3, type: "Deep Sanitize Cycle" }]
    }
  ]

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      review:
        "Excellent service! My clothes came back perfectly cleaned, folded, and delivered on time. Highly recommended.",
      location: "New York",
    },
    {
      id: 2,
      name: "Michael Brown",
      rating: 5,
      review:
        "The pickup and delivery process was super convenient. Their stain removal service is impressive.",
      location: "Chicago",
    },
    {
      id: 3,
      name: "Emma Wilson",
      rating: 4,
      review:
        "Very professional staff and affordable pricing. My shirts looked brand new after washing.",
      location: "Los Angeles",
    },
    {
      id: 4,
      name: "Daniel Miller",
      rating: 5,
      review:
        "Fast turnaround and great customer support. This has become my go-to laundry service.",
      location: "Seattle",
    }

  ];


  return (
    <>
      <div className=" w-full min-h-screen md:pt-12 ">
        {/* hero section */}
        <div
          style={{
            height: "100vh",
            backgroundImage: `url(${window.innerWidth < 768 ? ServiceImageMobile : ServiceImageDesktop})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}

        >

          <div className="absolute inset-0 md:mt-12 bg-black/30 z-10 min-h-screen"></div>

          <div className="relative z-20 min-h-screen flex  items-center md:text-center">

            <div className="w-full max-w-3xl px-6 sm:px-10 lg:px-20  md:mt-0">

              <motion.h3
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className=" inline-block text-xs sm:text-sm md:text-base  text-blue-600 py-2 px-4 rounded-full  bg-gray-200 "
              >
                ✦ PREMIUM CARE
              </motion.h3>

              <h1
                className=" mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold  text-blue-900 leading-tight "
              >
                Professional Dry
                <br />
                Cleaning
              </h1>

              <p
                className=" mt-6 text-sm sm:text-base md:text-lg  text-gray-200 leading-5 max-w-xl">
                Preserving the integrity of your most delicate fabrics
                with eco-friendly solvents and expert craftsmanship.
              </p>

              <button
                className=" group mt-8 md:mt-10 py-3 md:py-5 px-6 md:px-8 rounded-xl  bg-blue-900  text-white font-semibold text-base md:text-xl ">
                <span
                  className=" flex items-center gap-2 transition-transform duration-300 group-hover:scale-105 "
                >
                  Book this Service

                  <MoveRight
                    className="  h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 "
                  />
                </span>
              </button>

            </div>

          </div>

          {/* mid section */}

          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* LEFT SECTION */}

              <div>

                <h1 className="text-3xl md:text-4xl font-bold text-blue-950">
                  The Freshness Journey
                </h1>

                <p className="text-gray-600 text-base md:text-lg mt-6 leading-7">
                  Our signature multi-stage process ensures that every
                  garment receives a clinical level of cleanliness
                  without compromising fabric quality.
                </p>

                <div className="mt-10 space-y-8">

                  {/* Step 1 */}

                  <div className="flex gap-4 md:gap-6">

                    <div className="flex flex-col items-center">

                      <div className="h-10 w-10 rounded-full bg-teal-900 text-white flex items-center justify-center font-bold">

                        1

                      </div>

                      <div className="h-16 md:h-20 w-px bg-gray-300 mt-4"></div>

                    </div>

                    <div>

                      <h3 className="text-xl md:text-2xl font-bold text-blue-950">

                        Inspection & Pre-treatment

                      </h3>

                      <p className="text-gray-600 text-sm md:text-lg mt-2">

                        Identifying fabric types and targeting individual stains.

                      </p>

                    </div>

                  </div>

                  {/* Step 2 */}

                  <div className="flex gap-4 md:gap-6">

                    <div className="flex flex-col items-center">

                      <div className="h-10 w-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold">

                        2

                      </div>

                      <div className="h-16 md:h-20 w-px bg-gray-300 mt-4"></div>

                    </div>

                    <div>

                      <h3 className="text-xl md:text-2xl font-bold text-blue-950">

                        Solvent-Free Cleaning

                      </h3>

                      <p className="text-gray-600 text-sm md:text-lg mt-2">

                        Eco-friendly technology that lifts dirt while preserving color.

                      </p>

                    </div>

                  </div>

                  {/* Step 3 */}

                  <div className="flex gap-4 md:gap-6">

                    <div className="flex flex-col items-center">

                      <div className="h-10 w-10 rounded-full border border-blue-900 text-blue-900 flex items-center justify-center font-bold">

                        3

                      </div>

                    </div>

                    <div>

                      <h3 className="text-xl md:text-2xl font-bold text-blue-950">

                        Steam Finishing

                      </h3>

                      <p className="text-gray-600 text-sm md:text-lg mt-2">

                        Restoring the garment's shape and professional silhouette.

                      </p>

                    </div>

                  </div>

                </div>

              </div>

              {/* CENTER SECTION */}

              <div className="space-y-6">

                <img
                  src={Ironing}
                  alt="Ironing"
                  className=" h-60 md:h-72 w-full rounded-2xl object-cover shadow-2xl "
                />

                <div className="border border-gray-300 rounded-2xl p-6 md:p-8 bg-gray-100">

                  <Clock3
                    className="text-blue-900 mb-4"
                    size={28}
                  />

                  <h3 className="text-2xl md:text-3xl font-semibold text-blue-950">

                    Turnaround

                  </h3>

                  <p className="text-gray-600 text-base md:text-xl mt-4">

                    Standard: 48 Hours

                  </p>

                  <p className="text-gray-600 text-base md:text-xl">

                    Express: Next Day Delivery

                  </p>

                </div>

              </div>

              {/* RIGHT SECTION */}

              <div className="space-y-6">

                <div
                  className=" bg-teal-800 text-white p-6 md:p-8 rounded-2xl shadow-xl "
                >

                  <Leaf size={28} />

                  <h3 className="text-2xl md:text-3xl mt-4">

                    Eco-Wash™

                  </h3>

                  <p
                    className=" text-base md:text-lg mt-4 leading-7 "
                  >

                    Our proprietary biodegradable solvents are
                    hypoallergenic and 100% biodegradable.

                  </p>

                </div>

                <img
                  src={Warehouse}
                  alt="Warehouse"
                  className=" h-72 md:h-80  w-full rounded-2xl object-cover shadow-xl "
                />

              </div>

            </div>

          </div>

          {/* pricing */}

          <div className="w-full py-16 md:py-24">

            {/* Heading */}

            <div className="text-center px-6">

              <h1
                className=" text-3xl md:text-4xl lg:text-5xl text-blue-900 font-semibold "
              >
                Transparent Pricing
              </h1>

              <p
                className=" mt-4 text-sm  md:text-lg  text-gray-600 max-w-2xl mx-auto "
              >
                Premium care without the premium guesswork.
                All prices include complimentary pickup.
              </p>

            </div>

            {/* Cards */}

            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 mt-14">

              <div
                className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 "
              >

                {price.map((item) => (

                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}

                    className=" group w-full min-h-[350px] border  border-gray-300 rounded-2xl p-6  bg-blue-50 text-start transition-all duration-300 hover:scale-105 hover:shadow-2xl  hover:border-blue-900  hover:bg-wh"
                  >

                    <h2 className="font-semibold text-lg">

                      {item.title}

                    </h2>

                    <h1
                      className=" mt-4 text-3x md:text-4x font-bol  text-blue-900 "
                    >

                      {item.price}

                      <span
                        className=" text-sm font-normal  text-gray-600 "
                      >
                        /item
                      </span>

                    </h1>

                    <ul className="mt-8 space-y-3">

                      {item.includes.map((include) => (

                        <li
                          key={include.id}

                          className=" flex items-center gap-2 text-gray-700 font-semibold text-sm md:text-base "
                        >

                          <CircleCheck
                            className=" h-5 w-5  text-blue-950 shrink-0 "
                          />

                          {include.type}

                        </li>

                      ))}

                    </ul>

                    <div className="mt-10 flex justify-center">

                      <button

                        className=" w-full md:w-56  py-3 rounded-xl border  border-blue-950  text-blue-950 font-semibold text-base md:text-lg transition-all duration-500  group-hover:bg-blue-900  group-hover:text-white "

                      >

                        {hoveredId === item.id
                          ? "Book Now"
                          : "Select Tier"}

                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* Customers Review */}
          <div className="w-full bg-blue-50 py-16 md:py-24 mt-10">

            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

              {/* Header */}

              <div
                className=" flex flex-col md:flex-row justify-between items-start md:items-center gap-6 "
              >

                <h1
                  className=" text-3xl md:text-4xl font-semibold  text-blue-950 "
                >
                  Customers Review
                </h1>

                <div className="flex items-center gap-1">

                  {[...Array(5)].map((_, index) => (

                    <Star
                      key={index}
                      className=" h-5 w-5  fill-blue-900  text-blue-900 "
                    />

                  ))}

                  <p
                    className="  ml-2 text-lg md:text-xl font-bold  text-blue-900 "
                  >
                    4.9/5
                  </p>

                </div>

              </div>

              {/* Review Cards */}

              <div
                className=" mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 "
              >

                {reviews.map((review) => (

                  <div
                    key={review.id}

                    className="  bg-white border  border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 "
                  >

                    {/* Stars */}

                    <div className="flex gap-1 mb-4">

                      {Array.from({
                        length: review.rating
                      }).map((_, index) => (

                        <Star
                          key={index}
                          className=" h-4 w-4  fill-blue-900  text-blue-900 "
                        />

                      ))}

                    </div>

                    {/* Review */}

                    <p
                      className=" italic text-base md:text-lg  text-gray-700 leading-7 "
                    >

                      {review.review}

                    </p>

                    {/* Name */}

                    <p
                      className=" flex items-center mt-6 font-medium  text-blue-950 "
                    >

                      <Minus />

                      {review.name}

                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default Services;