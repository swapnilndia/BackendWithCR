const { Expense } = require("../models/expense.models");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

exports.create_expense = async (req, res) => {
  try {
    const expenseData = req.body;
    const userId = req.userId;
    const createExpense = await Expense.create({
      ...expenseData,
      createdBy: userId,
    });
    if (createExpense) {
      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            "CREATED",
            createExpense,
            "New Expense created successfully"
          )
        );
    } else {
      return res
        .status(500)
        .json(
          new ApiError(500, "INTERNAL SERVER ERROR", "Something went wrong")
        );
    }
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "INTERNAL SERVER ERROR", "Something went wrong"));
  }
};

exports.get_all_expense = async (req, res) => {
  try {
    const userId = req.userId;
    const listOfExpenses = await Expense.find({ createdBy: userId });
    if (!listOfExpenses) {
      return res.status(
        new ApiError(500, "INTERNAL SERVER ERROR", "Something went wrong")
      );
    }
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "SUCCESS",
          listOfExpenses,
          "ExpenseList fetched successfully"
        )
      );
  } catch (error) {
    return res.status(
      new ApiError(500, "INTERNAL SERVER ERROR", "Something went wrong")
    );
  }
};

exports.get_Specific_Expense = async (req, res) => {
  try {
    const { id } = req.params;
    const specificExpenseData = await Expense.findById(id);
    if (!specificExpenseData) {
      return res
        .status(500)
        .json(
          new ApiError(500, "INTERNAL SERVER ERROR", "Something went wrong")
        );
    }
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "SUCCESS",
          specificExpenseData,
          "Specific expense fetched successfully"
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "INTERNAL SERVER ERROR", "Something went wrong"));
  }
};

exports.update_Expense = async (req, res) => {
  try {
    const { id } = req.params;
    const { expenseID, description, amount, date, location } = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { expenseID, description, amount, date, location },
      { new: true }
    );

    if (!updatedExpense) {
      return res
        .status(500)
        .json(
          new ApiError(500, "INTERNAL SERVER ERROR", "Something went wrong")
        );
    }
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "SUCCESS",
          updatedExpense,
          "Expense updated successfully"
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "INTERNAL SERVER ERROR", "Something went wrong"));
  }
};

exports.delete_Expense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res
        .status(500)
        .json(
          new ApiError(500, "INTERNAL SERVER ERROR", "Something went wrong 1")
        );
    }
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "SUCCESS",
          deletedExpense,
          "Expense Deleted successfully"
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiError(500, "INTERNAL SERVER ERROR", "Something went wrong 2")
      );
  }
};
