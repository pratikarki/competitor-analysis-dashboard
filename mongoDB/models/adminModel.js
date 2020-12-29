const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//defining schema for user collection
const adminSchema = new Schema({
    FullName: { type: String, required: true },
    UserName: { type: String, required: true },
    EmailAddress: { type: String, required: true }
}, { timestamps: true });

//defining model for user collection
const AdminModel = mongoose.model('admin', adminSchema);

module.exports = AdminModel;