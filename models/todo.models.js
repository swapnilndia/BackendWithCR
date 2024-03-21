const mongoose = require('mongoose')
const { User } = require('./user.models')

mongoose.connect('mongodb+srv://CR123:CR123@backendwithcr.n3do32q.mongodb.net/');

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