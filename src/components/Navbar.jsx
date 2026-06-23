import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/Athenura.png";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [userlogin, setUserLogin] = useState(false);
  const [hover, setHover] = useState(false);
  const [showServices, setShowServices] = useState(false);

  const menu = [
    { id: "Home", label: "Home", path: "/" },
    { id: "About", label: "About", path: "/about" },
    {
      id: "Services", label: "Services", path: "/services",

      dropdown: [
        { label: "Laundry Service", path: "/services/Laundry-service" },

        { label: "Dry Cleaning", path: "/services/DryClean-service" },

        { label: "Ironing", path: "/services/Ironing-service" },

        { label: "Carpet Cleaning", path: "/services/CarpetCleaning-service" },

        { label: "Shoe Cleaning", path: "/services/ShoeCleaning-service" },

        { label: "Curtain Cleaning", path: "/services/CurtainCleaning-service" },

      ],

    },
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
              <li key={item.id} className=" group">
                {item.dropdown ? (
                  <>
                    <Link to={item.path} className="flex items-center  gap-1 hover:text-blue-600"

                    >
                      {item.label}
                      <span className="text-xs flex items-center"> <ChevronDown size={20} className="mt-1 transition-transform duration-600 group-hover:rotate-180" /></span>
                    </Link>

                    <div className="absolute top-12 left-170 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
                      {item.dropdown.map((service) => (
                        <Link
                          key={service.path}
                          to={service.path}
                          className="block px-5 py-2 text-[15px] hover:bg-blue-50 hover:text-blue-600"
                        >
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link to={item.path} className="hover:text-blue-600">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Login/Profile Button */}
        <button
         
          className="hidden md:flex py-1 px-4 bg-blue-600 rounded-3xl text-white cursor-pointer mr-15 hover:bg-blue-700"
        >
         <Link to="/login">Login</Link>
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
                <li key={item.id} className="w-full text-center">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => setShowServices(!showServices)}
                        className="flex items-center justify-center gap-2 w-full hover:text-blue-600"
                      >
                        {item.label}
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-300 ${showServices ? "rotate-180" : ""}`}
                        />
                      </button>
                      {showServices && (
                        <div className="mt-3 flex flex-col rounded-2xl bg-gray-100 ">
                          {item.dropdown.map((service) => (
                            <Link
                              key={service.path}
                              to={service.path}
                              onClick={() => {
                                setMobileMenu(false);
                                setShowServices(false);
                              }}
                              className="py-3 hover:bg-blue-50 hover:text-blue-600"
                            >
                              {service.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenu(false)}
                      className="hover:text-blue-600"
                    >
                      {item.label}
                    </Link>
                  )}
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