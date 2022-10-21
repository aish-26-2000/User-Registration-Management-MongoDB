const { response } = require('../../../app');
const { responseHelper } = require('../../helpers');
const userService = require('./user.service');

exports.Register = async(req,res,next) => {
    try {
        const email = req.body.email;
        const user = userService.getUser(email)
        if(user) {
            const info = {
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                password : req.body.password,
                passwordConfirm : req.body.passwordConfirm
            };
            const data = userService.addUserInfo(email,info)
            responseHelper.success(res,data,'User registered successfully');
        } else{
            responseHelper.noContent(res);
        }
    } catch(err) {
        next(err);
    }
;} 