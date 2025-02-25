const express = require('express');
const router = express.Router();
const ProcessPayment = require('../controller/payment/addPayment');

// Route để xử lý thanh toán
router.post('/payments', ProcessPayment.handle);

module.exports = router;
