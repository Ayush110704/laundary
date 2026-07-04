 import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { User, Mail, Phone, Lock, Eye, EyeOff, MapPin } from "lucide-react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [text, setText] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Address: "",
    number: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${text.FirstName} ${text.LastName}`.trim(),
          email: text.Email,
          password: text.Password,
          phone: text.number,
          address: text.Address
        })
      });

      const data = await response.json();

      if (response.ok) {
        await Swal.fire({
          title: "Signup Successful!",
          text: "Please login to continue",
          icon: "success",
          confirmButtonColor: "#10b981",
        });
        setText({ FirstName: "", LastName: "", Email: "", Password: "", Address: "", number: "" });
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.message || "Something went wrong.",
        });
      }
    } catch (error) {
      console.error("Connection error:", error);
      Swal.fire({
        icon: "error",
        title: "Server Unreachable",
        text: "Could not reach the server. Ensure port 5000 is active!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pt-20 pb-10 px-4 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2"
      >
        {/* LEFT SIDE */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex relative bg-blue-950 text-white p-12 flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-60 h-60 rounded-full bg-blue-800 opacity-30 -translate-x-24 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-blue-700 opacity-20 translate-x-20 translate-y-20"></div>
          <div className="relative z-10">
            <h1 className="text-5xl font-bold">Athenura</h1>
            <p className="text-gray-300 mt-2">Code. Create. Innovate.</p>
          </div>
          <div className="relative z-10">
            <div className="bg-blue-900 p-6 rounded-3xl">
              <img src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600" alt="" className="rounded-2xl h-56 w-full object-cover" />
              <p className="mt-6 text-gray-300 leading-8">Athenura has transformed our laundry routine. The platform is simple, fast and reliable.</p>
              <div className="flex items-center gap-4 mt-6">
                <img src="https://i.pravatar.cc/100" alt="" className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="font-semibold">David Richardson</h3>
                  <p className="text-sm text-gray-300">Creative Director</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="p-6 sm:p-8 md:p-10 lg:p-14"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-950">Create Your Account</h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">Join the premium laundry experience today.</p>

          <form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              <div>
                <label className="font-semibold text-blue-950 text-sm">FIRST NAME</label>
                <div className="mt-2 border rounded-xl h-12 flex items-center px-4">
                  <User className="text-gray-400 w-5" />
                  <input type="text" name="FirstName" placeholder="First Name" className="w-full px-3 outline-none" value={text.FirstName} onChange={handleChange} required />
                </div>
              </div>
              <div>
                <label className="font-semibold text-blue-950 text-sm">LAST NAME</label>
                <div className="mt-2 border rounded-xl h-12 flex items-center px-4">
                  <User className="text-gray-400 w-5" />
                  <input type="text" name="LastName" placeholder="Last Name" className="w-full px-3 outline-none" value={text.LastName} onChange={handleChange} required />
                </div>
              </div>
            </div>
            
            <div className="mt-5">
              <label className="font-semibold text-blue-950 text-sm">EMAIL ADDRESS</label>
              <div className="mt-2 border rounded-xl h-12 flex items-center px-4">
                <Mail className="text-gray-400 w-5" />
                <input type="email" name="Email" placeholder="xyz@gmail.com" className="w-full px-3 outline-none" value={text.Email} onChange={handleChange} required />
              </div>
            </div>

            <div className="mt-5">
              <label className="font-semibold text-blue-950 text-sm">MOBILE PHONE</label>
              <div className="mt-2 border rounded-xl h-12 flex items-center px-4">
                <Phone className="text-gray-400 w-5" />
                <input type="tel" name="number" placeholder="+91 9876543210" className="w-full px-3 outline-none" value={text.number} onChange={handleChange} required />
              </div>
            </div>

            <div className="mt-5">
              <label className="font-semibold text-blue-950 text-sm">CREATE PASSWORD</label>
              <div className="mt-2 border rounded-xl h-12 flex items-center px-4">
                <Lock className="text-gray-400 w-5" />
                <input type={showPassword ? "text" : "password"} placeholder="password" className="w-full px-3 outline-none" name="Password" value={text.Password} onChange={handleChange} required />
                <button onClick={() => setShowPassword(!showPassword)} type='button'><Eye /></button>
              </div>
            </div>

            <div className="mt-5">
              <label className="font-semibold text-blue-950 text-sm">PRIMARY PICKUP ADDRESS</label>
              <div className="mt-2 border rounded-xl h-12 flex items-center px-4">
                <MapPin className="text-gray-400 w-5" />
                <input type="text" placeholder="Start typing your address..." className="w-full px-3 outline-none" name="Address" value={text.Address} onChange={handleChange} required />
              </div>
            </div>

            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full h-14 rounded-xl bg-blue-900 text-white text-lg font-semibold mt-8">
              Sign Up
            </motion.button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 border"></div>
            <p className="text-gray-400 text-sm"> Already have an account? <span className="text-blue-600"><Link to="/login">Login</Link></span> </p>
            <div className="flex-1 border"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;