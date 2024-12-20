const Products = require('../../model/product');

class Product {
    handle = async (req, res) => {
        try {
            const productId = req.params.product_id;

            const product = await Products.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            await Products.findByIdAndDelete(productId);
            return res.status(200).json({ message: 'Product deleted successfully' });

        } catch (error) {
            return res.status(500).json({ message: 'Failed to delete product', error });
        }
    }
}

module.exports = new Product();