const { Router } = require('express')
const {expenseMiddleware} = require('../middleware/expense.middleware')
const expenseController = require('../controller/expense.controller')

const router = Router()


router.post('/', expenseMiddleware ,expenseController.create_expense )




module.exports = router