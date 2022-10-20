module.exports = {
    APP: {
        port: process.env.PORT,
        env: process.env.NODE_ENV
    },

    DB: {
        URI: process.env.MONGO_URI,
    },

    EMAIL : {
        EMAIL_HOST: process.env.EMAIL_HOST,
        EMAIL_PORT: process.env.EMAIL_PORT,
        EMAIL_USERNAME: process.env.EMAIL_USERNAME,
        EMAIL_PASSWORD: process.env.EMAIL_PASSWORD
    },

    USER: {
        ROLES: {
            USER: 'USER',
        },
    },
};
