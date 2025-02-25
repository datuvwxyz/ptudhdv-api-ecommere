const mongoose = require('mongoose');
const Orders = require('../../model/order');

class Order {
    handle = async (req, res) => {
        try {
            const { user_id, items, total_price, delivery_address } = req.body;

            if (!delivery_address || typeof delivery_address !== 'string' || delivery_address.trim() === '') {
                return res.status(400).json({ message: 'Invalid delivery address' });
            }

            const newOrder = new Orders({
                user_id,
                items,
                total_price,
                delivery_address,
                status: 'Processing'
            });

            await newOrder.save();

            return res.status(201).json({ message: 'Order placed successfully', order_id: newOrder._id });
        } catch (error) {
            console.error('Error placing order:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    };
}

module.exports = new Order();