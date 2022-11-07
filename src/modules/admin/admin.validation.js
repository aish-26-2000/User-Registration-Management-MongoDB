const Joi = require('joi');


const inviteSchema = {
    invite: {
        body: Joi.object().keys({
            email: Joi.string().trim().email().required(),
        }),
    },

    login: {
        body: Joi.object().keys({
            email: Joi.string().trim().email().required(),
            password: Joi.string().trim().min(3).max(50).trim().required(),
        }),
    },
};


module.exports = { inviteSchema };
