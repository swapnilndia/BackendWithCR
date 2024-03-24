const mongoose = require('mongoose')



mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

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