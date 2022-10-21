const express = require('express');
const userController = require('./user.controller');

const router = express.Router();

router.post('/register/:token',userController.Register);

module.exports = router;
