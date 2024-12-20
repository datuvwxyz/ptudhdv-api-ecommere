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
            const { user_id } = req.params;
            const { name, phone, address } = req.body;

            // Validate user
            const user = await Users.findById(user_id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update user information
            if (name) user.name = name;
            if (phone) user.phone = phone;
            if (address) user.address = address;

            // Generate token
            const token = generateToken(user);

            await user.save();



            res.status(200).json({ message: 'User information updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    };
}

module.exports = new User();