// src/components/Admin/AdminLayout.jsx
import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import logo from "../../assets/Athenura.png";

const AdminLayout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const modules = [
    { 
      name: 'User Management', 
      icon: '👤', 
      path: '/admin-dashboard/user-management'
    },
    { 
      name: 'Order Management', 
      icon: '📋', 
      path: '/admin-dashboard/orders'
    },
    { 
      name: 'Service Management', 
      icon: '🧺', 
      path: '/admin-dashboard/services'
    },
    { 
      name: 'Payments', 
      icon: '💳', 
      path: '/admin-dashboard/payments'
    },
    { 
      name: 'Analytics', 
      icon: '📈', 
      path: '/admin-dashboard/analytics'
    },
  ];

  const handleBackToWebsite = () => {
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Always Visible */}
      <div className="w-64 bg-white shadow-lg fixed h-full overflow-y-auto">
        <div className="p-6">
          <img
            src={logo}
            alt="logo"
            className="h-10 mt-1 md:h-full md:mt-0 cursor-pointer"
            onClick={() => navigate('/admin-dashboard')}
          />
          <span className="text-sm text-gray-500 mt-2 p-14">Admin Panel</span>
        </div>
        
        {/* Search */}
        <div className="px-4 mb-4">
          <input
            type="text"
            placeholder="Search menu..."
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-1">
          <button 
            onClick={() => navigate('/admin-dashboard')}
            className={`w-full text-left px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
              location.pathname === '/admin-dashboard' 
                ? 'bg-blue-50 text-blue-600 font-semibold' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            📊 Dashboard
          </button>
          
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">Management</p>
            {modules.map((module) => (
              <button
                key={module.name}
                onClick={() => navigate(module.path)}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all flex items-center gap-3 cursor-pointer ${
                  isActive(module.path) 
                    ? 'bg-blue-50 text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{module.icon}</span>
                <span className="text-sm">{module.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <button 
              onClick={handleBackToWebsite}
              className="w-full text-left px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
            >
              🔙 Back to Website
            </button>
          </div>
        </nav>
      </div> 
      <div className="ml-64 flex-1 p-8">
        <Outlet /> 
        
        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-400">
          © 2026 LaundryHub Admin Panel. All rights reserved.
        </div>
      </div>
    </div>
  );
};
 
export default AdminLayout;