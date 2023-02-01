const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')

router.post('/logout', auth, authController.logOut);
router.post('/login', authController.login)
router.post('/profile', auth,authController.profile);
router.post('/update-profile', auth,authController.updateProfile);
router.post('/:id', auth,authController.generatePassword);

module.exports = router;