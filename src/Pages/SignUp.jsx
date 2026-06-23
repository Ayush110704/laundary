import React, { useState } from "react";
import { motion } from "framer-motion";
import { Form, Link } from 'react-router-dom';
import  Swal  from 'sweetalert2'
import { User, Mail, Phone, Lock, Eye, EyeOff, MapPin, Shield, Star, } from "lucide-react";

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

  const handleChange = (e) => {

    setText({ ...text, [e.target.name]: e.target.value });
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);

    const existingData = JSON.parse(localStorage.getItem("Users")) || [];
    existingData.push(text);

    setText
    ({
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      Address: "",
      number: ""
    })

    localStorage.setItem("Users", JSON.stringify(existingData));

    Swal.fire({
      title: "Signup Successful!",
      text: "Please login to continue",
      icon: "success",
      confirmButtonColor: "#10b981",
    });
  }



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

            <h1 className="text-5xl font-bold">
              Athenura
            </h1>

            <p className="text-gray-300 mt-2">
              Code. Create. Innovate.
            </p>

          </div>

          <div className="relative z-10">
            <div className="bg-blue-900 p-6 rounded-3xl">

              <img
                src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600"
                alt=""
                className="rounded-2xl h-56 w-full object-cover"
              />

              <p className="mt-6 text-gray-300 leading-8">
                Athenura has transformed our laundry routine. The platform is simple, fast and reliable.
              </p>

              <div className="flex items-center gap-4 mt-6">
                <img
                  src="https://i.pravatar.cc/100"
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                <div>

                  <h3 className="font-semibold"> David Richardson  </h3>
                  <p className="text-sm text-gray-300"> Creative Director</p>

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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-950">
            Create Your Account
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Join the premium laundry experience today.
          </p>

          {/* Names */}

          <form className="" onSubmit={handleSubmit}>

            <div className="grid sm:grid-cols-2 gap-5 mt-8 ">
              {/* <form> */}
              {/* <form onSubmit={handleSubmit}> */}
              <div>
                <label className="font-semibold text-blue-950 text-sm">
                  FIRST NAME
                </label>

                <div className="mt-2 border rounded-xl h-12 flex items-center px-4">
                  <User className="text-gray-400 w-5" />

                  <input
                    type="text"
                    name="FirstName"
                    placeholder="John"
                    className="w-full px-3 outline-none"
                    value={text.FirstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-blue-950 text-sm">
                  LAST NAME
                </label>

                <div className="mt-2 border rounded-xl h-12 flex items-center px-4">
                  <User className="text-gray-400 w-5" />

                  <input
                    type="text"
                    name="LastName"
                    placeholder="Doe"
                    className="w-full px-3 outline-none"
                    value={text.LastName}
                    onChange={handleChange}
                    required
                  />

                </div>
              </div>
            </div>

            {/* Email */}

            <div className="mt-5">

              <label className="font-semibold text-blue-950 text-sm">
                EMAIL ADDRESS
              </label>

              <div className="mt-2 border rounded-xl h-12 flex items-center px-4">
                <Mail className="text-gray-400 w-5" />

                <input
                  type="email"
                  name="Email"
                  placeholder="john@company.com"
                  className="w-full px-3 outline-none"
                  value={text.Email}
                  onChange={handleChange}
                  required
                />

              </div>
            </div>

            {/* Phone */}

            <div className="mt-5">
              <label className="font-semibold text-blue-950 text-sm">
                MOBILE PHONE
              </label>

              <div className="mt-2 border rounded-xl h-12 flex items-center px-4">
                <Phone className="text-gray-400 w-5" />

                <input
                  type="number"
                  name="number"
                  placeholder="+91 9876543210"
                  className="w-full px-3 outline-none"
                  value={text.number}
                  onChange={handleChange}
                  required
                />

              </div>
            </div>

            {/* Password */}

            <div className="mt-5">
              <label className="font-semibold text-blue-950 text-sm">
                CREATE PASSWORD
              </label>

              <div className="mt-2 border rounded-xl h-12 flex items-center px-4">
                <Lock className="text-gray-400 w-5" />

                <input

                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="w-full px-3 outline-none"
                  name="Password"
                  value={text.Password}
                  onChange={handleChange}
                />

                <button onClick={() => setShowPassword(!showPassword)}  >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>

              </div>


            </div>

            {/* Address */}

            <div className="mt-5">
              <label className="font-semibold text-blue-950 text-sm">
                PRIMARY PICKUP ADDRESS
              </label>

              <div className="mt-2 border rounded-xl h-12 flex items-center px-4">
                <MapPin className="text-gray-400 w-5" />

                <input
                  type="text"
                  placeholder="Start typing your address..."
                  className="w-full px-3 outline-none"
                  name="Address"
                  value={text.Address}
                  onChange={handleChange}
                />

              </div>
            </div>

            {/* Terms */}

            <div className="flex gap-3 mt-6">
              <input type="checkbox" />

              <p className="text-xs text-gray-500">I agree to the
                <span className="text-blue-600 font-semibold mx-1">Terms of Service </span>and

                <span className="text-blue-600 font-semibold ml-1">
                  Privacy Policy
                </span>
              </p>
            </div>

            {/* Button */}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-14 rounded-xl bg-blue-900 text-white text-lg font-semibold mt-8"
            > Sign Up</motion.button>
          </form>

          {/* </form> */}
          {/* Divider */}

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 border"></div>
            <p className="text-gray-400 text-sm"> Already have an account? <span className="text-blue-600"><Link to="/login">Login</Link></span> </p>


            <div className="flex-1 border"></div>
          </div>

          <button className="w-full sm:w-auto border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-900 hover:text-white transition">
            Login to your dashboard
          </button>

        </motion.div>
      </motion.div>

      {/* Bottom cards */}

      <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">

        {[
          {
            icon: Shield,
            title: "Secure Signup",
            subtitle: "100% protected",
            bg: "bg-blue-100",
            color: "text-blue-600",
          },

          {
            icon: Star,
            title: "Fast Access",
            subtitle: "Join instantly",
            bg: "bg-green-100",
            color: "text-green-600",
          },

          {
            icon: Star,
            title: "24/7 Support",
            subtitle: "Always available",
            bg: "bg-purple-100",
            color: "text-purple-600",
          },

        ].map((item, index) => {

          const Icon = item.icon;

          return (

            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-5 rounded-2xl shadow flex items-center gap-4"
            >
              <div className={`${item.bg} w-14 h-14 rounded-xl flex justify-center items-center`}>
                <Icon className={`${item.color}`} />
              </div>

              <div>
                <h3 className="font-bold text-blue-950">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          );
        })}

      </div>
    </div>
  );
};

export default SignUp;