import express from 'express';
import { registerUser, loginUser, updateUserProfile } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// NEW ROUTE FOR PROFILE EDITS
router.put('/update-profile', updateUserProfile);

export default router;