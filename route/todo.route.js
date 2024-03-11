const { Router } = require('express')
const { Todo } = require('../models/todo.models')
const ApiResponse = require('../utils/ApiResponse')
const ApiError = require('../utils/ApiError')
const router = Router()


router.get('/', async (req, res) => {
    try {
        const listOfTodos = await Todo.find()
        if (!listOfTodos) {
            return res.status(500).json(new ApiError())
        }
        res.status(200).json(new ApiResponse(200, listOfTodos, 'Todo list fetched successfully'))
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log(id, 'this is id')
        const selectedTodo = await Todo.findById(id)
        if (!selectedTodo) {
            return res.status(500).json(new ApiError())
        }
        res.status(200).json(new ApiResponse(200, selectedTodo, 'Todo fetched successfully'))
    } catch (error) {
        console.log(error)
        res.status(500).json({ mess: 'some went wrong' })
    }
})
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, completed, date } = req.body
        const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description, completed, date } , {new: true})
        console.log(updatedTodo)
        if (!updatedTodo) {
            return res.status(500).json(new ApiError())
        }
        res.status(200).json(new ApiResponse(200, updatedTodo, 'Todo fetched successfully'))
    } catch (error) {
        console.log(error)
        res.status(500).json({ mess: 'some went wrong' })
    }
})

router.post('/', async (req, res) => {
    try {
        const { title, description, completed, date } = req.body
        const createTodo = await Todo.create({ title, description, completed, date })
        if (!createTodo) {
            return res.status(500).json(new ApiError())
        }
        return res.status(500).json(new ApiResponse(200, createTodo, 'New todo Create successfully'))
    } catch (error) {
        console.log(error)
    }
})

module.exports = router