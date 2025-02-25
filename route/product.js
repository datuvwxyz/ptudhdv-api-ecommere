const express = require('express');
const router = express.Router();
const addProduct = require('../controller/product/addProduct');
const updateProduct = require('../controller/product/updateProduct');
const viewProduct = require('../controller/product/viewProduct');
const deleteProduct = require('../controller/product/deleteProduct');

router.post('/addProduct', (req, res) => addProduct.handle(req, res));
router.put('/updateProduct/:product_id',(req, res) => updateProduct.handle(req, res));
router.get('/viewProduct/:product_id',(req, res) => viewProduct.handle(req, res));
router.delete('/deleteProduct/:product_id',(req, res) => deleteProduct.handle(req, res));

module.exports = router;