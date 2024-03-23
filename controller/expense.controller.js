const { Expense } = require("../models/expense.models");

exports.create_expense = async (req, res) => {
  try {
    const { expenseID, description, amount, date, location } = req.body;
    const userId = req.userId;

    const createExpense = await Expense.create({
      expenseID,
      description,
      amount,
      date,
      location,
      createdBy: userId,
    });
    if (createExpense) {
      return res
        .status(200)
        .json({
          message: "New Expense Created successfully",
          expenseData: createExpense,
        });
    } else {
      return res
        .status(500)
        .json({ msg: "Failed to create expense , Please try again" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
