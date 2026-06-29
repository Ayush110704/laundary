import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css"; 
import Contact from "./Pages/Contact";
import Subscription from "./Pages/Subscription";
import Footer from "./components/Footer";
import HomePage from "./Pages/Home";
import Navbar from "./components/Navbar";
import About from "./Pages/About";
import Services from "./Pages/Services";
import ServicePage from "./components/ServicePage"
import Dashboard from "./Pages/UserDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import TermsConndition from "./Pages/TermsCondition";
import FAQ from "./Pages/FAQ";
import Login from './Pages/Login'

import SignUp from './Pages/SignUp'

import UserDashboard from "./Pages/UserDashboard";
import AdminLayout from "./components/Admin/AdminLayout";
import UserManagement from "./components/Admin/UserManagement";

// ✅ Fix: Correct import path for OrderManagement
import OrderManagement, { MOCK_BOOKINGS, OrderProvider } from "./components/Admin/OrderManagement"; 
import Payments from "./components/Admin/Payments";
import Analytics from "./components/Admin/Analytics";

 

import ServiceManagement from './components/Admin/ServiceManagement';

import OrderTracking from "./components/OrderTracking";

 
import OrderManagement from "./components/Admin/OrderManagement"; 
import Payments from "./components/Admin/Payments";
import BookingApplyForm from "./Pages/BookingApplyForm";
import Pricing from './Pages/Pricing'; 
import CheckOut from './Pages/CheckOut' 

function App() {
  const location = useLocation();
  const hideLayoutRoutes = ["/login", "/signup"];
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

  return (
    <>
      {!hideLayout && !isAdminRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />

        <Route path="/services/:service" element={<ServicePage key={location.pathname} />} />
      
       

        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/TermsCondition" element={<TermsConndition />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/checkout" element={<CheckOut/>} />


        {/* Admin Routes with Layout - Wrapped with OrderProvider */}
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
          <Route path="payments" element={<Payments />} /> 
          <Route path="analytics" element={<Analytics />} />

        <Route path="/order-tracking" element={<OrderTracking />} />

        <Route path="/bookingapplyform" element={<BookingApplyForm/>}/>
      <Route path="/pricing" element={<Pricing/>} />



      
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="user-management" element={<UserManagement />} />

          <Route path="orders" element={<OrderManagement />} />
       
          <Route path="payments" element={<Payments />} />
          
          <Route path="services" element={<ServiceManagement />} />
         

      


        </Route>
      </Routes>

      {!hideLayout && !isAdminRoute && <Footer />}
    </>
  );
}

export default App;