const { Router } = require('express')
const router = Router()
const userController = require('../controller/user.controller')
const { signupMiddleware, signInMiddleware, verifyMiddleware } = require('../middleware/user.middleware')
const { signInValidation, forgotPasswordValidation,resetPasswordValidation,changePasswordValidation } = require('../middleware/validation.middleware')
const { upload } = require('../middleware/multer.middleware')

router.post('/signup', signupMiddleware, userController.user_signup)
router.post('/signin', signInValidation, signInMiddleware, userController.user_signin)
router.post('/verify', verifyMiddleware, userController.user_verify)
router.post('forgot-password', forgotPasswordValidation, verifyMiddleware, userController.user_forgot_password)
router.post('reset-password',resetPasswordValidation, verifyMiddleware, userController.user_reset_password)
router.post('change-password',changePasswordValidation, verifyMiddleware, userController.user_change_password)
module.exports = router
