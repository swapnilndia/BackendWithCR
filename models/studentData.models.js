const mongoose = require('mongoose')
const {User} = require('./user.models')

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

const StudentSchema = new mongoose.Schema({
    firstName: String,
    lastName:String,
    email:String,
    DOB: String,
    studentId: String,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})

const StudentData = mongoose.model('StudentData', StudentSchema)

module.exports = {
    StudentData
}