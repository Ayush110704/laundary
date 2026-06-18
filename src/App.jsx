import { Routes, Route } from "react-router-dom";
import "./App.css";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import HomePage from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
