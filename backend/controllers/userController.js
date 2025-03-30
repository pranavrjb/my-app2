const User = require('../models/User.js');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};
const getUserById=async(req,res)=>{
    try {
        const users=await User.findById({_id:req.params.id});
        res.json(users);
    } catch (error) {
        res.status(501).json({message:"Error fetching user by id"});
    }
}
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.remove();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user' });
    }
};

const updateUserRole = async (req, res) => {
    const { role } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.role = role;
        await user.save();
        res.json({ message: 'User role updated' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update role' });
    }
};

    module.exports = { getAllUsers, deleteUser, updateUserRole,getUserById };   
