import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import AddressForm from '../components/AddressForm';

const Address = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

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

  const handleAddAddress = (formData) => {
    setIsLoading(true);
    setTimeout(() => {
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

      setShowAddModal(false);
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
    }, 800);
  };

  const handleEditAddress = (formData) => {
    setIsLoading(true);
    setTimeout(() => {
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

      setShowEditModal(false);
      setSelectedAddress(null);
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
    }, 800);
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
              onClick={() => {
                setSelectedAddress(address);
                setShowEditModal(true);
              }}
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
                onClick={() => setShowAddModal(true)}
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
                  onClick={() => setShowAddModal(true)}
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
        <AddressForm
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddAddress}
          isLoading={isLoading}
        />

        {/* Edit Address Modal */}
        <AddressForm
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedAddress(null);
          }}
          onSave={handleEditAddress}
          address={selectedAddress}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default Address;