import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

 const AddService =({ isOpen, onClose })=> {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 md:p-5"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md md:max-w-xl lg:max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-4 md:px-6 py-4 border-b">
              <h2 className="text-xl md:text-2xl font-bold text-blue-900">
                Add New Service
              </h2>

              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form className="p-4 md:p-6 space-y-5">
              {/* Service Name */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Service Name
                </label>

                <input
                  type="text"
                  placeholder="Enter service name"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Category
                  </label>

                  <select className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Wash & Fold</option>
                    <option>Dry Cleaning</option>
                    <option>Ironing</option>
                    <option>Carpet Cleaning</option>
                    <option>Curtain Cleaning</option>
                    <option>Shoe Cleaning</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Price ($)
                  </label>

                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Duration & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Service Duration
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. 24 Hours"
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Status
                  </label>

                  <select className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  rows="4"
                  placeholder="Enter service description..."
                  className="w-full px-4 py-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Service Image
                </label>

                <input
                  type="file"
                  className="w-full border rounded-xl px-4 py-3 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-100 file:px-4 file:py-2 file:text-blue-900"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-blue-900 text-white rounded-xl font-medium hover:bg-blue-800 transition"
                >
                  Save Service
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddService;