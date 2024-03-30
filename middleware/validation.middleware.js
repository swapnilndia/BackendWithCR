const ApiError = require("../utils/ApiError");
const {
  signInSchema,
  todoValidationSchema,
  expenseValidationSchema,
} = require("../utils/validationSchema");

const signInValidation = async (req, res, next) => {
  try {
    await signInSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.inner.map((err) => ({
      field: err.path,
      message: err.message,
    }));
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "VALIDATION ERROR",
          "one or more validation error",
          errors
        )
      );
  }
};

const todoValidation = async (req, res, next) => {
  try {
    await todoValidationSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.inner.map((err) => ({
      field: err.path,
      message: err.message,
    }));
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "VALIDATION ERROR",
          "one or more validation error",
          errors
        )
      );
  }
};
const expenseTrackerValidation = async (req, res, next) => {
  try {
    await expenseValidationSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.inner.map((err) => ({
      field: err.path,
      message: err.message,
    }));
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "VALIDATION ERROR",
          "one or more validation error",
          errors
        )
      );
  }
};

module.exports = { signInValidation, todoValidation, expenseTrackerValidation };
