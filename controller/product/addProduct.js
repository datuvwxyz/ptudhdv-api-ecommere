const Products = require('../../model/product');

class Product {
    handle = async (req, res) => {
        try {
            const { name, description, price, stock, category, images } = req.body;

          // Check if user exists
          const product = await Products.findOne({ name });
          if (product) {
              return res.status(404).json({ message: 'Product not found' });
          }

            const newProduct = new Products({
                name,
                description,
                price,
                stock,
                category,
                images: images || [],
            });

            await newProduct.save();
            return res.status(201).json({ message: 'Product added successfully', newProduct });

        } catch (error) {
            return res.status(500).json({ message: 'Failed to add product', error });
        }
    };
}

module.exports = new Product();