const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone_no: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    image: {
        type: Buffer,
    },
    Background_image: {
        type: Buffer,
    },
    Bio: String,
    streak: {
        type: Number,
        default: 0
    },
    lastPlanDate: {
        type: Date,
    },
    otp: { type: Number, default: 0 }
});

// Hash password before saving
userSchema.statics.hashPassword = async function (password) {
    if (!password) {
        throw new Error("Password is required");
    }
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Compare passwords
userSchema.statics.comparePassword = async function (password,orgpassword) {
    if (!password) {
        throw new Error("Password is required");
    }
    console.log(password,orgpassword)
    if (orgpassword) {
        throw new Error("Password is required");
    }
    return bcrypt.compare(password, orgpassword);
};

// Generate JWT token
userSchema.statics.generateToken = function (email) {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in .env file");
    }
    return jwt.sign(
        {
            email: email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d" 
        }
    );
};

// Verify JWT token
userSchema.statics.verifyToken = function (token) {
    if (!token) {
        throw new Error("Token is required");
    }
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in .env file");
    }
    return jwt.verify(token, process.env.KEY);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
