const express = require('express');
const adminController = require('./admin.controller');

const router = express.Router();

router.use(adminController.basicAuth);
router.post('/invite',adminController.sendInvite);

module.exports = router;
