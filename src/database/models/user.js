const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        address :{
            country : {
                type : String
            },
            zipcode : {
                type : Number
            },
            state : {
                type : String
            },
            city : {
                type : String
            },
            street_number : {
                type : Number
            },
            street_name : {
                type : String
            }
        },
        phone : {
            type : Number,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
