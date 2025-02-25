const mongoose = require('mongoose');
const Carts = require('../../model/cart');
const Products = require('../../model/product');

class Cart {
    handle = async (req, res) => {
        try {
            const user_id = req.params.user_id;
            const { product_id, size, quantity } = req.body;

            if (!product_id || !size || quantity === undefined || quantity === null) {
                return res.status(400).json({ message: 'Invalid input data: product_id, size, and quantity are required.' });
            }

            if (typeof quantity !== 'number' || quantity <= 0) {
                return res.status(400).json({ message: 'Invalid quantity: must be a positive number.' });
            }

            if (!mongoose.isValidObjectId(product_id)) {
                return res.status(400).json({ message: 'Invalid product_id' });
            }

            const product = await Products.findById(product_id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            let cart = await Carts.findOne({ user_id });
            if (!cart) {
                cart = new Carts({ user_id, items: [] });
            }

            const existingItem = cart.items.find(item => item.product_id.toString() === product_id && item.size === size);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ product_id, size, quantity });
            }

            await cart.save();

            res.status(201).json({ message: 'Item added to cart', cart });
        } catch (error) {
            console.error('Error adding item to cart:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    };
}

module.exports = new Cart();
