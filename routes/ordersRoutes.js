const express = require('express');
const orderControllers = require('../controllers/orderControllers');
const { protect } = require('../controllers/authControllers');
const router = express.Router();

router.post("/", protect, orderControllers.orders);

module.exports = router;