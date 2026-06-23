import React from "react";
import AthenuraLogo from "../assets/Athenura.png";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer border-t border-gray-200 bg-gray-50">
      {/* Bubbles */}
      <span className="bubble b1"></span>
      <span className="bubble b2"></span>
      <span className="bubble b3"></span>
      <span className="bubble b4"></span>
      <span className="bubble b5"></span>

      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Brand */}
          <div>
            <img
              src={AthenuraLogo}
              alt="Athenura Logo"
              className="w-56 h-auto"
            />
            <p className="mt-5 text-gray-500 text-sm leading-7 max-w-[250px]">
              Your trusted laundry and dry cleaning partner. Premium garment
              care with free pickup and fast doorstep delivery.
            </p>
            
            <div className="flex gap-3 mt-5">
              <div className="group w-10 h-10 rounded-full bg-white shadow flex items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-[#1877F2]">
                <FaFacebookF className="text-[#1877F2] group-hover:text-white" />
              </div>

              <div className="group w-10 h-10 rounded-full bg-white shadow flex items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-[#0A66C2]">
                <FaLinkedinIn className="text-[#0A66C2] group-hover:text-white text-lg" />
              </div>

              <div className="group w-10 h-10 rounded-full bg-white shadow flex items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5]">
                <FaInstagram className="text-[#E4405F] group-hover:text-white text-lg" />
              </div>

              <div className="group w-10 h-10 rounded-full bg-white shadow flex items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-red-500">
                <FaYoutube className="text-[#FF0000] group-hover:text-white" />
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold text-[#0f3d7a] mb-4">
              Services
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="hover:text-blue-600 cursor-pointer duration-300">
                Wash & Fold
              </li>
              <li className="hover:text-blue-600 cursor-pointer duration-300">
                Dry Cleaning
              </li>
              <li className="hover:text-blue-600 cursor-pointer duration-300">
                Shoe Cleaning
              </li>
              <li className="hover:text-blue-600 cursor-pointer duration-300">
                Steam Ironing
              </li>
              <li className="hover:text-blue-600 cursor-pointer duration-300">
                Express Delivery
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xl font-semibold text-[#0f3d7a] mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>
                <Link to="/about" className="hover:text-blue-600 cursor-pointer">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 cursor-pointer">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/franchise" className="hover:text-blue-600 cursor-pointer">
                  Franchise
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-blue-600 cursor-pointer">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-blue-600 cursor-pointer">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-blue-600 cursor-pointer">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-[#0f3d7a] mb-4">
              Contact Us
            </h3>
            <div className="space-y-4 text-gray-600 text-sm">
              <div className="flex gap-3 items-start">
                <FaEnvelope className="text-blue-600 mt-1" />
                <span>support@athenura.com</span>
              </div>

              <div className="flex gap-3 items-start">
                <FaPhoneAlt className="text-green-600 mt-1" />
                <span>+91 87654 32109</span>
              </div>

              <div className="flex gap-3 items-start">
                <FaMapMarkerAlt className="text-red-500 mt-1" />
                <span>Ghaziabad, Uttar Pradesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* City Listings - Commented out but kept for reference */}
        
        {/* <div className="text-center mt-10">
          <h1 className="text-3xl text-blue-950 font-bold">Now Serving in</h1>
          <p>Ayodhya | Badlapur | Baleswar | Balewadi Pune | Baloda Bazar | Bathinda | Dhanbad | Dighi | Dombivli | Electronic City | Gandhinagar | Gorakhpur | Gwalior | Howrah | Indirapuram | Jehanabad | Jhansi | Karnal | Kharar | Khargone | Korba | KPHB | Kurla | Mangaluru | Manyata Tech Park | Moradabad | Noida 141 | Phalodi | Randesan | Ratlam | Ravet | Sehore | Solapur | Surat | Thane | Undri | Varanasi | Wakad</p>
          
          <h2 className="text-center mt-10 text-3xl text-blue-950 font-bold">Coming Soon</h2>
          <p>Aau | Agarpara | Ahmedabad | Amritsar | Aurangabad | Ballari | Baner | Baraut | Baripada | Bhavani Peth | Bhopal | Bolpur | Bulandshahr | Chandigarh | Chennai | Dehradun | Deoria | Dibrugarh | Durgapur | Goa | HSR Layout | Hisar | Hyderabad | Indore | Jagiroad | Jaipur | Jammu | Katra | Kolkata | Lucknow | Manipur | Mumbai | Namsai | Nashik | Patna | Prayagraj | Puducherry | Rajkot | Rewa | Sahibganj | Salt Lake | Sawai Madhopur | Siliguri | Tirupati | Udaipur | Vadodara | Vellore | Vrindavan | Yelahanka</p>
        </div>  */}
       

        {/* Copyright */}
        <div className="border-t border-blue-100 mt-8 pt-4 text-center text-sm text-gray-500">
          © 2026 ATHENURA. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;