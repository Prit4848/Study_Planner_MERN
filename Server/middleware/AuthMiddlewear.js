const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports.AuthUser = async function (req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ Message: "User Not Authenticated" });
    }
    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await userModel.findOne({ email: decoded.email }).select('-password');

        if (!user) {
            return res.status(404).json({ Message: "User Not Found" });
        }

        req.user = user; 
        next(); 
    } catch (err) {
        console.error("JWT Error:", err.message);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid Token" });
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token Expired" });
        }
        res.status(500).json({ error: "Server Error" });
    }
};
