const Products = require('../../model/product');

class Product {
    handle = async (req, res) => {
        try {
            const products = await Products.find();
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: 'Failed to retrieve products', error });
        }
    }
}

module.exports = new Product();