const mongoose = require('mongoose');
const Carts = require('../../model/cart');

class Cart {
    handle = async (req, res) => {
        try {
            const user_id = req.params.user_id;
            const { product_id, size } = req.body;


            if (!product_id || !size) {
                return res.status(400).json({ message: 'Invalid input data: product_id and size are required.' });
            }

            if (!mongoose.isValidObjectId(product_id)) {
                return res.status(400).json({ message: 'Invalid product_id' });
            }

            let cart = await Carts.findOne({ user_id });
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            const itemIndex = cart.items.findIndex(item => item.product_id.toString() === product_id && item.size === size);
            if (itemIndex === -1) {
                return res.status(404).json({ message: 'Product not found in cart' });
            }

            cart.items.splice(itemIndex, 1);
            await cart.save();

            return res.status(200).json({ message: 'Item removed from cart', cart });
        } catch (error) {
            console.error('Error removing item from cart:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    };
}

module.exports = new Cart();
