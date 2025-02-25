const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../../model/user');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = (user) => {
    const token = jwt.sign(
        { userId: user._id }, 
        process.env.SERECT,   
        { expiresIn: '1h' }   
    );
    return token;
}

class User {
    handle = async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const token = generateToken(user);

            res.status(200).json({
                message: 'Login successful',
                token, 
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone
                }
            });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
}

module.exports = new User();
