const { Invite, User } = require('../../database/models');

exports.addInvite = async(user) => {
    const newInvite = new Invite(user);
    const newUser = new User(user);
    await newUser.save();
    const response = await newInvite.save();
    return {
        id : response._id,
        name : response.name,
        email : response.email
    };
};

exports.authCheck = (username,password) => {
    if (!username || !password) {
        return false;
    } 
    if (username === process.env.USER_AUTH && password === process.env.PASSWORD){
        return true;
    } else {
        return null;
    }
};

