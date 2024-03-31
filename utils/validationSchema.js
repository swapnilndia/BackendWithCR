// validationSchemas.js
const yup = require("yup");

const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .min(8, "Username must name by 8 characters long")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Username must contain at least one alphabet and one number"
    ),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8, "Password must name by 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});
const signInSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const todoValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  completed: yup.boolean(),
  dueDate: yup
    .date()
    .required()
    .max(
      new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      "Due date must be within the next thirty days"
    ),
  todoCategory: yup.string().required(),
  priority: yup
    .string()
    .oneOf(
      ["HIGH", "MEDIUM", "LOW"],
      "Invalid priority (Priority can only be one of 'HIGH', 'MEDIUM' or 'LOW')"
    )
    .default("LOW"),
});

const expenseValidationSchema = yup.object().shape({
  expenseID: yup.string().required(),
  description: yup.string().required(),
  amount: yup.number().required(),
  date: yup
    .date()
    .required()
    .max(
      new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      "Due date must be within the next thirty days"
    ),
  location: yup.string().required(),
});

const studentDataValidationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  DOB: yup
    .date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .required(),
  studentId: yup
    .string()
    .matches(/^S\d{14}$/, 'Student ID must start with "S" followed by 14 digits')
    .required(),
  address: yup.object().shape({
    street: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    postalCode: yup.string().required(),
  }),
  gender: yup.string().required(),
  contactNumber: yup.string().required(),
  guardian: yup.object().shape({
    name: yup.string().required(),
    contactNumber: yup.string().required(),
  }),
  class: yup.string().required(),
  section: yup.string().required(),
  admissionDate: yup.date().required(),
  feesInformation: yup.object().shape({
    totalFees: yup.number().required(),
    paymentStatus: yup.string().required(),
  }),
});

module.exports = {
  signUpSchema,
  signInSchema,
  todoValidationSchema,
  expenseValidationSchema,
  studentDataValidationSchema
};
