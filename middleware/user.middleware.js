
const { User } = require('../models/user.models')
const bcrypt = require('bcrypt')

async function signupMiddleware(req, res, next) {
    const { firstName, lastName, email, password } = req.body
    try {
        if ([firstName, lastName, email, password].some((field) => field?.trim() === "")) {
            res.status(400).json({ msg: "All field are required" })
            // throw new ApiError(400, "All fields are required")
        }
        const isExistingUser = await User.findOne({ email })
        if (!isExistingUser) {
            next()
        } else {
            res.status(400).json({
                msg: "User with email already exist"
            })
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
}
async function signinMiddleware(req, res, next) {
    const { email, password } = req.body
    try {
        if ([email, password].some((field) => field.trim() === "")) {
            res.status(400).json({ msg: 'email and password are required field' })
        }
        const isExistingUser = await User.findOne({ email })
        if (!isExistingUser) {
            res.status(404).json({ msg: 'User not found, kindly sign up' })
        }
        const isPasswordMatching = await bcrypt.compare(password, isExistingUser.password)
        if (!isPasswordMatching) {
            res.status(401).json({ msg: 'Unauthorized' })
        } else {
            req.userId = isExistingUser._id
            next()
        }

    } catch (error) {
        console.log(error)
    }




}

module.exports = { signupMiddleware, signinMiddleware }