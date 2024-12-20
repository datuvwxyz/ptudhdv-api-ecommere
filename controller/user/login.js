const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../../model/user');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = (user) => {
    const token = jwt.sign({ userId: user.id }, process.env.SERECT, { expiresIn: '1h' });
    return token;
}

class User {

    handle = async (req, res) => {
        try {
            const { email, password } = req.body;
    
            // Check if user exists
            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
    
            // Generate token
            const token = generateToken(user);
    
            res.status(200).json({ message: 'Login successful', user: user });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
}

module.exports = new User();