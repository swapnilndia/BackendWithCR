

const jwt = require('jsonwebtoken')
const { isTokenExpired } = require('../utils/helperFunction')


const todoMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token)
        if (!token) {
            return res.status(400).json({ msg: 'Authorization header is missing' });
        }
        const access_token = token.split(' ')[1];
        const decodedToken = jwt.verify(access_token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(400).json({ msg: 'Invalid token' });
        }
        const isExpired = isTokenExpired(decodedToken.exp);
        if (isExpired) {
            return res.status(400).json({ msg: 'Token has expired' });
        }
        req.userId = decodedToken.id;
        next();
    } catch (error) {
        console.error('Error in todoMiddleware:', error);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}


module.exports = { todoMiddleware }