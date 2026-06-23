import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Subscription from "./Pages/Subscription";
import Contact from "./Pages/Contact";
import Footer from "./components/Footer";
import HomePage from "./Pages/Home";
import Navbar from "./components/Navbar";
import About from "./Pages/About";
import Services from "./Pages/Services";
 
import UserDashboard from "./Pages/UserDashboard";

 
import AdminDashboard from "./components/Admin/AdminDashboard";  
 
import TermsConndition from "./Pages/TermsCondition";
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

        <Route path="/Dashboard" element={<UserDashboard />}/>

 
        <Route path="/dashboard" element={<AdminDashboard />} />  
 
        <Route path="/TermsCondition" element={<TermsConndition />} />
        <Route path="/FAQ" element={<FAQ />}/>
        <Route path="/subscription" element={<Subscription />} />

      </Routes>

      {!isDashboard && <Footer />}
    </>
  );
}

export default App;