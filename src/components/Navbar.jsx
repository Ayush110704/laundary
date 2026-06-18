import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/Athenura.png";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [userlogin, setUserLogin] = useState(false);

  const menu = [
    { id: "Home", label: "Home", path: "/" },
    { id: "About", label: "About", path: "/about" },
    { id: "Services", label: "Services", path: "/services" },
    { id: "Contact", label: "Contact", path: "/contact" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="h-12 md:h-16 bg-gray-50  shadow-2xl flex justify-between items-center px-6 relative z-50"
      >
        {/* Logo */}
        <Link to="/" className="h-full flex items-center">
          <img
            src={logo}
            alt="logo"
            className="h-10 mt-1 md:h-full md:mt-0"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex font-semibold text-lg gap-10 items-center">
          <ul className="flex gap-6">
            {menu.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className="cursor-pointer transition-all hover:scale-105 hover:text-blue-600"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Login/Profile Button */}
        <button
          onClick={() => setUserLogin(!userlogin)}
          className="hidden md:flex py-1 px-4 bg-blue-600 rounded-3xl text-white cursor-pointer mr-15 hover:bg-blue-700"
        >
          {userlogin ? "Profile" : "Login"}
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
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenu(false)}
                    className="cursor-pointer transition-all hover:text-blue-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="w-full flex justify-center mb-5">
              <button
                onClick={() => {
                  setUserLogin(!userlogin);
                  setMobileMenu(false);
                }}
                className="py-1 px-3 bg-blue-600 rounded-3xl text-white cursor-pointer hover:bg-blue-700"
              >
                {userlogin ? "Profile" : "Login"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;