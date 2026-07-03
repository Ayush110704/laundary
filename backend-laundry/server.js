 import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

// MIDDLEWARE: Ensure CORS and JSON parsing are before routes
app.use(cors()); 
app.use(express.json());

// DATABASE CONNECTION
const MONGO_URI = process.env.MONGO_URI || "your_mongodb_connection_string_here"; 
mongoose.connect(MONGO_URI)
    .then(() => console.log('🚀 MongoDB Connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// ROUTES: Directs traffic to your route files
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});