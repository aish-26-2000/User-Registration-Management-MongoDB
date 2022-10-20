const express = require('express');
const { adminRoutes } = require('../modules/admin');

const router = express.Router();

router.use('/admin', adminRoutes);

module.exports = router;
