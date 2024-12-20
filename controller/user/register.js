const bcrypt = require('bcrypt');
const Users = require('../../model/user');

class User {
    handle = async (req, res) => {
        try {
            const { name, email, password, phone } = req.body;
            
            // Check if email already exists
            const existingUser = await Users.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }
    
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Create user
            const user = new Users({
                name,
                email,
                password: hashedPassword,
                phone
            });
    
            await user.save();
    
            res.status(201).json({ message: 'Registration successful', user: user });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
}

module.exports = new User();