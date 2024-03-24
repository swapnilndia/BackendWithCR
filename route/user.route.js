const { Router } = require('express')
const router = Router()
const userController = require('../controller/user.controller')
const { signupMiddleware, signInMiddleware } = require('../middleware/user.middleware')
const { signInValidation } = require('../middleware/validation.middleware')


router.post('/signup', signupMiddleware, userController.user_signup)
router.post('/signin', signInValidation, signInMiddleware, userController.user_signin)
module.exports = router
