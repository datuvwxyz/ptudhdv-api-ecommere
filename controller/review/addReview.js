const mongoose = require('mongoose');
const Products = require('../../model/product');
const Reviews = require('../../model/review');

class Review {
    handle = async (req, res) => {
        try {
            const { product_id } = req.params;
            const { user_id, rating, comment } = req.body;

            if (!product_id || !mongoose.isValidObjectId(product_id)) {
                return res.status(404).json({ message: 'Product not found' });
            }

            if (!user_id || !mongoose.isValidObjectId(user_id)) {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            if (typeof rating !== 'number' || rating < 1 || rating > 5) {
                return res.status(400).json({ message: 'Invalid rating value' });
            }

            const product = await Products.findById(product_id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            const newReview = new Reviews({
                product_id,
                user_id,
                rating,
                comment
            });

            await newReview.save();

            return res.status(201).json({ message: 'Review added' });
        } catch (error) {
            console.error('Error adding review:', error);
            return res.status(500).json({ message: 'Internal server error', error });
        }
    };
}

module.exports = new Review();
