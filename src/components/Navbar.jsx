 
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl font-bold text-[#0f3d7a]">
            ATHENURA.
          </h1>
        </Link>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

          <li>
            <Link
              to="/"
              className="hover:text-blue-600 transition"
            >
              Home
            </Link>
          </li>

          <li>
            <a
              href="#services"
              className="hover:text-blue-600 transition"
            >
              Services
            </a>
          </li>

          <li>
            <a
              href="#about"
              className="hover:text-blue-600 transition"
            >
              About
            </a>
          </li>

          <li>
            <Link
              to="/contact"
              className="hover:text-blue-600 transition"
            >
              Contact
            </Link>
          </li>

        </ul>

        {/* Button */}
        <Link
          to="/contact"
          className="hidden md:flex items-center justify-center px-6 py-3 rounded-xl bg-[#0f3d7a] text-white font-medium hover:bg-blue-700 transition"
        >
          Book Now
        </Link>

      </div>

    </nav>
  );
}
 
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../assets/Athenura.png";
import {Link} from "react-router-dom"

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const[userlogin,setUserLogin]=useState(false);
   

  const menu = [
    { id: "Home", label: "Home" , path:"/" },
    { id: "About", label: "About", path:"/about" },
    { id: "Services", label: "Services" ,path:"/services" },
    { id: "Contact", label: "Contact" ,path:"/contact" },
  ]; 
  


  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="h-12 md:h-16 bg-gray-50 rounded-b-2xl shadow-2xl flex justify-between items-center px-6 relative z-50"
      >
        {/* Logo */}
        <div className="h-full">
          <img
            src={logo}
            alt="logo"
            className="h-10 mt-1 md:h-full md:mt-0"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex font-semibold text-lg gap-10 items-center">
          <ul className="flex gap-6">
            {menu.map((item) => (
              <li key={item.id}>
                <Link
                to={item.path}
                className="  cursor-pointer transition-all hover:scale-105 hover:text-blue-600">{item.label}</Link>
              </li>
            ))}
          </ul>
         
        </div>
           <button 
          onClick={()=>setUserLogin(!userlogin)}
          className="hidden md:flex py-1 px-4 bg-blue-600 rounded-3xl text-white cursor-pointer mr-15 hover:bg-blue-700">
          {userlogin ?"Profile" :"Login"}
        </button>
        

        {/* Mobile Icon */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X /> : <Menu />}
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 45, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute top-0 left-0 w-full bg-white text-blue-500 font-semibold shadow-lg z-40 md:hidden rounded-b-2xl"
          >
            <ul className="flex flex-col items-center gap-5 py-6">
              {menu.map((item) => (
                <li key={item.id}>
                  <button>{item.label}</button>
                </li>
              ))}
            </ul>
            <div className="w-full flex justify-center mb-5">
              <button className="py-1 px-3 bg-blue-600 rounded-3xl text-white cursor-pointer hover:bg-blue-700">
          Login
        </button>
        </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
 

export default Navbar;