const express = require('express');
const adminController = require('./admin.controller');

const router = express.Router();

router.post('/adduser', adminController.basicAuth, adminController.newUser);

module.exports = router;
