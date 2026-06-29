

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import {getCheckoutData,saveCheckoutData,} from "../utils/checkoutStorage";

const AddressForm =({ isOpen, onClose, onSave,}) =>{
  const [formData, setFormData] = useState({
    type: "Home",
    name: "",
    phone: "",
    address: "",
    default: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const address = {id: Date.now(),...formData,};

  // Existing callback
  onSave(address);

  // Save under current user
  const users = JSON.parse(localStorage.getItem("Users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const updatedUsers = users.map((user) => {
    if (user.Email === currentUser.Email) {
      return {
        ...user,
        addresses: [...(user.addresses || []), address],
      };
    }

    return user;
  });

  localStorage.setItem("Users", JSON.stringify(updatedUsers));

  const updatedCurrentUser = {
    ...currentUser,
    addresses: [...(currentUser.addresses || []), address],
  };

  localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));

  // Reset form
  setFormData({
    type: "Home",
    name: "",
    phone: "",
    address: "",
    default: false,
  });

  onClose();
};

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">

              {/* Header */}
              <div className="flex items-center justify-between border-b p-6">
                <h2 className="text-2xl font-bold text-blue-900">
                  Add New Address
                </h2>

                <button
                  onClick={onClose}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="p-6 space-y-5"
              >
                {/* Address Type */}
                <div>
                  <label className="font-medium text-gray-700">
                    Address Type
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border p-3 focus:border-blue-600 outline-none"
                  >
                    <option>Home</option>
                    <option>Work</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Name + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-medium text-gray-700">
                      Address Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Address 1"
                      className="mt-2 w-full rounded-xl border p-3 focus:border-blue-600 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-medium text-gray-700">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      className="mt-2 w-full rounded-xl border p-3 focus:border-blue-600 outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="font-medium text-gray-700">
                    Full Address
                  </label>

                  <textarea
                    rows={4}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter complete address..."
                    className="mt-2 w-full rounded-xl border p-3 resize-none focus:border-blue-600 outline-none"
                    required
                  />
                </div>

                {/* Default */}
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="default"
                    checked={formData.default}
                    onChange={handleChange}
                    className="h-5 w-5"
                  />

                  <span className="text-gray-700">
                    Make this my default address
                  </span>
                </label>

                {/* Buttons */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto rounded-xl border px-6 py-3 font-medium hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-auto rounded-xl bg-blue-700 px-6 py-3 font-medium text-white hover:bg-blue-800"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default AddressForm