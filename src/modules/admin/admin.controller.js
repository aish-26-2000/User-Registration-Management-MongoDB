const { responseHelper } = require('../../helpers');
const  sendmail  = require('../../utils/email');
const adminService = require('./admin.service');
const logger = require('../../utils/logger');

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

exports.newUser = async(req,res,next) => {
    try {
        const { body } = req;
        const response = await adminService.addUser(body);
        return responseHelper.success(res,response);
    } catch (err) {
        next(err);
    }
};

exports.sendInvite = async(req,res,next) => {
   try {
    const message = 'You or someone on your behalf requested to sign-up with StandardC. By pressing the link below, you opt-in to sign-up with StandardC.This link will expire after 1 day';
    const html = `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <p><b>Follow the invitation link to register.</p>
        <a href="https://jsonplaceholder.typicode.com/users">Click Here!</a>
      </body>
    </html>`;
    await sendmail({
        email : req.body.email,
        subject : 'Welcome to StandardC',
        message,
        html
    });
    responseHelper.success(res);
    logger.info('Invite sent successfully');
   } catch (err){
    next(err);
   }
};