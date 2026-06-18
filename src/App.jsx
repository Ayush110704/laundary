import { Routes, Route } from "react-router-dom";
import "./App.css";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import HomePage from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Services from "./components/Services";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;