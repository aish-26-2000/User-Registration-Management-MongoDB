const { User } = require('../../database/models');

exports.addUser = async(user) => {
    const newUser = new User(user);
    const response = await newUser.save();
    return {
        id : response._id,
        firstName : response.firstName,
        lastNameame : response.lastName
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