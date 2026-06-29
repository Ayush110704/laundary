import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';

const Address = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    watermark: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  const states = [
    "Maharashtra", "Delhi", "Karnataka", "Gujarat", "Madhya Pradesh",
    "Rajasthan", "Uttar Pradesh", "Tamil Nadu", "Telangana", "Punjab"
  ];

  const cities = {
    Maharashtra: ["Nagpur", "Wardha", "Mumbai", "Pune", "Nashik", "Amravati"],
    Delhi: ["New Delhi", "Dwarka", "Rohini"],
    Karnataka: ["Bangalore", "Mysore"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    "Madhya Pradesh": ["Indore", "Bhopal"],
    Rajasthan: ["Jaipur", "Udaipur"],
    "Uttar Pradesh": ["Lucknow", "Noida"],
    "Tamil Nadu": ["Chennai", "Coimbatore"],
    Telangana: ["Hyderabad"],
    Punjab: ["Ludhiana", "Amritsar"]
  };

  const areas = {
    "Nagpur": ["Sadar", "Dharampeth", "Civil Lines", "Ramdaspeth", "Laxmi Nagar", "Manish Nagar", "Hingna", "Koradi", "Jaripatka", "Itwari"],
    "Wardha": ["Civil Lines", "Gandhi Nagar", "Sewagram", "Nalwadi", "Dattapur"],
    "Mumbai": ["Andheri", "Bandra", "Dadar", "Juhu", "Powai", "Colaba", "Worli", "Malad", "Borivali"],
    "Pune": ["Koregaon Park", "Hinjewadi", "Viman Nagar", "Kothrud", "Deccan Gymkhana", "Shivajinagar"],
    "Nashik": ["Panchavati", "College Road", "Gangapur Road", "Satpur", "Ambad"],
    "Amravati": ["Rajapeth", "Badnera", "Camp Area", "Civil Lines"],
    "New Delhi": ["Connaught Place", "Karol Bagh", "Lajpat Nagar", "South Extension", "Hauz Khas"],
    "Dwarka": ["Sector 1-24", "Sector 12", "Sector 10", "Sector 6"],
    "Rohini": ["Sector 1-28", "Sector 9", "Sector 11"],
    "Bangalore": ["Indiranagar", "Koramangala", "Whitefield", "MG Road", "Jayanagar", "Electronic City"],
    "Mysore": ["Gokulam", "Vijay Nagar", "Kuvempunagar", "Jayanagar"],
    "Ahmedabad": ["Navrangpura", "Vastrapur", "Satellite", "Bodakdev", "Maninagar"],
    "Surat": ["Vesu", "Adajan", "City Light", "Piplod", "Varachha"],
    "Vadodara": ["Alkapuri", "Gotri", "Manjalpur", "Akota", "Fatehgunj"],
    "Indore": ["Vijay Nagar", "Palasia", "Sapna Sangeeta", "Rajendra Nagar", "Rau"],
    "Bhopal": ["Arera Colony", "MP Nagar", "BHEL", "Shahpura", "Kolar"],
    "Jaipur": ["C Scheme", "Vaishali Nagar", "Malviya Nagar", "Mansarovar", "Jawahar Nagar"],
    "Udaipur": ["City Palace Road", "Sector 11", "Bhopalpura", "Ambavgarh"],
    "Lucknow": ["Hazratganj", "Gomti Nagar", "Indira Nagar", "Aliganj", "Charbagh"],
    "Noida": ["Sector 18", "Sector 62", "Sector 50", "Sector 15", "Sector 16"],
    "Chennai": ["T Nagar", "Adyar", "Anna Nagar", "Velachery", "OMR"],
    "Coimbatore": ["RS Puram", "Gandhipuram", "Peelamedu", "Saravanampatti"],
    "Hyderabad": ["Banjara Hills", "Jubilee Hills", "Gachibowli", "Hitech City", "Madhapur"],
    "Ludhiana": ["Model Town", "Civil Lines", "Ferozepur Road", "Pakhowal Road"],
    "Amritsar": ["Hall Bazaar", "Ranjit Avenue", "Mall Road", "Lawrence Road"]
  };

  useEffect(() => {
    loadAddresses();
    loadUserData();
  }, []);

  const loadUserData = () => {
    const user = JSON.parse(localStorage.getItem('freshUser')) || {};
    setUserData(user);
  };

  const loadAddresses = () => {
    const savedAddresses = JSON.parse(localStorage.getItem('userAddresses')) || [];
    setAddresses(savedAddresses);
  };

  const saveAddresses = (addressList) => {
    localStorage.setItem('userAddresses', JSON.stringify(addressList));
    setAddresses(addressList);
  };

  const handleAddAddress = async () => {
    if (!formData.fullName || !formData.phone || !formData.addressLine1 || 
        !formData.city || !formData.state || !formData.pincode) {
      Swal.fire({
        title: 'Missing Fields',
        text: 'Please fill in all required fields',
        icon: 'warning',
        confirmButtonColor: '#2563eb'
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const newAddress = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    let updatedAddresses = [...addresses];
    if (formData.isDefault) {
      updatedAddresses = updatedAddresses.map(addr => ({
        ...addr,
        isDefault: false
      }));
    }

    updatedAddresses.push(newAddress);
    saveAddresses(updatedAddresses);

    setShowAddAddressModal(false);
    resetForm();
    setIsLoading(false);

    Swal.fire({
      title: 'Address Added! 🎉',
      text: 'Your address has been added successfully!',
      icon: 'success',
      confirmButtonColor: '#2563eb',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      background: '#ffffff',
      customClass: {
        popup: 'rounded-2xl'
      }
    });
  };

  const handleEditAddress = async () => {
    if (!formData.fullName || !formData.phone || !formData.addressLine1 || 
        !formData.city || !formData.state || !formData.pincode) {
      Swal.fire({
        title: 'Missing Fields',
        text: 'Please fill in all required fields',
        icon: 'warning',
        confirmButtonColor: '#2563eb'
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    let updatedAddresses = addresses.map(addr => {
      if (addr.id === selectedAddress.id) {
        return {
          ...addr,
          ...formData
        };
      }
      return addr;
    });

    if (formData.isDefault) {
      updatedAddresses = updatedAddresses.map(addr => ({
        ...addr,
        isDefault: addr.id === selectedAddress.id
      }));
    }

    saveAddresses(updatedAddresses);

    setShowEditAddressModal(false);
    resetForm();
    setIsLoading(false);

    Swal.fire({
      title: 'Address Updated! ✅',
      text: 'Your address has been updated successfully!',
      icon: 'success',
      confirmButtonColor: '#2563eb',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      background: '#ffffff',
      customClass: {
        popup: 'rounded-2xl'
      }
    });
  };

  const handleDeleteAddress = (address) => {
    Swal.fire({
      title: 'Delete Address?',
      html: `Are you sure you want to delete <strong>${address.fullName}</strong>?<br>This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      customClass: {
        popup: 'rounded-2xl'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedAddresses = addresses.filter(addr => addr.id !== address.id);
        saveAddresses(updatedAddresses);
        
        Swal.fire({
          title: 'Deleted!',
          text: 'Address has been deleted.',
          icon: 'success',
          confirmButtonColor: '#2563eb',
          timer: 1500,
          showConfirmButton: false,
          background: '#ffffff',
          customClass: {
            popup: 'rounded-2xl'
          }
        });
      }
    });
  };

  const handleToggleDefault = (address) => {
    Swal.fire({
      title: 'Set as Default?',
      text: `Make ${address.fullName} your default delivery address?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, set as default',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      customClass: {
        popup: 'rounded-2xl'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedAddresses = addresses.map(addr => ({
          ...addr,
          isDefault: addr.id === address.id
        }));
        saveAddresses(updatedAddresses);
      }
    });
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      addressLine1: '',
      watermark: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false
    });
    setSelectedAddress(null);
  };

  const openEditModal = (address) => {
    setSelectedAddress(address);
    setFormData({
      fullName: address.fullName || '',
      phone: address.phone || '',
      addressLine1: address.addressLine1 || '',
      watermark: address.watermark || '',
      city: address.city || '',
      state: address.state || '',
      pincode: address.pincode || '',
      isDefault: address.isDefault || false
    });
    setShowEditAddressModal(true);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 300 }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const AddressCard = ({ address }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, boxShadow: '0 20px 25px -12px rgba(37, 99, 235, 0.15)' }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">
                {address.fullName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-gray-800 text-base">{address.fullName}</h3>
                {address.isDefault && (
                  <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-0.5 rounded-md text-xs font-semibold shadow-sm">
                    <i className="fa-solid fa-check-circle mr-1"></i> Default
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                <span>{address.addressLine1}</span>
                {address.watermark && <span>, {address.watermark}</span>}
                <span>, {address.city}</span>
                {address.state && <span>, {address.state}</span>}
                <span>- {address.pincode}</span>
                <span className="mx-1">•</span>
                <span><i className="fa-solid fa-phone text-blue-600 text-xs mr-1"></i>+91 {address.phone}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            {!address.isDefault && (
              <button
                onClick={() => handleToggleDefault(address)}
                className="text-sm text-green-600 hover:text-green-700 hover:bg-green-50 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
              >
                <i className="fa-regular fa-star mr-1"></i>
                Default
              </button>
            )}
            <button
              onClick={() => openEditModal(address)}
              className="text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
            >
              <i className="fa-regular fa-pen-to-square mr-1"></i>
              Edit
            </button>
            <button
              onClick={() => handleDeleteAddress(address)}
              className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
            >
              <i className="fa-regular fa-trash-can mr-1"></i>
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      
      <style>
        {`
          input:focus, select:focus, textarea:focus {
            outline: none;
          }
          .modal-content {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .modal-content::-webkit-scrollbar {
            display: none;
          }
          .gradient-bg {
            background: linear-gradient(135deg, #ffffff 0%, #dbeafe 50%, #bfdbfe 100%);
          }
          .gradient-card {
            background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);
          }
        `}
      </style>

      <Navbar />

      <div className="min-h-screen gradient-bg pt-20" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <i className="fa-solid fa-address-book text-blue-600 mr-3"></i>
                  Address Book
                </h1>
                <p className="text-gray-600 mt-1" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}>Manage your delivery addresses</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  resetForm();
                  setShowAddAddressModal(true);
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-all w-full sm:w-auto justify-center"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
              >
                <i className="fa-solid fa-plus"></i>
                Add New Address
              </motion.button>
            </div>
          </motion.div>

          {addresses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="gradient-card rounded-2xl shadow-xl p-16 text-center border border-blue-100"
            >
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-6">
                  <i className="fa-solid fa-location-dot text-5xl text-blue-600"></i>
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>No Addresses Yet</h3>
                <p className="text-gray-500 mb-8 max-w-md" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Add your first delivery address to start shopping and get your orders delivered smoothly.
                </p>
                <button
                  onClick={() => {
                    resetForm();
                    setShowAddAddressModal(true);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                  style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
                >
                  <i className="fa-solid fa-plus"></i>
                  Add Your First Address
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {addresses.map((address, index) => (
                <AddressCard key={address.id} address={address} />
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              onClick={() => navigate('/profile')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 hover:gap-2 transition-all"
            >
              <i className="fa-solid fa-arrow-left"></i> Back to Profile
            </button>
          </div>
        </div>

        {/* Add Address Modal */}
        <AnimatePresence>
          {showAddAddressModal && (
            <>
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]"
                onClick={() => {
                  setShowAddAddressModal(false);
                  resetForm();
                }}
              />
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="modal-content fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl w-[90%] max-w-md z-[10001] max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-3xl z-10">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      <i className="fa-solid fa-plus text-white"></i>
                      Add Address
                    </h3>
                    <button
                      onClick={() => {
                        setShowAddAddressModal(false);
                        resetForm();
                      }}
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition text-white text-xl"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <i className="fa-solid fa-user text-blue-600 mr-1"></i> Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <i className="fa-solid fa-phone text-blue-600 mr-1"></i> Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      maxLength="10"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <i className="fa-solid fa-location-dot text-blue-600 mr-1"></i> Address Line 1 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="House number, building, street"
                      value={formData.addressLine1}
                      onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <i className="fa-solid fa-water text-blue-400 mr-1"></i> Watermark (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Apartment, floor, landmark"
                      value={formData.watermark}
                      onChange={(e) => setFormData({ ...formData, watermark: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({
                          ...formData,
                          state: e.target.value,
                          city: ""
                        })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <option value="">Select State</option>
                        {states.map((state, index) => (
                          <option key={index} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        City <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({
                          ...formData,
                          city: e.target.value
                        })}
                        disabled={!formData.state}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed bg-gray-50"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <option value="">{formData.state ? 'Select City' : 'Select state first'}</option>
                        {formData.state && cities[formData.state]?.map((city, index) => (
                          <option key={index} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <i className="fa-solid fa-map-pin text-blue-600 mr-1"></i> Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="6-digit pincode"
                      maxLength="6"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="isDefault"
                      checked={formData.isDefault}
                      onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="isDefault" className="text-sm text-gray-700 cursor-pointer" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <i className="fa-regular fa-star text-green-600 mr-1"></i>
                      Set as default address
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleAddAddress}
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
                    >
                      {isLoading ? (
                        <>
                          <i className="fa-solid fa-spinner fa-spin"></i>
                          Adding...
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-save"></i>
                          Save Address
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setShowAddAddressModal(false);
                        resetForm();
                      }}
                      className="flex-1 border border-gray-200 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Edit Address Modal */}
        <AnimatePresence>
          {showEditAddressModal && selectedAddress && (
            <>
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]"
                onClick={() => {
                  setShowEditAddressModal(false);
                  resetForm();
                }}
              />
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="modal-content fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl w-[90%] max-w-md z-[10001] max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-3xl">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      <i className="fa-solid fa-pen text-white"></i>
                      Edit Address
                    </h3>
                    <button
                      onClick={() => {
                        setShowEditAddressModal(false);
                        resetForm();
                      }}
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition text-white text-xl"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <i className="fa-solid fa-user text-blue-600 mr-1"></i> Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <i className="fa-solid fa-phone text-blue-600 mr-1"></i> Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      maxLength="10"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <i className="fa-solid fa-location-dot text-blue-600 mr-1"></i> Address Line 1 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="House number, building, street"
                      value={formData.addressLine1}
                      onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <i className="fa-solid fa-water text-blue-400 mr-1"></i> Watermark (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Apartment, floor, landmark"
                      value={formData.watermark}
                      onChange={(e) => setFormData({ ...formData, watermark: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({
                          ...formData,
                          state: e.target.value,
                          city: ""
                        })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <option value="">Select State</option>
                        {states.map((state, index) => (
                          <option key={index} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        City <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({
                          ...formData,
                          city: e.target.value
                        })}
                        disabled={!formData.state}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed bg-gray-50"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <option value="">{formData.state ? 'Select City' : 'Select state first'}</option>
                        {formData.state && cities[formData.state]?.map((city, index) => (
                          <option key={index} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <i className="fa-solid fa-map-pin text-blue-600 mr-1"></i> Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="6-digit pincode"
                      maxLength="6"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="isDefaultEdit"
                      checked={formData.isDefault}
                      onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="isDefaultEdit" className="text-sm text-gray-700 cursor-pointer" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <i className="fa-regular fa-star text-green-600 mr-1"></i>
                      Set as default address
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleEditAddress}
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
                    >
                      {isLoading ? (
                        <>
                          <i className="fa-solid fa-spinner fa-spin"></i>
                          Updating...
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-save"></i>
                          Update Address
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setShowEditAddressModal(false);
                        resetForm();
                      }}
                      className="flex-1 border border-gray-200 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Address;