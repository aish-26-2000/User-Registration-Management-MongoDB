const { responseHelper } = require('../../helpers');
const  sendmail  = require('../../utils/email');
const adminService = require('./admin.service');
const logger = require('../../utils/logger');
const jwt = require('../../utils/jwt');


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


exports.sendInvite = async(req,res,next) => {
   try {
        //add invite to db
        const { body } = req;
        await adminService.addInvite(body);

        //generate accesstoken and URL
        const accessToken = jwt.generateAccessToken(req.body.email);
        const registerURL = `${req.protocol}://${req.get('host')}/api/v1/user/register/${accessToken}`;

        //compose email
        const message = `Submit a POST request with all your details to:\n${registerURL}`
        const html = `<!doctype html>
        <html ⚡4email>
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <p>Hi, Greetings from StandardC! </p>
            <p>You or someone on your behalf requested to sign-up with StandardC. By pressing the link , you opt-in to sign-up with StandardC.</p>
            <br>Submit a POST request with all your details to:
            <p> <a href=${registerURL}> Register Now </a></p>
            <br>This link will expire after 1 day
        </body>
        </html>`;

        //send invitation email
        await sendmail({
            email : req.body.email,
            subject : 'Welcome to StandardC',
            html,
            message
        });

        //response
        responseHelper.success(res);
        logger.info('Invite sent successfully');

    } catch (err){
        next(err);
    }
};