const mongoose = require('mongoose')
const { User } = require('./user.models')

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);


const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
    date: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = {
    Todo
}