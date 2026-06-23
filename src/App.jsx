import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css"; 
 
import Subscription from "./Pages/Subscription";
import Contact from "./Pages/Contact";
 
import Footer from "./components/Footer";
import HomePage from "./Pages/Home";
import Navbar from "./components/Navbar";
import About from "./Pages/About";


import ServicePage from "./components/ServicePage"
import Dashboard from "./Pages/UserDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import TermsConndition from "./Pages/TermsCondition";
import FAQ from "./Pages/FAQ";
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'


import Services from "./Pages/Services"; 
 
import UserDashboard from "./Pages/UserDashboard";
 


  



function App() {
  const location = useLocation();
  const hideLayoutRoutes = ["/dashboard","/login","/signup"]
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:service"element={<ServicePage key={location.pathname} />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/TermsCondition" element={<TermsConndition />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />


        <Route path="/contact" element={<Contact />} /> 
        <Route path="/services" element={<Services />} /> 
       
        <Route path="/services" element={<Services />} />

        <Route path="/Dashboard" element={<UserDashboard />}/> 
 
        <Route path="/dashboard" element={<AdminDashboard />} />  
 
        <Route path="/TermsCondition" element={<TermsConndition />} /> 
        <Route path="/FAQ" element={<FAQ />}/>  
        <Route path="/FAQ" element={<FAQ />}/>
        <Route path="/subscription" element={<Subscription />} /> 

      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;