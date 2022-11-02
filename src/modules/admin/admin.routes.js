const express = require('express');
const adminController = require('./admin.controller');

const router = express.Router();

router.use(adminController.basicAuth);

router.post('/invite',adminController.sendInvite);
router.post('/restrict',adminController.restrictUser);
router.post('/unrestrict',adminController.unrestrictUser);
router.post('/resendInvite',adminController.resendInvite);
router.post('/finduser',adminController.userDetails);



module.exports = router;
