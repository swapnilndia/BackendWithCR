
const { User } = require('../models/user.models')
const bcrypt = require('bcrypt')
const {signUpSchema} = require('../utils/validationSchema')


const signupMiddleware = async (req, res, next) => {
    try {
        await signUpSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        const errors = error.inner.map(err => ({
            field: err.path,
            message: err.message
        }));
        return res.status(400).json({ errors });
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