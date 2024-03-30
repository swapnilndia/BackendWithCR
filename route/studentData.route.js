const { Router } = require("express");
const { StudentData } = require("../models/studentData.models");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const router = Router();

const { studentDataMiddleware } = require("../middleware/studentData.middleware");
const  studentController  = require("../controller/studentData.controller");
const { studentDataValidation } = require("../middleware/validation.middleware");

router.post('/',studentDataValidation, studentDataMiddleware, studentController.create_studentData);
router.get('/', studentDataMiddleware, studentController.get_all_studentsData)
router.get("/:id", studentDataMiddleware, studentController.get_Specific_StudentData);
router.put("/:id",studentDataValidation, studentDataMiddleware, studentController.update_StudentData);
router.delete("/:id", studentDataMiddleware, studentController.delete_StudentData);




module.exports = router

