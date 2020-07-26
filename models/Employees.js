const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String, 
    required: true 
  },
  email: {
    type: String, 
    required: true, 
  },
  phone: {
    type: Number,
    required: true
  },
  birthday: { 
    type: Date,
    required: true 
  },
  position: {
    type: String,
    required: true
  },
  date: {
    type: String, 
    required: true, 
    default: Date.now 
  }
})

module.exports = mongoose.model('employee', employeeSchema);