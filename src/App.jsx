import { Routes, Route } from "react-router-dom";
import "./App.css";
import Contact from "./Pages/Contact";
import Footer from "./components/Footer";
import HomePage from "./Pages/Home";
import Navbar from "./components/Navbar";
import About from "./Pages/About";
import Services from "./Pages/Services";
import LaundryService from "./components/LaundryService";
import DryCleaning from "./components/DryCleaning";
import CurtainCleaning from "./components/CurtainCleaning";
import ShoeCleaning from "./components/ShoeCleaning";
import CarpetCleaning from "./components/CarpetCleaning";
import Ironing from "./components/Ironing";



function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
         <Route path="/services/laundry-service" element={<LaundryService />} />
         <Route path="/services/dry-cleaning" element={<DryCleaning />} />
         <Route path="/services/shoe-cleaning" element={<ShoeCleaning />} />
         <Route path="/services/ironing" element={<Ironing />} />
         <Route path="/services/carpet-cleaning" element={<CarpetCleaning />} />
         <Route path="/services/curtain-cleaning" element={<CurtainCleaning />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;