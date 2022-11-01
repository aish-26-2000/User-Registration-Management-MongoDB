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

    JWT : {
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN
    },

    S3 : {
        S3_ACCESS_KEY_ID : process.env.S3_ACCESS_KEY_ID,
        S3_SECRET_ACCESS_KEY : process.env.S3_SECRET_ACCESS_KEY,
        S3_BUCKET  : process.env.S3_BUCKET,
        S3_REGION : process.env.S3_REGION

    },

    USER: {
        ROLES: {
            USER: 'USER',
        },
    },
};
