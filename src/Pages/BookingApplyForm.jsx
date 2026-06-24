import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  Clock3,
  Shirt,
  Wallet,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";

const BookingApplyForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    serviceType: "",
    pickupDate: "",
    pickupTime: "",
    quantity: "",
    instructions: "",
    paymentMethod: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const cardBase =
    "rounded-[22px] sm:rounded-[28px] border border-white/60 bg-white/85 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)]";

  const inputStyle =
    "w-full rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white px-4 py-3 sm:py-3.5 text-sm sm:text-base text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100";

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid 10 digit number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter valid email address";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Pickup address is required";
    }

    if (!formData.serviceType) {
      newErrors.serviceType = "Select service type";
    }

    if (!formData.pickupDate) {
      newErrors.pickupDate = "Pickup date is required";
    }

    if (!formData.pickupTime) {
      newErrors.pickupTime = "Pickup time is required";
    }

    if (!formData.quantity.toString().trim()) {
      newErrors.quantity = "Enter clothes quantity";
    } else if (Number(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Select payment method";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (submitted) setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Booking Submitted:", formData);
    setSubmitted(true);

    setFormData({
      fullName: "",
      phone: "",
      email: "",
      address: "",
      serviceType: "",
      pickupDate: "",
      pickupTime: "",
      quantity: "",
      instructions: "",
      paymentMethod: "",
    });

    setErrors({});
  };

  const FieldLabel = ({ icon: Icon, label, required = false }) => (
    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
        <Icon size={16} />
      </span>
      <span className="leading-5">
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </span>
    </label>
  );

  const ErrorText = ({ message }) =>
    message ? <p className="mt-2 text-sm text-rose-500">{message}</p> : null;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.12),transparent_22%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_24%),linear-gradient(180deg,#f8fbff_0%,#eef5fb_100%)] px-3 pb-8 pt-20 text-slate-800 sm:px-5 sm:pt-24 lg:px-8 lg:pt-28">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={`${cardBase} overflow-hidden`}
        >
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 px-4 py-6 text-white sm:px-6 sm:py-8 md:px-8">
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-white/10 blur-2xl sm:h-32 sm:w-32" />
            <div className="absolute bottom-0 left-6 h-16 w-16 rounded-full bg-white/10 blur-xl sm:left-10 sm:h-20 sm:w-20" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white/95 backdrop-blur sm:text-xs">
                <ClipboardList size={14} />
                Booking Apply Form
              </div>

              <h2 className="text-xl font-bold sm:text-2xl md:text-3xl">
                Schedule Pickup Request
              </h2>

              <p className="mt-2 max-w-2xl px-1 text-sm leading-6 text-white/90 sm:text-base">
                Fill your details below and submit your laundry booking request.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-6 flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700 sm:flex-row sm:items-start"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="font-bold">Booking submitted successfully!</p>
                    <p className="text-sm text-emerald-600">
                      Our team will review and confirm your pickup shortly.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Details */}
              <section>
                <div className="mb-5 flex items-start gap-3 sm:items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                      Personal Details
                    </h3>
                    <p className="text-sm text-slate-500">
                      Enter your basic contact information
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                  <div>
                    <FieldLabel icon={User} label="Full Name" required />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      className={inputStyle}
                    />
                    <ErrorText message={errors.fullName} />
                  </div>

                  <div>
                    <FieldLabel icon={Phone} label="Phone Number" required />
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter 10 digit phone number"
                      className={inputStyle}
                    />
                    <ErrorText message={errors.phone} />
                  </div>

                  <div>
                    <FieldLabel icon={Mail} label="Email Address" required />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      className={inputStyle}
                    />
                    <ErrorText message={errors.email} />
                  </div>

                  <div>
                    <FieldLabel icon={Shirt} label="Service Type" required />
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className={inputStyle}
                    >
                      <option value="">Select service</option>
                      <option value="Wash & Fold">Wash & Fold</option>
                      <option value="Dry Cleaning">Dry Cleaning</option>
                      <option value="Premium Laundry">Premium Laundry</option>
                      <option value="Ironing">Ironing</option>
                    </select>
                    <ErrorText message={errors.serviceType} />
                  </div>
                </div>
              </section>

              {/* Pickup Details */}
              <section>
                <div className="mb-5 flex items-start gap-3 sm:items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                      Pickup Details
                    </h3>
                    <p className="text-sm text-slate-500">
                      Add pickup location, date and time
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                  <div className="md:col-span-2">
                    <FieldLabel icon={MapPin} label="Pickup Address" required />
                    <textarea
                      name="address"
                      rows={4}
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House no, street, landmark, city..."
                      className={inputStyle}
                    />
                    <ErrorText message={errors.address} />
                  </div>

                  <div>
                    <FieldLabel
                      icon={CalendarDays}
                      label="Pickup Date"
                      required
                    />
                    <input
                      type="date"
                      name="pickupDate"
                      min={today}
                      value={formData.pickupDate}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                    <ErrorText message={errors.pickupDate} />
                  </div>

                  <div>
                    <FieldLabel icon={Clock3} label="Pickup Time" required />
                    <input
                      type="time"
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                    <ErrorText message={errors.pickupTime} />
                  </div>
                </div>
              </section>

              {/* Order Details */}
              <section>
                <div className="mb-5 flex items-start gap-3 sm:items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                      Order Details
                    </h3>
                    <p className="text-sm text-slate-500">
                      Quantity, payment and any special notes
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                  <div>
                    <FieldLabel
                      icon={ClipboardList}
                      label="Clothes Quantity"
                      required
                    />
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="e.g. 12"
                      className={inputStyle}
                    />
                    <ErrorText message={errors.quantity} />
                  </div>

                  <div>
                    <FieldLabel icon={Wallet} label="Payment Method" required />
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className={inputStyle}
                    >
                      <option value="">Select payment method</option>
                      <option value="Cash on Delivery">Cash on Delivery</option>
                      <option value="UPI">UPI</option>
                      <option value="Card">Card</option>
                      <option value="Wallet">Wallet</option>
                    </select>
                    <ErrorText message={errors.paymentMethod} />
                  </div>

                  <div className="md:col-span-2">
                    <FieldLabel
                      icon={ClipboardList}
                      label="Special Instructions"
                    />
                    <textarea
                      name="instructions"
                      rows={4}
                      value={formData.instructions}
                      onChange={handleChange}
                      placeholder="Any special notes for washing, pickup, stain care, delicate fabric handling..."
                      className={inputStyle}
                    />
                  </div>
                </div>
              </section>

              {/* Submit */}
              <div className="pt-2">
                <motion.button
                  whileTap={{ scale: 0.985 }}
                  whileHover={{ y: -2 }}
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_16px_40px_rgba(14,165,233,0.30)] transition sm:rounded-2xl sm:py-4 sm:text-base"
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 transition group-hover:opacity-100" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <CheckCircle2 size={18} />
                    Submit Booking
                  </span>
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingApplyForm;