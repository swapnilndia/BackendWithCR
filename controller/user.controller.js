
const { User } = require('../models/user.models')
const ApiResponse = require('../utils/ApiResponse')
const ApiError = require('../utils/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sendEmail } = require('../utils/mailer')

exports.user_signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required.' });
        }
        const saltOrRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const createUser = await User.create({ username, email, password: hashedPassword });
        // send verification email 
        await sendEmail({ email, emailType: "VERIFY", userId: createUser._id });
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            // MongoDB duplicate key error (unique constraint violation)
            return res.status(400).json({ message: 'Username or email already exists.' });
        } else {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
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
