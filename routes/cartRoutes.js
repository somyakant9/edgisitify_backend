const express = require('express');
const cartRouter = require('../controllers/cartControllers');
const { protect } = require('../controllers/authControllers');
const router = express.Router();

router.post('/',protect,cartRouter.addToCart);
router.get('/',protect,cartRouter.getCartItems);



module.exports = router;