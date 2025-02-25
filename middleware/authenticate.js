const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const SECRET_KEY = 'LaTanDat110121206';

// Token generation function
const generateToken = (user) => {
    if (!user || !user._id) {
        throw new Error('Invalid user object');
    }
    return jwt.sign(
        { user_id: user._id },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
};

// Authentication middleware
const authenticate = (req, res, next) => {
    try {
        // Check for Authorization header
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized access: No token provided' });
        }

        // Extract token from Bearer schema
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized access: Invalid token format' });
        }

        // Verify token
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("Decoded Token:", decoded); // For debugging

        // Validate decoded token contents
        if (!decoded || !decoded.user_id) {
            return res.status(401).json({ message: 'Unauthorized access: No user ID in token' });
        }

        // Validate user_id format if using MongoDB
        if (!mongoose.isValidObjectId(decoded.user_id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        // Attach user_id to request object
        req.user_id = decoded.user_id;
        next();
    } catch (error) {
        console.error('Token validation error:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = {
    generateToken,
    authenticate
};