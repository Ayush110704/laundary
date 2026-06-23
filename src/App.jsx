import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Contact from "./Pages/Contact";
import Footer from "./components/Footer";
import HomePage from "./Pages/Home";
import Navbar from "./components/Navbar";
import About from "./Pages/About";
import Services from "./Pages/Services";
 
import Dashboard from "./Pages/dashboard";

 
import AdminDashboard from "./components/Admin/AdminDashboard";  
 
import TermsCondition from "./Pages/TermsCondition";
import FAQ from "./Pages/FAQ"; 

function App() {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <>
      {!isDashboard && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />

        <Route path="/Dashboard" element={<Dashboard />} />

 
        <Route path="/dashboard" element={<AdminDashboard />} />  
 
        <Route path="/terms-condition" element={<TermsCondition />} />
        <Route path="/FAQ" element={<FAQ />}/>

      </Routes>

      {!isDashboard && <Footer />}
    </>
  );
}

export default App;