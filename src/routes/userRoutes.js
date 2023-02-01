const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')
const auth=require('../middleware/auth')

router.get('/users',auth,userController.listUser)
router.post('/users',auth, userController.createUser);
router.get('/:id', auth,userController.editUser);
router.patch('/:id',auth, userController.updateUser);
router.delete('/:id',auth, userController.deleteUser);

module.exports = router;