const mongoose = require('mongoose');
const Orders = require('../../model/order');

class Order {
    handle = async (req, res) => {
        try {
            const { order_id } = req.params;

            if (!order_id || !mongoose.isValidObjectId(order_id)) {
                return res.status(400).json({ message: 'Invalid order ID' });
            }

            const order = await Orders.findById(order_id).populate('items.product_id', 'name price');

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            return res.status(200).json({
                order_id: order._id,
                user_id: order.user_id,
                items: order.items,
                total_price: order.total_price,
                delivery_address: order.delivery_address,
                status: order.status,
                created_at: order.createdAt
            });
        } catch (error) {
            console.error('Error retrieving order:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    };
}

module.exports = new Order();
