const { Router } = require("express");
const { StudentData } = require("../models/studentData.models");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const router = Router();

const { studentDataMiddleware } = require("../middleware/studentData.middleware");
const  studentController  = require("../controller/studentData.controller");

router.post('/', studentDataMiddleware, studentController.create_studentData);
router.get('/', studentDataMiddleware, studentController.get_all_studentsData)

module.exports = router

