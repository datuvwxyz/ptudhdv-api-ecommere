const mongoose = require('mongoose');
const Orders = require('../../model/order');
const Payments = require('../../model/payment');

class Payment {
    handle = async (req, res) => {
        try {
            const { order_id, payment_method, payment_details } = req.body;

            if (!order_id || !mongoose.isValidObjectId(order_id)) {
                return res.status(400).json({ message: 'Invalid order ID' });
            }

            if (!payment_method || typeof payment_method !== 'string') {
                return res.status(400).json({ message: 'Invalid payment method' });
            }

            if (!payment_details || !payment_details.card_number || !payment_details.expiry_date || !payment_details.cvv) {
                return res.status(400).json({ message: 'Invalid card details' });
            }

            const order = await Orders.findById(order_id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            const newPayment = new Payments({
                order_id,
                payment_method,
                payment_status: 'Successful'
            });

            await newPayment.save();

            return res.status(201).json({ message: 'Payment processed successfully', payment_id: newPayment._id });
        } catch (error) {
            console.error('Error processing payment:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    };
}

module.exports = new Payment();
