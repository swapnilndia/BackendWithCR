// validationMiddleware.js
const { signUpSchema } = require('../utils/validationSchema')

const validateLoginInput = async (req, res, next) => {
    const { errors } = await signUpSchema.validate(req.body);
    console.log(errors, 'this is error')
    if (errors) {
        return res.status(400).json({ error: errors });
    }
    next();
}


module.exports = {
    validateLoginInput,
};
