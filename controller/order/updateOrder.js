const mongoose = require('mongoose');
const Orders = require('../../model/order');

class Order {
    handle = async (req, res) => {
        const user_id = req.params.user_id;
        try {
            const orders = await Orders.find({ user_id }).select('_id total_price status createdAt');

            if (orders.length === 0) {
                return res.status(404).json({ message: 'Không tìm thấy đơn hàng nào.' });
            }

            return res.status(200).json({
                message: 'Lấy danh sách đơn hàng thành công!',
                orders: orders.map(order => ({
                    order_id: order._id,
                    total_price: order.total_price,
                    status: order.status,
                    created_at: order.createdAt
                }))
            });
        } catch (error) {
            console.error('Lỗi khi lấy đơn hàng:', error);
            return res.status(500).json({ message: 'Lỗi máy chủ nội bộ', error });
        }
    };
}

module.exports = new Order();

