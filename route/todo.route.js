const { Router } = require('express')
const router = Router()

const { todoMiddleware } = require('../middleware/todo.middleware')
const todoController = require('../controller/todo.controller')
const { todoValidation } = require('../middleware/validation.middleware')

router.post('/', todoValidation, todoMiddleware, todoController.create_todo)
router.put('/:id', todoValidation, todoMiddleware, todoController.update_todo)
router.get('/', todoMiddleware, todoController.get_all_todos)
router.get('/:id', todoMiddleware, todoController.get_specific_todo)


module.exports = router