const express = require('express');
const router = express.Router();
const AddReview = require('../controller/review/addReview');

router.post('/products/:user_id/:product_id', AddReview.handle);

module.exports = router;