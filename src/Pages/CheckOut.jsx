import { useState } from "react";
import { CheckCircle2, ArrowRight,MapPin, Clock, User, Home } from "lucide-react";
import { motion,AnimatePresence } from "framer-motion";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import BookingApplyForm from '../Pages/BookingApplyForm';
import Address from '../components/Address';
import OrderSummary from '../components/OrderSummary';
import Schedule from '../components/Schedule';
import Payment from '../components/Payment';


const CheckOut = () => {

  const [currentStep, setCurrentStep] = useState(1);
 

  const steps = [
    { id: 1, title: "Form" },
    { id: 2, title: "Address" },
    { id: 3, title: "Schedule" },
    { id: 4, title: "Payment" },
  ];

  
  return (
    <>
      <div className="w-full min-h-screen pt-18 flex justify-center mt-10">

        {/* main section */}
        <section className="w-full  ">
          <div className="max-w-6xl mx-auto p-6">

            {/* Steps div */}
            <div className="relative mb-10">
              {/* Background Line */}
              <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-blue-700 rounded-full transition-all duration-500"
                  style={{
                    width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                  }}
                />
              </div>

              <div className="relative flex justify-between">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold transition-all duration-300
                ${step.id < currentStep
                          ? "bg-blue-700 border-blue-700 text-white"
                          : step.id === currentStep
                            ? "bg-white border-blue-700 text-blue-700"
                            : "bg-white border-gray-300 text-gray-500"
                        }`}
                    >
                      {step.id < currentStep ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        step.id
                      )}
                    </div>

                    <p
                      className={`mt-2 text-xs md:text-sm font-medium ${step.id <= currentStep
                          ? "text-blue-700"
                          : "text-gray-500"
                        }`}
                    >
                      {step.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            {currentStep === 1 && (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

//   {/* LEFT SECTION */}
//   <motion.div
//     initial={{ opacity: 0, x: -40 }}
//     whileInView={{ opacity: 1, x: 0 }}
//     viewport={{ once: true }}
//     transition={{ duration: 0.5 }}
//     className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
//   >
//     <div className="flex items-center justify-between mb-6">
//       <div>
//         <h2 className="text-2xl font-bold text-blue-900">
//           Selected Items
//         </h2>
//         <p className="text-gray-500">
//           Review your selected garments.
//         </p>
//       </div>
//     </div>

//     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//       {selectedItems.map((item, index) => (
//         <motion.div
//           key={item.id}
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: index * 0.1 }}
//           whileHover={{ y: -6 }}
//           className="bg-blue-50 border border-blue-100 rounded-2xl p-5"
//         >
//           <div className="flex justify-between">
//             <div className="bg-blue-100 p-3 rounded-xl">
//               <Shirt className="text-blue-700" />
//             </div>

//             <button className="text-red-500 hover:bg-red-100 p-2 rounded-lg">
//               <Trash2 size={18} />
//             </button>
//           </div>

//           <h3 className="mt-5 text-xl font-semibold text-blue-900">
//             {item.name}
//           </h3>

//           <div className="mt-5 space-y-3">
//             <div className="flex justify-between">
//               <span className="text-gray-500">
//                 Fabric
//               </span>

//               <span className="font-semibold">
//                 {item.fabric}
//               </span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-gray-500">
//                 Service
//               </span>

//               <span className="font-semibold text-blue-700">
//                 {item.service}
//               </span>
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   </motion.div>

//   {/* RIGHT SECTION */}
//   <motion.div
//     initial={{ opacity: 0, x: 40 }}
//     whileInView={{ opacity: 1, x: 0 }}
//     viewport={{ once: true }}
//     transition={{ duration: 0.5 }}
//     className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 h-fit lg:sticky lg:top-24"
//   >
//     <h2 className="text-2xl font-bold text-blue-900">
//       Add Item
//     </h2>

//     <p className="text-gray-500 mb-6">
//       Add a garment to your order.
//     </p>

//     <div className="space-y-5">

//       {/* Item Name */}
//       <div>
//         <label className="block mb-2 font-medium">
//           Item Name
//         </label>

//         <input
//           type="text"
//           placeholder="e.g. Shirt"
//           className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"
//         />
//       </div>

//       {/* Fabric */}
//       <div>
//         <label className="block mb-2 font-medium">
//           Fabric
//         </label>

//         <select className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none">
//           <option>Select Fabric</option>
//           <option>Cotton</option>
//           <option>Denim</option>
//           <option>Silk</option>
//           <option>Wool</option>
//           <option>Linen</option>
//           <option>Polyester</option>
//         </select>
//       </div>

//       {/* Service */}
//       <div>
//         <label className="block mb-2 font-medium">
//           Service Needed
//         </label>

//         <select className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none">
//           <option>Select Service</option>
//           <option>Wash & Fold</option>
//           <option>Wash & Iron</option>
//           <option>Dry Cleaning</option>
//           <option>Ironing</option>
//         </select>
//       </div>

//       <motion.button
//         whileHover={{ scale: 1.03 }}
//         whileTap={{ scale: 0.95 }}
//         className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
//       >
//         + Add Item
//       </motion.button>

//     </div>
//   </motion.div>

// </div>
<BookingApplyForm/>
            )}

            {currentStep === 2 && (
                 <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">

  {/* Left Section */}
<Address/>  

  {/* Order Summary */}
 <OrderSummary/>
</div>
            )}

            {currentStep === 3 && (
               <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left */}
       <Schedule />

        {/* Right */}
        <OrderSummary />
      </div>
    </div>
            )}

            {currentStep === 4 && (
               <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left */}
       <Payment/>

        {/* Right */}
        <OrderSummary/>

      </div>
    </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between mt-8">
              <button
                disabled={currentStep === 1}
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-6 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
              >
                Previous
              </button>

              <button
                disabled={currentStep === 4}
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="px-6 py-2 rounded-lg bg-blue-700 text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </section>





      </div>

    </>
  )
}

export default CheckOut