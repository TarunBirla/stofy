const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/product/new', productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.put('/product/:id', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

 module.exports = router;
