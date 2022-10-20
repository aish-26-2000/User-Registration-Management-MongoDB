module.exports = {
    APP: {
        port: process.env.PORT,
        env: process.env.NODE_ENV
    },

    DB: {
        URI: process.env.MONGO_URI,
    },

    USER: {
        ROLES: {
            USER: 'USER',
        },
    },
};
