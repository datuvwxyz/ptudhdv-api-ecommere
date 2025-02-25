const express = require('express');
// Create router
const router = express.Router();
const userRoute= require('./user');
const productRoute = require('./product');
const cartRoute = require('./cart');
const orderRoute = require('./order');
const paymentRoute = require('./payment');
const reviewRoute = require('./review');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use('/user', userRoute);
router.use('/product', productRoute);
router.use('/cart', cartRoute);
router.use('/order', orderRoute);
router.use('/payment', paymentRoute);
router.use('/review', reviewRoute);

module.exports = router;