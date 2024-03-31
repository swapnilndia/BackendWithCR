const { Router } = require('express')
const router = Router()
const userController = require('../controller/user.controller')
const { signupMiddleware, signInMiddleware, verifyMiddleware } = require('../middleware/user.middleware')
const { signInValidation } = require('../middleware/validation.middleware')
const { upload } = require('../middleware/multer.middleware')

router.post('/signup', signupMiddleware, userController.user_signup)
router.post('/signin', signInValidation, signInMiddleware, userController.user_signin)
router.post('/verify', verifyMiddleware, userController.user_verify)
module.exports = router
