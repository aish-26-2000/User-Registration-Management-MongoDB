const { responseHelper } = require('../helpers');
const { UnHandledException, PreconditionException } = require('../helpers/errorResponse');

const options = {
    basic: {
        abortEarly: false,
    },
    array: {
        abortEarly: false,
    },
};

module.exports = (schema) => (req, res, next) => {
    try {
        Object.keys(schema).forEach((key) => {
            const { error } = schema[key].validate(req[key], options);
            if (error) {
                const message = error.details[0].message || 'Invalid Inputs';
                throw new PreconditionException(message);
            }
        });

        next();
    } catch (error) {
        //throw new UnHandledException(error);
        next(responseHelper.fail(res,`${error}`));
    }
};
