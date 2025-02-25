const express = require('express');
const router = express.Router();
const {generateToken, authenticate} = require('../middleware/authenticate');

const addProducttoCart = require('../controller/cart/addProducttoCart');
const viewCart = require('../controller/cart/viewCart');
const deleteProductfromCart = require('../controller/cart/deleteProductfromCart');

router.post('/addProducttoCart/:user_id', (req, res) => addProducttoCart.handle(req, res));

router.get('/viewCart/:user_id', (req, res) => viewCart.handle(req, res));

router.delete('/deleteProductfromCart/:user_id', (req, res) => deleteProductfromCart.handle(req, res));

module.exports = router;
