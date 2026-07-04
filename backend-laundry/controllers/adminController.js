import Admin from '../models/Admin.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// This key acts as an authorization token so normal users can't sign up as admins
const SECRET_ADMIN_KEY = "SUPER_SECRET_LAUNDRY_KEY_123";

// ADMIN REGISTRATION
export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, adminKey } = req.body;

        // 1. Verify the Admin Key matching your frontend form input
        if (adminKey !== SECRET_ADMIN_KEY) {
            return res.status(401).json({ success: false, message: 'Invalid Admin Authorization Key!' });
        }

        // 2. Check if admin email exists
        let admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(400).json({ success: false, message: 'Admin account already exists with this email' });
        }

        // 3. Encrypt the password string
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Save to MongoDB
        admin = new Admin({ name, email, password: hashedPassword });
        await admin.save();

        res.status(201).json({ success: true, message: 'Admin account created successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ADMIN LOGIN
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find the admin document record
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ success: false, message: 'Invalid Admin Credentials' });
        }

        // 2. Compare hashed strings
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid Admin Credentials' });
        }

        // 3. Create active environment session signature
        const token = jwt.sign(
            { id: admin._id, role: 'admin' }, 
            process.env.JWT_SECRET || 'secret', 
            { expiresIn: '1d' }
        );

        res.status(200).json({
            success: true,
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET ALL CUSTOMERS
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'customer' }).select('-password');
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// CREATE A NEW CUSTOMER DIRECTLY
export const createUser = async (req, res) => {
    try {
        const { name, email, password, phone, address, status } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists with this email' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password || '123456', salt); // Default password if manual addition doesn't specify one

        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            address: address || '',
            status: status || 'Active'
        });

        await user.save();
        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// UPDATE CUSTOMER DETAILS
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE A CUSTOMER
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// BULK UPDATE STATUS
export const bulkUpdateStatus = async (req, res) => {
    try {
        const { ids, status } = req.body;
        const today = new Date();
        const updateData = { status };
        if (status === 'Deactive') {
            updateData.closedDate = today;
        } else {
            updateData.closedDate = null;
        }

        await User.updateMany({ _id: { $in: ids } }, { $set: updateData });
        res.status(200).json({ success: true, message: 'Users status updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// BULK DELETE
export const bulkDeleteUsers = async (req, res) => {
    try {
        const { ids } = req.body;
        await User.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ success: true, message: 'Users deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};