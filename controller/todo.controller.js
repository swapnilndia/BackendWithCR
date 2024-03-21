
const { User } = require('../models/user.models')
const { Todo } = require('../models/todo.models')
const ApiResponse = require('../utils/ApiResponse')
const ApiError = require('../utils/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.create_todo = async (req, res) => {
    try {
        const { title, description, completed, date } = req.body;
        const userId = req.userId;
        const createTodo = await Todo.create({ title, description, completed, date, createdBy: userId });
        if (createTodo) {
            return res.status(200).json({ msg: 'New todo created successfully', data: createTodo });
        } else {
            return res.status(500).json({ msg: 'Failed to create todo' });
        }
    } catch (error) {
        console.error('Error in create_todo controller:', error);
        return res.status(500).json({ msg: 'Something went wrong' });
    }
};

exports.get_all_todos = async (req, res) => {
    try {
        const userId = req.userId
        const listOfTodos = await Todo.find({ createdBy: userId })
        if (!listOfTodos) {
            return res.status(500).json(new ApiError())
        }
        res.status(200).json(new ApiResponse(200, listOfTodos, 'Todo list fetched successfully'))
    } catch (error) {
        console.log(error)
    }
}

exports.get_specific_todo = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id, 'controller')
        const selectedTodo = await Todo.findById({ _id: id })
        if (!selectedTodo) {
            return res.status(500).json(new ApiError())
        }
        res.status(200).json(new ApiResponse(200, selectedTodo, 'Todo fetched successfully'))
    } catch (error) {
        console.log(error)
        res.status(500).json({ mess: 'some went wrong' })
    }
}

exports.update_todo = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, completed, date } = req.body
        const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description, completed, date }, { new: true })
        console.log(updatedTodo)
        if (!updatedTodo) {
            return res.status(500).json(new ApiError())
        }
        res.status(200).json(new ApiResponse(200, updatedTodo, 'Todo fetched successfully'))
    } catch (error) {
        console.log(error)
        res.status(500).json({ mess: 'some went wrong' })
    }
}