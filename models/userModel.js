const mongoose = require('mongoose');

//defining schema for user collection
const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'A user must have a name'],
        trim: true
    },
    userName: { 
        type: String,
        required: [true, 'A user must have a username'],
        unique: [true, 'Username cannot be duplicate'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: [true, 'Email cannot be duplicate'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
        trim: true
    },
    country: {
        type: String,
        required: [true, 'A user must have a country name']
    },
    registeredDate: {
        type: Date,
        default: Date.now
    },
    domain_id: {
        type: String,
        // type: Object,
        required: [true, 'A user must have a domain id reference']
    }
}); //, { timestamps: true }

//defining model for user collection
const User = mongoose.model('User', userSchema);

module.exports = User;