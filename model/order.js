// Import mongoose
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        size: { type: Number, required: true },
        quantity: { type: Number, required: true },
    }],
    total_price: { type: Number, required: true },
    delivery_address: { type: String, required: true },
    status: { type: String, default: 'Processing', enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'] },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;