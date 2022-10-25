const { User,Invite } = require('../../database/models');

exports.validatePassword = async(password,passwordConfirm) => {
    if(password === passwordConfirm) {
        return true;
    }
}

exports.checkRegStatus = async(e) => {
    const user = await Invite.findOne({email : e})
    if(user.regStatus === 'completed') {
        return true;
    }
};

exports.getUser = async(e) => {
    return User.findOne({email : e})
};

exports.addUserInfo = async(e,info) => {
        const userInfo = await User.findOneAndUpdate(
            {email : e},
            info,
            {new : true});
        await Invite.findOneAndUpdate(
            {email : e},
            {regStatus : 'completed'},
            {new :  true});
        return { 
            _id : userInfo._id,
            firstName : userInfo.firstName,
            lastName : userInfo.lastName,
            email : userInfo.email,
            phone : userInfo.phone
        };
};
