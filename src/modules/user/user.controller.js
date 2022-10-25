const { responseHelper } = require('../../helpers');
const { bcrypt } = require('../../utils')
const userService = require('./user.service');

exports.Register = async(req,res,next) => {
    try {
        const { body } = req;
        //find user
        const user = await userService.getUser(body.email)
        if(user) {
            //check reg status
            const status = await userService.checkRegStatus(body.email)

            //user already registered
            if(status === true) {
                responseHelper.fail(res,'User already registered'); 
                
            //user reg pending
            } else {
                //validate password
                const passwordCheck = await userService.validatePassword(body.password,body.passwordConfirm)
                if( passwordCheck === true) {
                    //body.password = bcrypt.hashPassword(body.password);
                    const userData = await userService.addUserInfo(body.email,body)
                    responseHelper.success(res,userData,'User registered successfully');
                }
                else {
                    responseHelper.fail(res,'Check password again');
                }
            };

        //user not found
        } else {
            responseHelper.fail(res,'User not found');            
        }        
    } catch(err) {
        next(err);
    }
}; 

