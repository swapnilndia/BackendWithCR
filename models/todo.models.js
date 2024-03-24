const mongoose = require('mongoose')
const { User } = require('./user.models')

mongoose.connect('mongodb+srv://CR123:CR123@backendwithcr.n3do32q.mongodb.net/');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title for your todo"],

    },
    description: {
        type: String,
        required: [true, "Please provide a friendly for your todo"],

    },
    completed: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is a required field']
    },
    todoCategory: {
        type: String,
        required: [true, 'Todo category is a required field']
    },
    priority: {
        type: String,
        enum: ['HIGH', 'MEDIUM', 'LOW'],
        default: 'LOW'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = {
    Todo
}