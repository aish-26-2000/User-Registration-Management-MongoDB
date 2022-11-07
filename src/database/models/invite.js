const mongoose = require('mongoose');

const InviteSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique : true
        },
        regStatus : {
            type : String,
            enum : ['pending','completed'],
            default : 'pending'
        },
        active : {
            type : Boolean,
            default : true        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Invite', InviteSchema);
