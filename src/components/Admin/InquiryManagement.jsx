import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Clock,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Download,
  User
} from 'lucide-react';

const InquiryManagement = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sample inquiry data 
  useEffect(() => {

    setTimeout(() => {
      const sampleInquiries = [
        {
          id: 1,
          customerId: 'CUST-001',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane.doe@example.com',
          inquiryType: 'Order Support',
          message: 'I need help with my recent order. The delivery was delayed and I need to reschedule.',
          status: 'new',
          createdAt: '2026-07-09T10:30:00Z',
          phone: '+91 98765 43210',
          customerSince: '2025-03-15'
        },
        {
          id: 2,
          customerId: 'CUST-002',
          firstName: 'John',
          lastName: 'Smith',
          email: 'john.smith@example.com',
          inquiryType: 'Pickup Request',
          message: 'I would like to schedule a pickup for tomorrow between 2-4 PM. Please confirm availability.',
          status: 'in-progress',
          createdAt: '2026-07-08T15:20:00Z',
          phone: '+91 87654 32109',
          pickupAddress: '123 Main Street, Mumbai',
          customerSince: '2025-06-20'
        },
        {
          id: 3,
          customerId: 'CUST-003',
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: 'sarah.j@example.com',
          inquiryType: 'Dry Cleaning',
          message: 'Do you offer dry cleaning for silk sarees? I have a few traditional garments that need special care.',
          status: 'resolved',
          createdAt: '2026-07-07T09:15:00Z',
          phone: '+91 76543 21098',
          customerSince: '2025-01-10'
        },
        {
          id: 4,
          customerId: 'CUST-004',
          firstName: 'Michael',
          lastName: 'Brown',
          email: 'michael.brown@example.com',
          inquiryType: 'General Query',
          message: 'What are your service areas? I live in Andheri East and want to know if you deliver here.',
          status: 'new',
          createdAt: '2026-07-09T08:45:00Z',
          phone: '+91 65432 10987',
          customerSince: '2025-05-05'
        },
        {
          id: 5,
          customerId: 'CUST-005',
          firstName: 'Priya',
          lastName: 'Patel',
          email: 'priya.patel@example.com',
          inquiryType: 'Order Support',
          message: 'I received my order but some items were missing. Please assist with this issue.',
          status: 'in-progress',
          createdAt: '2026-07-08T11:00:00Z',
          phone: '+91 54321 09876',
          customerSince: '2024-11-20'
        }
      ];
      
      setInquiries(sampleInquiries);
      setFilteredInquiries(sampleInquiries);
      setLoading(false);
    }, 500);
  }, []);

  // Filter inquiries
  useEffect(() => {
    let filtered = inquiries;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(inquiry => 
        inquiry.customerId.toLowerCase().includes(term) ||
        inquiry.firstName.toLowerCase().includes(term) ||
        inquiry.lastName.toLowerCase().includes(term) ||
        inquiry.email.toLowerCase().includes(term) ||
        inquiry.message.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(inquiry => inquiry.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(inquiry => inquiry.inquiryType === typeFilter);
    }

    setFilteredInquiries(filtered);
  }, [searchTerm, statusFilter, typeFilter, inquiries]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'new':
        return 'bg-blue-100 text-blue-700';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'resolved':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'new':
        return <Clock size={14} className="mr-1" />;
      case 'in-progress':
        return <RefreshCw size={14} className="mr-1" />;
      case 'resolved':
        return <CheckCircle size={14} className="mr-1" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      'Order Support': 'bg-purple-100 text-purple-700',
      'Pickup Request': 'bg-orange-100 text-orange-700',
      'Dry Cleaning': 'bg-pink-100 text-pink-700',
      'General Query': 'bg-teal-100 text-teal-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDateShort = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleViewInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInquiry(null);
  };

  const handleStatusChange = (inquiryId, newStatus) => {
    setInquiries(prev => 
      prev.map(inquiry => 
        inquiry.id === inquiryId 
          ? { ...inquiry, status: newStatus }
          : inquiry
      )
    );
  };

  const handleDeleteInquiry = (inquiryId) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      setInquiries(prev => prev.filter(inquiry => inquiry.id !== inquiryId));
    }
  };

  const getUniqueTypes = () => {
    const types = new Set(inquiries.map(i => i.inquiryType));
    return ['all', ...Array.from(types)];
  };

  const getStatusCount = (status) => {
    return inquiries.filter(i => i.status === status).length;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Inquiry Management</h1>
        <p className="text-gray-500 mt-1">Manage and respond to customer inquiries</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Inquiries</p>
              <p className="text-2xl font-bold text-gray-900">{inquiries.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <MessageSquare size={20} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">New</p>
              <p className="text-2xl font-bold text-blue-600">{getStatusCount('new')}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Clock size={20} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600">{getStatusCount('in-progress')}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <RefreshCw size={20} className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Resolved</p>
              <p className="text-2xl font-bold text-green-600">{getStatusCount('resolved')}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckCircle size={20} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by customer ID, name, email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              {getUniqueTypes().filter(t => t !== 'all').map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-500">Loading inquiries...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="p-8 text-center">
            <MessageSquare size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No inquiries found</p>
            <p className="text-sm text-gray-400">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                 
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                       
                        <span className="text-md  font-mono font-semibold text-blue-500">
                          {inquiry.customerId}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {inquiry.firstName} {inquiry.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{inquiry.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(inquiry.inquiryType)}`}>
                        {inquiry.inquiryType}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(inquiry.status)}`}>
                        {getStatusIcon(inquiry.status)}
                        {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {formatDate(inquiry.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewInquiry(inquiry)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteInquiry(inquiry.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal - Inquiry Details */}
      {isModalOpen && selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Inquiry Details</h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle size={24} className="text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Customer ID</p>
                  <div className="flex items-center gap-2 mt-1">
                    <User size={16} className="text-blue-500" />
                    <p className="text-sm font-mono font-medium text-gray-900">
                      {selectedInquiry.customerId}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Customer Since</p>
                  <p className="text-sm text-gray-900 mt-1">
                    {selectedInquiry.customerSince ? formatDateShort(selectedInquiry.customerSince) : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Full Name</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {selectedInquiry.firstName} {selectedInquiry.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Email</p>
                  <p className="text-sm text-gray-900 mt-1">{selectedInquiry.email}</p>
                </div>
                {selectedInquiry.phone && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Phone</p>
                    <p className="text-sm text-gray-900 mt-1">{selectedInquiry.phone}</p>
                  </div>
                )}
                {selectedInquiry.pickupAddress && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Pickup Address</p>
                    <p className="text-sm text-gray-900 mt-1">{selectedInquiry.pickupAddress}</p>
                  </div>
                )}
              </div>

              {/* Inquiry Type & Status */}
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Inquiry Type</p>
                  <span className={`inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(selectedInquiry.inquiryType)}`}>
                    {selectedInquiry.inquiryType}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Status</p>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => {
                      handleStatusChange(selectedInquiry.id, e.target.value);
                      setSelectedInquiry({ ...selectedInquiry, status: e.target.value });
                    }}
                    className="mt-1 px-3 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="new">New</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Received</p>
                  <p className="text-sm text-gray-900 mt-1">{formatDate(selectedInquiry.createdAt)}</p>
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <p className="text-xs font-medium text-gray-500 uppercase">Message</p>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    window.location.href = `mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.inquiryType} Inquiry (Customer: ${selectedInquiry.customerId})`;
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Reply via Email
                </button>
                <button
                  onClick={() => {
                    handleStatusChange(selectedInquiry.id, 'resolved');
                    setSelectedInquiry({ ...selectedInquiry, status: 'resolved' });
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Mark as Resolved
                </button>
              </div>

              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryManagement;