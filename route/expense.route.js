const { Router } = require("express");
const { expenseMiddleware } = require("../middleware/expense.middleware");
const expenseController = require("../controller/expense.controller");
const {
  expenseTrackerValidation,
} = require("../middleware/validation.middleware");

const router = Router();

router.post(
  "/",
  expenseTrackerValidation,
  expenseMiddleware,
  expenseController.create_expense
);
router.get("/", expenseMiddleware, expenseController.get_all_expense);
router.get("/:id", expenseMiddleware, expenseController.get_Specific_Expense);
router.put(
  "/:id",
  expenseTrackerValidation,
  expenseMiddleware,
  expenseController.update_Expense
);
router.delete("/:id", expenseMiddleware, expenseController.delete_Expense);

module.exports = router;
