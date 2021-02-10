const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        // minlength: [5, 'Username must have more than 5 characters']
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: [true, 'Email cannot be duplicate'],
        trim: true,
        maxlength: [50, 'An email must have less than 50 characters'],
        minlength: [10, 'An email must have more than 10 characters'],
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
        trim: true,
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          //This only works on CREATE and SAVE
          validator: function(el) {
            return el === this.password;
          },
          message: 'Passwords are not the same'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    photo: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
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


//ENCRYPT PASSWORD BEFORE SAVE
userSchema.pre('save', async function(next) {
    //Run this function only if password is modified
    if (!this.isModified('password')) return next();

    //Hash password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    //Delete confirmPassword field
    this.confirmPassword = undefined;
    next();
})


//These are instance methods. It is available on all documents of a collection
userSchema.methods.checkPassword = async function (candidatePW, userPW) {
    return await bcrypt.compare(candidatePW, userPW); //returns true of passwords match, false if not
}

userSchema.methods.changedPasswordAfter = function(JWTtimeStamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        // console.log(JWTtimeStamp, changedTimeStamp);

        return (JWTtimeStamp < changedTimeStamp); 
        //returns true if password was changed after token was issued
        //returns false if password change was way before token issue
    }
    return false; //default, false means user has not changed the password after JWTtimeStamp
}

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10*60*1000;
  
    console.log({resetToken}, this.passwordResetToken);
    return resetToken;
}


//defining model for user collection
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;