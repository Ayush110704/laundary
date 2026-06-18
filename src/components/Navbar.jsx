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

export default Navbar;