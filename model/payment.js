// Import mongoose
const mongoose = require('mongoose');

// Payment model
const paymentSchema = new mongoose.Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    payment_method: { type: String, required: true },
    payment_details: {
        card_number: { type: String },
        expiry_date: { type: String },
        cvv: { type: String },
    },
    status: { type: String, default: 'Success', enum: ['Success', 'Failed'] },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;