const express = require('express');
const upload = require('express-fileupload');
const userController = require('./user.controller');

const router = express.Router();

router.use('/register/:token',upload());
router.post('/register/:token',userController.Register);

router.use('/upload',upload());
router.post('/upload',userController.uploadImg);

router.post('/delete',userController.deleteImg);

router.post('/decode/:token',userController.decoder);

module.exports = router;
