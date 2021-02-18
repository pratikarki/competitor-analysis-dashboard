const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    from: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A feedback must have a user']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    category: {
        type: String,
        enum: ['suggestion', 'somethingNotRight', 'compliment'],
    },
    message: {
        type: String,
        required: [true, 'Feedback message can not be empty']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// combination of (from & message) fields has to be unique // prevents duplicate feedbacks
feedbackSchema.index({ from: 1, message: 1 }, { unique: true });

feedbackSchema.pre(/^find/, function(next) {
  this.populate();
  next();
})

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;