import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

const AddService = ({ isOpen, onClose, serviceToEdit = null, onSave }) => {

  const initialForm = {
    id: "",
    category: "",
    price: "",
    duration: "",
    status: "Active",
    description: "",
    image: null,
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
  if (serviceToEdit) {
    setFormData({
      id: serviceToEdit.id || "",
      category: serviceToEdit.category || "",
      price: serviceToEdit.price || "",
      duration: serviceToEdit.duration || "",
      status: serviceToEdit.status || "Active",
      description: serviceToEdit.description || "",
      image: serviceToEdit.image || null,
    });
  } else {
    setFormData(initialForm);
  }
}, [serviceToEdit, isOpen]);

  const handleSubmit = (e) => {
  e.preventDefault();

  if (serviceToEdit) {
    onSave({
      ...formData,
      id: serviceToEdit.id,
    });
  } else {
    onSave({
      ...formData,
      id: Date.now(),
    });
  }

  onClose();
};


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
                 {serviceToEdit ? "Edit Service" : "Add New Service"}
              </h2>

              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form className="p-4 md:p-6 space-y-5" onSubmit={handleSubmit}>
              {/* Service Name */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Service Id
                </label>

                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) =>
                    setFormData({ ...formData, id: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-xl"
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Category
                  </label>

                  <select 
                  value={formData.category}
  onChange={(e) =>
    setFormData({
      ...formData,
      category: e.target.value,
    })
  }
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Laundry">Laundry</option>
                    <option value="Dry Cleaning">Dry Cleaning</option>
                    <option value="Ironing">Ironing</option>
                    <option value="Carpet Cleaning">Carpet Cleaning</option>
                    <option value="Curtain Cleaning">Curtain Cleaning</option>
                    <option value="Shoe Cleaning">Shoe Cleaning</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Price ($)
                  </label>

                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-xl"
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
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Status
                  </label>

                  <select 
                   value={formData.status}
  onChange={(e) =>
    setFormData({
      ...formData,
      status: e.target.value,
    })
  }
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-xl"
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
                  {serviceToEdit ? "Update Service" : "Save Service"}
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