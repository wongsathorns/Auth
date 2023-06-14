const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authenticateUser = require('../middlewares/authenticateUser');
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', authenticateUser, UserController.logout);
module.exports = router;
