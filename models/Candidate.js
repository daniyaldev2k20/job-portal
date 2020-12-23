const mongoose = require('mongoose');
const validator = require('validator');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You must enter your name'],
    trim: true,
  },
  currentAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    trim: true,
    required: true,
  },
  province: {
    type: String,
    trim: true,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Provide a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide contact number'],
  },
  position: {
    type: String,
    required: [true, 'Please provide the position you are applying for'],
    enum: ['frontend', 'backend', 'network', 'qa', 'hr'],
  },
  token: {
    type: String,
  },
  resume: {
    type: String,
  },
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
