const { Invite, User } = require('../../database/models');
const { getAccessURL, searchObj } = require('../../utils/s3helper');

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

exports.restrict = async(e) => {
        await Invite.findOneAndUpdate(
            {email : e},
            {active : false},
            {new : true}
        );
};

exports.unrestrict = async(e) => {
    await Invite.findOneAndUpdate(
        {email : e},
        {active : true},
        {new : true}
    );
};

exports.removeUser = async(e) => {
    await Invite.findOneAndDelete(
        {email : e},
        {new :  true}
    )
    await User.findOneAndDelete(
        {email : e},
        {new :  true}
    )
};

exports.getUserInfo = async(email) => {
    const data = await User.findOne({email : email})
    const status = await Invite.findOne({email : email})
    const url = await getAccessURL(email)
    return {
        _id : data._id,
        active : status.active,
        registration_status : status.regStatus,
        firstName : data.firstName,
        lastName : data.lastName,
        email : data.email,
        phone : data.phone,
        imageURL : url
    };
};