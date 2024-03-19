const { Router } = require('express')

const router = Router()

const userController = require('../controller/user.controller')

const { signupMiddleware, signinMiddleware } = require('../middleware/user.middleware')


router.post('/signup', signupMiddleware, userController.user_signup)
router.post('/signin', signinMiddleware, userController.user_signin)
module.exports = router
