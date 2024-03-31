const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const ExpenseSchema = new mongoose.Schema(
  {
    expenseID: String,
    description: String,
    amount: Number,
    date: String,
    location: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = { Expense };
