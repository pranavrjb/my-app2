import express from 'express';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Sorry! User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password is valid:", isPasswordValid);

        if (!isPasswordValid) return res.status(400).json({ message: "Invalid Password!" });

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET, { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Something went wrong!" });
    }
});

// Signup route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        
        // Check if user already exists
        const existUser = await User.findOne({ email });
        if (existUser) return res.status(200).json({ message: "User already exists!" });

        const hashPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ name, email, password: hashPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
 
        res.status(210).json({ user: userWithoutPassword, token });
    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({ message: "Something Went Wrong!" });
    }
});
//logout route
router.get('/logout', async (req, res, next) => {
    res.send('logout')
    res.redirect('/')
})
export default router;
