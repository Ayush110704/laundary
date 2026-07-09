import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronUp, User, LogOut } from "lucide-react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/Athenura.png";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [userlogin, setUserLogin] = useState(false);
  const [hover, setHover] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [profile, setProfile] = useState(false);
  const [userData, setUserData] = useState();
  const [servicesList, setServicesList] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();

  const hideHamburgerRoutes = [
    "/user-profile",
    "/user-orders",
    "/user-address",
    "/user-subscription",

  ];

  const hideHamburger = hideHamburgerRoutes.includes(location.pathname);

  useEffect(() => {

    const User = JSON.parse(localStorage.getItem("currentUser"));
    console.log(User)
    if (User) {
      setUserLogin(true);
      setUserData(User);
    } else {
      setUserLogin(false);
    }

  }, [])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/services");
        const result = await res.json();
        if (result.success) {
          setServicesList(result.data);
        }
      } catch (error) {
        console.error("Error fetching navbar services:", error);
      }
    };
    fetchServices();
  }, []);

  const getServicePath = (name) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes("dry")) return "/services/DryClean-service";
    if (nameLower.includes("laundry")) return "/services/Laundry-service";
    if (nameLower.includes("shoe")) return "/services/ShoeCleaning-service";
    if (nameLower.includes("curtain")) return "/services/CurtainCleaning-service";
    if (nameLower.includes("carpet")) return "/services/CarpetCleaning-service";
    if (nameLower.includes("iron")) return "/services/Ironing-service";
    return `/services/${name.replace(/\s+/g, '')}-service`;
  };

  const dynamicDropdown = servicesList.length > 0
    ? servicesList.map(s => ({
      label: s.name,
      path: getServicePath(s.name),
      isInactive: s.status === "Inactive"
    }))
    : [
      { label: "Laundry Service", path: "/services/Laundry-service", isInactive: false },
      { label: "Dry Cleaning", path: "/services/DryClean-service", isInactive: false },
      { label: "Ironing", path: "/services/Ironing-service", isInactive: false },
      { label: "Carpet Cleaning", path: "/services/CarpetCleaning-service", isInactive: false },
      { label: "Shoe Cleaning", path: "/services/ShoeCleaning-service", isInactive: false },
      { label: "Curtain Cleaning", path: "/services/CurtainCleaning-service", isInactive: false },
    ];

  const menu = [
    { id: "Home", label: "Home", path: "/" },
    { id: "About", label: "About", path: "/about" },
    {
      id: "Services", label: "Services", path: "/services",
      dropdown: dynamicDropdown,
    },
    { id: "Contact", label: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login")
    setUserLogin(false)
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="h-12 md:h-16 bg-gray-50  shadow-2xl flex justify-between items-center px-6 relative z-50"
      >
        {/* Logo */}
        <Link to="/" className="h-full flex items-center">
          <img
            src={logo}
            alt="logo"
            className="h-10 mt-1 md:h-full md:mt-0"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex font-semibold text-lg gap-10 items-center">
          <ul className="flex gap-6">
            {menu.map((item) => (
              <li key={item.id} className=" group relative">
                {item.dropdown ? (
                  <>
                    <NavLink to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-1 transition-colors duration-300 ${isActive || location.pathname.startsWith("/services")
                          ? "text-blue-600"
                          : "text-gray-950 hover:text-blue-600"
                        }`
                      }

                    >
                      {item.label}
                      <ChevronDown
                        size={20}
                        className="mt-1 transition-transform duration-300 group-hover:rotate-180"
                      />
                      {location.pathname.startsWith("/services") && (
                        <motion.div
                          layoutId="active-navbar"
                          className="absolute left-1/3 -translate-x-1/6  -bottom-1 h-[2px] w-[30px] rounded-full bg-blue-600"
                          transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 30,
                          }}
                        />
                      )}
                    </NavLink>

                    <div className="absolute top-8  mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
                      {item.dropdown.map((service, idx) => (
                        service.isInactive ? (
                          <div
                            key={`${service.path}-${idx}`}
                            className="block px-5 py-2 text-[15px] bg-gray-100 text-gray-400 cursor-not-allowed font-medium"
                          >
                            <div className="flex items-center justify-between w-full">
                              <span>{service.label}</span>
                              <span className="text-red-500 text-[12px] font-medium shrink-0">
                                [Inactive]
                              </span>
                            </div>
                          </div>
                        ) : (
                          <NavLink
                            key={`${service.path}-${idx}`}
                            to={service.path}
                            className={({ isActive }) =>
                              `block px-5 py-2 text-[15px] ${isActive
                                ? "bg-blue-100 text-blue-900 font-semibold"
                                : "hover:bg-blue-50 hover:text-blue-600"
                              }`
                            }
                          >
                            <div className="flex items-center justify-between w-full">
                              <span>{service.label}</span>
                            </div>
                          </NavLink>
                        )
                      ))}
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    end={item.path === "/"} // Important for Home
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-700"
                        : "text-gray-900 hover:text-blue-600"
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}

                        {isActive && (
                          <motion.div
                            layoutId="active-navbar"
                            className="absolute left-1/2 -translate-x-1/2  -bottom-1 h-[2px] w-[30px] rounded-full bg-blue-600"
                            transition={{
                              type: "spring",
                              stiffness: 450,
                              damping: 30,
                            }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Login/Profile Button */}

        {userlogin ? (
          <>
            <div
              className="relative"
              onMouseEnter={() => setProfile(true)}
              onMouseLeave={() => setProfile(false)}
            >
              <button
                className="hidden md:flex items-center gap-2 py-1 px-4 bg-white border border-blue-600 rounded-3xl text-blue-700 cursor-pointer mr-15 font-semibold transition-all duration-500 hover:scale-105 hover:bg-blue-700 hover:text-white"
              >
                <User size={18} />
                {userData.FirstName || "Profile"}
              </button>

              <AnimatePresence>
                {profile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-2 mt-2 shadow-lg rounded-xl p-4 grid space-y-2 w-50 z-50 bg-linear-to-b from-blue-50 to-blue-200 text-blue-600 font-semibold border border-blue-200 text-start"
                  >
                    <div className="flex justify-start">
                      <div>
                        <h3 className='text-start text-blue-500 gap-2'>Hello <span className="text-blue-600">{userData.FirstName}</span></h3>
                        <h5 className='text-[12px]'>{userData.number}</h5>
                      </div>
                    </div>
                    <Link
                      to="/user-profile"
                      onClick={() => setProfile(false)}
                      className="hover:text-blue-800 transition-all hover:scale-105"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="text-red-700 flex  items-center gap-1 transition-all hover:scale-105"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <button

            className="hidden md:flex py-1 px-4 bg-blue-600 rounded-3xl text-white cursor-pointer mr-15 hover:bg-blue-700"
          >
            <Link to="/login"> Login</Link>
          </button>)}


        {/* Mobile Icon */}
        {!hideHamburger && (
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X /> : <Menu />}
          </div>
        )}
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute top-10 left-0 w-full bg-blue-50 text-blue-950 font-semibold shadow-lg z-40 md:hidden rounded-b-2xl"
          >
            <ul className="flex flex-col items-center gap-5 py-6">
              {menu.map((item) => (
                <li key={item.id} className="w-full text-start ml-20">
                  {item.dropdown ? (
                    <>
                      <div className="flex items-center justify-between  w-25">
                        <Link
                          to={item.path}
                          onClick={() => setMobileMenu(false)}
                          className="hover:text-blue-600"
                        >
                          {item.label}
                        </Link>

                        <button
                          onClick={() => setShowServices(!showServices)}
                          className="p-1  "
                        >
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${showServices ? "rotate-180" : ""
                              }`}
                          />
                        </button>
                      </div>
                      {showServices && (
                        <div className="mt-3 flex flex-col rounded-2xl ">
                          {item.dropdown.map((service, idx) => (
                            service.isInactive ? (
                              <div
                                key={`${service.path}-${idx}`}
                                className="py-2 px-4 text-sm bg-gray-100 text-gray-400 cursor-not-allowed font-medium flex items-center justify-between pr-8"
                              >
                                <span>{service.label}</span>
                                <span className="text-red-500 text-[12px] font-medium shrink-0">
                                  [Inactive]
                                </span>
                              </div>
                            ) : (
                              <Link
                                key={`${service.path}-${idx}`}
                                to={service.path}
                                onClick={() => {
                                  setMobileMenu(false);
                                  setShowServices(false);
                                }}
                                className="py-2 px-4 text-sm hover:bg-blue-50 hover:text-blue-600 flex items-center justify-between pr-8"
                              >
                                <span>{service.label}</span>
                              </Link>
                            )
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenu(false)}
                      className="hover:text-blue-600"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="w-75  flex justify-around mb-5">
              <button
                onClick={() => {
                  navigate(userlogin ? "/user-profile" : "/Login")
                  setMobileMenu(false);
                }}
                className="py-1 px-3 bg-blue-600 rounded-3xl text-white cursor-pointer hover:bg-blue-700"
              >
                {userlogin ? userData.FirstName : "Login"}
              </button>

              <button
                onClick={handleLogout}
                className=" text-red-700 cursor-pointer hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default Navbar;