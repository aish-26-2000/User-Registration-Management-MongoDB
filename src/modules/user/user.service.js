const { User,Invite } = require('../../database/models');

exports.getUser = async(email) => {
    return User.findOne(email);
};

exports.addUserInfo = async(email,info) => {
    const userInfo = await User.findOneAndUpdate(email,info);
    return userInfo;
};