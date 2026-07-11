import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, default: '' },
    role: { type: String, default: 'customer' },
    status: { type: String, default: 'Active' },
    closedDate: { type: Date, default: null }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;