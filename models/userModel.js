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
        trim: true,
        maxlength: [15, 'Username must be less than 15 characters'],
        default: ''
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: true,
        trim: true,
        maxlength: [50, 'An email must have less than 50 characters'],
        minlength: [10, 'An email must have more than 10 characters'],
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
        trim: true,
        minlength: [8, 'Your new password is shorter than 8 characters'],
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
          message: 'Your confirm password do not match'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    photo: {
        type: String,
        default: 'defaultUser.jpg'
    },
    accountActive: { 
        type: Boolean, 
        default: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    registeredDate: {
        type: Date,
        default: Date.now
    },
    domain_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Domain'
    },
    competitorSites: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Domain'
        }
    ]
}, 
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

//Virtual populate feedbacks while querying users
userSchema.virtual('feedbacks', {
    ref: 'Feedback',
    foreignField: 'from',
    localField: '_id'
  })

//DOCUMENT MIDDLEWARES: executes this function before .save() or .create(), but not update()
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
//UPDATE passwordChangedAt IF PW IS CHANGED
userSchema.pre('save', function(next) {
    //if password is not modified OR if document is new, run next() middleware
    if (!this.isModified('password') || this.isNew) return next();
    
    this.passwordChangedAt = Date.now() - 2000;
    next();
})  

//QUERY MIDDLEWARE
//SELECT ACTIVE USERS ONLY AND 
userSchema.pre(/^find/, function(next) {
    // this.find({ accountActive: { $ne: false } });
    this.find();
    next();
})

//INSTANCE METHODS: available on all documents of a collection
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
    this.passwordResetExpires = Date.now() + 24*60*60*1000; // Expires in 24 hours ie 1 day
  
    // console.log({resetToken}, this.passwordResetToken);
    return resetToken;
}


//defining model for user collection
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;