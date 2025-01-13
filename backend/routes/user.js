import express from 'express';
import {
    getAllUsers,
    deleteUser,
    updateUserRole,
} from '../Controller/userController.js';
import protect from '../middleware/protectMiddleware.js';
import admin from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/admin/users', protect, admin, getAllUsers);
router.delete('/admin/users/:id', protect, admin, deleteUser);
router.put('/admin/users/:id', protect, admin, updateUserRole);

export default router;
