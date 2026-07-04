import express from 'express';
import { 
    registerAdmin, 
    loginAdmin, 
    getUsers, 
    createUser, 
    updateUser, 
    deleteUser,
    bulkUpdateStatus,
    bulkDeleteUsers
} from '../controllers/adminController.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// User Management Routes
router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/users/bulk-status', bulkUpdateStatus);
router.post('/users/bulk-delete', bulkDeleteUsers);

export default router;