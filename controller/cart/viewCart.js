const mongoose = require('mongoose');
const Carts = require('../../model/cart');

class Cart {
    handle = async (req, res) => {
        try {
            const user_id = req.params.user_id;


            let cart = await Carts.findOne({ user_id }).populate('items.product_id');
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            return res.status(200).json({ message: 'Cart retrieved successfully', cart });
        } catch (error) {
            console.error('Error retrieving cart:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    };
}

module.exports = new Cart();
