const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')

router.post('/login', authController.login)
router.post('/profile', auth,authController.profile);
router.post('/logout', auth, authController.logOut);

module.exports = router;