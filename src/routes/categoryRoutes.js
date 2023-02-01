const express = require("express");
const router = express.Router();
const categoryController = require('../controllers/categoryController')
const auth=require('../middleware/auth')

router.get('/categories',auth,categoryController.listCategory)
router.post('/categories',auth, categoryController.createCategory);
router.get('/:id', auth,categoryController.editCategory);
router.patch('/:id',auth, categoryController.updateCategory);
router.delete('/:id',auth, categoryController.deleteCategory);

module.exports = router;