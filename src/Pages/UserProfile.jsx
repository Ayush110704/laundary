import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserLayout from './UserLayout'; // ADD THIS IMPORT

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [editProfileData, setEditProfileData] = useState({
    name: '',
    email: '',
    address: '',
    dob: '',
    joiningDate: ''
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const calculateProfileCompletion = (data) => {
    const fields = [
      { key: 'name', weight: 20 },
      { key: 'email', weight: 20 },
      { key: 'mobile', weight: 20 },
      { key: 'address', weight: 20 },
      { key: 'dob', weight: 20 }
    ];

    let completedFields = 0;
    let totalWeight = 0;

    fields.forEach(field => {
      totalWeight += field.weight;
      const value = data[field.key];
      if (value && value.toString().trim() !== '' && value !== 'Not specified' && value !== '-') {
        completedFields += field.weight;
      }
    });

    if (data.name && data.name.trim() !== '') {
      const nameParts = data.name.trim().split(' ');
      if (nameParts.length >= 2) {
        completedFields += 5;  
      }
    }
 
    return Math.min(Math.round((completedFields / totalWeight) * 100), 100);
  };

  const loadUserData = () => {
    const allUsers = JSON.parse(localStorage.getItem('Users')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    let user = null;
    if (currentUser && currentUser.Email) {
      user = allUsers.find(u => u.Email === currentUser.Email);
    }
    
    if (!user && currentUser) {
      user = currentUser;
    }
    
    if (user) {
      const fullName = user.FirstName && user.LastName 
        ? `${user.FirstName} ${user.LastName}` 
        : user.FirstName || user.name || '';
      
      const accountInfo = JSON.parse(localStorage.getItem('freshAccountInfo')) || {};
      
      const userDataObj = {
        ...user,
        name: fullName,
        email: user.Email || '',
        mobile: user.number || '',
        address: user.Address || '',
        dob: accountInfo.dob || '',
        joiningDate: user.joiningDate || new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      };
      
      setUserData(userDataObj);
      
      const completion = calculateProfileCompletion(userDataObj);
      setProfileCompletion(completion);
      
      setEditProfileData({
        name: fullName,
        email: user.Email || '',
        address: user.Address || '',
        dob: accountInfo.dob || '',
        joiningDate: user.joiningDate || new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      });
    } else {
      navigate('/login');
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const allUsers = JSON.parse(localStorage.getItem('Users')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    const nameParts = editProfileData.name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    const updatedUsers = allUsers.map(user => {
      if (user.Email === currentUser.Email) {
        return {
          ...user,
          FirstName: firstName,
          LastName: lastName,
          Email: editProfileData.email,
          number: user.number,
          Address: editProfileData.address,
          joiningDate: user.joiningDate || editProfileData.joiningDate
        };
      }
      return user;
    });
    
    localStorage.setItem('Users', JSON.stringify(updatedUsers));
    
    const updatedCurrentUser = {
      ...currentUser,
      FirstName: firstName,
      LastName: lastName,
      Email: editProfileData.email,
      number: currentUser.number,
      Address: editProfileData.address,
      joiningDate: currentUser.joiningDate || editProfileData.joiningDate
    };
    localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
    
    const accountInfo = JSON.parse(localStorage.getItem('freshAccountInfo')) || {};
    accountInfo.dob = editProfileData.dob;
    localStorage.setItem('freshAccountInfo', JSON.stringify(accountInfo));
    
    const updatedUserData = {
      ...userData,
      name: editProfileData.name,
      email: editProfileData.email,
      address: editProfileData.address,
      dob: editProfileData.dob,
      joiningDate: editProfileData.joiningDate
    };
    
    setUserData(updatedUserData);
    
    const completion = calculateProfileCompletion(updatedUserData);
    setProfileCompletion(completion);
    
    setShowEditProfileModal(false);
    setIsLoading(false);
    
    Swal.fire({
      title: 'Profile Updated!',
      text: 'Your profile has been updated successfully!',
      icon: 'success',
      confirmButtonColor: '#10b981',
      timer: 2000,
      timerProgressBar: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      }
    });
  };

  const handleFieldClick = (field) => {
    setEditingField(field);
    setTimeout(() => {
      document.getElementById(field)?.focus();
    }, 100);
  };

  const handleCancelEdit = () => { 
    const hasChanges = 
      editProfileData.name !== userData.name ||
      editProfileData.email !== userData.email ||
      editProfileData.address !== userData.address ||
      editProfileData.dob !== userData.dob;

    if (hasChanges) {
      Swal.fire({
        title: 'Discard Changes?',
        text: 'Are you sure you want to discard your changes?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, discard',
        cancelButtonText: 'Keep editing'
      }).then((result) => {
        if (result.isConfirmed) {
          setShowEditProfileModal(false);
          loadUserData();
        }
      });
    } else {
      setShowEditProfileModal(false);
    }
  };

  const handleCloseModal = () => { 
    const hasChanges = 
      editProfileData.name !== userData.name ||
      editProfileData.email !== userData.email ||
      editProfileData.address !== userData.address ||
      editProfileData.dob !== userData.dob;

    if (hasChanges) {
      Swal.fire({
        title: 'Discard Changes?',
        text: 'Are you sure you want to discard your changes?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, discard',
        cancelButtonText: 'Keep editing'
      }).then((result) => {
        if (result.isConfirmed) {
          setShowEditProfileModal(false);
          loadUserData();
        }
      });
    } else {
      setShowEditProfileModal(false);
    }
  };

  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const FieldCard = ({ icon, iconColor, label, value, field, onClick }) => (
    <motion.div
      whileHover={{ 
        y: -2, 
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="p-4 rounded-xl bg-white border border-gray-200 cursor-pointer hover:border-blue-400 transition-colors duration-200 group relative"
    >
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <i className="fas fa-pen text-xs text-blue-500"></i>
      </div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
        <i className={`${icon} ${iconColor} text-base`}></i>
        {label}
      </p>
      <p className="text-sm font-medium text-gray-800 mt-1">
        {value || '-'}
      </p>
    </motion.div>
  );

  return (
    <UserLayout> {/* WRAPPED WITH UserLayout */}
      <div className="w-full">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-blue-50 to-white">
          <div>
            <h2 className="text-xl font-bold text-black flex items-center gap-2">
              <i className="fas fa-user-circle text-blue-600 text-2xl"></i>
              My Profile
            </h2>
            <p className="text-sm text-gray-600 mt-1">View and manage your personal details</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#1d4ed8" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowEditProfileModal(true)} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <i className="fas fa-pen text-white text-sm"></i>
            Edit Profile
          </motion.button>
        </div>
          
        {/* User Details */}
        <div className="p-8 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldCard
              icon="fas fa-user"
              iconColor="text-blue-600"
              label="Full Name"
              value={userData.name}
              field="name"
              onClick={() => handleFieldClick('name')}
            />
            <FieldCard
              icon="fas fa-calendar-alt"
              iconColor="text-purple-600"
              label="Joining Date"
              value={userData.joiningDate}
              field="joiningDate"
              onClick={() => handleFieldClick('joiningDate')}
            />
            <FieldCard
              icon="fas fa-envelope"
              iconColor="text-red-600"
              label="Email Address"
              value={userData.email}
              field="email"
              onClick={() => handleFieldClick('email')}
            />
            <FieldCard
              icon="fas fa-phone"
              iconColor="text-green-600"
              label="Mobile Number"
              value={userData.mobile ? `+91 ${userData.mobile}` : '-'}
              field="mobile"
              onClick={() => handleFieldClick('mobile')}
            />
            <FieldCard
              icon="fas fa-map-marker-alt"
              iconColor="text-orange-600"
              label="Address"
              value={userData.address || 'Not specified'}
              field="address"
              onClick={() => handleFieldClick('address')}
            />
            <FieldCard
              icon="fas fa-birthday-cake"
              iconColor="text-pink-600"
              label="Date of Birth"
              value={userData.dob || 'Not specified'}
              field="dob"
              onClick={() => handleFieldClick('dob')}
            />
          </div>

          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            <div className="bg-white rounded-xl p-3 border border-gray-200 text-center">
              <p className="text-xs text-gray-500">Member Since</p>
              <p className="text-sm font-semibold text-gray-800 mt-1">
                {userData.joiningDate || 'N/A'}
              </p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-200 text-center">
              <p className="text-xs text-gray-500">Profile Status</p>
              <p className="text-sm font-semibold text-green-600 mt-1">
                <i className="fas fa-check-circle mr-1"></i> Active
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs text-gray-500">Profile Complete</p>
                <span className={`text-sm font-bold ${profileCompletion === 100 ? 'text-green-600' : 'text-blue-600'}`}>
                  {profileCompletion}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${profileCompletion}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-full ${getCompletionColor(profileCompletion)} rounded-full transition-all`}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="px-8 py-3 bg-gray-50/80 border-t border-gray-100 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            <i className="fas fa-arrow-left"></i> Back to Home
          </button>
          <button
            onClick={() => window.location.reload()}
            className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1"
          >
            <i className="fas fa-sync-alt text-xs"></i> Refresh
          </button>
        </div>

        {/* Edit Profile Modal */}
        <AnimatePresence>
          {showEditProfileModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
              onClick={handleCloseModal}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                      <i className="fas fa-edit text-xl"></i>
                      Edit Profile
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">Update your personal information</p>
                  </div>
                  <motion.button 
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCloseModal} 
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <i className="fas fa-times text-gray-600"></i>
                  </motion.button>
                </div>
                
                <div className="space-y-4">
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <i className="fas fa-user text-blue-500 mr-2"></i>
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={editProfileData.name}
                      onChange={(e) => setEditProfileData({ ...editProfileData, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      placeholder="Enter your full name"
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <i className="fas fa-envelope text-red-500 mr-2"></i>
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={editProfileData.email}
                      onChange={(e) => setEditProfileData({ ...editProfileData, email: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      placeholder="Enter your email"
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <i className="fas fa-map-marker-alt text-orange-500 mr-2"></i>
                      Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      value={editProfileData.address}
                      onChange={(e) => setEditProfileData({ ...editProfileData, address: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      placeholder="Enter your address"
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <i className="fas fa-birthday-cake text-pink-500 mr-2"></i>
                      Date of Birth
                    </label>
                    <input
                      id="dob"
                      type="date"
                      value={editProfileData.dob}
                      onChange={(e) => setEditProfileData({ ...editProfileData, dob: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    />
                  </motion.div>
                </div>
                
                <div className="flex gap-3 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save"></i>
                        Save Changes
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCancelEdit}
                    className="flex-1 border border-gray-300 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </UserLayout>
  );
};

export default Profile;