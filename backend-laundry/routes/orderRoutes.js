import express from 'express';
import { getUserOrders } from '../controllers/orderController.js'; // Ensure this exists
const router = express.Router();

// This matches your axios.get call in MyOrders.jsx
router.get('/user/:userId', getUserOrders); 

export default router;