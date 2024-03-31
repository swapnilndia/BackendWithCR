const { User } = require("./user.controller");
const ApiResponse = require("../utils/ApiResponse");
const { StudentData } = require("../models/studentData.models");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.create_studentData = async (req, res) => {
  try {
    const { firstName, lastName, email, DOB, studentId } = req.body;
    const userId = req.userId;
    const createStudenData = await StudentData.create({
      firstName,
      lastName,
      email,
      DOB,
      studentId,
      createdBy: userId,
    });

    if (createStudenData) {
      return res
        .status(200)
        .json({
          msg: "Student data created successfully",
          data: createStudenData,
        });
    } else {
      return res.status(500).json({ msg: "Failed to create student data" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

exports.get_all_studentsData = async (req, res) => {
  try {
    const userId = req.userId;
    const listOfStudents = await StudentData.find({ createdBy: userId });
    if (!listOfStudents) {
      return res.status(500).json(new ApiError());
    }
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          listOfStudents,
          "Students Data  fetched successfully"
        )
      );
  } catch (error) {
    res.status(500).json({ mess: "something went wrong" });
  }
};

exports.get_Specific_StudentData = async (req, res) => {
  try {
    const { id } = req.params;
    const specificStudentData = await StudentData.findById(id);
    if (!specificStudentData) {
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
          specificStudentData,
          "Specific Student data fetched successfully"
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "INTERNAL SERVER ERROR", "Something went wrong"));
  }
};

exports.update_StudentData= async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, DOB, studentId } = req.body;

    const updatedStudentData = await StudentData.findByIdAndUpdate(
      id,
      { firstName, lastName, email, DOB, studentId },
      { new: true }
    );

    if (!updatedStudentData) {
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
          updatedStudentData,
          "Student data updated successfully"
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "INTERNAL SERVER ERROR", "Something went wrong"));
  }
};


exports.delete_StudentData = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudentData = await StudentData.findByIdAndDelete(id);
    if (!deletedStudentData) {
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
          deletedStudentData,
          "Student data Deleted successfully"
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