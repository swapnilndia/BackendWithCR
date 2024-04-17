const mongoose = require('mongoose')
const {User} = require('./user.models')

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

const StudentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    DOB: String,
    studentId: String,
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String
    },
    gender: String,
    contactNumber: String,
    guardian: {
      name: String,
      contactNumber: String
    },
    class: String,
    section: String,
    admissionDate: String,
    feesInformation: {
      totalFees: Number,
      paymentStatus: String
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }, {
    timestamps: true
  });

const StudentData = mongoose.model('StudentData', StudentSchema)

module.exports = {
    StudentData
}