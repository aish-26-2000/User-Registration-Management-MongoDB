const { Invite, User } = require('../../database/models');

//total invites
exports.inviteCount = async() => {
    await Invite.count().then(n => {
        console.log(`user : ${n}`);
        return n;
    })
};

//total users
exports.userCount = async() => {
    await User.count().then(n => {
        console.log(`user : ${n}`);
        return n;
    })
};

//registered users
exports.regUserCount = async() => {
    let n = await Invite.count({regStatus : "completed"});
    console.log(`reg : ${n}`);
    return n;
};

//pending users
exports.awaitingUserCount = async() => {
    const n = await Invite.count({regStatus : "pending"});
    console.log(`pending : ${n}`);
    return n;
};

//active users
exports.activeUserCount = async() => {
    const n = await Invite.where({active : true}).count();
    console.log(`active : ${n}`);
    return n;
};