import React, { useState } from 'react';
import { 
  FileText, Truck, Clock, Sparkles, ChevronRight, ArrowLeft, 
  User, Phone, MapPin, Receipt, RotateCw, Headset, 
  Calendar, CreditCard, Download, Tag
} from 'lucide-react';

// Mock Data representing multiple recent orders (No images, URLs, or notes)
const mockOrdersHistory = [
  {
    orderNo: "LND8393-01",
    status: "DELIVERED",
    statusColor: "bg-green-50 text-green-700 border-green-200",
    date: "14 April 2026 at 01:24 pm",
    pickupDate: "14 Apr 2026",
    timeSlot: "10:00 AM To 12:00 PM",
    deliveryDate: "16 Apr 2026",
    deliveryTimeSlot: "04:00 PM To 06:00 PM",
    paymentMethod: "COD",
    paymentStatus: "PAID",
    transactionId: "TXN-938402948",
    customer: {
      name: "John Doe",
      mobile: "+91 98765 43210"
    },
    items: [
      {
        category: "WASH & IRON",
        id: "LND8393-01-W02",
        name: "Premium Shirts & Trousers",
        quantity: 5,
        price: 350,
        unitPrice: 70,
        estDelivery: "24-48 Hours"
      },
      {
        category: "DRY CLEANING",
        id: "LND8393-01-D15",
        name: "Heavy Winter Jacket / Coat",
        quantity: 1,
        price: 60,
        unitPrice: 60,
        estDelivery: "48-72 Hours"
      }
    ],
    summary: {
      subtotal: 410,
      deliveryCharges: 120,
      discount: 50,
      tax: 25,
      grandTotal: 505
    },
    shippingAddress: "123, Sample Address, Andheri East, Mumbai - 400069"
  },
  {
    orderNo: "LND8393-02",
    status: "PROCESSING",
    statusColor: "bg-blue-50 text-blue-700 border-blue-200",
    date: "02 July 2026 at 09:15 am",
    pickupDate: "02 Jul 2026",
    timeSlot: "08:00 AM To 10:00 AM",
    deliveryDate: "04 Jul 2026",
    deliveryTimeSlot: "02:00 PM To 04:00 PM",
    paymentMethod: "UPI",
    paymentStatus: "PAID",
    transactionId: "TXN-938402999",
    customer: {
      name: "John Doe",
      mobile: "+91 98765 43210"
    },
    items: [
      {
        category: "WASH & FOLD",
        id: "LND8393-02-F01",
        name: "Casual T-Shirts & Shorts",
        quantity: 10,
        price: 300,
        unitPrice: 30,
        estDelivery: "24 Hours"
      }
    ],
    summary: {
      subtotal: 300,
      deliveryCharges: 50,
      discount: 0,
      tax: 15,
      grandTotal: 365
    },
    shippingAddress: "123, Sample Address, Andheri East, Mumbai - 400069"
  },
  {
    orderNo: "LND8393-03",
    status: "PENDING",
    statusColor: "bg-amber-50 text-amber-700 border-amber-200",
    date: "03 July 2026 at 10:00 am",
    pickupDate: "04 Jul 2026",
    timeSlot: "11:00 AM To 01:00 PM",
    deliveryDate: "06 Jul 2026",
    deliveryTimeSlot: "11:00 AM To 01:00 PM",
    paymentMethod: "COD",
    paymentStatus: "PENDING",
    transactionId: "N/A",
    customer: {
      name: "John Doe",
      mobile: "+91 98765 43210"
    },
    items: [
      {
        category: "DRY CLEANING",
        id: "LND8393-03-D02",
        name: "Silk Saree / Designer Suit",
        quantity: 2,
        price: 400,
        unitPrice: 200,
        estDelivery: "72 Hours"
      }
    ],
    summary: {
      subtotal: 400,
      deliveryCharges: 50,
      discount: 0,
      tax: 20,
      grandTotal: 470
    },
    shippingAddress: "123, Sample Address, Andheri East, Mumbai - 400069"
  }
];

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewingAll, setViewingAll] = useState(false);

  const handleOrderClick = (order) => {
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setSelectedOrder(order);
      setIsLoading(false);
    }, 450);
  };

  const handleBackToList = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedOrder(null);
      setIsLoading(false);
    }, 400);
  };

  const filteredOrders = mockOrdersHistory.filter(order => {
    if (activeTab === 'All') return true;
    return order.status.toLowerCase() === activeTab.toLowerCase();
  });

  // --- LOADING RENDER WRAPPER ---
  if (isLoading) {
    return (
      <div className="w-full pt-16 md:pt-20 lg:pt-24"> {/* Top spacing offset applied here */}
        <div className="w-full max-w-5xl mx-auto p-6 space-y-6 font-sans animate-pulse">
          <div className="h-8 bg-gray-200 rounded-lg w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-40 bg-gray-100 rounded-2xl border border-gray-200"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- ORDER DETAILS SUBPAGE ---
  if (selectedOrder) {
    const order = selectedOrder;
    return (
      <div className="w-full pt-16 md:pt-20 lg:pt-24"> {/* Top spacing offset applied here */}
        <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6 font-sans text-gray-800 transition-all duration-300 ease-in-out">
          
          {/* Navigation Breadcrumb */}
          <button 
            onClick={handleBackToList}
            className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition group"
          >
            <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
            Back to Order History
          </button>

          {/* Header Summary Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">{order.orderNo}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${order.statusColor}`}>
                  ● {order.status}
                </span>
              </div>
              <p className="text-xs text-gray-400">Placed on <span className="text-gray-600 font-medium">{order.date}</span></p>
            </div>
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-xl hover:bg-blue-100 transition">
                <Download size={14} /> Invoice
              </button>
              <button className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-200 transition">
                <RotateCw size={14} /> Reorder
              </button>
              <button className="w-full md:w-auto flex items-center justify-center gap-1.5 px-4 py-2 bg-gray-50 text-gray-600 text-xs font-bold rounded-xl border border-gray-200 hover:bg-gray-100 transition">
                <Headset size={14} /> Support
              </button>
            </div>
          </div>

          {/* Information Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Customer Logistics & Address Metadata */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase flex items-center gap-1.5 border-b pb-2">
                <User size={14} className="text-blue-500" /> Customer & Route Info
              </h4>
              <div className="space-y-2 text-xs">
                <p className="font-bold text-gray-800 text-sm">{order.customer.name}</p>
                <p className="text-gray-600 flex items-center gap-1"><Phone size={12} className="text-gray-400" /> {order.customer.mobile}</p>
                <div className="pt-2 border-t text-gray-500 flex gap-1.5">
                  <MapPin size={14} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{order.shippingAddress}</p>
                </div>
              </div>
            </div>

            {/* Time Slot Windows */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase flex items-center gap-1.5 border-b pb-2">
                <Calendar size={14} className="text-blue-500" /> Slot Windows
              </h4>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-gray-400 block font-medium">Pickup Window</span>
                  <span className="font-bold text-gray-800 block">{order.pickupDate}</span>
                  <span className="text-gray-500 text-[11px] block bg-gray-50 px-1.5 py-0.5 rounded border">{order.timeSlot}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-400 block font-medium">Delivery Window</span>
                  <span className="font-bold text-gray-800 block">{order.deliveryDate}</span>
                  <span className="text-gray-500 text-[11px] block bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100">{order.deliveryTimeSlot}</span>
                </div>
              </div>
            </div>

            {/* Payment Gateways Ledger Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase flex items-center gap-1.5 border-b pb-2">
                <CreditCard size={14} className="text-blue-500" /> Payment Audit
              </h4>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Method:</span>
                  <span className="font-bold text-gray-800">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Transaction ID:</span>
                  <span className="font-mono text-gray-600 bg-gray-50 px-1 rounded border">{order.transactionId}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-gray-500">Gateway Status:</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                    order.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                  }`}>{order.paymentStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ordered breakdown listings & Final Pricing Structure */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">Item Breakdown</h3>
              {order.items.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 hover:shadow-md transition">
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                        <Sparkles size={10} /> {item.category}
                      </span>
                      <span className="text-[10px] text-gray-400">ID: {item.id}</span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 truncate">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.quantity} units × ₹{item.unitPrice}/pc</p>
                  </div>
                  <div className="text-right flex flex-col justify-between items-end">
                    <span className="text-sm font-black text-gray-900">₹{item.price}</span>
                    <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border flex items-center gap-1"><Clock size={10}/>{item.estDelivery}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Balance Invoicing Panel */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase flex items-center gap-1.5 border-b pb-2">
                <Receipt size={14} className="text-blue-500" /> Invoice Breakdown
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-gray-500">
                  <span>Washing & Cleaning Cost</span>
                  <span className="font-semibold text-gray-800">₹{order.summary.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Rider Logistics Fees</span>
                  <span className="font-semibold text-gray-800">₹{order.summary.deliveryCharges}</span>
                </div>
                {order.summary.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 bg-emerald-50 p-1.5 rounded border border-emerald-100">
                    <span className="flex items-center gap-1"><Tag size={12}/> Campaign Coupon</span>
                    <span className="font-bold">- ₹{order.summary.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>GST/Service Tax</span>
                  <span className="font-semibold text-gray-800">₹{order.summary.tax}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-black text-gray-900 border-t pt-3 mt-2">
                  <span>Grand Total</span>
                  <span className="text-blue-600 text-lg">₹{order.summary.grandTotal}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // --- MAIN RECENT ORDER HISTORY VIEW ---
  return (
    <div className="w-full pt-16 md:pt-20 lg:pt-24"> {/* Top spacing offset applied here */}
      <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6 font-sans text-gray-800 transition-all duration-300 ease-in-out">
        
        {/* Filtering Navigation System */}
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {['All', 'Pending', 'Processing', 'Delivered'].map((tab) => (
              <button 
                key={tab}
                onClick={() => { setActiveTab(tab); setViewingAll(false); }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  activeTab === tab 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                    : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                {tab === 'All' ? 'All Bookings' : tab}
              </button>
            ))}
          </div>
          <span className="text-xs font-semibold text-gray-400 hidden sm:inline">
            Showing {viewingAll ? filteredOrders.length : Math.min(3, filteredOrders.length)} Orders
          </span>
        </div>

        {/* Grid Dashboard Item Layouts */}
        <div className="space-y-4">
          {filteredOrders.slice(0, viewingAll ? filteredOrders.length : 3).map((order) => (
            <div 
              key={order.orderNo}
              onClick={() => handleOrderClick(order)}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-blue-200 hover:shadow-md cursor-pointer transition-all duration-200"
            >
              {/* Context Summary Fields */}
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black border ${order.statusColor}`}>
                    ● {order.status}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">Ref: <span className="font-bold text-gray-700">{order.orderNo}</span></span>
                </div>
                <h3 className="text-base font-bold text-gray-900 truncate">
                  {order.items.map(i => i.name).join(' + ')}
                </h3>
                <p className="text-xs text-gray-400">Scheduled: <span className="text-gray-600 font-medium">{order.date}</span></p>
              </div>

              {/* Total Item Count Badge */}
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                <span className="text-xs font-bold text-gray-500">Items:</span>
                <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {order.items.reduce((acc, item) => acc + item.quantity, 0)} Pcs
                </span>
              </div>

              {/* Total Cost Matrix and Primary Event Actions */}
              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t pt-3 md:border-t-0 md:pt-0">
                <div className="text-left md:text-right">
                  <p className="text-[10px] text-gray-400 tracking-wider uppercase font-medium">Grand Total</p>
                  <p className="text-lg font-black text-blue-600">₹{order.summary.grandTotal}</p>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 group-hover:bg-blue-600 text-gray-700 group-hover:text-white text-xs font-bold rounded-xl transition-all border border-gray-200 group-hover:border-blue-600">
                  View Details <ChevronRight size={14} />
                </button>
              </div>

            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="bg-white border rounded-2xl p-12 text-center text-gray-400 space-y-2">
              <p className="font-semibold">No orders found in this category.</p>
            </div>
          )}
        </div>

        {/* Grid Expansion Footer Controller */}
        {filteredOrders.length > 3 && !viewingAll && (
          <div className="text-center pt-2">
            <button 
              onClick={() => setViewingAll(true)}
              className="px-6 py-2.5 bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 text-xs font-bold rounded-xl shadow-sm transition"
            >
              View All Orders ({filteredOrders.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;