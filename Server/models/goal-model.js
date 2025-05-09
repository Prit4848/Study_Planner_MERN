const mongoose = require("mongoose")


const goalSchema =  mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    goalTitle: {
        type: String,
        required: true,
        trim: true,
    },
    goalDescription: {
        type: String,
        required: true,
        trim: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    completed: {
        type: Boolean,
        default: false
      }
});

module.exports = mongoose.model("goal",goalSchema)