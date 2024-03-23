
const { User } = require('../models/user.models')
const ApiResponse = require('../utils/ApiResponse')
const ApiError = require('../utils/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




// Display list of all Authors.
exports.user_signup = async (req, res) => {
    // Implement admin signup logic
    const { firstName, lastName, email, password } = req.body
    try {
        const saltOrRounds = await bcrypt.genSalt(10)
        console.log(saltOrRounds)
        const hashedPassword = await bcrypt.hash(password, saltOrRounds,)
        const createUser = await User.create({ firstName, lastName, email, password: hashedPassword })
        if (!createUser) {
            throw new ApiError(500, "Something went wrong while creating user, Kindly retry after a while")
        }
        return res.status(201).json(new ApiResponse(201, createUser, "new user created Successfully"))
    } catch (error) {
        console.log(error)
    }
}


exports.user_signin = async (req, res) => {

    try {
        const { email } = req.body
        const userId = req.userId
        const secret = process.env.JWT_SECRET
        const accessToken = await jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            id: userId,
            email: email
        }, secret
        )
        res.status(200).json({ accessToken })
    } catch (error) {
        res.status(500).json({ msg: 'something went wrong, please try again' })
    }
}
