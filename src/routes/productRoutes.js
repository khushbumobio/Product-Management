const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth=require('../middleware/auth')

router.get('/products',auth,productController.listProduct)
router.post('/products',auth, productController.createProduct);
router.get('/:id', auth,productController.editProduct);
router.patch('/:id',auth, productController.updateProduct);
router.delete('/:id',auth, productController.deleteProduct);

module.exports = router;productController