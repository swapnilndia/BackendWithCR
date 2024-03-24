
const { User } = require('../models/user.models')
const ApiResponse = require('../utils/ApiResponse')
const ApiError = require('../utils/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sendEmail } = require('../utils/mailer')

exports.user_signup = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        const saltOrRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const createUser = await User.create({ username, email, password: hashedPassword });
        // send verification email 
        await sendEmail({ email, emailType: "VERIFY", userId: createUser._id });
        return res.status(201).json(new ApiResponse(201, 'SUCCESS', { createUser }, 'user created succesfully'));
    } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            // Extract the duplicate key value from the error
            const keyValue = error.keyValue;
            let errorMessage;

            // Check which key is duplicated (username or email)
            if (keyValue.username) {
                errorMessage = `Username '${keyValue.username}' is already taken`;
            } else if (keyValue.email) {
                errorMessage = `Email '${keyValue.email}' is already registered`;
            } else {
                errorMessage = 'User already exists';
            }

            // Return the error message to the client
            return res.status(400).json(new ApiError(400, 'BAD REQUEST', errorMessage));
        } else {
            // For other errors, return a generic error message
            console.error(error);
            return res.status(500).json(new ApiError(500, 'INTERNAL SERVER ERROR', 'Something went wrong'));
        }
    }

}

exports.user_signin = async (req, res) => {

    try {
        const { username } = req.body
        const email = req.email
        const userId = req.userId
        const isVerfied = req.isVerfied
        const secret = process.env.JWT_SECRET
        const accessToken = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            id: userId,
            email,
            isVerfied
        }, secret
        )
        res.status(200).json(new ApiResponse(200, 'SUCCESS', { accessToken, email, username }, 'user signed in succesfully'))
    } catch (error) {
        res.status(500).json(new ApiError(500, 'INTERNAL SERVER ERROR', 'something went wrong'))
    }
}
