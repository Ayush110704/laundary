import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Shield, Headphones, Zap } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import Image from '../assets/LoginImage.jpeg';
import Swal from 'sweetalert2';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userdata, setUserdata] = useState({
        Email: "",
        Password: ""
    });

    const Navigate = useNavigate();

    const handleChange = (e) => {
        setUserdata({ ...userdata, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // UPDATED URL: Changed from /api/users/login to /api/auth/login
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
                console.log('User logged in successfully via MongoDB:', data);

                const structureUser = {
                    id: data.user.id,
                    FirstName: data.user.name.split(' ')[0],
                    Email: data.user.email,
                    token: data.token
                };

                localStorage.setItem("currentUser", JSON.stringify(structureUser));
                localStorage.setItem("userToken", data.token);

                await Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    text: `Welcome ${structureUser.FirstName}`,
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
            console.error('Login database connection exception:', error);
            Swal.fire({
                icon: "error",
                title: "Server Unreachable",
                text: "Could not connect to the backend server. Make sure port 5000 is active!",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-slate-100 py-7 overflow-x-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-7xl mx-auto px-4"
            >
                <div className="grid lg:grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-2xl">
                    <div className="hidden lg:flex relative bg-blue-950 p-14 text-white flex-col justify-between overflow-hidden">
                        <img src={Image} className="absolute inset-0 w-full h-full object-cover opacity-20" alt="" />
                        <div className="relative z-10">
                            <div>
                                <h1 className="text-5xl font-bold leading-tight">Fresh Clothes,<span className="block text-blue-400">Hassle Free.</span></h1>
                                <p className="mt-5 text-xl text-gray-300 leading-10">Premium laundry and dry cleaning services delivered at your doorstep.</p>
                            </div>
                            <div className="mt-10 space-y-8">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-full bg-blue-800 flex justify-center items-center"><Shield size={28} /></div>
                                    <div>
                                        <h3 className="font-bold text-2xl">Trusted & Secure</h3>
                                        <p className="text-gray-300 text-lg">Your data is safe with us</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-full bg-blue-800 flex justify-center items-center"><Zap size={28} /></div>
                                    <div>
                                        <h3 className="font-bold text-2xl">Quick & Easy</h3>
                                        <p className="text-gray-300 text-lg">Login and get started instantly</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-full bg-blue-800 flex justify-center items-center"><Headphones size={28} /></div>
                                    <div>
                                        <h3 className="font-bold text-2xl">Best Support</h3>
                                        <p className="text-gray-300 text-lg">We're available 24/7</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center px-6 sm:px-10 lg:px-16 py-12">
                        <div className="w-full max-w-xl">
                            <h1 className="text-3xl md:text-5xl font-bold text-blue-950">Welcome Back</h1>
                            <p className="text-gray-500 text-sm md:text-lg mt-1 ml-1 md:mt-3">Please enter your details to sign in.</p>
                            
                            <form onSubmit={handleLogin}>
                                <div className="mt-6">
                                    <label className="font-bold text-blue-950 tracking-wide">EMAIL</label>
                                    <div className="mt-2 flex items-center border border-gray-300 rounded-2xl px-5 h-12">
                                        <Mail className="text-gray-400" />
                                        <input type="email" name="Email" value={userdata.Email} placeholder="name@company.com" onChange={handleChange} required className="w-full px-4 outline-none" />
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label className="font-bold text-blue-950 tracking-wide">PASSWORD</label>
                                    <div className="mt-2 flex items-center border border-gray-300 rounded-2xl px-5 h-12">
                                        <Lock className="text-gray-400" />
                                        <input type={showPassword ? "text" : "password"} placeholder="••••••••" name="Password" value={userdata.Password} onChange={handleChange} required className="w-full px-4 outline-none" />
                                        <button onClick={() => setShowPassword(!showPassword)} type="button">{showPassword ? <EyeOff /> : <Eye />}</button>
                                    </div>
                                </div>

                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={isLoading} className="w-full h-14 bg-blue-900 text-white rounded-2xl mt-8 text-xl font-semibold" type="submit">
                                    {isLoading ? "Verifying..." : "Login"}
                                </motion.button>
                            </form>

                            <p className="text-center mt-8 text-gray-500">
                                Don't have an account?
                                <span className="text-blue-600 font-semibold cursor-pointer ml-2"><Link to="/signup">Sign Up</Link></span>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;