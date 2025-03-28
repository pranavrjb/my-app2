const express = require('express');
const {
    getAllUsers,
    deleteUser,
    updateUserRole,
} = require('../controllers/userController.js');
const { protect, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/admin/users', protect, isAdmin, getAllUsers);
router.delete('/admin/users/:id', protect, isAdmin, deleteUser);
router.put('/admin/users/:id', protect, isAdmin, updateUserRole);

module.exports = router;
