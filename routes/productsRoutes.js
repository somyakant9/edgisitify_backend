const express = require('express');
const productsRouter = require('../controllers/productsController');
const router = express.Router();


router.get('/' ,productsRouter.getAllProduct);
router.post('/' , productsRouter.addNewProduct);
router.patch('/:id' , productsRouter.updateProduct);
router.delete('/:id' , productsRouter.deleteProduct);
router.delete('/' , productsRouter.deleteAllProducts);

module.exports = router;