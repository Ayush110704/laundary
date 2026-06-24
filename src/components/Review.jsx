import React from 'react'
import {Star,Minus,} from 'lucide-react'
import {motion} from 'framer-motion'



const Review = () => {

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

  const containerVariants = {
    hidden: {},
    visible: {
      transition:
        { staggerChildren: 0.12, },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.7, },
    },
  };


  return (
    <>
      <div className="w-full bg-blue-50 py-16 md:py-24 bg-linear-to-b from-white via-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <h1 className="text-3xl md:text-4xl font-semibold text-blue-950">
              Customers Review
            </h1>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="h-5 w-5 fill-blue-900 text-blue-900"
                />
              ))}
              <p className="ml-2 text-lg md:text-xl font-bold text-blue-900">
                4.9/5
              </p>
            </div>
          </div>

          {/* Review Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-blue-900 text-blue-900"
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="italic text-base md:text-lg text-gray-700 leading-7">
                  {review.review}
                </p>

                {/* Name */}
                <p className="flex items-center mt-6 font-medium text-blue-950">
                  <Minus />
                  {review.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    
    </>
  )
}

export default Review;