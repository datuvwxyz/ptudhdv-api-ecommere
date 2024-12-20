const Products = require('../../model/product');

class Product {
    handle = async (req, res) => {
        try {
            const productId = req.params.product_id;
            const { name, description, price, stock, category, images } = req.body;

            const product = await Products.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.stock = stock || product.stock;
            product.category = category || product.category;
            product.images = images || product.images;

            await product.save();
            return res.status(200).json({ message: 'Product updated successfully' });

        } catch (error) {
            return res.status(500).json({ message: 'Failed to update product', error });
        }
    }
}

module.exports = new Product();

