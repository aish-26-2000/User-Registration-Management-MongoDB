const { responseHelper } = require('../../helpers');
const adminService = require('./admin.service');

exports.newUser = async(req,res,next) => {
    try {
        const { body } = req;
        const response = await adminService.addUser(body);
        return responseHelper.success(res,response);
    } catch (err) {
        next(err);
    }
};

exports.basicAuth = async(req,res,next) => {
    const authheader = req.headers.authorization;
    
    const credential = new Buffer.from(authheader.split(' ')[1],
    'base64').toString().split(':');
    const username = credential[0];
    const password = credential[1];
    
    const data = adminService.authCheck(username,password);
    if (data === null) {
        const message = 'Wrong Credentials';
        return responseHelper.fail(res,message);
    }
    if (data === false) {
        const message = 'You need a username and password';
        return responseHelper.fail(res,message);
    }
    if (data === true) {
        next();
    }
};