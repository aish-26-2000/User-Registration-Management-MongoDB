const { responseHelper } = require('../../helpers');
const { bcrypt,jwt } = require('../../utils')
const userService = require('./user.service');


exports.Register = async(req,res,next) => {
    try {
        const { body } = req;
        const token = req.params.token;

        //verify token
        await jwt.verifyToken(token);

        //find user
        const user = await userService.getUser(body.email)

        if(!user) {
            responseHelper.fail(res,'User not found');            
        };

        if(user) {
            //check reg status
            const status = await userService.checkRegStatus(body.email)

            //user already registered
            if(status === true) {
                responseHelper.fail(res,'User already registered'); 
            }    
            //user reg pending
            if(status !== true) {
                //validate password
                const passwordCheck = await userService.validatePassword(body.password,body.passwordConfirm)
                if( passwordCheck === true) {
                    //hash password
                    body.password = await bcrypt.hashPassword(body.password);
                    
                    const userData = await userService.addUserInfo(body.email,body)
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

exports.login =  async(req,res,next) => {
    try {
        
        const { body } = req;
        const response = await userService.login(body);
        return responseHelper.success(res,response);

    } catch(err) {
        next(err);
    }
};