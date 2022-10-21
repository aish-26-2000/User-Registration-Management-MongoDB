const { BadRequestException } = require('../helpers/errorResponse');
const jwt = require('jsonwebtoken');
const { CONSTANTS } = require('../config');


exports.verifyToken = (token) => {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
        jwt.verify(token, CONSTANTS.JWT.JWT_SECRET, (err, decoded) => {
            if (err) throw new BadRequestException('Invalid Token');
            resolve(decoded);
        });
    });
};

exports.generateAccessToken = (payload) => {
    return jwt.sign({ ...payload }, CONSTANTS.JWT.JWT_SECRET,{
        expiresIn :  CONSTANTS.JWT.JWT_EXPIRES_IN
    });
};
