const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  startTime: {
    type: String, // Storing time in HH:MM format
    required: true
  },
  endTime: {
    type: String, // Storing time in HH:MM format
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  reminderJobId: { type: String }

});
const attachmentSchema = new mongoose.Schema({
  filename: String,
  data: Buffer,  
  contentType: String
});

const planSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  Attachment: {
    type: attachmentSchema,
    default: () => ({})
  },
  tasks: [taskSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Plan', planSchema);



