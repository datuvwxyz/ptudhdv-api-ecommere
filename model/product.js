// Import mongoose
const mongoose = require('mongoose');

// Product model
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    images: [{ type: String }],
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
