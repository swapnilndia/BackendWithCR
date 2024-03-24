// validationSchemas.js
const yup = require('yup');

const signUpSchema = yup.object().shape({
    username: yup.string()
        .required()
        .min(8, 'Username must name by 8 characters long')
        .matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, 'Username must contain at least one alphabet and one number'),
    email: yup.string()
        .email()
        .required(),
    password: yup.string()
        .required()
        .min(8, 'Username must name by 8 characters long')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
});
const signInSchema = yup.object().shape({
    username: yup.string()
        .required(),
    password: yup.string()
        .required()

});

const todoValidationSchema = yup.object().shape({
    title: yup.string()
        .required(),
    description: yup.string()
        .required(),
    dueDate: yup.date()
        .required().max(new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000)), "Due date must be within the next seven days"),
    todoCategory: yup.string()
        .required(),
})

module.exports = {
    signUpSchema, signInSchema, todoValidationSchema
};
