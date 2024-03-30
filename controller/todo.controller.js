
const { Todo } = require('../models/todo.models')
const ApiResponse = require('../utils/ApiResponse')
const ApiError = require('../utils/ApiError')


exports.create_todo = async (req, res) => {
    try {
        const todoBody = req.body;
        const userId = req.userId;
        const createTodo = await Todo.create({ ...todoBody, createdBy: userId });
        if (createTodo) {
            return res.status(201).json(new ApiResponse(201, 'CREATED', createTodo, 'new todo created successfully'));
        } else {
            return res.status(500).json(new ApiError(500, 'INTERNAL SERVER ERROR', 'Something went wrong'));
        }
    } catch (error) {
        return res.status(500).json(new ApiError(500, 'INTERNAL SERVER ERROR', 'Something went wrong'));
    }
};

exports.get_all_todos = async (req, res) => {
    try {
        const userId = req.userId
        const listOfTodos = await Todo.find({ createdBy: userId })
        if (!listOfTodos) {
            return res.status(new ApiError(500, 'INTERNAL SERVER ERROR', 'Something went wrong'))
        }
        res.status(200).json(new ApiResponse(200, 'SUCCESS', listOfTodos, 'Todolist fetched successfully'))
    } catch (error) {
        return res.status(new ApiError(500, 'INTERNAL SERVER ERROR', 'Something went wrong'))
    }
}

exports.get_specific_todo = async (req, res) => {
    try {
        const { id } = req.params
        const isTodoAvailable = await Todo.findById(id)
        if (!isTodoAvailable) {
            return res.status(404).json(new ApiError(404, 'Todo Not Found', `Todo with ${id} does not exist in database`))
        }
        const selectedTodo = await Todo.findById({ _id: id })
        if (!selectedTodo) {
            return res.status(500).json(new ApiError(500, 'INTERNAL SERVER ERROR', 'Something went wrong'))
        }
        res.status(200).json(new ApiResponse(200, 'SUCCESS', selectedTodo, 'Todo fetched successfully'))
    } catch (error) {
        res.status(500).json(new ApiError(500, 'INTERNAL SERVER ERROR', 'Something went wrong'))
    }
}

exports.update_todo = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, completed, dueDate, todoCategory, priority } = req.body
        const isTodoAvailable = await Todo.findById(id)
        if (!isTodoAvailable) {
            return res.status(404).json(new ApiError(404, 'Todo Not Found', `Todo with ${id} does not exist in database`))
        }
        const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description, completed, dueDate, todoCategory, priority }, { new: true })
       
        if (!updatedTodo) {
            return res.status(500).json(new ApiError(500, 'INTERNAL SERVER ERROR', 'Something went wrong'))
        }
        res.status(200).json(new ApiResponse(200, 'SUCCESS', updatedTodo, 'Todo fetched successfully'))
    } catch (error) {
        res.status(500).json(new ApiError(500, 'INTERNAL SERVER ERROR', 'Something went wrong'))
    }
}

exports.delete_todo = async (req, res) => {
    try {
        const { id } = req.params
        const isTodoAvailable = await Todo.findById(id)
        if (!isTodoAvailable) {
            return res.status(404).json(new ApiError(404, 'Todo Not Found', `Todo with ${id} does not exist in database`))
        }
        const deletedTodo = await Todo.findByIdAndDelete(id)
        if (!deletedTodo) {
            return res.status(500).json(new ApiError(500, 'INTERNAL SERVER ERROR', 'Something went wrong 1'))
        }
        res.status(200).json(new ApiResponse(200, 'SUCCESS', deletedTodo, 'Todo Deleted successfully'))
    } catch (error) {
        res.status(500).json(new ApiError(500, 'INTERNAL SERVER ERROR', 'Something went wrong 2'))
    }
}