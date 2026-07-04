import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, default: 'customer' },
    status: { type: String, default: 'Active', enum: ['Active', 'Deactive'] },
    address: { type: String, default: '' },
    closedDate: { type: Date, default: null },
    bookings: { type: Number, default: 0 },
    totalSpent: { type: String, default: '₹0' },
    preferredService: { type: String, default: 'N/A' },
    rating: { type: Number, default: 0 },
    feedback: { type: String, default: '' },
    lastLogin: { type: Date, default: null }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;