const mongoose = require('mongoose');
const { bcrypt,jwt } = require('../../utils');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique : true
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
        },
        imageKey : {
            type : String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
