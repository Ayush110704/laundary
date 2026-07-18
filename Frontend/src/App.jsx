import { GoogleOAuthProvider } from "@react-oauth/google";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useLayoutEffect } from "react";

import "./App.css";

// Pages
import HomePage from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Services from "./Pages/Services";
import SubService from "./Pages/SubService";
import Pricing from "./Pages/Pricing";
import CheckOut from "./Pages/CheckOut";
import FAQ from "./Pages/FAQ";
import TermsCondition from "./Pages/TermsCondition";
import ResetPassword from "./Pages/ResetPassword";

// Auth
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import ForgotPassword from "./Auth/ForgotPassword";
import AdminLogin from "./Auth/AdminLogin";
import AdminRegister from "./components/Admin/AdminRegistration";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// User
import UserProfile from "./User/UserProfile";
import Address from "./User/Address";
import MyBookings from "./User/MyBookings";
import OrderTracking from "./User/OrderTracking";

// Admin
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./components/Admin/AdminDashboard";
import UserManagement from "./components/Admin/UserManagement";
import OrderManagement, {
  OrderProvider,
} from "./components/Admin/OrderManagement";
import ServiceManagement from "./components/Admin/ServiceManagement";
import Payments from "./components/Admin/Payments";
import Analytics from "./components/Admin/Analytics";
import InquiryManagement from "./components/Admin/InquiryManagement";

// Redirect helper
const AdminDashboardRedirect = () => {
  const location = useLocation();

  return (
    <Navigate
      to={location.pathname.replace(
        "/admin_dashboard",
        "/admin-dashboard"
      )}
      replace
    />
  );
};

function App() {
  const location = useLocation();
  const { pathname } = location;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Routes where Navbar/Footer should be hidden
  const hideLayoutRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/admin-login",
    "/admin-register",
  ];

  const hideLayout =
    hideLayoutRoutes.includes(pathname) ||
    pathname.startsWith("/reset-password");

  const isAdminRoute = pathname.startsWith("/admin-dashboard");

  const showNavbarAndFooter = !(hideLayout || isAdminRoute);

  return (
    <GoogleOAuthProvider clientId="830093525670-h7pm20fvt6klvgvk878anlipf6t8m22p.apps.googleusercontent.com">
      {showNavbarAndFooter && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/services/:service"
          element={<SubService key={pathname} />}
        />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/TermsCondition" element={<TermsCondition />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/checkout" element={<CheckOut />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* User */}
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/user-address" element={<Address />} />
        <Route path="/user-orders" element={<MyBookings />} />
        <Route path="/user-tracking" element={<OrderTracking />} />
        <Route path="/user-terms" element={<TermsCondition />} />

        {/* Redirect old admin URL */}
        <Route
          path="/admin_dashboard/*"
          element={<AdminDashboardRedirect />}
        />

        {/* Admin */}
        <Route
          path="/admin-dashboard"
          element={
            <OrderProvider>
              <AdminLayout />
            </OrderProvider>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route
            path="user-management"
            element={<UserManagement />}
          />
          <Route path="orders" element={<OrderManagement />} />
          <Route
            path="services"
            element={<ServiceManagement />}
          />
          <Route path="payments" element={<Payments />} />
          <Route path="analytics" element={<Analytics />} />
          <Route
            path="inquiries"
            element={<InquiryManagement />}
          />
        </Route>
      </Routes>

      {showNavbarAndFooter && <Footer />}
    </GoogleOAuthProvider>
  );
}

export default App;