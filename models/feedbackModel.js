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
        max: 5,
        required: [true, 'Please select a rating for this application']
    },
    category: {
        type: String,
        enum: ['Suggestion', 'Something Wrong', 'Compliment'],
        required: [true, 'Select a category about your feedback']
    },
    message: {
        type: String,
        required: [true, 'Please write a message for us'],
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// combination of (from & message) fields has to be unique // prevents duplicate feedbacks
// feedbackSchema.index({ from: 1, message: 1 }, { unique: true });

feedbackSchema.pre(/^find/, function(next) {
  this.populate();
  next();
})

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;