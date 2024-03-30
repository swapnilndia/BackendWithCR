const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        unique: true

    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date

}, {
    timestamps: true
});


const User = mongoose.model('User', UserSchema)

module.exports = {
    User
}