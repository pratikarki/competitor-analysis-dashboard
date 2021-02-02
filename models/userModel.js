const mongoose = require('mongoose');

//defining schema for user collection
const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'A user must have a name'],
        trim: true,
        maxlength: [35, 'Fullname must be less than 35 characters'],
        minlength: [5, 'Fullname must be more than 5 characters']
    },
    userName: { 
        type: String,
        required: [true, 'A user must have a username'],
        unique: [true, 'Username cannot be duplicate'],
        trim: true,
        maxlength: [15, 'Username must have less than 15 characters'],
        minlength: [5, 'Username must have more than 5 characters']
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: [true, 'Email cannot be duplicate'],
        trim: true,
        maxlength: [50, 'An email must have less than 50 characters'],
        minlength: [10, 'An email must have more than 10 characters']
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
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;