const express = require('express');
const { validationMiddleware } = require('../../middlewares');
const { inviteSchema } = require('./admin.validation');
const adminController = require('./admin.controller');

const router = express.Router();

router.use(adminController.basicAuth);

router.post('/invite',validationMiddleware(inviteSchema.invite),adminController.sendInvite);
router.post('/restrict',adminController.restrictUser);
router.post('/unrestrict',adminController.unrestrictUser);
router.post('/resendInvite',adminController.resendInvite);
router.post('/finduser',adminController.userDetails);



module.exports = router;
