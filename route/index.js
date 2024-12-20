const express = require('express');
// Create router
const router = express.Router();
const userRoute= require('./user');
const productRoute = require('./product');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use('/user', userRoute);
router.use('/product', productRoute);

module.exports = router;