const { User,Invite } = require('../../database/models');
const { BadRequestException,UnauthorizedException } = require('../../helpers/errorResponse');

exports.findUser = async(e) => {
    const user = await Invite.findOne({email : e})
    if( (user.active) !== true) {
        throw new UnauthorizedException('Access denied');
    };
    if(user.regStatus === 'completed') {
        throw new UnauthorizedException('User already exists');
    }  
    return user;
;}

exports.addImageKey = async(e,key) => {
    await User.findOneAndUpdate({email : e},{imageKey : key},{new : true});
};

exports.addUser = async(e,info) => {
    await User.create({email : e});
    await User.findOneAndUpdate({email : e},info,{new : true});
    const userInfo = await User.findOneAndUpdate({email : e},{userRegisteredAt : Date.now()},{new:true})
    await Invite.findOneAndUpdate({email : e},{regStatus : 'completed'},{new :  true});
    
    return { 
        _id : userInfo._id,
        firstName : userInfo.firstName,
        lastName : userInfo.lastName,
        email : userInfo.email,
        phone : userInfo.phone,
        imageKey : userInfo.imageKey
    };
};

exports.login = async (params) => {
    const { email, password } = params;

    const user = await User.findOne({ where: { email } });
    if (!user) throw new BadRequestException(MESSAGES.USER.LOGIN.INVALID_CREDS);

    const passwordMatch = await bcrypt.verifyPassword(password, user.password);
    if (!passwordMatch) throw new BadRequestException(MESSAGES.USER.LOGIN.INVALID_CREDS);

    const accessToken = jwt.generateAccessToken({ id: user.id, email: user.email});

    return {
        success: true,
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken,
    };
};

