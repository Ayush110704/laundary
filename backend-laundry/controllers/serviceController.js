import Service from '../models/Service.js';

// Seed default services into MongoDB if none exist
const seedDefaultServices = async () => {
    const defaultServices = [
        {
            id: "SRV001",
            name: "Laundry",
            category: "Clothes",
            price: 120,
            duration: "24 Hours",
            status: "Active",
            description: "Professional wash, dry and fold service for everyday clothes.",
            createdDate: "2026-06-20",
            totalOrders: 420,
            completedOrders: 398,
            cancelledOrders: 22,
            totalEarnings: 47760,
        },
        {
            id: "SRV002",
            name: "Dry Cleaning",
            category: "Premium",
            price: 250,
            duration: "48 Hours",
            status: "Active",
            description: "Premium dry cleaning for delicate garments.",
            createdDate: "2026-06-19",
            totalOrders: 185,
            completedOrders: 175,
            cancelledOrders: 10,
            totalEarnings: 43750,
        },
        {
            id: "SRV003",
            name: "Ironing",
            category: "Clothes",
            price: 80,
            duration: "12 Hours",
            status: "Active",
            description: "Steam ironing for wrinkle free clothes.",
            createdDate: "2026-06-18",
            totalOrders: 310,
            completedOrders: 296,
            cancelledOrders: 14,
            totalEarnings: 23680,
        },
        {
            id: "SRV004",
            name: "Carpet Cleaning",
            category: "Home Care",
            price: 650,
            duration: "72 Hours",
            status: "Active",
            description: "Deep carpet cleaning with stain removal.",
            createdDate: "2026-06-17",
            totalOrders: 92,
            completedOrders: 86,
            cancelledOrders: 6,
            totalEarnings: 55900,
        },
        {
            id: "SRV005",
            name: "Curtain Cleaning",
            category: "Home Care",
            price: 550,
            duration: "48 Hours",
            status: "Inactive",
            description: "Dust removal and deep cleaning for curtains.",
            createdDate: "2026-06-16",
            totalOrders: 78,
            completedOrders: 70,
            cancelledOrders: 8,
            totalEarnings: 38500,
        },
        {
            id: "SRV006",
            name: "Shoe Cleaning",
            category: "Accessories",
            price: 300,
            duration: "24 Hours",
            status: "Active",
            description: "Premium shoe cleaning and polishing.",
            createdDate: "2026-06-15",
            totalOrders: 145,
            completedOrders: 136,
            cancelledOrders: 9,
            totalEarnings: 40800,
        }
    ];

    try {
        const count = await Service.countDocuments();
        if (count === 0) {
            console.log('Seeding default services into MongoDB...');
            await Service.insertMany(defaultServices);
            console.log('Default services seeded successfully!');
        }
    } catch (error) {
        console.error('Error seeding services:', error);
    }
};

// GET ALL SERVICES
export const getServices = async (req, res) => {
    try {
        await seedDefaultServices();
        const services = await Service.find({}).sort({ id: 1 });
        res.status(200).json({ success: true, data: services });
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ success: false, message: 'Server error fetching services' });
    }
};

// CREATE SERVICE
export const createService = async (req, res) => {
    try {
        const { id, name, category, price, duration, status, description } = req.body;
        
        // Generate an ID if not provided (e.g. SRV + timestamp or sequential)
        let finalId = id;
        if (!finalId) {
            const count = await Service.countDocuments();
            finalId = `SRV${String(count + 1).padStart(3, '0')}`;
        }

        const newService = new Service({
            id: finalId,
            name: name || category, // Fallback name to category if not provided
            category,
            price: Number(price),
            duration,
            status: status || 'Active',
            description,
            createdDate: new Date().toISOString().split('T')[0]
        });

        await newService.save();
        res.status(201).json({ success: true, data: newService });
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ success: false, message: 'Server error creating service' });
    }
};

// UPDATE SERVICE
export const updateService = async (req, res) => {
    try {
        const { id } = req.params; // Can be MongoDB ObjectId or custom id
        const updateData = req.body;

        if (updateData.price) {
            updateData.price = Number(updateData.price);
        }

        let updatedService;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            // MongoDB ObjectId
            updatedService = await Service.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        } else {
            // Custom ID e.g., "SRV001"
            updatedService = await Service.findOneAndUpdate({ id }, updateData, { new: true, runValidators: true });
        }

        if (!updatedService) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }

        res.status(200).json({ success: true, data: updatedService });
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ success: false, message: 'Server error updating service' });
    }
};

// DELETE SERVICE
export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        let deletedService;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            deletedService = await Service.findByIdAndDelete(id);
        } else {
            deletedService = await Service.findOneAndDelete({ id });
        }

        if (!deletedService) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }

        res.status(200).json({ success: true, message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ success: false, message: 'Server error deleting service' });
    }
};
