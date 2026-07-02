import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import validateCheckout from '../utils/validatesCheckout';
import saveOrder from '../utils/saveOrder';
import { getCheckoutData } from "../utils/checkoutStorage";


const OrderSummary = ({ Step, checkoutData }) => {

    const handleConfirm = () => {

        const result = validateCheckout();

        if (!result.success) {
            alert(result.message);
            return;
        }

        saveOrder();
        alert("🎉 Order Confirmed");

    }


    return (
        <>
            {/* Order Summary */}

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:sticky lg:top-24 h-fit"
            >
                <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="w-full rounded-2xl bg-white border border-gray-200 shadow-xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 border-b px-5 py-4 bg-blue-50">
                        <ShoppingBag className="h-5 w-5 text-blue-700" />
                        <h2 className="text-lg font-semibold text-gray-900">
                            Order Summary
                        </h2>
                    </div>

                    {/* Body */}
                    <div className="space-y-3 p-5">

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex justify-between"
                        >
                            <div>
                                <h3 className="font-semibold">Wash & Fold</h3>
                                <p className="text-sm text-gray-500">
                                    15 lbs × $1.50
                                </p>
                            </div>

                            <span className="font-semibold text-blue-900">
                                $22.50
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex justify-between"
                        >
                            <div>
                                <h3 className="font-semibold">Delivery Fee</h3>
                                <p className="text-sm text-gray-500">
                                    Standard Delivery
                                </p>
                            </div>

                            <span className="font-semibold text-blue-900">
                                $4.99
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-2 "
                        >
                            {Step >= 2 && (
                                <div className="flex justify-between items-center gap-2">
                                    <h3 className="font-semibold">Address</h3>


                                    <p className="font-semibold text-blue-900">
                                        {checkoutData.address?.type}
                                    </p>

                                </div>
                            )}

                            {Step >= 3 && (
                                <div>
                                    <div className="flex justify-between items-center gap-2">
                                        <h3 className="font-semibold">Pickup</h3>

                                        <div >
                                            <p className="font-semibold text-blue-900">
                                                {checkoutData.schedule?.date}
                                            </p>
                                            <p className=" text-xs font-semibold text-blue-900">{checkoutData.schedule?.slot}</p>
                                        </div>
                                    </div>


                                    <div className="flex justify-between items-center gap-2 mt-2">
                                        <h3 className="font-semibold">Delivery </h3>
                                        <div>
                                            <p className="font-semibold text-blue-900">{checkoutData.schedule?.deliverySlot?.date}</p>
                                            <p className=" text-xs font-semibold text-blue-900">{checkoutData.schedule?.deliverySlot?.time}</p>
                                        </div>
                                    </div>
                                </div>
                            )}


                            {Step >= 4 && (
                                <div className="flex justify-between items-center gap-2 mt-2">
                                    <h3 className="font-semibold">Payment Method</h3>
                                    <p className="font-semibold text-blue-900">{checkoutData.payment?.method}</p>
                                </div>
                            )}


                        </motion.div>




                        {/* Total */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="rounded-xl bg-blue-50 p-5"
                        >
                            <div className="flex justify-between items-center">

                                <p className="text-lg uppercase font-semibold text-gray-500">
                                    Total
                                </p>

                                <h3 className="text-3xl font-bold text-blue-900">
                                    27.49
                                </h3>



                            </div>
                        </motion.div>

                        {/* Button */}
                        {Step === 4 && (

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={handleConfirm}
                                className="w-full flex justify-center items-center gap-2 rounded-xl bg-blue-900 py-3 text-white font-semibold hover:bg-blue-800 transition"
                            >
                                Confirm Order
                                <ArrowRight size={18} />
                            </motion.button>
                        )}
                        <p className="text-center text-xs text-gray-500">
                            Taxes calculated at checkout based on your location.
                        </p>
                    </div>
                </motion.div>

            </motion.div>
        </>

    )
}

export default OrderSummary;