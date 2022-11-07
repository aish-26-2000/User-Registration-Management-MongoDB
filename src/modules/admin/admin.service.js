const { Invite, User } = require('../../database/models');
const { getAccessURL, searchObj } = require('../../utils/s3helper');

exports.addInvite = async(data) => {
    const newInvite = new Invite({email : data})
    const response = await newInvite.save()
    const newUser = new User({email : data})
    await newUser.save();
    return {
        id : response._id,
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
    const user = Invite.findOne({email : e})
    if(user !== null) {
        await Invite.findOneAndUpdate(
            {email : e},
            {active : false},
            {new : true}
        );
    }
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
    const url = await getAccessURL(data.imageKey)
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