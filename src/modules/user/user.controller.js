const { responseHelper } = require('../../helpers');
const { bcrypt,jwt } = require('../../utils')
const userService = require('./user.service');
const bucket = require('../../utils/s3helper');
const { decode } = require('jsonwebtoken');

exports.Register = async(req,res,next) => {
    try {
        const token = req.params.token;
        
        //verify token
        await jwt.verifyToken(token);

        //find user
        const user = await userService.getUser(req.body.email)

        if(!user) {
            responseHelper.fail(res,'User not found');            
        };

        if(user) {
            //check reg status
            const status = await userService.checkRegStatus(req.body.email)

            //user already registered
            if(status === true) {
                responseHelper.fail(res,'User already registered'); 
            }    
            //user reg pending
            if(status !== true) {
                //validate password
                const passwordCheck = await userService.validatePassword(req.body.password,req.body.passwordConfirm)
                if( passwordCheck === true) {
                    //hash password
                    req.body.password = await bcrypt.hashPassword(req.body.password);
                    //upload profile image
                    if(req.files) {
                        await bucket.upload(req.files.image,req.body.email);
                    }
                    //user details
                    const userData = await userService.addUserInfo(req.body.email,req.body);
                    responseHelper.success(res,userData,'User registered successfully');
                }
                else {
                    responseHelper.fail(res,'Check password again');
                }
            };
        } 
         
    } catch(err) {
        next(err);
    }
}; 


exports.uploadImg = async(req,res,next) => {
    try {
        const img = req.files.img;
        const key = req.body.key;
        console.log(key);

        const upload = await bucket.upload(img,key);
        if(upload) {
            const accessURL = await bucket.getAccessURL(key)
            responseHelper.success(res,accessURL,'Profile Picture uploaded successfully.')
        }

    } catch (err) {
        next(err);
    };
};

exports.deleteImg = async(req,res,next) => {
    try {
        const key = req.body.key;

        bucket.delete(key);
        responseHelper.success(res,'Image Deleted Successfully')
    } catch (err) {
        next(err);
    };
};

exports.login =  async(req,res,next) => {
    try {
        
        const { body } = req;
        const response = await userService.login(body);
        return responseHelper.success(res,response);

    } catch(err) {
        next(err);
    }
};

exports.decoder = async(req,res,next) => {
    try{
        const token = req.params.token;
        const [header,payload,signature] = token.split('.');
        const decoded = decode(token);
        const str =JSON.stringify(decoded);
        res.send({
            header : header,
            payload : payload,
            sign : signature
        })
        console.log(str)
    } catch(err) {
        next(err);
    };
};