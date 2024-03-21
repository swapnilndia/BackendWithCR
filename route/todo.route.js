const { Router } = require('express')
const { Todo } = require('../models/todo.models')
const ApiResponse = require('../utils/ApiResponse')
const ApiError = require('../utils/ApiError')
const router = Router()
const {todoMiddleware} = require('../middleware/todo.middleware')
const todoController = require('../controller/todo.controller')

router.post('/',todoMiddleware, todoController.create_todo)
router.get('/',todoMiddleware,  todoController.get_all_todos)





router.get('/:id',todoMiddleware, todoController.get_specific_todo )


router.put('/:id', todoMiddleware, todoController.update_todo )



module.exports = router