const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: [true, 'Please provide a job title'],
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
    },
    jobType: {
      type: String,
      enum: ['Full-Time', 'Part-Time', 'Contract', 'Temporary', 'Internship'],
      required: [true, 'Please select a job type'],
    },
    salary: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: [true, 'Please provide a job description'],
    },
    workingHours: {
      type: String,
      required: false,
    },
    applyAt: {
      type: String,
      required: [true, 'Please provide application email/link'],
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
