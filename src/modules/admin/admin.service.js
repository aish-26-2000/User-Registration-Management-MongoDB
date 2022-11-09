const { Invite, User } = require('../../database/models');
const { count } = require('../../database/models/user');
const { getAccessURL, searchObj } = require('../../utils/s3helper');

exports.addInvite = async(data) => {
    const newInvite = new Invite({email : data})
    const response = await newInvite.save()

    return {
        id : response._id,
        email : response.email
    };
};

exports.authCheck = (username,password) => {
    if (!username || !password) {
        return false;
    };

    if (username === process.env.USER_AUTH && password === process.env.PASSWORD){
        return true;
    } else {
        return null;
    };
};

exports.restrict = async(e) => {
    const user = Invite.findOne({email : e})

    if(user !== null) {
        await Invite.findOneAndUpdate(
            {email : e},
            {active : false},
            {new : true}
        );
    };
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

exports.count = async() => {
   const users =  await User.find()
   const count = users.length;
   return count;
};

exports.getAllUsers = async(page,limit,sort_column,sort_order,query) => {
    const skip = (page - 1) * limit;

    const users = await User.find().or([
        {"firstName" : { "$regex" : query, "$options": "i"}},
        {"lastName" : { "$regex" : query, "$options": "i"}},
        {"email" : { "$regex" : query, "$options": "i"}},
        ])
        .select(["_id","firstName","lastName","email","phone"])
        .sort({[sort_column]:sort_order})
        .skip(skip)
        .limit(limit)
        
        const count = await User.countDocuments(User.find().or([
            {"firstName" : { "$regex" : query, "$options": "i"}},
            {"lastName" : { "$regex" : query, "$options": "i"}},
            {"email" : { "$regex" : query, "$options": "i"}},
            ]))
        const totalPages = Math.ceil(count / limit);
        const response = {
            title : 'List of Users',
            totalPages : totalPages,
            currentPage : page,
            results : count,
            list : users
        }
        return response;
};

exports.getUserInfo = async(email) => {
    const user = await User.findOne({email : email})

    if(user) {
        const status = await Invite.findOne({email : email})
        const url = await getAccessURL(data.imageKey)
        return {
            _id : user._id,
            active : status.active,
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            phone : user.phone,
            imageURL : url
        };
    };   
};

exports.getUserHistory = async(email) => {
    const user = await Invite.findOne({email : email})

    if(user){
        return {
            user_status : `${user.active} [true : active]`,
            email_invitation : {
                status : "sent",
                sentAt :  String(user.createdAt)
            },
            personal_profile : {
                status : user.regStatus,
                registeredAt :  String(user.updatedAt)
            }      
        }
        
    };

};