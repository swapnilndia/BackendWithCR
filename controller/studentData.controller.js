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

    if(createStudenData){
        return res.status(200).json({msg:'Student data created successfully', data:createStudenData})
    }else{
        return res.status(500).json({msg:'Failed to create student data'})
    }
  } catch (error) {
    console.error('Error in create_todo controller:', error);
        return res.status(500).json({ msg: 'Something went wrong' });
  }
};

exports.get_all_studentsData=  async(req,res)=>{
  try{

    const userId = req.userId;
    const listOfStudents = await StudentData.find({createdBy : userId})
    if(!listOfStudents){
      return res.status(500).json(new ApiError)
    }
    res.status(200).json(new ApiResponse(200, listOfTodos, 'StudentsData  fetched successfully'))
  }catch(error){
    console.log(error)
    res.status(500).json({ mess: 'something went wrong' })
  }
}