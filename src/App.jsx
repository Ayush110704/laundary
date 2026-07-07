import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css"; 
import Contact from "./Pages/Contact";

import Footer from "./components/Footer";
import HomePage from "./Pages/Home";
import Navbar from "./components/Navbar";
import About from "./Pages/About";
import Services from "./Pages/Services";
import SubService from "./Pages/SubService";
import AdminDashboard from "./components/Admin/AdminDashboard";
import TermsConndition from "./Pages/TermsCondition";
import FAQ from "./Pages/FAQ";
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import UserProfile from './User/UserProfile';
import AdminLayout from "./components/Admin/AdminLayout";
import UserManagement from "./components/Admin/UserManagement";
import OrderManagement, { MOCK_BOOKINGS, OrderProvider } from "./components/Admin/OrderManagement"; 
import Payments from "./components/Admin/Payments";
import Analytics from "./components/Admin/Analytics";
import ServiceManagement from './components/Admin/ServiceManagement';
import OrderTracking from "./User/OrderTracking";
import BookingApplyForm from "./Pages/BookingApplyForm";   
import CheckOut from "./Pages/CheckOut";
import Address from "./User/Address"; 
import Pricing from "./Pages/Pricing";
import MyBookings from "./User/MyBookings";
import UserLayout from "./User/UserLayout";
import AdminRegister from "./components/Admin/AdminRegistration";
import AdminLogin from "./Auth/AdminLogin";



// Import user components  
import TermsCondition from "./Pages/TermsCondition";
import { useLayoutEffect } from "react";
import ForgotPassword from './Auth/ForgotPassword';

function App() {
  const location = useLocation();

  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
   
  // Only hide navbar/footer for login and signup pages
  const hideLayoutRoutes = ["/login", "/signup","/forgot-password","/admin-login","/admin-register"];
  
  //  Admin routes 
  const adminRoutes = [
    "/admin-dashboard", 
    "/admin-dashboard/user-management", 
    "/admin-dashboard/orders", 
    "/admin-dashboard/services", 
    "/admin-dashboard/payments", 
    "/admin-dashboard/analytics"
  ];
   
  const hideLayout = hideLayoutRoutes.includes(location.pathname);
  const isAdminRoute = adminRoutes.some(route => location.pathname.startsWith('/admin-dashboard'));

  // Show Navbar and Footer for all routes except login, signup, and admin
  const showNavbarAndFooter = !hideLayout && !isAdminRoute;

  return (
    <> 
      {showNavbarAndFooter && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:service" element={<SubService key={location.pathname} />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/TermsCondition" element={<TermsCondition />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/checkout" element={<CheckOut />} />  
        
        {/* Auth Routes  */}
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />  
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/admin-register" element={<AdminRegister/>} />
        <Route path="/admin-login" element={<AdminLogin/>} />
        

        
        {/* User Routes */}
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/user-address" element={<Address />} />
        <Route path="/user-orders" element={<MyBookings />} />
        
        <Route path="/user-tracking" element={<OrderTracking />} />
        <Route path="/user-terms" element={<TermsCondition />} />

        {/*  ADMIN ROUTES WITH ADMINLAYOUT  */}
        <Route
          path="/admin-dashboard" 
          element={
            <OrderProvider initialData={MOCK_BOOKINGS}>
              <AdminLayout />
            </OrderProvider>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="orders" element={<OrderManagement />} /> 
          <Route path="services" element={<ServiceManagement />} />
          <Route path="payments" element={<Payments />} /> 
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
 
      {showNavbarAndFooter && <Footer />}
    </>
  );
}

export default App;