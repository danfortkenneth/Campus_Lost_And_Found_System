const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.signup = async (req, res) => {
    try {
        const { name, studentId, email, password, adminSecret } = req.body;

        // 1. Validation
        if (!name || !studentId || !email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all fields" });
        }

        
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

      
        let userRole = 'student';
        if (adminSecret === 'NEU-ADMIN-2024') {
            userRole = 'admin';
        }

        
        await User.create({
            name,
            studentId,
            email,
            password,
            role: userRole
        });

        return res.status(201).json({ 
            success: true, 
            message: userRole === 'admin' ? "Admin registered successfully!" : "User registered!" 
        });

    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(500).json({ success: false, message: "Database Error: " + err.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const jwtSecret = process.env.JWT_SECRET || 'fallbackSecretKey12345';
        
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            jwtSecret, 
            { expiresIn: '1d' }
        );

        return res.json({
            success: true,
            token,
            user: { 
                id: user._id, 
                name: user.name, 
                role: user.role, 
                email: user.email 
            }
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};