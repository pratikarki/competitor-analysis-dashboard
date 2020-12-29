const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DomainModel = require('../models/domainModel');

//defining schema for user collection
const userSchema = new Schema({
    FullName: { type: String, required: true },
    UserName: { type: String, required: true },
    EmailAddress: { type: String, required: true },
    Password: { type: String, required: true },
    Country: { type: String, required: true },
    RegisteredDate: { type: Date, required: true },
    Domain_id: { type: Object, required: true }
}, { timestamps: true });

//defining model for user collection
const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;