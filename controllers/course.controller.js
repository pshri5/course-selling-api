import { Course } from "../models/course.model";
import { asyncHandler } from "../utils/asyncHandler";

//create course
export const createCourse = asyncHandler(async(req,res)=>{
    const {title,description,price} = req.body
    if (!title || !description || !price) {
        throw new Error("Please add all the required information")
    }
    const course = await Course.create({
        title,
        description,
        price,
        creatorId: req.admin._id
    })

    return res.status(200).json({
        status: true,
        message: "Course created successfully",
        course
    })
})
//get course
export const getCourse = asyncHandler(async(req,res)=>{
    const {courseID} = req.params

    const course = await Course.findOne({
        _id: courseID,
        creatorId: req.admin._id,
    })
    return res.status(200).json({
        status: true,
        course,
        message: "Course retrieved successfully"
    })
}) 

//update course
export const updateCourse = asyncHandler(async(req,res)=>{
    const {courseID} = req.params
    const {title,description,price} = req.body
    const newCourse = await Course.findOneAndUpdate({
        _id: courseID,
        adminID: req.admin._id
    },{
        $set:{content}
    },{
        new: true
    })
    return res.status(200).json({
        status: true,
        newCourse,
        message: "Course updated successfully"
    })
})

//delete course
export const deleteCourse = asyncHandler(async(req,res)=>{
    const {courseID} = req.params
    const course = await Course.findByIdAndDelete({
        _id: courseID,
        adminID: req.admin._id
    })
    res.status(200).json({
        staus: true,
        message:"Course deleted successfully"
    })
})