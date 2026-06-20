import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import logo from "../../assets/Athenura.png";

const LaundryDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Real profit/loss data for weekly revenue
  const orderData = [
    { name: 'Mon', orders: 45, revenue: 12000, profit: 3600, loss: 0 },
    { name: 'Tue', orders: 52, revenue: 15600, profit: 4680, loss: 0 },
    { name: 'Wed', orders: 38, revenue: 11400, profit: 3420, loss: 0 },
    { name: 'Thu', orders: 60, revenue: 18000, profit: 5400, loss: 0 },
    { name: 'Fri', orders: 75, revenue: 22500, profit: 6750, loss: 0 },
    { name: 'Sat', orders: 48, revenue: 14400, profit: 4320, loss: 0 },
    { name: 'Sun', orders: 30, revenue: 9000, profit: 2700, loss: 0 },
  ];

  // Real service distribution with actual numbers
  const serviceDistribution = [
    { name: 'Dry Cleaning', value: 35, revenue: 87500, profit: 26250 },
    { name: 'Wash & Fold', value: 40, revenue: 100000, profit: 40000 },
    { name: 'Ironing', value: 15, revenue: 37500, profit: 15000 },
    { name: 'Stain Removal', value: 10, revenue: 25000, profit: 10000 },
  ];

  // Calculate totals AFTER serviceDistribution is defined
  const totalServiceRevenue = serviceDistribution.reduce((sum, s) => sum + s.revenue, 0);
  const totalServiceProfit = serviceDistribution.reduce((sum, s) => sum + s.profit, 0);

  // Monthly profit/loss data
  const monthlyData = [
    { name: 'Jan', revenue: 85000, profit: 25500, loss: 2000 },
    { name: 'Feb', revenue: 92000, profit: 27600, loss: 1500 },
    { name: 'Mar', revenue: 78000, profit: 23400, loss: 3000 },
    { name: 'Apr', revenue: 105000, profit: 31500, loss: 1000 },
    { name: 'May', revenue: 112000, profit: 33600, loss: 500 },
    { name: 'Jun', revenue: 98000, profit: 29400, loss: 2500 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  const recentActivity = [
    { id: 1, text: 'New order from Rajesh Kumar - ₹2,500', time: '2 min ago', type: 'order' },
    { id: 2, text: 'Payment received: ₹2,500', time: '15 min ago', type: 'payment' },
    { id: 3, text: 'Service updated: Premium Wash', time: '1 hr ago', type: 'service' },
    { id: 4, text: 'New user registered: Priya Singh', time: '3 hrs ago', type: 'user' },
    { id: 5, text: 'Order #1245 delivered', time: 'Yesterday', type: 'order' },
  ];

  const quickActions = [
    { icon: '📢', label: 'New Order', color: 'bg-blue-500' },
    { icon: '💰', label: 'Record Payment', color: 'bg-green-500' },
    { icon: '📊', label: 'Generate Report', color: 'bg-purple-500' },
    { icon: '👥', label: 'View Customers', color: 'bg-orange-500' },
  ];

  const modules = [
    { name: 'User Management', features: 'View and manage users', icon: '👤', path: '/users' },
    { name: 'Service Management', features: 'Add/Edit/Delete services', icon: '🧺', path: '/services' },
    { name: 'Order Management', features: 'Update order status', icon: '📋', path: '/orders' },
    { name: 'Payments', features: 'View transactions', icon: '💳', path: '/payments' },
    { name: 'Analytics', features: 'Business insights', icon: '📈', path: '/analytics' },
  ];

  // Calculate total profit and loss from order data
  const totalOrderRevenue = orderData.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrderProfit = orderData.reduce((sum, day) => sum + day.profit, 0);
  const totalOrderLoss = orderData.reduce((sum, day) => sum + day.loss, 0);

  const stats = [
    { label: 'Total Orders', value: '1,247', change: '+12.5%', icon: '📦', color: 'text-blue-600' },
    { label: 'Revenue', value: `₹${(totalServiceRevenue + totalOrderRevenue).toLocaleString()}`, change: '+18.2%', icon: '💰', color: 'text-green-600' },
    { label: 'Active Customers', value: '845', change: '+8.3%', icon: '👥', color: 'text-purple-600' },
    { label: 'Pending Orders', value: '23', change: '-5.1%', icon: '⏳', color: 'text-orange-600' },
  ];

  const handleBackToWebsite = () => {
    navigate('/');
  };

  // Get current date and time for welcome message
  const currentHour = new Date().getHours();
  let greeting = 'Good Morning';
  if (currentHour >= 12 && currentHour < 17) {
    greeting = 'Good Afternoon';
  } else if (currentHour >= 17) {
    greeting = 'Good Evening';
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((item, index) => (
            <p key={index} className="text-sm" style={{ color: item.color }}>
              {item.name}: ₹{item.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full overflow-y-auto">
        <div className="p-6">
          <img
                      src={logo}
                      alt="logo"
                      className="h-10 mt-1 md:h-full md:mt-0"
                    />
          <span className="text-sm text-gray-500 mt-2 p-14">Admin Panel</span>
        </div>
        
        {/* Search */}
        <div className="px-4 mb-4">
          <input
            type="text"
            placeholder="Search menu..."
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-1">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
              activeTab === 'overview' 
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
                className="w-full text-left px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-3"
              >
                <span>{module.icon}</span>
                <span className="text-sm">{module.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <button 
              onClick={handleBackToWebsite}
              className="w-full text-left px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-all"
            >
              🔙 Back to Website
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                👋 {greeting}, Admin!
              </h2>
              <p className="text-blue-100 mt-1">
                Welcome back to your LaundryHub dashboard. Here's what's happening with your business today.
              </p>
              <p className="text-blue-200 text-sm mt-2">
                📅 {currentDate}
              </p>
            </div>
            <div className="hidden md:block">
              <span className="text-6xl opacity-20">🧺</span>
            </div>
          </div>
        </motion.div>

        {/* Profit/Loss Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500"
          >
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h3 className="text-2xl font-bold text-gray-800">₹{(totalServiceRevenue + totalOrderRevenue).toLocaleString()}</h3>
            <span className="text-xs text-green-600">↑ 18.2% from last month</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500"
          >
            <p className="text-sm text-gray-500">Total Profit</p>
            <h3 className="text-2xl font-bold text-gray-800">₹{(totalServiceProfit + totalOrderProfit).toLocaleString()}</h3>
            <span className="text-xs text-green-600">↑ 22.5% from last month</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500"
          >
            <p className="text-sm text-gray-500">Total Loss</p>
            <h3 className="text-2xl font-bold text-red-600">₹{totalOrderLoss.toLocaleString()}</h3>
            <span className="text-xs text-green-600">↓ 0% from last month</span>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart with Profit/Loss */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Revenue & Profit</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
                <Bar dataKey="profit" fill="#10B981" name="Profit" />
                <Bar dataKey="loss" fill="#EF4444" name="Loss" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-2 text-xs text-gray-500 text-center">
              Showing revenue, profit, and loss for the current week
            </div>
          </div>

          {/* Service Distribution with Profit */}
       <div className="bg-white rounded-xl shadow-sm p-6">
  <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Distribution</h3>
  <div className="flex justify-center">
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={serviceDistribution}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent, cx, cy, midAngle, innerRadius, outerRadius, index }) => {
            const RADIAN = Math.PI / 180;
            const radius = outerRadius * 0.6;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
            return `${(percent * 100).toFixed(0)}%`;
          }}
          outerRadius={130}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={2}
        >
          {serviceDistribution.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" name="Revenue" strokeWidth={2} />
              <Line type="monotone" dataKey="profit" stroke="#10B981" name="Profit" strokeWidth={2} />
              <Line type="monotone" dataKey="loss" stroke="#EF4444" name="Loss" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Modules Table */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Modules & Features</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Module</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Features</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {modules.map((module) => (
                  <tr key={module.name} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span>{module.icon}</span>
                        <span className="font-medium text-gray-800">{module.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{module.features}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Manage →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">🔄 Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'order' ? 'bg-blue-500' :
                      activity.type === 'payment' ? 'bg-green-500' :
                      activity.type === 'service' ? 'bg-yellow-500' : 'bg-purple-500'
                    }`}></div>
                    <span className="text-sm text-gray-700">{activity.text}</span>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">⚡ Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={`${action.color} text-white rounded-lg p-4 hover:scale-105 transition-all shadow-sm`}
                >
                  <div className="text-2xl mb-1">{action.icon}</div>
                  <div className="text-xs font-medium">{action.label}</div>
                </button>
              ))}
            </div>

            {/* Academic Year */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Current Academic Year</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-800">2025-26</span>
                <span className="text-xs text-gray-400">Year</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-400">
          © 2026 LaundryHub Admin Panel. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LaundryDashboard;