

const jwt = require('jsonwebtoken')
const { isAccessTokenExpired } = require('../utils/helperFunction')
const ApiError = require('../utils/ApiError')


const todoMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(400).json(new ApiError(400, 'BAD REQUEST', 'Token missing in the headers'));
        }
        const access_token = token.split(' ')[1];
        const decodedToken = jwt.verify(access_token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(401).json(new ApiError(401, 'UNAUTHORIZED', 'Invalid token'));
        }
        const isExpired = isAccessTokenExpired(decodedToken.exp);
        if (isExpired) {
            return res.status(401).json(new ApiError(401, 'UNAUTHORIZED', 'Token expired'));
        }
        req.userId = decodedToken.id;
        next();
    } catch (error) {
        console.error('Error in todoMiddleware:', error);
        res.status(500).json(new ApiError(500, 'INTERNAL SERVER ERROR', 'Something went wrong'));
    }
}


module.exports = { todoMiddleware }