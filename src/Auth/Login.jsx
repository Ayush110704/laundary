import React, { useState , useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Shield, Headphones, Zap, ShoppingBasket } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import logo from '../assets/Athenura.png'
import {Link, useNavigate} from 'react-router-dom'
import Image from '../assets/LoginImage.jpeg'
import Swal from 'sweetalert2'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [userdata, setUserdata] = useState({
        Email: "",
        Password: ""
    })

    const Navigate = useNavigate();

    const handleChange = (e) => {
        setUserdata({...userdata, [e.target.name]: e.target.value})
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userdata.Email,
                    password: userdata.Password
                })
            });

            const data = await response.json();

                if (data.success) {
    // UPDATED: Added _id from data.user
    const userObj = {
        // Ensure this matches the field name from your server response
        _id: data.user.id || data.user._id, 
        FirstName: data.user.firstName,
        LastName: data.user.lastName,
        Email: data.user.email,
        // ... rest of your fields
        
        number: data.user.phone,
        Address: data.user.address || '',
        token: data.token,
        role: data.user.role
    };
                localStorage.setItem("currentUser", JSON.stringify(userObj));

                await Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    text: `Welcome ${userObj.FirstName}`,
                });

                Navigate("/");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: data.message || "Invalid email or password",
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Could not connect to the authentication server.",
            });
        }
    }

    return (
        <div className="w-full min-h-screen bg-slate-100 py-7 overflow-x-hidden">

            {/* Main Container */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-7xl mx-auto px-4"
            >
                <div className="grid lg:grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-2xl">
                    {/* Left Side - Decorative Section */}
                    <div className="hidden lg:flex relative bg-blue-950 p-14 text-white flex-col justify-between overflow-hidden">
                        <img
                            src={Image}
                            className="absolute inset-0 w-full h-full object-cover opacity-20"
                            alt=""
                        />
                        <div className="relative z-10">
                            {/* Heading */}
                            <div className="">
                                <h1 className="text-5xl font-bold leading-tight">
                                    Fresh Clothes,
                                    <span className="block text-blue-400">
                                        Hassle Free.
                                    </span>
                                </h1>

                                <p className="mt-5 text-xl text-gray-300 leading-10">
                                    Premium laundry and dry cleaning services delivered at your doorstep.
                                </p>
                            </div>

                            {/* Features */}
                            <div className="mt-10 space-y-8">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-full bg-blue-800 flex justify-center items-center">
                                        <Shield size={28} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-2xl">Trusted & Secure</h3>
                                        <p className="text-gray-300 text-lg">Your data is safe with us</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-full bg-blue-800 flex justify-center items-center">
                                        <Zap size={28} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-2xl">Quick & Easy</h3>
                                        <p className="text-gray-300 text-lg">Login and get started instantly</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-full bg-blue-800 flex justify-center items-center">
                                        <Headphones size={28} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-2xl">Best Support</h3>
                                        <p className="text-gray-300 text-lg">We're available 24/7</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="flex items-center justify-center px-6 sm:px-10 lg:px-16 py-12">
                        <div className="w-full max-w-xl">
                            <h1 className="text-3xl md:text-5xl font-bold text-blue-950">Welcome Back</h1>
                            <p className="text-gray-500 text-sm md:text-lg mt-1 ml-1 md:mt-3">
                                Please enter your details to sign in.
                            </p>
                            
                            
                            <form onSubmit={handleLogin}>
                                {/* Email */}
                                <div className="mt-6">
                                    <label className="font-bold text-blue-950 tracking-wide">
                                        EMAIL
                                    </label>
                                    <div className="mt-2 flex items-center border border-gray-300 rounded-2xl px-5 h-12">
                                        <Mail className="text-gray-400" />
                                        <input
                                            type="email"
                                            name="Email"
                                            value={userdata.Email}
                                            placeholder="name@company.com"
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="mt-5">
                                    <label className="font-bold text-blue-950 tracking-wide">
                                        PASSWORD
                                    </label>
                                    <div className="mt-2 flex items-center border border-gray-300 rounded-2xl px-5 h-12">
                                        <Lock className="text-gray-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            name="Password"
                                            value={userdata.Password}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 outline-none"
                                        />
                                        <button
                                            onClick={() => setShowPassword(!showPassword)}
                                            type="button"
                                        >
                                            {showPassword ? (<EyeOff />) : (<Eye />)}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex justify-between items-center mt-6">
                                    <label className="flex items-center gap-1 md:gap-3">
                                        <input type="checkbox" />
                                        <span className="text-gray-600 text-sm md:text-base">
                                            Remember Me
                                        </span>
                                    </label>
                                   <Link to="/forgot-password"> <button className="font-semibold text-blue-600 text-sm" type="button">
                                        Forgot Password?
                                    </button></Link>
                                </div>

                                {/* Login Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full h-10 md:h-14 bg-blue-900 text-white rounded-2xl mt-5 text-lg md:text-xl font-semibold"
                                    type="submit"
                                >
                                    Login
                                </motion.button>
                            </form>

                            {/* Divider */}
                            <div className="flex items-center gap-4 my-5">
                                <div className="flex-1 border" />
                                <p className="font-semibold text-gray-500 text-md md:text-base">
                                    OR CONTINUE WITH
                                </p>
                                <div className="flex-1 border" />
                            </div>

                            {/* Social Login Buttons */}
                            <div className="grid sm:grid-cols-2 gap-5">
                                <button className="border rounded-2xl h-12 md:h-14 font-semibold text-lg hover:bg-slate-100">
                                    Google
                                </button>
                                <button className="border rounded-2xl h-12 md:h-14 font-semibold text-lg hover:bg-slate-100">
                                    iOS
                                </button>
                            </div>

                            {/* Signup Link */}
                            <p className="text-center mt-8 md:mt-10 text-gray-500">
                                Don't have an account?
                                <span className="text-blue-600 font-semibold cursor-pointer ml-2">
                                    <Link to="/signup">Sign Up</Link>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;