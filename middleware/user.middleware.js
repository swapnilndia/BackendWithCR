
const { User } = require('../models/user.models')
const ApiError = require('../utils/ApiError')
const bcrypt = require('bcrypt')
const { signUpSchema } = require('../utils/validationSchema')
const { isVerificationTokenValid } = require('../utils/helperFunction')


const signupMiddleware = async (req, res, next) => {
    try {
        await signUpSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        const errors = error.inner.map(err => ({
            field: err.path,
            message: err.message
        }));
        return res.status(400).json(new ApiError(400, 'VALIDATION ERROR', 'one or more validation error', errors));
    }
}
const signInMiddleware = async (req, res, next) => {
    const { username, password } = req.body
    try {
        const isExistingUser = await User.findOne({ username })
        if (!isExistingUser) {
            return res.status(404).json(new ApiError(404, 'USER NOT FOUND', 'User does not exist, Kindly sing in first'))
        }
        const isPasswordMatching = await bcrypt.compare(password, isExistingUser.password)
        if (!isPasswordMatching) {
            return res.status(401).json(new ApiError(401, 'UNAUTHORIZED', 'Username or password does not match'))
        }
        req.userId = isExistingUser._id
        req.email = isExistingUser.email
        req.isVerified = isExistingUser.isVerified
        req.isAdmin = isExistingUser.isAdmin
        next()
    } catch (error) {
        return res.status(500).json(new ApiError(500, 'INTERNAL SERVER ERROR', 'Something went wrong, please try again'))
    }
}

const verifyMiddleware = async (req, res, next) => {
    try {
        const { token } = req.body
        if (!token) {
            res.status(400).json(new ApiError(400, 'BAD REQUEST', 'Token is missing in the API'))
        }
        const findUserWithToken = await User.findOne({ verifyToken: token })
        if (!findUserWithToken) {
            res.status(400).json(new ApiError(400, 'BAD REQUEST', 'User not found, with token 1'))
        }
        const isValidToken = isVerificationTokenValid(findUserWithToken.verifyTokenExpiry)
        if (isValidToken) {
            req.userId = findUserWithToken._id
            next()

        } else {
            res.status(400).json(new ApiError(400, 'BAD REQUEST', 'Token expired'))
        }


    } catch (error) {
        res.status(500).json(new ApiError(500, 'INTERNAL SERVER ERROR', 'Something went wrong 2'))
    }
}

module.exports = { signupMiddleware, signInMiddleware, verifyMiddleware }