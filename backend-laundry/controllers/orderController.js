import Order from '../models/Order.js'; // Adjust the path to your Order model
 export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId: userId }).sort({ createdAt: -1 });

        // Map the database fields to the structure your UI expects
        const formattedOrders = orders.map(order => ({
            orderNo: order._id, // Using Mongo ID as Order Number
            status: order.status,
            date: new Date(order.createdAt).toLocaleDateString(),
            customer: { name: order.customerName, mobile: order.phone },
            items: order.items.map(item => ({
                name: item.clothType,
                category: item.serviceType,
                quantity: item.quantity,
                price: item.price
            })),
            summary: {
                grandTotal: order.totalAmount,
                subtotal: order.totalAmount // Simplify for now
            },
            statusColor: order.status === 'Pending' ? 'bg-yellow-100' : 'bg-green-100'
        }));

        res.status(200).json(formattedOrders);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};