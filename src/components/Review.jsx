import React, { useEffect, useRef } from 'react'
import { Star, Minus } from 'lucide-react'
import { motion } from 'framer-motion'

const Review = () => {

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      review:
        "Excellent service! My clothes came back perfectly cleaned, folded, and delivered on time. Highly recommended.",
    },
    {
      id: 2,
      name: "Michael Brown",
      rating: 4,
      review:
        "The pickup and delivery process was super convenient. Their stain removal service is impressive.",
    },
    {
      id: 3,
      name: "Emma Wilson",
      rating: 4,
      review:
        "Very professional staff and affordable pricing. My shirts looked brand new after washing.",
    },
    {
      id: 4,
      name: "Daniel Miller",
      rating: 5,
      review:
        "Fast turnaround and great customer support. This has become my go-to laundry service.",
    },
    {
      id: 5,
      name: "Jessica Taylor",
      rating: 5,
      review:
        "Absolutely love this service! They handle delicate fabrics with care and always return my items smelling fresh.",
    },
    {
      id: 6,
      name: "David Clark",
      rating: 4,
      review:
        "Reliable and punctual. The online booking system is very user-friendly and the quality is consistently good.",
    },
    {
      id: 7,
      name: "Amanda White",
      rating: 5,
      review:
        "Best laundry service in town! They even remembered my preferences for folding and packaging. Truly personalized service.",
    },
    {
      id: 8,
      name: "Robert Green",
      rating: 4,
      review:
        "Great value for money. My clothes are always perfectly pressed and the customer service team is very responsive.",
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

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollInterval;
    let isHovering = false;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!isHovering && scrollContainer) {
          // Scroll by one card width
          const cardWidth = scrollContainer.querySelector('.review-card')?.offsetWidth || 0;
          const gap = 24; // gap-6 = 24px
          const scrollAmount = cardWidth + gap;
          
          // Check if we've reached the end
          if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10) {
            // Smooth scroll back to start
            scrollContainer.scrollTo({
              left: 0,
              behavior: 'smooth'
            });
          } else {
            scrollContainer.scrollBy({
              left: scrollAmount,
              behavior: 'smooth'
            });
          }
        }
      }, 3000); // Scroll every 3 seconds
    };

    const stopAutoScroll = () => {
      clearInterval(scrollInterval);
    };

    // Pause scrolling on hover
    const handleMouseEnter = () => {
      isHovering = true;
      stopAutoScroll();
    };

    const handleMouseLeave = () => {
      isHovering = false;
      startAutoScroll();
    };

    // Start auto-scrolling
    startAutoScroll();

    // Add event listeners
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      stopAutoScroll();
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Duplicate reviews for infinite scroll effect
  const duplicatedReviews = [...reviews, ...reviews];

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

          {/* Review Cards - Horizontal Scrolling */}
          <div 
            ref={scrollContainerRef}
            className="mt-12 overflow-x-auto scrollbar-hide cursor-grab"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <motion.div 
              className="flex gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ width: 'max-content' }}
            >
              {duplicatedReviews.map((review, index) => (
                <motion.div
                  key={`${review.id}-${index}`}
                  className="review-card bg-white border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                  variants={cardVariants}
                  style={{ width: '280px', flexShrink: 0 }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <Star
                        key={index}
                        className="h-4 w-4 fill-blue-900 text-blue-900"
                      />
                    ))}
                    {/* Empty stars for ratings less than 5 */}
                    {Array.from({ length: 5 - review.rating }).map((_, index) => (
                      <Star
                        key={`empty-${index}`}
                        className="h-4 w-4 text-gray-300"
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="italic text-base md:text-lg text-gray-700 leading-7 flex-grow">
                    {review.review}
                  </p>

                  {/* Name - Footer */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="flex items-center font-medium text-blue-950">
                      <Minus className="h-4 w-4 mr-2" />
                      {review.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-8 flex justify-center gap-2">
            <div className="h-2 w-8 bg-blue-900 rounded-full"></div>
            <div className="h-2 w-2 bg-blue-300 rounded-full"></div>
            <div className="h-2 w-2 bg-blue-300 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  )
}

export default Review;