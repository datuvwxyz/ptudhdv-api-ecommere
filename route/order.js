const express = require('express');
const router = express.Router();
const AddOrder = require('../controller/order/addOrder');
const ViewOrder = require('../controller/order/viewOrder');
const UpdateOrder = require('../controller/order/updateOrder');

router.post('/orders', AddOrder.handle);

router.get('/orders/:order_id', ViewOrder.handle);

router.put('/orders/:order_id/:user_id', UpdateOrder.handle);

module.exports = router;