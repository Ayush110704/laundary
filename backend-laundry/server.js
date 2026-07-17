 import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import planRoutes from './routes/planRoutes.js';
import termRoutes from './routes/termRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import Order from './models/Order.js'; // Adjust this path if your folder is different
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();

// MIDDLEWARE: Ensure CORS and JSON parsing are before routes
app.use(cors()); 
app.use(express.json());

// DATABASE CONNECTION
const MONGO_URI = process.env.MONGO_URI || "mongodb://shaluu:shalu4@ac-jphuzif-shard-00-00.aoanrah.mongodb.net:27017,ac-jphuzif-shard-00-01.aoanrah.mongodb.net:27017,ac-jphuzif-shard-00-02.aoanrah.mongodb.net:27017/?ssl=true&replicaSet=atlas-8wuy2p-shard-0&authSource=admin&appName=Cluster0"; 

mongoose.connect(MONGO_URI)
    .then(() => console.log('🚀 MongoDB Connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// ROUTES: Directs traffic to your route files
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/terms', termRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/orders', orderRoutes);


app.use('/api/orders', orderRoutes);

// Route to create a new order
 

 

app.use('/api/orders', orderRoutes);

// Route to create a new order
 

 

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
