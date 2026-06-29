import React, { useState, useEffect, useContext, createContext } from 'react';
import { 
  Search, 
  Eye, 
  ChevronLeft,
  ChevronRight,
  Mail,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  User,
  ShoppingBag,
  Phone,
  MapPin,
  Calendar,
  CalendarX,
  Filter,
  X,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Package,
  Truck,
  Check,
  XCircle,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Shirt,
  Sofa,
  Clover,
  Ban,
  CreditCard,
  Wallet,
  Building,
  RotateCcw,
  IndianRupee,
  MessageSquare
} from 'lucide-react';

// ============================================================
// ORDER CONTEXT - For sharing data with Analytics and Payments
// ============================================================
const OrderContext = createContext();

const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

const OrderProvider = ({ children, initialData }) => {
  const [bookings, setBookings] = useState(initialData || []);

  const updateBookings = (newBookings) => {
    setBookings(newBookings);
  };

  const addBooking = (booking) => {
    setBookings(prev => [...prev, booking]);
  };

  const updateBooking = (id, updatedData) => {
    setBookings(prev => prev.map(b => 
      b.id === id ? { ...b, ...updatedData } : b
    ));
  };

  const deleteBooking = (id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  return (
    <OrderContext.Provider value={{
      bookings,
      setBookings,
      updateBookings,
      addBooking,
      updateBooking,
      deleteBooking
    }}>
      {children}
    </OrderContext.Provider>
  );
};

// ============================================================
// HELPER FUNCTIONS FOR DYNAMIC DATES
// ============================================================
const getDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

const getFutureDate = (daysFromNow) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString();
};

// ============================================================
// MOCK DATA - Bookings with Items (Dynamic Dates)
// ============================================================
const MOCK_BOOKINGS = [
  {
    id: 'BK001',
    customerName: 'Rajesh Kumar',
    customerEmail: 'rajesh@email.com',
    customerPhone: '+91 98765 43210',
    customerAddress: '123, MG Road, Mumbai - 400001',
    service: 'Dry Cleaning',
    items: 5,
    itemsList: [
      { name: 'Cotton Shirt (White)', quantity: 2, price: 150 },
      { name: 'Silk Saree', quantity: 1, price: 500 },
      { name: 'Woolen Blazer', quantity: 1, price: 300 },
      { name: 'Cotton Trousers', quantity: 1, price: 150 }
    ],
    totalAmount: 1250,
    status: 'Completed',
    bookingDate: getDate(1), // 1 day ago
    pickupDate: getDate(0),
    deliveryDate: getFutureDate(1),
    notes: 'Handle with care - silk items',
    paymentStatus: 'Paid',
    paymentMethod: 'Online',
    refundStatus: null,
    refundDate: null,
    refundAmount: null
  },
  {
    id: 'BK002',
    customerName: 'Priya Sharma',
    customerEmail: 'priya@email.com',
    customerPhone: '+91 98765 43211',
    customerAddress: '456, Lake View, Bangalore - 560001',
    service: 'Wash & Fold',
    items: 8,
    itemsList: [
      { name: 'T-Shirts', quantity: 4, price: 80 },
      { name: 'Jeans', quantity: 2, price: 120 },
      { name: 'Trousers', quantity: 2, price: 100 }
    ],
    totalAmount: 800,
    status: 'Active',
    bookingDate: getDate(2), // 2 days ago
    pickupDate: getDate(1),
    deliveryDate: getFutureDate(1),
    notes: 'Use gentle detergent',
    paymentStatus: 'Paid',
    paymentMethod: 'COD',
    refundStatus: null,
    refundDate: null,
    refundAmount: null
  },
  {
    id: 'BK003',
    customerName: 'Amit Patel',
    customerEmail: 'amit@email.com',
    customerPhone: '+91 98765 43212',
    customerAddress: '789, Park Street, Delhi - 110001',
    service: 'Ironing',
    items: 3,
    itemsList: [
      { name: 'Formal Shirts', quantity: 3, price: 150 }
    ],
    totalAmount: 450,
    status: 'Pending',
    bookingDate: getDate(3), // 3 days ago
    pickupDate: getDate(2),
    deliveryDate: null,
    notes: 'Extra starch on shirts',
    paymentStatus: 'Pending',
    paymentMethod: 'COD',
    refundStatus: null,
    refundDate: null,
    refundAmount: null
  },
  {
    id: 'BK004',
    customerName: 'Sneha Reddy',
    customerEmail: 'sneha@email.com',
    customerPhone: '+91 98765 43213',
    customerAddress: '321, Green Valley, Hyderabad - 500001',
    service: 'Stain Removal',
    items: 2,
    itemsList: [
      { name: 'White Silk Shirt', quantity: 1, price: 350 },
      { name: 'Cotton Blouse', quantity: 1, price: 250 }
    ],
    totalAmount: 600,
    status: 'Active',
    bookingDate: getDate(4), // 4 days ago
    pickupDate: getDate(3),
    deliveryDate: null,
    notes: 'Red wine stain on white shirt',
    paymentStatus: 'Paid',
    paymentMethod: 'Online',
    refundStatus: null,
    refundDate: null,
    refundAmount: null
  },
  {
    id: 'BK005',
    customerName: 'Ananya Gupta',
    customerEmail: 'ananya@email.com',
    customerPhone: '+91 98765 43215',
    customerAddress: '987, Coastal Road, Chennai - 600001',
    service: 'Dry Cleaning',
    items: 4,
    itemsList: [
      { name: 'Wedding Gown', quantity: 1, price: 600 },
      { name: 'Bridal Dupatta', quantity: 1, price: 200 },
      { name: 'Embroidered Blouse', quantity: 1, price: 150 },
      { name: 'Silk Skirt', quantity: 1, price: 150 }
    ],
    totalAmount: 1100,
    status: 'Completed',
    bookingDate: getDate(5), // 5 days ago
    pickupDate: getDate(4),
    deliveryDate: getDate(3),
    notes: 'Wedding dress - very delicate',
    paymentStatus: 'Paid',
    paymentMethod: 'Online',
    refundStatus: null,
    refundDate: null,
    refundAmount: null
  },
  {
    id: 'BK006',
    customerName: 'Rahul Verma',
    customerEmail: 'rahul@email.com',
    customerPhone: '+91 98765 43216',
    customerAddress: '147, Garden City, Pune - 411001',
    service: 'Wash & Fold',
    items: 10,
    itemsList: [
      { name: 'T-Shirts', quantity: 6, price: 80 },
      { name: 'Jeans', quantity: 2, price: 120 },
      { name: 'Shirts', quantity: 2, price: 150 }
    ],
    totalAmount: 1020,
    status: 'Active',
    bookingDate: getDate(6), // 6 days ago
    pickupDate: getDate(5),
    deliveryDate: getDate(4),
    notes: 'Separate whites and colors',
    paymentStatus: 'Paid',
    paymentMethod: 'Online',
    refundStatus: null,
    refundDate: null,
    refundAmount: null
  },
  {
    id: 'BK007',
    customerName: 'Meera Nair',
    customerEmail: 'meera@email.com',
    customerPhone: '+91 98765 43217',
    customerAddress: '258, Temple Road, Kochi - 682001',
    service: 'Ironing',
    items: 6,
    itemsList: [
      { name: 'Formal Shirts', quantity: 4, price: 150 },
      { name: 'Trousers', quantity: 2, price: 100 }
    ],
    totalAmount: 800,
    status: 'Pending',
    bookingDate: getDate(0), // Today
    pickupDate: getFutureDate(1),
    deliveryDate: null,
    notes: 'Need same day delivery',
    paymentStatus: 'Paid', // ✅ CHANGED from 'Pending' to 'Paid'
    paymentMethod: 'COD',
    refundStatus: null,
    refundDate: null,
    refundAmount: null
  },
  {
    id: 'BK008',
    customerName: 'Arjun Reddy',
    customerEmail: 'arjun@email.com',
    customerPhone: '+91 98765 43218',
    customerAddress: '369, Lake Gardens, Kolkata - 700001',
    service: 'Stain Removal',
    items: 1,
    itemsList: [
      { name: 'Leather Jacket', quantity: 1, price: 300 }
    ],
    totalAmount: 300,
    status: 'Cancelled',
    bookingDate: getDate(7), // 7 days ago
    pickupDate: getDate(6),
    deliveryDate: null,
    notes: 'Oil stain on jacket',
    paymentStatus: 'Paid',
    paymentMethod: 'Online',
    refundStatus: 'Completed',
    refundDate: getDate(6),
    refundAmount: 300
  },
  {
    id: 'BK009',
    customerName: 'Kavya Menon',
    customerEmail: 'kavya@email.com',
    customerPhone: '+91 98765 43219',
    customerAddress: '741, Hill View, Coimbatore - 641001',
    service: 'Dry Cleaning',
    items: 3,
    itemsList: [
      { name: 'Silk Saree', quantity: 1, price: 500 },
      { name: 'Blouse', quantity: 1, price: 150 },
      { name: 'Dupatta', quantity: 1, price: 100 }
    ],
    totalAmount: 750,
    status: 'Completed',
    bookingDate: getDate(8), // 8 days ago (outside 7 days)
    pickupDate: getDate(7),
    deliveryDate: getDate(6),
    notes: 'Saree - handle carefully',
    paymentStatus: 'Paid',
    paymentMethod: 'Online',
    refundStatus: null,
    refundDate: null,
    refundAmount: null
  },
  {
    id: 'BK010',
    customerName: 'Vikram Singh',
    customerEmail: 'vikram@email.com',
    customerPhone: '+91 98765 43214',
    customerAddress: '654, Sunrise Colony, Jaipur - 302001',
    service: 'Wash & Fold',
    items: 5,
    itemsList: [
      { name: 'T-Shirts', quantity: 3, price: 80 },
      { name: 'Jeans', quantity: 2, price: 120 }
    ],
    totalAmount: 480,
    status: 'Pending',
    bookingDate: getDate(9), // 9 days ago (outside 7 days)
    pickupDate: getDate(8),
    deliveryDate: null,
    notes: 'First time customer',
    paymentStatus: 'Pending',
    paymentMethod: 'COD',
    refundStatus: null,
    refundDate: null,
    refundAmount: null
  }
];

// ============================================================
// REFUND MODAL COMPONENT
// ============================================================
function RefundModal({ booking, onClose, onConfirm }) {
  const [refundAmount, setRefundAmount] = useState(booking.totalAmount);
  const [refundReason, setRefundReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!refundAmount || refundAmount <= 0) {
      alert('Please enter a valid refund amount');
      return;
    }
    if (!refundReason.trim()) {
      alert('Please enter a reason for the refund');
      return;
    }
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onConfirm({
        amount: refundAmount,
        reason: refundReason,
        date: new Date().toISOString()
      });
    } catch (error) {
      console.error('Refund failed:', error);
      alert('Failed to process refund. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
            <RotateCcw className="w-5 h-5 text-blue-600" />
            Process Refund
          </h2>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600">Booking ID: <span className="font-medium">{booking.id}</span></p>
            <p className="text-sm text-gray-600">Customer: <span className="font-medium">{booking.customerName}</span></p>
            <p className="text-sm text-gray-600">Original Amount: <span className="font-medium text-green-600">₹{booking.totalAmount}</span></p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Refund Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="number"
                value={refundAmount}
                onChange={(e) => setRefundAmount(Number(e.target.value))}
                max={booking.totalAmount}
                min={0}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Maximum refund amount: ₹{booking.totalAmount}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Refund <span className="text-red-500">*</span>
            </label>
            <textarea
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              rows={3}
              placeholder="Enter reason for refund (e.g., Order cancelled, Customer request, etc.)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4" />
                  Process Refund
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================
// BOOKING DETAIL VIEW COMPONENT
// ============================================================
function BookingDetailView({ booking, onBack, onRefund }) {
  const statusConfig = {
    'Completed': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
    'Active': { color: 'bg-blue-100 text-blue-800', icon: Package },
    'Pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    'Cancelled': { color: 'bg-red-100 text-red-800', icon: XCircle }
  };

  const paymentStatusConfig = {
    'Paid': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
    'Pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    'Refunded': { color: 'bg-red-100 text-red-800', icon: AlertTriangle }
  };

  const refundStatusConfig = {
    'Pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    'Completed': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
    'Failed': { color: 'bg-red-100 text-red-800', icon: XCircle }
  };

  const getPaymentMethodIcon = (method) => {
    switch(method) {
      case 'Online':
        return <CreditCard className="w-4 h-4" />;
      case 'COD':
        return <Wallet className="w-4 h-4" />;
      case 'Card':
        return <CreditCard className="w-4 h-4" />;
      case 'UPI':
        return <Building className="w-4 h-4" />;
      default:
        return <Wallet className="w-4 h-4" />;
    }
  };

  const StatusIcon = statusConfig[booking.status]?.icon || CheckCircle;
  const PaymentIcon = paymentStatusConfig[booking.paymentStatus]?.icon || CheckCircle;

  const totalItems = booking.itemsList?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const getDeliveryDisplay = () => {
    if (booking.status === 'Cancelled') {
      return {
        icon: Ban,
        color: 'text-red-500',
        bgColor: 'bg-red-50',
        message: 'Delivery Blocked',
        description: 'Order was cancelled'
      };
    } else if (booking.status === 'Pending') {
      return {
        icon: Clock,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50',
        message: 'Not Yet Scheduled',
      };
    } else if (booking.status === 'Active' || booking.status === 'Completed') {
      return {
        icon: Truck,
        color: 'text-green-500',
        bgColor: 'bg-green-50',
        message: new Date(booking.deliveryDate).toLocaleString(),
        description: 'Scheduled delivery'
      };
    }
    return null;
  };

  const deliveryInfo = getDeliveryDisplay();

  const canRefund = (booking.status === 'Active' || booking.status === 'Completed') && 
                    booking.paymentStatus === 'Paid' && 
                    booking.refundStatus !== 'Completed';

  const getRefundStatusBadge = (status) => {
    if (!status) return null;
    const config = {
      'Pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'Completed': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'Failed': { color: 'bg-red-100 text-red-800', icon: XCircle }
    };
    const { color, icon: Icon } = config[status] || config.Pending;
    return (
      <span className={`px-2 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${color}`}>
        <Icon className="w-3 h-3" />
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
            <p className="text-sm text-gray-500">#{booking.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {canRefund && (
            <button 
              onClick={() => onRefund(booking)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Process Refund
            </button>
          )}
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm flex items-center gap-2">
            <Download className="w-4 h-4" />
            Invoice
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Customer Information</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Customer Name</p>
                  <p className="text-sm font-medium text-gray-800">{booking.customerName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-800">{booking.customerEmail}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-800">{booking.customerPhone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm font-medium text-gray-800">{booking.customerAddress}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Items List ({totalItems} items)
              </h3>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Item</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-600">Quantity</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-600">Price</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-600">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {booking.itemsList?.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-100 transition-colors">
                        <td className="px-4 py-2 text-sm text-gray-800 flex items-center gap-2">
                          <Shirt className="w-4 h-4 text-blue-500" />
                          {item.name}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600 text-center">{item.quantity}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 text-right">₹{item.price}</td>
                        <td className="px-4 py-2 text-sm font-medium text-gray-800 text-right">₹{item.quantity * item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-100 border-t border-gray-200">
                    <tr>
                      <td colSpan="3" className="px-4 py-2 text-sm font-semibold text-gray-800 text-right">Total:</td>
                      <td className="px-4 py-2 text-sm font-bold text-green-600 text-right">₹{booking.totalAmount}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Booking Details</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Package className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Service</p>
                  <p className="text-sm font-medium text-gray-800">{booking.service}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <ShoppingBag className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Total Items</p>
                  <p className="text-sm font-medium text-gray-800">{totalItems} items</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-5 h-5 text-blue-500 mt-0.5">💰</div>
                <div>
                  <p className="text-xs text-gray-500">Total Amount</p>
                  <p className="text-sm font-bold text-green-600">₹{booking.totalAmount}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${statusConfig[booking.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                    <StatusIcon className="w-3 h-3 inline mr-1" />
                    {booking.status}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Payment Details</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {getPaymentMethodIcon(booking.paymentMethod)}
                    <span className="text-sm text-gray-600">Payment Method</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{booking.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <PaymentIcon className="w-4 h-4" />
                    <span className="text-sm text-gray-600">Payment Status</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${paymentStatusConfig[booking.paymentStatus]?.color || 'bg-gray-100 text-gray-800'}`}>
                    {booking.paymentStatus}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Amount Paid</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">₹{booking.totalAmount}</span>
                </div>
              </div>
            </div>

            {booking.refundStatus && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Refund Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Refund Status</span>
                    {getRefundStatusBadge(booking.refundStatus)}
                  </div>
                  {booking.refundAmount && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Refund Amount</span>
                      <span className="text-sm font-bold text-red-600">₹{booking.refundAmount}</span>
                    </div>
                  )}
                  {booking.refundDate && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Refund Date</span>
                      <span className="text-sm font-medium text-gray-800">{new Date(booking.refundDate).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500">Booked:</span>
                <span className="font-medium">{new Date(booking.bookingDate).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CalendarX className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500">Pickup:</span>
                <span className="font-medium">{new Date(booking.pickupDate).toLocaleString()}</span>
              </div>
              {deliveryInfo && (
                <div className={`flex items-center gap-2 text-sm p-2 rounded-lg ${deliveryInfo.bgColor}`}>
                  <deliveryInfo.icon className={`w-4 h-4 ${deliveryInfo.color}`} />
                  <div>
                    <span className="text-gray-500">Delivery:</span>
                    <span className={`font-medium ${deliveryInfo.color}`}>
                      {deliveryInfo.message}
                    </span>
                    {deliveryInfo.description && (
                      <span className="text-xs text-gray-400 ml-1">
                        ({deliveryInfo.description})
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {booking.notes && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-xs text-gray-500">Notes</p>
                <p className="text-sm text-gray-700 italic">"{booking.notes}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
function OrderManagement() {
  const { bookings, updateBooking } = useOrders();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterService, setFilterService] = useState('All');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundBooking, setRefundBooking] = useState(null);
  const itemsPerPage = 5;

  const stats = {
    total: bookings.length,
    active: bookings.filter(b => b.status === 'Active').length,
    completed: bookings.filter(b => b.status === 'Completed').length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    cancelled: bookings.filter(b => b.status === 'Cancelled').length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.totalAmount, 0),
  };

  const uniqueServices = ['All', ...new Set(bookings.map(b => b.service))];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.customerPhone.includes(searchTerm);
    const matchesStatus = filterStatus === 'All' || booking.status === filterStatus;
    const matchesService = filterService === 'All' || booking.service === filterService;
    return matchesSearch && matchesStatus && matchesService;
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterService]);

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setShowDetailView(true);
  };

  const handleBackToList = () => {
    setShowDetailView(false);
    setSelectedBooking(null);
  };

  const handleRefundClick = (booking) => {
    setRefundBooking(booking);
    setShowRefundModal(true);
  };

  const handleRefundConfirm = (refundData) => {
    if (!refundBooking) return;
    
    updateBooking(refundBooking.id, {
      status: 'Cancelled',
      paymentStatus: 'Refunded',
      refundStatus: 'Completed',
      refundDate: refundData.date,
      refundAmount: refundData.amount,
      notes: refundBooking.notes ? `${refundBooking.notes} | Refund: ${refundData.reason}` : `Refund: ${refundData.reason}`
    });

    if (selectedBooking?.id === refundBooking.id) {
      setSelectedBooking({
        ...selectedBooking,
        status: 'Cancelled',
        paymentStatus: 'Refunded',
        refundStatus: 'Completed',
        refundDate: refundData.date,
        refundAmount: refundData.amount,
        notes: selectedBooking.notes ? `${selectedBooking.notes} | Refund: ${refundData.reason}` : `Refund: ${refundData.reason}`
      });
    }

    setShowRefundModal(false);
    setRefundBooking(null);
    alert(`Refund of ₹${refundData.amount} processed successfully! Order ${refundBooking.id} has been cancelled.`);
  };

  const getStatusBadge = (status) => {
    const config = {
      'Completed': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'Active': { color: 'bg-blue-100 text-blue-800', icon: Package },
      'Pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'Cancelled': { color: 'bg-red-100 text-red-800', icon: XCircle }
    };
    const { color, icon: Icon } = config[status] || config.Pending;
    return (
      <span className={`px-2 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${color}`}>
        <Icon className="w-3 h-3" />
        {status}
      </span>
    );
  };

  const getPaymentStatusBadge = (status) => {
    const config = {
      'Paid': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'Pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'Refunded': { color: 'bg-red-100 text-red-800', icon: AlertTriangle }
    };
    const { color, icon: Icon } = config[status] || config.Pending;
    return (
      <span className={`px-2 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${color}`}>
        <Icon className="w-3 h-3" />
        {status}
      </span>
    );
  };

  if (showDetailView && selectedBooking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <BookingDetailView 
            booking={selectedBooking} 
            onBack={handleBackToList}
            onRefund={handleRefundClick}
          />
        </div>
        {showRefundModal && refundBooking && (
          <RefundModal
            booking={refundBooking}
            onClose={() => {
              setShowRefundModal(false);
              setRefundBooking(null);
            }}
            onConfirm={handleRefundConfirm}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
              Order Management
              <span className="text-sm font-normal bg-blue-600 text-white px-3 py-1 rounded-full">
                {stats.total} Total
              </span>
            </h1>
            <p className="text-gray-600 mt-1">Manage all bookings and orders</p>
          </div>
          
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 whitespace-nowrap shadow-sm transition"
            type="button"
          >
            <Plus className="w-4 h-4" />
            New Booking
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Cancelled</p>
            <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-2xl font-bold text-purple-600">₹{stats.totalRevenue}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, or booking ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
            >
              {uniqueServices.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select> 
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Payment</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedBookings.map((booking) => (
                  <tr 
                    key={booking.id} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleBookingClick(booking)}
                  >
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-blue-600">{booking.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {booking.customerEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700">{booking.service}</span>
                      <div className="text-xs text-gray-400">{booking.items} items</div>
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-gray-900">₹{booking.totalAmount}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {getPaymentStatusBadge(booking.paymentStatus)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 hidden lg:table-cell">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleBookingClick(booking)}
                        className="p-1.5 rounded hover:bg-gray-100 text-blue-500 hover:text-blue-700 transition-colors"
                        title="View Details"
                        type="button"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No bookings found matching your filters</p>
            </div>
          )}

          {filteredBookings.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-sm text-gray-500">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of {filteredBookings.length} bookings
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  type="button"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded text-sm transition ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'hover:bg-gray-50'
                    }`}
                    type="button"
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  type="button"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showRefundModal && refundBooking && (
        <RefundModal
          booking={refundBooking}
          onClose={() => {
            setShowRefundModal(false);
            setRefundBooking(null);
          }}
          onConfirm={handleRefundConfirm}
        />
      )}
    </div>
  );
}

// ============================================================
// EXPORTS - Only export once at the bottom
// ============================================================
export default OrderManagement;
export { MOCK_BOOKINGS, useOrders, OrderProvider };